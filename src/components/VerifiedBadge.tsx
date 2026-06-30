interface VerifiedBadgeProps {
  verified: boolean;
  className?: string;
}

export function VerifiedBadge({ verified, className }: VerifiedBadgeProps) {
  if (!verified) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className || "inline-block w-4 h-4 ml-1 text-blue-500"}
      aria-label="Verified"
    >
      <path d="M22.5 12l-2.07-2.39.49-3.14-3.14-.54L15.93 3.5 12 5.09 8.07 3.5 6.22 5.93 3.08 6.47l.49 3.14L1.5 12l2.07 2.39-.49 3.14 3.14.54L8.07 20.5 12 18.91l3.93 1.59 1.85-2.43 3.14-.54-.49-3.14L22.5 12zm-12.75 4.5l-4.5-4.5 1.06-1.06 3.44 3.44 7.94-7.94 1.06 1.06-9 9z" />
    </svg>
  );
}
