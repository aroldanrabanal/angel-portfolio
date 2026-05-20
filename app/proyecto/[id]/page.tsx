import { notFound } from "next/navigation";
import type { Metadata } from "next";
import portfolioEn from "@/data/portfolio.en.json";
import portfolioEs from "@/data/portfolio.es.json";
import type { Portfolio } from "@/types/portfolio";
import { ProjectDetailView } from "@/components/project/ProjectDetailView";
import { loadPortfolioServer } from "@/lib/loadPortfolio";
import { findProject, getProjectIds } from "@/lib/portfolioProject";
import { resolveServerLocale } from "@/lib/portfolioLocale.server";

const dataEn = portfolioEn as Portfolio;
const dataEs = portfolioEs as Portfolio;

export function generateStaticParams() {
  return getProjectIds(dataEs).map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const pEs = findProject(dataEs, id);
  const pEn = findProject(dataEn, id);
  if (!pEs || !pEn) {
    return { title: "Proyecto — Ángel Roldán Rabanal" };
  }
  const locale = await resolveServerLocale();
  const project = locale === "es" ? pEs : pEn;
  return {
    title: `${project.title} — ${dataEs.personal.name}`,
    description: project.whatIs.slice(0, 180),
  };
}

export default async function ProyectoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!findProject(dataEs, id) || !findProject(dataEn, id)) {
    notFound();
  }

  const locale = await resolveServerLocale();
  const initialData = await loadPortfolioServer(locale);

  return <ProjectDetailView projectId={id} initialData={initialData} />;
}
