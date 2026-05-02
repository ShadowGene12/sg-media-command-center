import { cn } from "@/lib/utils";
import { Card } from "./card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "primary" | "success" | "warning" | "danger";
  className?: string;
}

export function StatCard({ 
  title, 
  value, 
  icon: Icon,
  trend,
  variant = "default",
  className 
}: StatCardProps) {
  const variantClasses = {
    default: "border-border",
    primary: "border-primary bg-primary/5",
    success: "border-success bg-success-light",
    warning: "border-warning bg-warning-light",
    danger: "border-destructive bg-destructive-light"
  };

  return (
    <Card className={cn("p-6 shadow-card", variantClasses[variant], className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold tracking-tight">{value}</p>
          {trend && (
            <p className={cn(
              "text-sm font-medium flex items-center gap-1",
              trend.isPositive ? "text-success" : "text-destructive"
            )}>
              <span>{trend.isPositive ? "↑" : "↓"}</span>
              <span>{Math.abs(trend.value)}%</span>
            </p>
          )}
        </div>
        {Icon && (
          <div className={cn(
            "p-3 rounded-lg",
            variant === "primary" && "bg-primary text-primary-foreground",
            variant === "success" && "bg-success text-success-foreground",
            variant === "warning" && "bg-warning text-warning-foreground",
            variant === "danger" && "bg-destructive text-destructive-foreground",
            variant === "default" && "bg-secondary text-secondary-foreground"
          )}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
    </Card>
  );
}
