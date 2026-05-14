type Props = {
  size?: number;
  className?: string;
  color?: string;
};

export function Crosshair({ size = 40, className, color = "currentColor" }: Props) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      aria-hidden
    >
      <circle cx="32" cy="32" r="14" fill="none" stroke={color} strokeWidth="1" />
      <line x1="32" y1="0" x2="32" y2="20" stroke={color} strokeWidth="1" />
      <line x1="32" y1="44" x2="32" y2="64" stroke={color} strokeWidth="1" />
      <line x1="0" y1="32" x2="20" y2="32" stroke={color} strokeWidth="1" />
      <line x1="44" y1="32" x2="64" y2="32" stroke={color} strokeWidth="1" />
      <circle cx="32" cy="32" r="1.6" fill={color} />
    </svg>
  );
}
