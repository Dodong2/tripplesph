import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RippleBackgroundWhite } from "../components/RippleBackgroundWhite";
import {
  STAT_CARDS,
  IMPACT_STATS,
  WHY_US_CARDS,
  PROCESS_STEPS,
  SERVICE_SNIPPETS,
  TESTIMONIALS,
  CLIENT_LOGOS,
  ARTICLES,
  FAQS,
} from "../data/home";
import { LogoCarousel } from "../components/LogoCarousel";
import { MoveRight } from "lucide-react";

// ── Hero ─────────────────────────────────────────────────────────────────────
// The Numbers section that follows has bg-gradient starting from #77bbcb.
// We pass a close match as nextSectionBg so the wave blends in.
function Hero() {
  return (
    <RippleBackgroundWhite
      rippleOriginY={70}
      rippleCount={5}
      animationDuration={5}
      nextSectionBg="#77bbcb"
    >
      <section className="min-h-[500px] flex items-center justify-center text-center px-6 pb-20 pt-16 w-full">
        <div className="max-w-2xl w-full mx-auto">
          <h1 className="font-['Poppins'] font-bold text-[] sm:text-3xl md:text-[30px] text-white leading-tight mb-4">
            Philippines' Digital Marketing Company that Creates Positive RIPPLE
            Effects.
          </h1>
          <p className="font-['Inter'] text-sm sm:text-base md:text-lg text-white max-w-md mx-auto mb-10 leading-relaxed">
            It is where the HEARTS of Brands and other Organizations are
            CONNECTED with their Target Audiences.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/services"
              className="bg-[#fffafa] rounded-full h-[44px] px-7 flex items-center font-['Nunito'] font-medium text-base text-[#0891b2] whitespace-nowrap hover:opacity-90 transition-opacity"
            >
              Explore Services →
            </Link>
            <Link to="/contacts"
              className="border border-white rounded-full h-[44px] px-7 flex items-center font-['Nunito'] font-medium text-base text-white hover:bg-white/10 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </RippleBackgroundWhite>
  );
}

