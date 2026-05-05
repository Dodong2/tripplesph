// ─── Navigation ─────────────────────────────────────────────────────────────
export type PageId = "home" | "services" | "about" | "blog" | "contacts";

export interface NavLink {
  label: string;
  page: PageId;
}

// ─── Home Page ───────────────────────────────────────────────────────────────
export interface StatCard {
  id: string;
  label: string;
  value: string;
  sub: string;
}

export interface ImpactStat {
  id: string;
  icon: string;
  value: string;
  label: string;
}

export interface WhyUsCard {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface ServiceSnippet {
  id: string;
  icon: string;
  title: string;
  description: string;
  tags: string[];
  color: string;
}

export interface TestimonialItem {
  id: string;
  avatarUrl: string;
  organization: string;
  intro: string;
  highlight: string;
  detail: string;
  source: string;
}

export interface ClientLogo {
  id: string;
  label: string;
  color: string;
}

export interface ArticleItem {
  id: string;
  imageUrl: string;
  title: string;
  excerpt: string;
  slug: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

// ─── Services Page ───────────────────────────────────────────────────────────
export interface ServiceFeature {
  id: string;
  text: string;
}

export interface ServiceBlock {
  id: string;
  title: string;
  description: string;
  iconBg: string;
  iconUrl: string;
  iconAlt: string;
  imageUrl: string;
  imageAlt: string;
  features: ServiceFeature[];
  flipped: boolean;
}

export interface AdditionalService {
  id: string;
  icon: string;
  title: string;
  description: string;
  bgColor: string;
}

// ─── About Page ──────────────────────────────────────────────────────────────
export interface TimelineEntry {
  id: string;
  highlight: string;
  text: string;
}

export interface Pillar {
  id: string;
  iconUrl: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface AwardCard {
  id: string;
  imageUrl: string;
  title: string;
  badge: string;
  description: string;
  category: string;
}

export interface BenefitItem {
  id: string;
  iconUrl: string;
  title: string;
  description: string;
}

export interface BenefitGroup {
  id: string;
  groupTitle: string;
  items: BenefitItem[];
}

// ─── Footer ──────────────────────────────────────────────────────────────────
export interface FooterColumn {
  id: string;
  heading: string;
  body: string;
}
