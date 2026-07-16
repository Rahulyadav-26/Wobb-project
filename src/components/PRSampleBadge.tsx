import React from "react";

export interface PRSampleBadgeProps {
  label: string;
  variant?: "primary" | "success" | "warning";
}

const badgeStyles: Record<PRSampleBadgeProps["variant"], string> = {
  primary: "border border-blue-500 bg-blue-50 text-blue-700",
  success: "border border-green-500 bg-green-50 text-green-700",
  warning: "border border-orange-500 bg-orange-50 text-orange-700",
};

export const PRSampleBadge: React.FC<PRSampleBadgeProps> = ({
  label,
  variant = "primary",
}) => {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${badgeStyles[variant]}`}
      aria-label="pr-sample-badge"
    >
      {label}
    </span>
  );
};

export default PRSampleBadge;
