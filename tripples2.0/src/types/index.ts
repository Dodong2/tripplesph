import type { LucideIcon } from "lucide-react";

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
  icon: LucideIcon;
  value: string;
  label: string;
}

export interface WhyUsCard {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ProcessStep {
  id: string;
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ServiceSnippet {
  id: string;
  icon: LucideIcon;
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
  image: string
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
  iconColor: string
  icon: LucideIcon;
  iconAlt: string;
  imageUrl: string;
  imageAlt: string;
  features: ServiceFeature[];
  flipped: boolean;
}

export interface AdditionalService {
  id: string;
  iconBg: string
  iconColor: string
  icon: LucideIcon;
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
  icon: LucideIcon;
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
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface BenefitGroup {
  id: string;
  groupTitle: string;
  items: BenefitItem[];
}

export interface StoryItem {
  label: string;
  text: string;
}

export interface WhyWeExistItem {
  id: string
  icon: LucideIcon
  title: string
  description: string
}

export interface TimeStepItem {
  label: string
  desc: string
  active: boolean
  highlight: boolean
}

// ─── Contact Page ──────────────────────────────────────────────────────────────
export interface ContactFaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ContactInfoItem {
  id: string;
  icon: LucideIcon
  label: string;
  lines: string[];
}

// ─── Footer ──────────────────────────────────────────────────────────────────
export interface FooterColumn {
  id: string;
  heading: string;
  body: string;
}

export interface FooterSocialLink {
  id: string;
  label: string;
  url: string;
  platform: "facebook" | "youtube";
}

export interface FooterNavLink {
  id: string;
  label: string;
  path: string;
}

export interface FooterContact {
  id: string;
  email: string;
  phone: string;
  address: string;
}

// ─── components types wide and tall ──────────────────────────────────────────────────────────────────

export interface AwardCardWideProps {
  imageUrl: string;
  title: string;
  badge?: string;
  description: string;
  category?: string;
  /** "left" = image left, text right | "right" = image right, text left (default) */
  imagePosition?: "left" | "right";
  /** extra tailwind col/row classes e.g. "md:col-span-3 md:row-span-2" */
  gridClass?: string;
}

export interface AwardCardTallProps {
  imageUrl: string;
  title: string;
  badge?: string;
  description: string;
  /** extra tailwind col/row classes */
  gridClass?: string;
}

// ─── chatbot ──────────────────────────────────────────────────────────────────
export interface Message {
  id: string;
  from: "bot" | "user";
  text: string;
  isTyping?: boolean;
}

export interface ChatOption {
  id: string;
  label: string;
  answer: string;
}

export interface ChatCategory {
  id: string;
  category: string;
  icon: LucideIcon;
  iconsColor: string
  options: ChatOption[];
}


