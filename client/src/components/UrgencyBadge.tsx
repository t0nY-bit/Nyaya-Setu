import { cn } from "@/lib/utils";
import { AlertTriangle, Info, AlertCircle } from "lucide-react";

interface UrgencyBadgeProps {
  level: "Low" | "Medium" | "High";
  className?: string;
}

export function UrgencyBadge({ level, className }: UrgencyBadgeProps) {
  const styles = {
    Low: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
    Medium: "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800",
    High: "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800",
  };

  const icons = {
    Low: Info,
    Medium: AlertCircle,
    High: AlertTriangle,
  };

  const Icon = icons[level];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border shadow-sm",
        styles[level],
        className
      )}
    >
      <Icon className="w-3.5 h-3.5" />
      {level} Urgency
    </span>
  );
}
