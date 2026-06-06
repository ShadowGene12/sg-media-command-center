import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  label?: string;
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export const PageHeader = ({ label, title, description, className, children }: PageHeaderProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className={cn("space-y-3", className)}
  >
    {label && (
      <p className="text-xs font-mono tracking-widest text-violet-400/80 uppercase">{label}</p>
    )}
    <h1 className="text-4xl font-display font-light text-white tracking-tight">{title}</h1>
    {description && (
      <p className="text-base text-slate-400 font-light max-w-2xl leading-relaxed">{description}</p>
    )}
    {children}
  </motion.div>
);

export const SectionLabel = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <p className={cn("text-sm font-mono text-slate-400 uppercase tracking-widest", className)}>
    {children}
  </p>
);
