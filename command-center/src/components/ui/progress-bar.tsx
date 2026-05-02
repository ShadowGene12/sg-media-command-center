import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  showPercentage?: boolean;
  variant?: "default" | "success" | "warning" | "danger";
  className?: string;
}

export function ProgressBar({ 
  value, 
  max = 100, 
  showPercentage = false,
  variant = "default",
  className 
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  const variantClasses = {
    default: "bg-primary",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-destructive"
  };

  return (
    <div className={cn("space-y-2", className)}>
      {showPercentage && (
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
        <div 
          className={cn("h-full transition-all duration-300 rounded-full", variantClasses[variant])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
