import { cn } from "@/lib/utils";

interface ScoreIndicatorProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export function ScoreIndicator({ score, size = "md", showLabel = true, className }: ScoreIndicatorProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-score-excellent";
    if (score >= 60) return "text-score-good";
    if (score >= 40) return "text-score-fair";
    return "text-score-poor";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-success-light";
    if (score >= 60) return "bg-success-light/50";
    if (score >= 40) return "bg-warning-light";
    return "bg-destructive-light";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Needs Work";
    return "Critical";
  };

  const sizeClasses = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-6xl"
  };

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div className={cn(
        "flex items-center justify-center rounded-full aspect-square",
        getScoreBgColor(score),
        size === "sm" && "w-16 h-16",
        size === "md" && "w-24 h-24",
        size === "lg" && "w-32 h-32"
      )}>
        <span className={cn("font-bold", getScoreColor(score), sizeClasses[size])}>
          {score}
        </span>
      </div>
      {showLabel && (
        <span className={cn(
          "font-medium",
          getScoreColor(score),
          size === "sm" && "text-sm",
          size === "md" && "text-base",
          size === "lg" && "text-lg"
        )}>
          {getScoreLabel(score)}
        </span>
      )}
    </div>
  );
}
