export type Locale = "en" | "es";

export type PortfolioSection = {
  id: string;
  label: string;
};

export type PortfolioPersonal = {
  name: string;
  title: string;
  tagline: string;
  location: string;
  phone: string;
  email: string;
  github: string;
  linkedin: string;
  available: boolean;
  closing: string;
  /** Public path under `/public`, e.g. `/images/portrait.jpg` */
  portrait?: string;
};

export type PortfolioProjectLink = {
  label: string;
  url: string;
  /** When true, opens in a new tab (default true for http(s) URLs) */
  external?: boolean;
};

export type PortfolioProjectHighlight = {
  title: string;
  body: string;
};

export type PortfolioProject = {
  id: string;
  title: string;
  /** Short impact line shown under the title on cards and case studies */
  impactContext?: string;
  image: string;
  description?: string;
  /** Legacy primary URL; also surfaced as a link if `links` is omitted */
  href?: string;
  /** Optional short label shown as overline (e.g. "Web", "Mobile") */
  kind?: string;
  /** Optional accent color hint */
  accent?: "violet" | "cream" | "ink" | "lime";
  /** Long-form paragraphs for the project detail page */
  content?: string[];
  tech?: string[];
  highlights?: PortfolioProjectHighlight[];
  /** Architecture / stack decisions for the case study page */
  keyDecisions?: string[];
  links?: PortfolioProjectLink[];
  year?: string;
  role?: string;
};

export type PortfolioExperience = {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
  /** Optional highlighted label (e.g. current production role) */
  highlightBadge?: string;
};

export type PortfolioEducation = {
  degree: string;
  school: string;
  period: string;
};

export type PortfolioLanguage = {
  lang: string;
  level: string;
};

export type PortfolioExtra = {
  license: boolean;
  travel: boolean;
  relocation: boolean;
};

export type PortfolioUiCta = {
  viewProjects: string;
  seeMyWork: string;
  github: string;
  emailMe: string;
  projectsHref: string;
  experienceMiniSceneHint: string;
  linkedin: string;
};

export type PortfolioUiFooter = {
  educationTitle: string;
  languagesTitle: string;
  softSkillsTitle: string;
  availableSuffix: string;
};

export type PortfolioUiLabels = {
  aboutHeading: string;
  experienceHeading: string;
  projectsHeading: string;
  skillsHeading: string;
  contactHeading: string;
};

export type PortfolioUiAria = {
  contactButton: string;
};

export type PortfolioUiLanguageToggle = {
  groupAriaLabel: string;
  switchToEnglish: string;
  switchToSpanish: string;
};

export type PortfolioUi = {
  sections: PortfolioSection[];
  cta: PortfolioUiCta;
  footer: PortfolioUiFooter;
  labels: PortfolioUiLabels;
  aria: PortfolioUiAria;
  languageToggle: PortfolioUiLanguageToggle;
};

/* ---------------- Template (ZYLO-style copy) ---------------- */

export type TemplateHero = {
  name: string;
  subtitle: string;
  tagline: string;
  availabilityLine: string;
  location: string;
  workCta: string;
  indexLabel: string;
};

export type TemplateBlock = {
  heading: [string, string];
  kicker?: string;
  indexLabel: string;
};

export type TemplateService = {
  id: string;
  title: string;
  blurb: string;
  bullets: string[];
};

export type TemplateProcessStep = {
  id: string;
  title: string;
  body: string;
};

export type TemplateWorks = TemplateBlock & {
  intro: string;
  /** Fallback when `project.kind` is missing */
  projectKindFallback: string;
  /** Primary CTA on project cards (links to case study) */
  caseStudyCta: string;
  openDemo: string;
  openRepo: string;
  backToWorks: string;
  /** Screen reader / title for external shortcut on cards */
  externalLinkAria: string;
  /** Project detail page section headings */
  detailOverviewHeading: string;
  detailTechHeading: string;
  detailHighlightsHeading: string;
  detailKeyDecisionsHeading: string;
  detailLinksHeading: string;
};

export type TemplateAbout = TemplateBlock & {
  body: string[];
  trustStrip: string[];
  /** Small label above the trust strip (e.g. "Often in commits") */
  commitStripLabel: string;
};

export type TemplateStack = {
  kicker: string;
  heading: string;
  indexLabel: string;
  intro: string;
  items: string[];
};

export type PortfolioTemplate = {
  brand: {
    monogram: string;
    name: string;
    tagline: string;
    estYear: string;
  };
  nav: { label: string; href: string }[];
  hero: TemplateHero;
  about: TemplateAbout;
  services: TemplateBlock & { items: TemplateService[] };
  works: TemplateWorks;
  process: TemplateBlock & {
    intro: string;
    steps: TemplateProcessStep[];
    experienceStripKicker: string;
    experienceOngoingSuffix: string;
  };
  stack: TemplateStack;
  cta: TemplateBlock & { body: string };
  footer: {
    tagline: string;
    marqueeItems: string[];
    columns: {
      title: string;
      links: { label: string; href?: string }[];
    }[];
    legal: string;
  };
};

export type Portfolio = {
  personal: PortfolioPersonal;
  about: string;
  projects: PortfolioProject[];
  experience: PortfolioExperience[];
  education: PortfolioEducation[];
  softSkills: string[];
  languages: PortfolioLanguage[];
  extra: PortfolioExtra;
  ui: PortfolioUi;
  template: PortfolioTemplate;
};
