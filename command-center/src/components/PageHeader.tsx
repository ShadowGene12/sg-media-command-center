import React from 'react';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  label?: string;
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

// Wrapped in React.memo to prevent unnecessary re-renders of static header elements
export const PageHeader = React.memo(({ label, title, description, className, children }: PageHeaderProps) => (
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
));
PageHeader.displayName = 'PageHeader';

// Wrapped in React.memo to prevent unnecessary re-renders of static label
export const SectionLabel = React.memo(({ children, className }: { children: React.ReactNode; className?: string }) => (
  <p className={cn("text-sm font-mono text-slate-400 uppercase tracking-widest", className)}>
    {children}
  </p>
));
SectionLabel.displayName = 'SectionLabel';
