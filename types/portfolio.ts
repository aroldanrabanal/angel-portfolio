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

export type PortfolioProject = {
  id: string;
  title: string;
  image: string;
  description?: string;
  href?: string;
  /** Optional short label shown as overline (e.g. "Web", "Mobile") */
  kind?: string;
  /** Optional accent color hint */
  accent?: "violet" | "cream" | "ink" | "lime";
};

export type PortfolioExperience = {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
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
  words: [string, string, string];
  kicker: string;
  stats: string;
  tagline: string;
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
