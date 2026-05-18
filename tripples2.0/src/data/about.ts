import type { Pillar, AwardCard, BenefitGroup, StoryItem, WhyWeExistItem, TimeStepItem } from "../types";
import { ASSETS } from "./index";
import { 
  Award, 
  Banknote, 
  Briefcase, 
  Building, 
  Cake, 
  Calendar, 
  Car, 
  Church, 
  Coffee, 
  Coins, 
  Globe, 
  GraduationCap, 
  Handshake, 
  Heart, 
  House, 
  Music, 
  PartyPopper, 
  Sofa, 
  Store, 
  TrendingUp, 
  User, 
  Utensils, 
  Van, 
  Volleyball, 
  Wifi } from "lucide-react";



// ─── About ────────────────────────────────────────────────────────────────────
export const PILLARS: Pillar[] = [
  { id: "pl1", icon: User, title: "MAN", subtitle: "(Social Aspect)", description: "We build meaningful relationships with our team and empower them to reach their fullest potential." },
  { id: "pl2", icon: Coins, title: "MONEY", subtitle: "(Economic Aspect)", description: "Our joy is to drive significant growth and profit to your brand, as illustrated in our high-impact client results." },
  { id: "pl3", icon: Globe, title: "MOTHER EARTH", subtitle: "(Environmental Aspect)", description: "We champion social responsibility and empower other brands to do the same by supporting their CSR campaigns." },
];

export const AWARDS: AwardCard[] = [
  { id: "aw1", imageUrl: ASSETS.award1, title: "Certificate of Excellence", badge: "Asia's Golden Legacy Awards", description: "Recognized for outstanding achievement in digital advertising innovation and client success across the Asian market.", category: "International Recognition" },
  { id: "aw2", imageUrl: ASSETS.award3, title: "DOST Partnership", badge: "", description: "Honored for exceptional collaboration in advancing technology and digital transformation initiatives.", category: "" },
  { id: "aw3", imageUrl: ASSETS.award4, title: "Legacy Crown Award", badge: "", description: "Prestigious trophy awarded for lasting impact and pioneering contributions to the digital marketing industry.", category: "" },
  { id: "aw4", imageUrl: ASSETS.award2, title: "Excellence in Digital Marketing", badge: "Asia's Golden Legacy Awards", description: "Awarded for demonstrating exceptional creativity, strategic thinking, and measurable results in digital campaigns.", category: "Industry Leadership" },
  { id: "aw5", imageUrl: ASSETS.award5, title: "Technology Partnership", badge: "DOST Starbooks Recognition", description: "Recognized for valuable partnership in promoting digital literacy and technology accessibility initiatives.", category: "" },
];

