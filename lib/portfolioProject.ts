import type { Portfolio, PortfolioProject } from "@/types/portfolio";

export function getProjectIds(data: Portfolio): string[] {
  return data.projects.map((p) => p.id);
}

export function findProject(data: Portfolio, id: string): PortfolioProject | undefined {
  return data.projects.find((p) => p.id === id);
}
