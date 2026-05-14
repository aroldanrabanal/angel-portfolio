type Props = {
  size?: number;
  className?: string;
  color?: string;
};

/** ZYLO-style angular "Z"/"A" monogram — a triangular sharp glyph. */
export function Monogram({ size = 28, className, color = "currentColor" }: Props) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      aria-hidden
    >
      <path
        d="M8 8 L56 8 L40 26 L52 26 L20 56 L8 56 L24 38 L12 38 Z"
        fill={color}
      />
    </svg>
  );
}
