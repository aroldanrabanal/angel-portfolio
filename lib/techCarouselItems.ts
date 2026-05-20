export type TechCarouselItem = {
  name: string;
  /** Devicon folder name; null uses fallback emoji */
  icon: string | null;
  fallback?: string;
};

/** Uniform sphere distribution — main ring + frameworks + DB + other */
export const TECH_CAROUSEL_ITEMS: TechCarouselItem[] = [
  { name: "PHP", icon: "php" },
  { name: "Java", icon: "java" },
  { name: "JavaScript", icon: "javascript" },
  { name: "TypeScript", icon: "typescript" },
  { name: "Python", icon: "python" },
  { name: "SQL", icon: null, fallback: "🗃️" },
  { name: "HTML", icon: "html5" },
  { name: "CSS", icon: "css3" },
  { name: "Kotlin", icon: "kotlin" },
  { name: "Angular", icon: "angular" },
  { name: "IONIC", icon: "ionic" },
  { name: "React", icon: "react" },
  { name: "Next.js", icon: "nextjs" },
  { name: "Bootstrap", icon: "bootstrap" },
  { name: "Firebase", icon: "firebase" },
  { name: "Git", icon: "git" },
  { name: "Metronic", icon: null, fallback: "📦" },
  { name: "MySQL", icon: "mysql" },
  { name: "Oracle", icon: "oracle" },
  { name: "MariaDB", icon: "mariadb" },
  { name: "SQL Server", icon: "microsoftsqlserver" },
  { name: "REST APIs", icon: null, fallback: "🔌" },
  { name: "Google APIs", icon: "google" },
  { name: "Docker", icon: "docker" },
  { name: "Linux", icon: "linux" },
  { name: "GSAP", icon: null, fallback: "✨" },
  { name: "R3F", icon: "threejs" },
  { name: "Tailwind", icon: "tailwindcss" },
  { name: "Capacitor", icon: "capacitor" },
];

export function deviconUrl(icon: string): string {
  return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon}/${icon}-original.svg`;
}

/** Fibonacci sphere — evenly spaced points on a sphere */
export function fibonacciSphere(
  index: number,
  total: number,
  radius: number,
): [number, number, number] {
  const golden = Math.PI * (3 - Math.sqrt(5));
  const y = 1 - (index / (total - 1)) * 2;
  const r = Math.sqrt(1 - y * y);
  const theta = golden * index;
  const x = Math.cos(theta) * r;
  const z = Math.sin(theta) * r;
  return [x * radius, y * radius, z * radius];
}
