export type SectionTheme = "ink" | "violet" | "cream" | "violet-deep";

export const themeBg: Record<SectionTheme, string> = {
  ink: "#0A0A0F",
  violet: "#6E22D6",
  cream: "#EFE9F5",
  "violet-deep": "#3D0E80",
};

export const themeFg: Record<SectionTheme, string> = {
  ink: "#FFFFFF",
  violet: "#FFFFFF",
  cream: "#0A0A0F",
  "violet-deep": "#FFFFFF",
};

export const themeMuted: Record<SectionTheme, string> = {
  ink: "rgba(255,255,255,0.55)",
  violet: "rgba(255,255,255,0.7)",
  cream: "rgba(10,10,15,0.55)",
  "violet-deep": "rgba(255,255,255,0.7)",
};

export const themeGridLine: Record<SectionTheme, string> = {
  ink: "rgba(255,255,255,0.06)",
  violet: "rgba(255,255,255,0.12)",
  cream: "rgba(10,10,15,0.08)",
  "violet-deep": "rgba(255,255,255,0.12)",
};

export function applySectionTheme(theme: SectionTheme) {
  document.documentElement.style.setProperty("--bg", themeBg[theme]);
  document.documentElement.style.setProperty("--fg", themeFg[theme]);
  document.documentElement.style.setProperty("--muted", themeMuted[theme]);
  document.documentElement.style.setProperty("--grid-line", themeGridLine[theme]);
  document.body.dataset.theme = theme;
}