export const BENEFIT_GROUPS: BenefitGroup[] = [
  {
    id: "bg1",
    groupTitle: "Compensation & Benefits",
    items: [
      { id: "bi1", icon: Banknote, title: "Competitive Salary", description: "We follow DOLE's minimum salary grade" },
      { id: "bi2", icon: TrendingUp, title: "Productivity Incentive (PI)", description: "The company provides PI to every milestone achievement of the staff" },
      { id: "bi3", icon: Calendar, title: "13th Month Pay", description: "We follow and observe DOLE's policy on 13th month pay" },
      { id: "bi4", icon: Heart, title: "HMO", description: "Medical & hospital bills are covered per policy" },
      { id: "bi5", icon: Briefcase, title: "SSS, Philhealth, Pagibig Benefits", description: "All government benefits are given to the staff" },
      { id: "bi6", icon: Award, title: "Life Insurance & Cooperative", description: "We follow and observe DOLE's policy on 13th month pay" },
    ],
  },
  {
    id: "bg2",
    groupTitle: "Work-Life Balance",
    items: [
      { id: "bi7", icon: Car, title: "Transportation Allowance", description: "Commuting staffs are entitled to transportation allowance" },
      { id: "bi8", icon: House, title: "Hybrid Work", description: "Options for onsite and online flexible work arrangements" },
      { id: "bi9", icon: Building, title: "Perfect Office Location", description: "Away from busy environment; with garden, nearby park, hospital, campus, food, church" },
      { id: "bi10", icon:Utensils, title: "Foods & Drinks", description: "Provision of breakfast, lunch, snacks and OT meals for onsite staff" },
      { id: "bi11", icon: Wifi, title: "Lodging/Accommodation", description: "Beddings, utilities, electricity, and WiFi are all provided for stay-in staff" },
      { id: "bi12", icon: GraduationCap, title: "Training & Seminars", description: "Staff can recommend trainings and seminars to attend to" },
    ],
  },
  {
    id: "bg3",
    groupTitle: "Office Perks & Culture",
    items: [
      { id: "bi13", icon: Cake, title: "Celebrating Birthdays", description: "We treat our whole staff with their choice of food from buffet to Samgyupsal or more" },
      { id: "bi14", icon: Coffee, title: "Unlimited Brewed Coffee", description: "Enjoy sipping your healthy 'kapeng barako' in dark or mix with creamer and brown sugar" },
      { id: "bi15", icon: Music, title: "Musical Instrument", description: "Organ, drum set, bass, acoustic and electric guitar can be used" },
      { id: "bi16", icon: Volleyball, title: "Sports Day", description: "Table Tennis, Football, Basketball, Badminton, Volleyball, Chess" },
      { id: "bi17", icon: Sofa, title: "Chill Area", description: "Cozy kitchen and sofa to play chess and boardgames" },
      { id: "bi18", icon: Van, title: "Company Outing & Team Building", description: "We're all humans who need rest and recreation. We do this annually." },
      { id: "bi19", icon: PartyPopper , title: "Christmas Party and Baskets/Hampers", description: "The spirit of giving is abundant here, especially during Christmas" },
      { id: "bi20", icon: Church, title: "Prayer Room", description: "You can pray anywhere but we also have a room to just meditate and read" },
      { id: "bi21", icon: Heart, title: "Weekly Mid-Week Fellowship", description: "We also stop our work midweek to talk about life and our faith walk with God" },
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

export const EXIST_ITEM: WhyWeExistItem[] = [
    { id: "we1", icon: Heart, title: "Humanity", description: "We exist for humanity. We compensate our online community with cash and rewardable gift items, vouchers, and points." },
    { id: "we2", icon: Store, title: "Brands and SMEs", description: "We exist for brands and SMEs. Understanding what is in their heart, we design, create, and deliver quality services." },
    { id: "we3", icon: Handshake, title: "Non-profit organizations", description: "We exist for non-profit organizations. We help them promote their advocacies, and it is FREE!" },
  ];

  export const TIME_STEPS: TimeStepItem[] = [
  {
    label: "The Birth",
    desc: "In 2017, Tripples was born having been registered with SEC and other government bodies.",
    active: true,
    highlight: false
  },
  {
    label: "The First Ripple",
    desc: "Started the journey with a humble beginning with an X-deal with a photo-video supplier.",
    active: true,
    highlight: false
  },
  {
    label: "The Pivot",
    desc: "Thanks to the COVID-19 pandemic, Tripples was able to pivot making itself relevant and opening doors to the government clientele.",
    active: true,
    highlight: false
  },
  {
    label: "The Growth",
    desc: "Being a PHILGEPS Platinum member, Tripples has become eligible to participate in stringent multi-million government bids.",
    active: true,
    highlight: false
  },
  {
    label: "The Now",
    desc: "The company has made ripples of impacts to government, private sector, and NGOs through its expanded and trust-worthy services.",
    active: true,
    highlight: false
  },
  {
    label: "The Future",
    desc: "Coming soon are Tripples new products and services that would turn ripples into waves of positive change.",
    active: true,
    highlight: true,
  },

];