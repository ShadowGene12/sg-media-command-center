import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.0.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", {
  apiVersion: "2022-11-15",
});

const endpointSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");

const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  const signature = req.headers.get("stripe-signature");

  if (!signature || !endpointSecret) {
    return new Response("Webhook secret not configured or signature missing.", { status: 400 });
  }

  const body = await req.text();
  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
  } catch (err) {
    console.error(`⚠️  Webhook signature verification failed.`, err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const customerId = session.customer;
        const subscriptionId = session.subscription;
        const userId = session.client_reference_id || session.metadata?.userId;
        const tierName = session.metadata?.tierName || "operator"; // Default fallback

        if (userId) {
          await supabase
            .from("profiles")
            .update({
              stripe_customer_id: customerId,
              stripe_subscription_id: subscriptionId,
              tier: tierName.toLowerCase(),
            })
            .eq("id", userId);
        }
        break;
      }
      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        await supabase
          .from("profiles")
          .update({
            tier: "free",
            stripe_subscription_id: null,
          })
          .eq("stripe_subscription_id", subscription.id);
        break;
      }
      case "customer.subscription.updated": {
        const subscription = event.data.object;
        if (subscription.status !== "active" && subscription.status !== "trialing") {
          await supabase
            .from("profiles")
            .update({ tier: "free" })
            .eq("stripe_subscription_id", subscription.id);
        }
        break;
      }
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Webhook processing error:", error.message);
    return new Response(`Webhook Error: ${error.message}`, { status: 400 });
  }
});
