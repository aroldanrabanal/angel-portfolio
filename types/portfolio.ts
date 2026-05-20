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
  website?: string;
  /** Optional highlighted label (e.g. Active, Erasmus+ · Prague) */
  highlightBadge?: string;
  badgeTone?: "active" | "accent";
};

export type PortfolioRepoBadge = {
  type: "live" | "android";
  url?: string;
};

export type PortfolioRepo = {
  id: string;
  name: string;
  description: string;
  repoUrl: string;
  tags: string[];
  featured?: boolean;
  featuredBadge?: string;
  liveUrl?: string;
  badges?: PortfolioRepoBadge[];
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

export type PortfolioUiFooterSocialAria = {
  github: string;
  linkedin: string;
  email: string;
  phone: string;
};

export type PortfolioUiFooter = {
  educationTitle: string;
  languagesTitle: string;
  softSkillsTitle: string;
  hardSkillsTitle: string;
  availableSuffix: string;
  socialAria: PortfolioUiFooterSocialAria;
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
  /** Public path under `/public` — hero-only portrait (About uses personal.portrait) */
  portrait?: string;
};

export type TemplateBlock = {
  heading: [string, string];
  kicker?: string;
  indexLabel: string;
};

export type TemplateExperience = TemplateBlock & {
  visitSiteLabel: string;
};

export type TemplateWorks = TemplateBlock & {
  /** Link text pointing to GitHub profile */
  subtitle: string;
  githubButton: string;
  liveButton: string;
  liveBadge: string;
  androidBadge: string;
  /** Use `{name}` as placeholder for repo name */
  openRepoAria: string;
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

export type TemplateAboutEducation = {
  title: string;
  school: string;
  period: string;
  /** Highlight badge in accent color (e.g. completion date) */
  badge?: string;
};

export type TemplateAboutLanguage = {
  flag: string;
  name: string;
  badge: string;
  subBadge?: string;
  /** Visual proficiency 0–100 */
  levelPercent: number;
};

export type TemplateAboutErasmus = {
  title: string;
  subtitle: string;
};

export type TemplateAbout = TemplateBlock & {
  body: string[];
};

export type TemplateSoftSkill = {
  icon: string;
  label: string;
};

export type TemplateHardSkillCategory = {
  title: string;
  items: string[];
};

export type TemplateSkills = TemplateBlock & {
  education: TemplateAboutEducation[];
  erasmus: TemplateAboutErasmus;
  languages: TemplateAboutLanguage[];
  softSkills: TemplateSoftSkill[];
  hardSkills: TemplateHardSkillCategory[];
};

export type TemplateTechnologies = TemplateBlock;

export type TemplateContactForm = {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  submit: string;
  sending: string;
  success: string;
  error: string;
};

export type TemplateContact = TemplateBlock & {
  body: string;
  availabilityLine: string;
  linkedinLabel: string;
  githubDisplay: string;
  form: TemplateContactForm;
};

export type TemplateFooterEducation = {
  title: string;
  subtitle: string;
  meta: string;
  badge?: string;
};

export type TemplateFooterLanguage = {
  flag: string;
  name: string;
  level: string;
  subLevel?: string;
};

export type TemplateFooterLink = {
  label: string;
  href: string;
};

export type TemplateFooter = {
  identitySubtitle: string;
  learningNote: string;
  education: TemplateFooterEducation[];
  erasmus: { title: string; meta: string };
  languages: TemplateFooterLanguage[];
  builtWithPrefix: string;
  builtWith: TemplateFooterLink[];
  locationLine: string;
  copyrightName: string;
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
  skills: TemplateSkills;
  experience: TemplateExperience;
  works: TemplateWorks;
  technologies: TemplateTechnologies;
  cta: TemplateContact;
  footer: TemplateFooter;
};

export type Portfolio = {
  personal: PortfolioPersonal;
  about: string;
  projects: PortfolioProject[];
  repos: PortfolioRepo[];
  experience: PortfolioExperience[];
  education: PortfolioEducation[];
  softSkills: string[];
  languages: PortfolioLanguage[];
  extra: PortfolioExtra;
  ui: PortfolioUi;
  template: PortfolioTemplate;
};
