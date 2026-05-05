export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  imageUrl: string;
  slug: string;
}

// Article thumbnail — replace with real hosted image when available
const ARTICLE_IMG =
  "https://placehold.co/505x221/197996/ffffff?text=Article";

export const BLOG_CATEGORIES: string[] = [
  "All",
  "Faith",
  "Business",
  "Marketing",
  "Community",
  "Digital",
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "bp1",
    title: "The Best Way to Start Your Day",
    excerpt:
      "Every day must begin with a prayer, thanking God for the blessings and opportunities that lie ahead.",
    author: "Maria Santos",
    date: "February 1, 2026",
    category: "Faith",
    imageUrl: ARTICLE_IMG,
    slug: "#",
  },
  {
    id: "bp2",
    title: "How TRipples Creates Positive Ripple Effects",
    excerpt:
      "We connect the hearts of brands and non-profits with those of their customers and audiences.",
    author: "Ryan Soon",
    date: "January 20, 2026",
    category: "Business",
    imageUrl: ARTICLE_IMG,
    slug: "#",
  },
  {
    id: "bp3",
    title: "Digital Marketing Trends You Should Know",
    excerpt:
      "Explore the most effective strategies shaping the digital marketing landscape this year.",
    author: "Maria Santos",
    date: "January 10, 2026",
    category: "Marketing",
    imageUrl: ARTICLE_IMG,
    slug: "#",
  },
  {
    id: "bp4",
    title: "Growing Your Online Community Organically",
    excerpt:
      "Learn how to build and nurture an engaged online community that drives real business results.",
    author: "Oliva Soon",
    date: "December 28, 2025",
    category: "Community",
    imageUrl: ARTICLE_IMG,
    slug: "#",
  },
  {
    id: "bp5",
    title: "The Power of Cost-Per-Click Advertising",
    excerpt:
      "Maximise your ROI by understanding how CPC campaigns work and how to optimise every click.",
    author: "Ryan Soon",
    date: "December 15, 2025",
    category: "Digital",
    imageUrl: ARTICLE_IMG,
    slug: "#",
  },
  {
    id: "bp6",
    title: "Why Faith-Driven Businesses Thrive",
    excerpt:
      "Putting God first in business is not just spiritual — it is a proven formula for lasting success.",
    author: "Maria Santos",
    date: "December 5, 2025",
    category: "Faith",
    imageUrl: ARTICLE_IMG,
    slug: "#",
  },
];
