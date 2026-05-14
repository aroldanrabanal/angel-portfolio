type Variant = "sans" | "serif" | "italic" | "mono" | "display";

type Props = {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
};

const styles: Record<Variant, string> = {
  sans: "font-sans font-semibold tracking-tight lowercase",
  serif: "font-serif font-medium tracking-tight",
  italic: "font-serif italic font-normal tracking-tight",
  mono: "font-mono font-bold uppercase tracking-wider",
  display: "font-display font-extrabold tracking-tight uppercase",
};

/**
 * Renders a "brand"-style word with a chosen typographic dress to fake the
 * "wall of clients" look (zoom / Vidio / nVIDIA / Canon / VISA mix).
 */
export function BrandWord({ children, variant = "sans", className = "" }: Props) {
  return (
    <span
      className={`select-none text-current ${styles[variant]} ${className}`}
      style={
        variant === "sans"
          ? { fontFamily: "'Helvetica Neue', Arial, sans-serif" }
          : variant === "serif"
          ? { fontFamily: "Georgia, 'Times New Roman', serif" }
          : variant === "italic"
          ? { fontFamily: "Georgia, 'Times New Roman', serif" }
          : undefined
      }
    >
      {children}
    </span>
  );
}
