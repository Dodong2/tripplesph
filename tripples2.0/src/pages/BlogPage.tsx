import { useState, useMemo } from "react";
import CTABanner from "../components/CTABanner";
import { BLOG_POSTS, BLOG_CATEGORIES } from "../data/blog";

// ── Search icon (inline SVG, avoids broken Figma asset) ──────────────────────
function SearchIcon() {
  return (
    <svg viewBox="0 0 36 36" fill="none" className="w-5 h-5 text-white" aria-hidden="true">
      <circle cx="15" cy="15" r="10" stroke="white" strokeWidth="2.5" />
      <line x1="22" y1="22" x2="33" y2="33" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// ── Calendar icon ─────────────────────────────────────────────────────────────
function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 flex-shrink-0" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="#6d6d6d" strokeWidth="1.5" />
      <line x1="3" y1="10" x2="21" y2="10" stroke="#6d6d6d" strokeWidth="1.5" />
      <line x1="8" y1="3" x2="8" y2="7" stroke="#6d6d6d" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16" y1="3" x2="16" y2="7" stroke="#6d6d6d" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// ── Person icon ───────────────────────────────────────────────────────────────
function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 flex-shrink-0" aria-hidden="true">
      <circle cx="12" cy="8" r="4" stroke="#6d6d6d" strokeWidth="1.5" />
      <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" stroke="#6d6d6d" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// ── Blog Hero ─────────────────────────────────────────────────────────────────
function BlogHero({
  search,
  onSearch,
}: {
  search: string;
  onSearch: (v: string) => void;
}) {
  return (
    <section className="bg-[#197996] pt-14 pb-0 px-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Title + description */}
        <h1 className="font-['Poppins'] font-semibold text-[40px] sm:text-[56px] md:text-[64px] text-white tracking-[0.08em] leading-tight mb-4">
          FeatuRIPPLES
        </h1>
        <p className="font-['Inter'] text-lg sm:text-xl md:text-[28px] text-white max-w-3xl leading-relaxed mb-8">
          The blog where TRipples features the people and their past experiences and present realities, which shape their future.
        </p>

        {/* Search bar */}
        <div className="flex items-center w-full max-w-[461px] h-[55px] bg-white border-[3px] border-[#0295ae] rounded-full overflow-hidden">
          <div className="flex-shrink-0 w-[85px] h-full bg-[#0295ae] flex items-center justify-center">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Search articles…"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            className="flex-1 px-4 font-['Inter'] text-base text-gray-700 outline-none bg-transparent placeholder-gray-400"
          />
        </div>
      </div>
    </section>
  );
}

// ── Category Filter ───────────────────────────────────────────────────────────
function CategoryFilter({
  active,
  onChange,
}: {
  active: string;
  onChange: (c: string) => void;
}) {
  return (
    <div className="bg-[#197996] px-6 pt-5 pb-0">
      <div className="max-w-[1400px] mx-auto flex flex-wrap gap-3 pb-6">
        {BLOG_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={`h-[44px] px-6 rounded-full font-['Inter'] text-base font-medium transition-colors cursor-pointer ${
              active === cat
                ? "bg-[#06b6d4] text-white border-none"
                : "bg-transparent border border-[#06b6d4] text-white hover:bg-[#06b6d4]/20"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Blog Card ─────────────────────────────────────────────────────────────────
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  imageUrl: string;
  slug: string;
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="bg-white rounded-[18px] shadow-[0px_4px_10.8px_4px_rgba(0,0,0,0.25)] overflow-hidden flex flex-col">
      {/* Image */}
      <div className="h-[221px] flex-shrink-0 overflow-hidden rounded-t-[18px]">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 pb-4 gap-2">
        <h2 className="font-['Poppins'] font-medium text-xl text-black leading-snug">
          {post.title}
        </h2>
        <p className="font-['Inter'] text-base text-[#6d6d6d] leading-relaxed flex-1">
          {post.excerpt}
        </p>

        {/* Meta row */}
        <div className="flex items-center justify-between mt-1 flex-wrap gap-2">
          <div className="flex items-center gap-1.5">
            <PersonIcon />
            <span className="font-['Inter'] text-sm text-[#6d6d6d]">{post.author}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CalendarIcon />
            <span className="font-['Inter'] text-sm text-[#6d6d6d]">{post.date}</span>
          </div>
        </div>

        {/* Read More button */}
        <a
          href={post.slug}
          className="mt-3 flex items-center justify-center h-[49px] rounded-[8px] font-['Poppins'] font-medium text-lg text-white hover:opacity-90 transition-opacity"
          style={{
            background: "linear-gradient(173.83deg, #07d5ee 0%, #00a6ba 100%)",
          }}
        >
          Read More
        </a>
      </div>
    </article>
  );
}

// ── Main BlogPage ─────────────────────────────────────────────────────────────
export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    return BLOG_POSTS.filter((p) => {
      const matchesCat =
        activeCategory === "All" || p.category === activeCategory;
      const matchesSearch =
        search.trim() === "" ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(search.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [search, activeCategory]);

  return (
    <main>
      {/* Hero with search */}
      <BlogHero search={search} onSearch={setSearch} />

      {/* Category tabs — still inside the teal bg */}
      <CategoryFilter active={activeCategory} onChange={setActiveCategory} />

      {/* Cards grid on off-white bg */}
      <section className="bg-[#f5f3ef] px-6 py-12">
        <div className="max-w-[1400px] mx-auto">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-center font-['Inter'] text-lg text-gray-500 py-20">
              No articles found. Try a different search or category.
            </p>
          )}
        </div>
      </section>

      <CTABanner />
    </main>
  );
}
