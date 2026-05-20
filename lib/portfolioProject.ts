import type { Portfolio, PortfolioProject } from "@/types/portfolio";

export function getProjectIds(data: Portfolio): string[] {
  return data.projects.map((p) => p.id);
}

export function findProject(data: Portfolio, id: string): PortfolioProject | undefined {
  return data.projects.find((p) => p.id === id);
}

export function getAdjacentProjectIds(
  data: Portfolio,
  id: string,
): { prevId: string | null; nextId: string | null } {
  const ids = getProjectIds(data);
  const i = ids.indexOf(id);
  if (i < 0) return { prevId: null, nextId: null };
  return {
    prevId: ids[(i - 1 + ids.length) % ids.length] ?? null,
    nextId: ids[(i + 1) % ids.length] ?? null,
  };
}
