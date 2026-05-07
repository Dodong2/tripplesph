import type { Pillar, AwardCard, BenefitGroup, StoryItem } from "../types";
import { ASSETS } from "./index";
import { Coins, Globe, User } from "lucide-react";



// ─── About ────────────────────────────────────────────────────────────────────
export const PILLARS: Pillar[] = [
  { id: "pl1", icon: User, title: "MAN", subtitle: "(Social Aspect)", description: "We build meaningful relationships with our team and empower them to reach their fullest potential." },
  { id: "pl2", icon: Coins, title: "MONEY", subtitle: "(Economic Aspect)", description: "Our joy is to drive significant growth and profit to your brand, as illustrated in our high-impact client results." },
  { id: "pl3", icon: Globe, title: "MOTHER EARTH", subtitle: "(Environmental Aspect)", description: "We champion social responsibility and empower other brands to do the same by supporting their CSR campaigns." },
];

export const AWARDS: AwardCard[] = [
  { id: "aw1", imageUrl: ASSETS.award1, title: "Certificate of Excellence", badge: "Asia's Golden Legacy Awards", description: "Recognized for outstanding achievement in digital advertising innovation and client success across the Asian market.", category: "International Recognition" },
  { id: "aw2", imageUrl: ASSETS.award2, title: "Excellence in Digital Marketing", badge: "Asia's Golden Legacy Awards", description: "Awarded for demonstrating exceptional creativity, strategic thinking, and measurable results in digital campaigns.", category: "Industry Leadership" },
  { id: "aw3", imageUrl: ASSETS.award3, title: "DOST Partnership", badge: "", description: "Honored for exceptional collaboration in advancing technology and digital transformation initiatives.", category: "" },
  { id: "aw4", imageUrl: ASSETS.award4, title: "Legacy Crown Award", badge: "", description: "Prestigious trophy awarded for lasting impact and pioneering contributions to the digital marketing industry.", category: "" },
  { id: "aw5", imageUrl: ASSETS.award5, title: "Technology Partnership", badge: "DOST Starbooks Recognition", description: "Recognized for valuable partnership in promoting digital literacy and technology accessibility initiatives.", category: "" },
];

export const BENEFIT_GROUPS: BenefitGroup[] = [
  {
    id: "bg1",
    groupTitle: "Compensation & Benefits",
    items: [
      { id: "bi1", iconUrl: "", title: "Competitive Salary", description: "We follow DOLE's minimum salary grade" },
      { id: "bi2", iconUrl: "", title: "Productivity Incentive (PI)", description: "The company provides PI to every milestone achievement of the staff" },
      { id: "bi3", iconUrl: "", title: "13th Month Pay", description: "We follow and observe DOLE's policy on 13th month pay" },
      { id: "bi4", iconUrl: "", title: "HMO", description: "Medical & hospital bills are covered per policy" },
      { id: "bi5", iconUrl: "", title: "SSS, Philhealth, Pagibig Benefits", description: "The company provides PI to every milestone achievement of the staff" },
      { id: "bi6", iconUrl: "", title: "Life Insurance & Cooperative", description: "We follow and observe DOLE's policy on 13th month pay" },
    ],
  },
  {
    id: "bg2",
    groupTitle: "Work-Life Balance",
    items: [
      { id: "bi7", iconUrl: "", title: "Transportation Allowance", description: "Commuting staffs are entitled to transportation allowance" },
      { id: "bi8", iconUrl: "", title: "Hybrid Work", description: "Options for onsite and online flexible work arrangements" },
      { id: "bi9", iconUrl: "", title: "Perfect Office Location", description: "Away from busy environment; with garden, nearby park, hospital, campus, food, church" },
      { id: "bi10", iconUrl: "", title: "Foods & Drinks", description: "Provision of breakfast, lunch, snacks and OT meals for onsite staff" },
      { id: "bi11", iconUrl: "", title: "Lodging/Accommodation", description: "Beddings, utilities, electricity, and WiFi are all provided for stay-in staff" },
      { id: "bi12", iconUrl: "", title: "Training & Seminars", description: "Staff can recommend trainings and seminars to attend to" },
    ],
  },
  {
    id: "bg3",
    groupTitle: "Office Perks & Culture",
    items: [
      { id: "bi13", iconUrl: "", title: "Celebrating Birthdays", description: "We treat our whole staff with their choice of food from buffet to Samgyupsal or more" },
      { id: "bi14", iconUrl: "", title: "Unlimited Brewed Coffee", description: "Enjoy sipping your healthy 'kapeng barako' in dark or mix with creamer and brown sugar" },
      { id: "bi15", iconUrl: "", title: "Musical Instrument", description: "Organ, drum set, bass, acoustic and electric guitar can be used" },
      { id: "bi16", iconUrl: "", title: "Sports Day", description: "Table Tennis, Football, Basketball, Badminton, Volleyball, Chess" },
      { id: "bi17", iconUrl: "", title: "Chill Area", description: "Cozy kitchen and sofa to play chess and boardgames" },
      { id: "bi18", iconUrl: "", title: "Company Outing & Team Building", description: "We're all humans who need rest and recreation. We do this annually." },
      { id: "bi19", iconUrl: "", title: "Christmas Party and Baskets/Hampers", description: "The spirit of giving is abundant here, especially during Christmas" },
      { id: "bi20", iconUrl: "", title: "Prayer Room", description: "You can pray anywhere but we also have a room to just meditate and read" },
      { id: "bi21", iconUrl: "", title: "Weekly Mid-Week Fellowship", description: "We also stop our work midweek to talk about life and our faith walk with God" },
    ],
  },
];

export const STORY_CARD_1: StoryItem[] = [
  {
    label: "The Pioneers",
    text: "Mr. Sison and Ms. Sison Soon, joined by friends with skills in front-end development, back-end development, and community management, were the first to nurture our brand.",
  },
  {
    label: "First-Ever Ripple",
    text: "Before the big waves of an immense client list, we started with small waves — our first client, a photo and video supplies and servicing biz in the Philippines.",
  },
  {
    label: "Innovation",
    text: "Starting with cost-per-click ads, TRipples became the first and biggest online platform for promoting campaigns effectively.",
  },
  {
    label: "Growth",
    text: "We then leveraged the pandemic to offer various services and became a one-stop shop for all your digital marketing needs.",
  },
];