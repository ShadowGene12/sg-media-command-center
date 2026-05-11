import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const shimmer = {
  animate: {
    backgroundPosition: ["200% 0", "-200% 0"],
    transition: { duration: 1.8, repeat: Infinity, ease: "linear" },
  },
};

function SkeletonBlock({ className }: { className?: string }) {
  return (
    <motion.div
      variants={shimmer}
      animate="animate"
      className={cn("rounded-lg", className)}
      style={{
        background: "linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 100%)",
        backgroundSize: "400% 100%",
      }}
    />
  );
}

// A single glass card skeleton
export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-white/[0.06] bg-black/40 backdrop-blur-md p-5 space-y-3", className)}>
      <SkeletonBlock className="h-3 w-20" />
      <SkeletonBlock className="h-8 w-24" />
      <SkeletonBlock className="h-2 w-16" />
    </div>
  );
}

// A row skeleton for list pages
export function RowSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-4 px-5 py-4 border-b border-white/[0.03]", className)}>
      <SkeletonBlock className="h-2 w-2 rounded-full flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <SkeletonBlock className="h-3 w-3/5" />
        <SkeletonBlock className="h-2 w-2/5" />
      </div>
      <SkeletonBlock className="h-5 w-14 rounded-full" />
    </div>
  );
}

// Full page skeleton: header + 4 cards + table
export function PageSkeleton() {
  return (
    <div className="space-y-10 max-w-6xl pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-3">
        <SkeletonBlock className="h-2.5 w-28" />
        <SkeletonBlock className="h-10 w-72" />
        <SkeletonBlock className="h-3 w-96 max-w-full" />
      </div>
      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => <CardSkeleton key={i} />)}
      </div>
      {/* Table */}
      <div className="rounded-2xl border border-white/[0.06] bg-black/40 backdrop-blur-md overflow-hidden">
        {[...Array(5)].map((_, i) => <RowSkeleton key={i} />)}
      </div>
    </div>
  );
}
