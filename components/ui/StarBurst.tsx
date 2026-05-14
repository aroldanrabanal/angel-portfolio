type Props = {
  size?: number;
  className?: string;
  color?: string;
};

/** Lime 4-point star / spark decoration used across the ZYLO shot. */
export function StarBurst({ size = 32, className, color = "currentColor" }: Props) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      aria-hidden
    >
      <path
        d="M32 0 L36 28 L64 32 L36 36 L32 64 L28 36 L0 32 L28 28 Z"
        fill={color}
      />
    </svg>
  );
}