// ── Numbers ──────────────────────────────────────────────────────────────────
function Numbers() {
  return (
    <section className="bg-gradient-to-r from-[#77bbcb] via-[#f4feff] to-[#76baca] py-16 px-6 text-center">
      <span className="inline-flex items-center h-9 px-3.5 rounded-full border border-[#a3f4fd] bg-gradient-to-r from-[#ccfbf1] via-[#cffafe] to-[#a5f3fc] font-['Poppins'] font-bold text-[11px] text-[#0088bf] mb-4">
        Proven Results
      </span>
      <p className="font-['Inter'] text-lg mb-3 text-black">
        Real growth from real campaigns. Here's what we achieved in 2024.
      </p>
      <h2 className="font-['Poppins'] font-bold text-[28px] sm:text-[44px] text-black mb-10 leading-tight">
        Let the Numbers Talk
      </h2>
      <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
        {STAT_CARDS.map((c) => (
          <div
            key={c.id}
            className="bg-white border-2 border-[#197996] rounded-[22px] shadow-md p-7 flex-1 min-w-[240px] max-w-[400px]"
          >
            <p className="font-['Inter'] text-base text-[#666c7d] uppercase mb-1">
              {c.label}
            </p>
            <p className="font-['Poppins'] font-semibold text-[64px] sm:text-[80px] text-[#009692] leading-none">
              {c.value}
            </p>
            <p className="font-['Inter'] text-base text-[#666c7d] mt-1">
              {c.sub}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Impact ───────────────────────────────────────────────────────────────────
function Impact() {
  return (
    <section className="bg-gradient-to-r from-[#77bbcb] via-[#f4feff] to-[#76baca] py-16 px-6 text-center">
      <h2 className="font-['Poppins'] font-bold text-[28px] sm:text-[44px] text-black mb-10 leading-tight">
        Our Impact... in Numbers
      </h2>
      <div className="flex flex-wrap justify-center gap-4 max-w-[1400px] mx-auto mb-10">
        {IMPACT_STATS.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.id}
              className="bg-white border-2 border-[#197996] rounded-xl shadow-md p-6 flex-1 min-w-[160px] max-w-[240px] text-center"
            >
              <div className="w-12 h-12 rounded-[10px] bg-gradient-to-br from-[#0d9488] via-[#0891b2] to-[#06b6d4] mx-auto mb-2.5 flex items-center justify-center text-xl">
                <Icon className="w-6 h-6 text-white" size={30} />
              </div>
              <p className="font-['Poppins'] font-bold text-3xl text-black">
                {s.value}
              </p>
              <p className="font-['Inter'] text-sm text-black mt-1">
                {s.label}
              </p>
            </div>
          );
        })}
      </div>
      <a
        href="#"
        className="inline-flex items-center h-[42px] px-6 border border-[#0092b8] rounded-full font-['Poppins'] font-bold text-base text-[#0092b8] hover:bg-[#0092b8]/5 transition-colors gap-5"
      >
        <span>Get Results Like This</span> <MoveRight />
      </a>
    </section>
  );
}

// ── WhyUs ────────────────────────────────────────────────────────────────────
function WhyUs() {
  return (
    <section
      className="py-16 px-6 text-center"
      style={{
        background:
          "linear-gradient(92.44deg, #74bbcb 0%, #3e9db4 50%, #197896 100%)",
      }}
    >
      <span className="inline-flex items-center h-9 px-3.5 rounded-full border border-[#a3f4fd] bg-white font-['Poppins'] font-bold text-[11px] text-[#0088bf] mb-4">
        Our Advantage
      </span>
      <h2 className="font-['Poppins'] font-bold text-[28px] sm:text-[44px] text-white leading-tight mb-3">
        Why Businesses Choose Us
      </h2>
      <p className="font-['Inter'] text-lg md:text-xl text-white mb-10 leading-relaxed">
        We're not another agency making promises. Here's what actually sets us
        apart.
      </p>
      <div className="flex flex-wrap justify-center gap-6 max-w-[1400px] mx-auto">
        {WHY_US_CARDS.map((c) => {
          const Icon = c.icon;
          return (
            <article
              key={c.id}
              className="bg-white border-2 border-[#53eafd] rounded-xl shadow-md p-8 flex-1 min-w-[220px] max-w-[320px] text-left"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#0d9488] via-[#0891b2] to-[#06b6d4] rounded-[10px] mb-3.5 flex items-center justify-center text-2xl">
                <Icon className="text-white" size={30} />
              </div>
              <h3 className="font-['Poppins'] font-semibold text-base mb-2">
                {c.title}
              </h3>
              <p className="font-['Inter'] text-sm leading-relaxed text-gray-700">
                {c.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

// ── Process ──────────────────────────────────────────────────────────────────
function Process() {
  return (
    <section className=" bg-gradient-to-r from-[#77bbcb] via-[#f4feff] to-[#76baca] py-16 px-6 text-center">
      <span className="inline-flex items-center h-9 px-3.5 rounded-full border border-[#a3f4fd] bg-gradient-to-r from-[#ccfbf1] via-[#cffafe] to-[#a5f3fc] font-['Poppins'] font-bold text-[11px] text-[#0088bf] mb-4">
        Our Process
      </span>
      <h2 className="font-['Poppins'] font-bold text-[28px] sm:text-[44px] text-black leading-tight mb-3">
        How We Drive Results
      </h2>
      <p className="font-['Inter'] text-lg md:text-xl text-gray-700 mb-10 leading-relaxed">
        A proven 4-step framework that consistently delivers growth
      </p>
      <div className="flex flex-wrap justify-center gap-6 max-w-[1400px] mx-auto">
        {PROCESS_STEPS.map((s) => {
          const Icon = s.icon;
          return (
            <article
              key={s.id}
              className="relative bg-white border-2 border-[#53eafd] rounded-xl shadow-md p-8 flex-1 min-w-[220px] max-w-[300px] text-left"
            >
              <div className="absolute -top-[14px] -left-4 w-10 h-10 rounded-full bg-gradient-to-br from-[#0d9488] to-[#06b6d4] flex items-center justify-center font-['Poppins'] font-semibold text-sm text-white">
                {s.number}
              </div>

              <div className="mt-5">
                <div className="w-12 h-12 bg-gradient-to-r from-[#ccfbf1] via-[#cffafe] to-[#a5f3fc] rounded-[10px] mb-3.5 flex items-center justify-center">
                  <Icon className="text-[#0092B8]" size={30} />
                </div>
                <h3 className="font-['Poppins'] font-semibold text-base mb-2">
                  {s.title}
                </h3>
                <p className="font-['Inter'] text-sm leading-relaxed text-gray-700">
                  {s.description}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

// ── ServicesSnippet ──────────────────────────────────────────────────────────
function ServicesSnippet() {
  const navigate = useNavigate();
  return (
    <section className="bg-gradient-to-r from-[#77bbcb] via-[#f4feff] to-[#76baca] py-16 px-6 text-center">
      <span className="inline-flex items-center h-9 px-3.5 rounded-full border border-[#a3f4fd] bg-gradient-to-r from-[#ccfbf1] via-[#cffafe] to-[#a5f3fc] font-['Poppins'] font-bold text-[11px] text-[#0088bf] mb-4">
        Our Services
      </span>
      <h2 className="font-['Poppins'] font-bold text-[28px] sm:text-[44px] text-black leading-tight mb-3">
        What We Specialize In
      </h2>
      <p className="font-['Inter'] text-lg md:text-xl text-gray-700 mb-10 leading-relaxed">
        Three core services that work together to grow your business
      </p>
      <div className="flex flex-wrap justify-center gap-6 max-w-[1400px] mx-auto mb-10">
        {SERVICE_SNIPPETS.map((c) => {
          const Icon = c.icon;
          return (
            <article
              key={c.id}
              className="bg-white border-2 border-[#53eafd] rounded-xl shadow-md p-9 flex-1 min-w-[280px] max-w-[440px] text-left"
            >
              <div
                className="w-12 h-12 rounded-lg mb-5 flex items-center justify-center text-3xl"
                style={{ background: c.color }}
              >
                <Icon className="text-white" size={30} />
              </div>
              <h3 className="font-['Poppins'] font-semibold text-2xl md:text-[28px] mb-2.5">
                {c.title}
              </h3>
              <p className="font-['Inter'] text-base md:text-lg leading-snug mb-4 text-gray-700">
                {c.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {c.tags.map((tg) => (
                  <span
                    key={tg}
                    className="bg-[#ecfeff] border border-[#53eafd] rounded-full px-2.5 py-0.5 text-xs text-[#0092b8]"
                  >
                    {tg}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
      <button
        onClick={() => navigate("/services")}
        className="inline-flex items-center h-[42px] px-7 border-2 border-[#0092b8] rounded-[28px] bg-transparent cursor-pointer font-['Poppins'] font-medium text-base text-[#0092b8] hover:bg-[#0092b8]/5 transition-colors gap-5"
      >
        <span>View All Services</span> <MoveRight />
      </button>
    </section>
  );
}

// ── Testimonials ─────────────────────────────────────────────────────────────
function Testimonials() {
  return (
    <section
      className="py-16 px-6 text-center"
      style={{
        background: "linear-gradient(92.44deg, #74bbcb 0%, #3e9db4 50%, #197896 100%)",
      }}
    >
      <span className="inline-flex items-center h-9 px-3.5 rounded-full border border-[#a3f4fd] bg-white font-['Poppins'] font-bold text-[11px] text-[#0088bf] mb-4">
        Client Success Story
      </span>
      <h2 className="font-['Poppins'] font-bold text-[28px] sm:text-[44px] text-white leading-tight mb-3">
        What Our Clients Say
      </h2>
      <p className="font-['Inter'] text-lg md:text-xl text-white mb-12 leading-relaxed">
        Real testimonials from businesses that achieved real growth
      </p>

      <div className="flex flex-wrap justify-center gap-7 max-w-[1400px] mx-auto">
        {TESTIMONIALS.map((t) => (
          <div key={t.id} className="relative flex-1 min-w-[220px] max-w-[290px] pt-12">
            {/* Avatar overlapping top */}
            <img
              src={t.avatarUrl}
              alt={t.organization}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[88px] h-[88px] rounded-full object-cover border-[3px] border-white shadow-md z-10"
            />
            {/* Card */}
            <div className="bg-white border-2 border-[#53eafd] rounded-[28px] pt-14 pb-6 px-[22px] flex flex-col gap-1.5 text-center h-full">
              <p className="font-['Inter'] text-[12.5px] text-gray-700 leading-[1.55]">{t.intro}</p>
              <p className="font-['Poppins'] font-bold text-[14px] text-black leading-[1.4]">{t.highlight}</p>
              <p className="font-['Inter'] text-[12.5px] text-gray-700 leading-[1.55]">{t.detail}</p>
              <p className="font-['Inter'] italic text-[12px] text-gray-500 mt-1">{t.source}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
// ── Clients ──────────────────────────────────────────────────────────────────
function Clients() {
  // Split 30 logos into two rows of 15
  const row1 = CLIENT_LOGOS.slice(0, 15);
  const row2 = CLIENT_LOGOS.slice(15, 30);

  return (
    <section
      className="py-14 text-center overflow-hidden"
      style={{
        background:
          "linear-gradient(92.44deg, #74bbcb 0%, #3e9db4 50%, #197896 100%)",
      }}
    >
      <h2 className="font-['Poppins'] font-bold text-[28px] sm:text-[44px] text-white mb-7 leading-tight">
        Our Clients
      </h2>
      <LogoCarousel logos={row1} reverse={false} />
      <LogoCarousel logos={row2} reverse={true} />
    </section>
  );
}

// ── Articles ─────────────────────────────────────────────────────────────────
function Articles() {
  return (
    <section className="bg-gradient-to-r from-[#77bbcb] via-[#f4feff] to-[#76baca] py-16 px-6 text-center">
      <h2 className="font-['Poppins'] font-bold text-[28px] sm:text-[44px] text-black leading-tight mb-3">
        From Our Articles
      </h2>
      <p className="font-['Inter'] text-lg md:text-xl text-gray-700 mb-12 max-w-xl mx-auto leading-relaxed">
        A collection of expert insights and industry trends from our platform.
      </p>
      <div className="flex flex-wrap justify-center gap-6 max-w-[1400px] mx-auto mb-10">
        {ARTICLES.map((a) => (
          <article
            key={a.id}
            className="bg-white border-2 border-[#53eafd] rounded-xl shadow-md flex-1 min-w-[280px] max-w-[440px] overflow-hidden text-left"
          >
            <img
              src={a.imageUrl}
              alt={a.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5 pb-6">
              <h3 className="font-['Inter'] font-semibold text-lg mb-2.5">
                {a.title}
              </h3>
              <p className="font-['Inter'] text-sm leading-relaxed mb-3.5 text-gray-700">
                {a.excerpt}
              </p>
              <a
                href={a.slug}
                className="font-['Inter'] text-base text-[#0092b8]"
              >
                Read More →
              </a>
            </div>
          </article>
        ))}
      </div>
      <Link to="/blog"
        className="inline-flex items-center h-[42px] px-7 border-2 border-[#0092b8] rounded-[28px] font-['Poppins'] font-medium text-base text-[#0092b8] hover:bg-[#0092b8]/5 transition-colors gap-5"
      >
        <span>View All Articles</span> <MoveRight />
      </Link>
    </section>
  );
}

// ── FAQs ─────────────────────────────────────────────────────────────────────
function FAQs() {
  const [openId, setOpenId] = useState<string | null>(null);
  return (
    <section className="bg-[#0d7490] py-16 px-6">
      <div className="max-w-[1300px] mx-auto flex flex-wrap gap-14 items-start">
        <div className="flex-shrink-0 min-w-[180px]">
          <h2
            className="font-['Poppins'] font-bold text-white leading-none"
            style={{
              fontSize: "clamp(64px,10vw,120px)",
              textShadow: "2px 2px 8px rgba(0,0,0,.2)",
            }}
          >
            FAQs
          </h2>
        </div>
        <div className="flex-1 min-w-[280px] flex flex-col gap-2">
          {FAQS.map((faq) => (
            <div key={faq.id}>
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className={`w-full border-2 border-white border-b-0 h-[46px] px-4 flex items-center justify-between font-['Poppins'] font-semibold text-sm text-white cursor-pointer text-left transition-all ${
                  openId === faq.id ? "" : ""
                }`}
              >
                {faq.question}
                <span
                  className="text-lg text-white font-normal transition-transform duration-200"
                  style={{
                    transform: openId === faq.id ? "rotate(45deg)" : "none",
                  }}
                >
                  +
                </span>
              </button>
              <div
                className={`text-white font-semibold border-2 border-t-0 border-white font-['Inter'] text-sm overflow-hidden transition-[max-height,padding] duration-300 ${
                  openId === faq.id
                    ? "max-h-[200px] px-4 py-3.5"
                    : "max-h-0 px-4 py-0"
                }`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Page export ───────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <main>
      <Hero />
      <Clients />
      <Testimonials />
      <Impact />
      <Numbers />
      <WhyUs />
      <ServicesSnippet />
      <Articles />
      <Process />
      <FAQs />
    </main>
  );
}
