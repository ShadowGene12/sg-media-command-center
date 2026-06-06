import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icons?: LucideIcon[];
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
  className?: string;
  variant?: "default" | "error";
}

const iconVariants = {
  left:   { initial: { opacity: 0, x: 0, rotate: 0 }, animate: { opacity: 1, x: 0, rotate: -8 }, hover: { x: -20, y: -6, rotate: -16, scale: 1.1 } },
  center: { initial: { opacity: 0, y: 10 },            animate: { opacity: 1, y: 0 },              hover: { y: -10, scale: 1.15 } },
  right:  { initial: { opacity: 0, x: 0, rotate: 0 }, animate: { opacity: 1, x: 0, rotate: 8 },  hover: { x: 20,  y: -6, rotate: 16,  scale: 1.1 } },
};
const positions = ["left", "center", "right"] as const;

export function EmptyState({ icons = [], title, description, action, className, variant = "default" }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover="hover"
      className={cn(
        "group flex flex-col items-center justify-center text-center p-10 rounded-2xl border-2 border-dashed transition-all duration-300",
        variant === "error"
          ? "border-red-500/20 bg-red-500/5 hover:border-red-500/30"
          : "border-white/[0.07] bg-white/[0.01] hover:border-white/[0.12]",
        className
      )}
    >
      {/* Three-icon fan */}
      {icons.length >= 3 && (
        <div className="flex justify-center items-center isolate mb-6 relative">
          {positions.map((pos, i) => {
            const Icon = icons[i];
            const vars = iconVariants[pos];
            return (
              <motion.div
                key={pos}
                variants={{ hover: vars.hover }}
                initial={vars.initial}
                animate={vars.animate}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className={cn(
                  "h-12 w-12 rounded-xl border flex items-center justify-center shadow-lg",
                  "bg-white/[0.04] border-white/[0.08]",
                  pos === "center" ? "z-20" : "z-10",
                  pos === "left" && "-mr-2",
                  pos === "right" && "-ml-2"
                )}
              >
                <Icon className="h-5 w-5 text-slate-500 group-hover:text-slate-300 transition-colors duration-200" />
              </motion.div>
            );
          })}
        </div>
      )}

      <p className="text-sm font-semibold text-white mb-1.5">{title}</p>
      {description && (
        <p className="text-xs text-slate-500 max-w-xs leading-relaxed">{description}</p>
      )}
      {action && (
        <motion.button
          onClick={action.onClick}
          whileTap={{ scale: 0.97 }}
          className="mt-5 px-4 py-2 text-xs font-mono font-semibold rounded-xl border border-white/[0.10] bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
        >
          {action.label}
        </motion.button>
      )}
    </motion.div>
  );
}
