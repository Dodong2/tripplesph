import type { ReactNode } from "react";
import CTABanner from "../components/CTABanner";
import { ASSETS } from "../data";
import { PILLARS, AWARDS, BENEFIT_GROUPS } from "../data/about";
import { STORY_CARD_1 } from "../data/about";

// ── About Hero ────────────────────────────────────────────────────────────────
function AboutHero() {
  return (
    <section
      className="relative flex flex-col items-center justify-center text-center px-6 pt-12 pb-16 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #b8dce8 0%, #5fb3c8 45%, #2a7f99 100%)" }}
    >
      {/* ── Top text block ── */}
      <div className="relative z-10 max-w-4xl w-full mx-auto">

        {/* Small teal subtitle */}
        <p className="font-['Poppins'] font-semibold text-sm sm:text-base text-white/80 mb-1 tracking-wide">
          The Philippines' FIRST and BIGGEST
        </p>

        {/* Bold title */}
        <h2 className="font-['Poppins'] font-bold text-1xl sm:text-3xl md:text-[30px] text-white leading-tight mb-2">
          Online Community for Promoting Campaigns
        </h2>

        {/* Second subtitle */}
        <p className="font-['Inter'] text-sm sm:text-base text-white/80 mb-8">
          It is where people who care for Man, Money and Mother Earth Meet
        </p>

        {/* WHO WE ARE */}
        <h1 className="font-['Poppins'] font-bold text-[42px] sm:text-[80px] md:text-[100px] text-white leading-none mb-8">
          WHO WE ARE
        </h1>

        {/* White card — paragraph + blockquote */}
        <div className="bg-white rounded-2xl px-5 sm:px-10 py-5 text-center shadow-sm max-w-4xl mx-auto">
          <p className="font-['Inter'] text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
            TRipples is God's business. We believe and live by the fact that everything came and
            comes from Him, and so, we remember Him and dedicate this business to Him.
          </p>
          <blockquote className="font-['Inter'] text-sm sm:text-base text-gray-600 italic leading-relaxed">
            "You shall remember the LORD your God, for it is he who gives you power to get wealth."
            <br />– Deuteronomy 8:18a
          </blockquote>
        </div>

      </div>
    </section>
  );
}
// ── Reusable story card ───────────────────────────────────────────────────────
interface StoryCardProps {
  children: ReactNode
    className?: string 
}
function StoryCard({ children, className }: StoryCardProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}


// ── How We Started ────────────────────────────────────────────────────────────
function HowWeStarted() {
  return (
    <section
      className="px-6 py-16"
      style={{ background: "linear-gradient(160deg, #b8dce8 0%, #5fb3c8 45%, #2a7f99 100%)" }}
    >
     <div className="max-w-[900px] mx-auto flex flex-col lg:flex-row lg:justify-between items-start gap-10 lg:gap-80px">

  {/* ── Left col: title + photo ── */}
<div className="flex-shrink-0 w-full lg:w-[260px] flex flex-row items-center -gap-10 lg:flex-col lg:items-start lg:gap-6">
  <h2 className="font-['Poppins'] font-bold text-[52px] sm:text-[40px] lg:text-[64px] text-white leading-[1.05]">
    HOW WE STARTED
  </h2>
  <img
    src={ASSETS.founderImg}
    alt="Founders"
    className="w-52 h-52 lg:w-60 lg:h-60 rounded-full object-cover border-4 border-white/50 flex-shrink-0"
  />
</div>

  {/* ── Right col: 3 separate cards ── */}
  {/* ✅ Tinanggal flex-1, fixed width na para gumana ang justify-between */}
  <div className="w-full lg:w-[560px] flex flex-col gap-4">
    {/* Card 1 */}
    <StoryCard className="bg-white border border-[#4fb8cc]/40 rounded-2xl p-4 flex flex-col gap-3">
      <p className="font-['Inter'] text-sm md:text-base text-gray-800 leading-relaxed">
        TRipples is the brainchild of Mai Ryza Sison, who started the company back in 2017.
      </p>
      <p className="font-['Inter'] text-sm md:text-base text-gray-800 leading-relaxed">
        <span className="font-semibold text-[#0891b2]">{STORY_CARD_1[0].label}: </span>
        {STORY_CARD_1[0].text}
      </p>
    </StoryCard>

    {/* Card 2 */}
    <StoryCard className="bg-white border border-[#4fb8cc]/40 rounded-2xl p-4 flex flex-col gap-3">
      {STORY_CARD_1.slice(1).map((item) => (
        <p key={item.label} className="font-['Inter'] text-sm md:text-base text-gray-800 leading-relaxed">
          <span className="font-semibold text-[#0891b2]">{item.label}: </span>
          {item.text}
        </p>
      ))}
    </StoryCard>

    {/* Card 3 */}
    <StoryCard className="bg-[rgba(0,117,149,1)] border border-[#4fb8cc]/40 rounded-2xl p-4 flex flex-col gap-3">
      <p className="font-['Inter'] text-white text-sm md:text-base leading-relaxed">
        Today, TRipples is the first and only full-stack digital marketing company in the Philippines.{" "}
        <strong className="text-white">
          "The first and the largest online community in the Philippines for spreading campaigns"
        </strong>{" "}
        is one of its taglines because it is the pioneer in Cost per Click (CPC) acquisition
        technology that drives traffic to a particular landing URL using various social media channels.
      </p>
    </StoryCard>
  </div>

</div>
    </section>
  );
}

// ── Awards ────────────────────────────────────────────────────────────────────
function Awards() {
  return (
    <section className="bg-[#187797] py-16 px-6">
      <h2 className="font-['Poppins'] font-bold text-3xl md:text-[60px] text-white text-center mb-6 leading-tight">
        AWARDS & RECOGNITION
      </h2>
      <p className="font-['Inter'] text-center text-lg md:text-xl text-white mb-12 max-w-3xl mx-auto">
        Our dedication to innovation and exceptional results has earned us prestigious recognition from leading organizations across Asia and beyond.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 max-w-[1400px] mx-auto">

        {/* ── Reusable image frame ── */}
        {/* Used inline below per card */}

        {/* Card 1 — full width mobile | col-span-3 desktop | text LEFT, image RIGHT */}
        {/* Card 1 */}
        <div
          className="md:col-span-3 md:row-span-2 rounded-[24px] overflow-hidden border border-[#4691a7] relative
                  flex flex-col md:flex-row items-stretch"
          style={{ background: "linear-gradient(to right, #2f788e, #398ca4)" }}
        >
          <div className="absolute w-[279px] h-[278px] top-[-105px] right-[-50px] opacity-30 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, #5196ac 0%, transparent 70%)" }}
          />

          {/* Image — top on mobile, right on desktop */}
          {/* ✅ Same padding as text col: p-5 md:p-6 */}
          <div className="order-first md:order-last relative flex-shrink-0 flex items-center justify-center p-5 md:p-5 md:w-[310px]">
            <div
              className="relative rounded-[17px] flex items-center justify-center w-full md:w-[300px] h-[180px] md:h-[200px]"
              style={{ background: "rgba(81,150,172,0.25)", border: "1px solid #4aabc7" }}
            >
              <img
                src={AWARDS[0].imageUrl}
                alt={AWARDS[0].title}
                className="object-contain rounded-[8px] max-w-[90%] max-h-[90%]"
              />
            </div>
          </div>

          {/* Text — bottom on mobile, left on desktop */}
          {/* ✅ Same padding: p-5 md:p-6 */}
          <div className="relative z-10 flex flex-col justify-center p-5 md:p-6 flex-1 min-w-0">
            <h3 className="font-['Poppins'] font-semibold text-xl md:text-[30px] text-white leading-tight mb-3 md:mb-4">
              {AWARDS[0].title}
            </h3>
            <div className="flex items-center gap-3 mb-4 md:mb-3">
              <div className="w-[3px] h-[25px] md:h-[36px] bg-[#74bbcb] rounded-full flex-shrink-0" />
              {AWARDS[0].badge && (
                <p className="font-['Poppins'] font-medium text-base md:text-[20px] text-[#74bbcb]">
                  {AWARDS[0].badge}
                </p>
              )}
            </div>
            <p className="font-['Inter'] text-sm md:text-[20px] text-white leading-relaxed mb-5">
              {AWARDS[0].description}
            </p>
            {AWARDS[0].category && (
              <div className="flex items-center gap-2">
                <div className="w-[10px] h-[10px] md:w-[13px] md:h-[13px] rounded-full bg-white/60 flex-shrink-0" />
                <p className="font-['Inter'] text-sm md:text-[16px] text-white">{AWARDS[0].category}</p>
              </div>
            )}
          </div>
        </div>

        {/* Card 2 — col-span-2 desktop */}
        <div
          className="md:col-span-2 md:row-span-2 md:col-start-4 rounded-3xl overflow-hidden border border-[#4691a7]
            flex flex-col items-stretch"
          style={{ background: "linear-gradient(135deg, #2f788e 0%, #398ca4 100%)" }}
        >
          <div className="flex-shrink-0 flex items-center justify-center p-4">
            <div className="relative rounded-[17px] flex items-center justify-center w-full h-[180px] md:h-[200px]"
              style={{ background: "rgba(81,150,172,0.25)", border: "1px solid #4aabc7" }}
            >
              <img src={AWARDS[1].imageUrl} alt={AWARDS[1].title}
                className="object-contain rounded-[8px] max-w-[90%] max-h-[90%]" />
            </div>
          </div>
          <div className="p-4 flex flex-col justify-center flex-1 min-w-0">
            {AWARDS[1].badge && (
              <p className="font-['Poppins'] font-medium text-sm text-[#74bbcb] mb-1">{AWARDS[1].badge}</p>
            )}
            <h3 className="font-['Poppins'] font-semibold text-base md:text-lg text-white mb-2 leading-tight">
              {AWARDS[1].title}
            </h3>
            <p className="font-['Inter'] text-xs md:text-sm text-white leading-relaxed">{AWARDS[1].description}</p>
          </div>
        </div>

        {/* Card 3 — col-span-2 row-start-3 desktop */}
        <div
          className="md:col-span-2 md:row-span-2 md:col-start-1 rounded-3xl overflow-hidden border border-[#4691a7]
            flex flex-col items-stretch"
          style={{ background: "linear-gradient(135deg, #2f788e 0%, #398ca4 100%)" }}
        >
          <div className="flex-shrink-0 flex items-center justify-center p-4">
            <div className="relative rounded-[17px] flex items-center justify-center w-full h-[180px] md:h-[200px]"
              style={{ background: "rgba(81,150,172,0.25)", border: "1px solid #4aabc7" }}
            >
              <img src={AWARDS[2].imageUrl} alt={AWARDS[2].title}
                className="object-contain rounded-[8px] max-w-[90%] max-h-[90%]" />
            </div>
          </div>
          <div className="p-4 flex flex-col justify-center flex-1 min-w-0">
            {AWARDS[2].badge && (
              <p className="font-['Poppins'] font-medium text-sm text-[#74bbcb] mb-1">{AWARDS[2].badge}</p>
            )}
            <h3 className="font-['Poppins'] font-semibold text-base md:text-lg text-white mb-2 leading-tight">
              {AWARDS[2].title}
            </h3>
            <p className="font-['Inter'] text-xs md:text-sm text-white leading-relaxed">{AWARDS[2].description}</p>
          </div>
        </div>

        {/* Card 4 — col-span-3 col-start-3 row-start-3 desktop | image LEFT, text RIGHT */}
        <div
          className="md:col-span-3 md:row-span-2 md:col-start-3 rounded-[24px] overflow-hidden border border-[#4691a7] relative
            flex flex-col md:flex-row items-stretch"
          style={{ background: "linear-gradient(to right, #2f788e, #398ca4)" }}
        >
          <div className="absolute w-[279px] h-[278px] top-[-105px] right-[-50px] opacity-30 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, #5196ac 0%, transparent 70%)" }}
          />

          {/* Image — top on mobile, left on desktop */}
          <div className="relative flex-shrink-0 flex items-center justify-center p-4 md:p-6 md:w-[310px]">
            <div className="relative rounded-[17px] flex items-center justify-center w-full md:w-[300px] h-[180px] md:h-[200px]"
              style={{ background: "rgba(81,150,172,0.25)", border: "1px solid #4aabc7" }}
            >
              <img src={AWARDS[3].imageUrl} alt={AWARDS[3].title}
                className="object-contain rounded-[8px] max-w-[90%] max-h-[90%]" />
            </div>
          </div>

          {/* Text */}
          <div className="relative z-10 flex flex-col justify-center p-5 md:p-[10px] flex-1 min-w-0">
            <h3 className="font-['Poppins'] font-semibold text-xl md:text-[30px] text-white leading-tight mb-3 md:mb-4 md:w-[298px]">
              {AWARDS[3].title}
            </h3>
            <div className="flex items-center gap-3 mb-4 md:mb-3">
              <div className="w-[3px] h-[25px] md:h-[36px] bg-[#74bbcb] rounded-full flex-shrink-0" />
              {AWARDS[3].badge && (
                <p className="font-['Poppins'] font-medium text-base md:text-[20px] text-[#74bbcb]">
                  {AWARDS[3].badge}
                </p>
              )}
            </div>
            <p className="font-['Inter'] text-sm md:text-[20px] text-white leading-relaxed mb-5 md:mb-5">
              {AWARDS[3].description}
            </p>
            {AWARDS[3].category && (
              <div className="flex items-center gap-2">
                <div className="w-[10px] h-[10px] md:w-[13px] md:h-[13px] rounded-full bg-white/60 flex-shrink-0" />
                <p className="font-['Inter'] text-sm md:text-[16px] text-white">{AWARDS[3].category}</p>
              </div>
            )}
          </div>
        </div>

        {/* Card 5 — col-span-3 col-start-2 row-start-5 desktop | image LEFT, text RIGHT */}
        <div
          className="md:col-span-3 md:row-span-2 md:col-start-2 md:row-start-5 rounded-3xl overflow-hidden border border-[#4691a7]
            flex flex-col md:flex-row items-stretch"
          style={{ background: "linear-gradient(135deg, #2f788e 0%, #398ca4 100%)" }}
        >
          {/* Image — top on mobile, left on desktop */}
          <div className="relative flex-shrink-0 flex items-center justify-center p-4 md:p-6 md:w-[310px]">
            <div className="relative rounded-[17px] flex items-center justify-center w-full md:w-[300px] h-[180px] md:h-[200px]"
              style={{ background: "rgba(81,150,172,0.25)", border: "1px solid #4aabc7" }}
            >
              <img src={AWARDS[4].imageUrl} alt={AWARDS[4].title}
                className="object-contain rounded-[8px] max-w-[90%] max-h-[90%]" />
            </div>
          </div>

          {/* Text */}
          <div className="relative z-10 flex flex-col justify-center p-5 md:p-[10px] flex-1 min-w-0">
            <h3 className="font-['Poppins'] font-semibold text-xl md:text-[30px] text-white leading-tight mb-3 md:mb-4 md:w-[298px]">
              {AWARDS[4].title}
            </h3>
            <div className="flex items-center gap-3 mb-4 md:mb-3">
              <div className="w-[3px] h-[25px] md:h-[36px] bg-[#74bbcb] rounded-full flex-shrink-0" />
              {AWARDS[4].badge && (
                <p className="font-['Poppins'] font-medium text-base md:text-[20px] text-[#74bbcb]">
                  {AWARDS[4].badge}
                </p>
              )}
            </div>
            <p className="font-['Inter'] text-sm md:text-[20px] text-white leading-relaxed mb-5 md:mb-5">
              {AWARDS[4].description}
            </p>
            {AWARDS[4].category && (
              <div className="flex items-center gap-2">
                <div className="w-[10px] h-[10px] md:w-[13px] md:h-[13px] rounded-full bg-white/60 flex-shrink-0" />
                <p className="font-['Inter'] text-sm md:text-[16px] text-white">{AWARDS[4].category}</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}


// ── How We Strive (Triple Bottom Line) ───────────────────────────────────────
function HowWeStrive() {
  return (
    <section className="bg-[#187797] py-16 px-6">
      <h2 className="font-['Poppins'] font-bold text-3xl md:text-[60px] text-white text-center mb-6 leading-tight">
        HOW WE STRIVE
      </h2>
      <p className="font-['Inter'] text-center text-base md:text-xl text-white mb-12 max-w-4xl mx-auto">
        Our prefix 'TR' came from the{" "}
        <strong className="text-[#007595] font-semibold">Triple Bottom Line concept</strong>, an approach that focuses on actions geared towards sustainable development.
      </p>
      <div className="flex flex-wrap justify-center gap-6 max-w-[1400px] mx-auto">
        {PILLARS.map((p) => {
          const Icon = p.icon
          return (
            <article key={p.id} className="bg-[#f2fcfd] border border-[#a2f4fd] rounded-3xl p-8 flex-1 min-w-[240px] max-w-[440px] text-center">
              <div
                className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center"
                style={{ background: "linear-gradient(143deg, #5fc4dc 14%, #197896 50%, #197896 91%)" }}
              >
                <span className="text-4xl text-white font-bold">
                  <Icon size={30} />
                </span>
              </div>
              <h3 className="font-['Inter'] font-semibold text-2xl md:text-[34px] text-[#007595] mb-1">{p.title}</h3>
              <p className="font-['Inter'] font-medium text-lg md:text-2xl text-black mb-1">{p.subtitle}</p>
              <p className="font-['Inter'] text-sm md:text-base text-black leading-relaxed">{p.description}</p>
            </article>
          )
        })}
      </div>
    </section>
  );
}

// ── What We Dream ─────────────────────────────────────────────────────────────
function WhatWeDream() {
  return (
    <section className="bg-[#187797] py-16 px-6 text-center">
      <h2 className="font-['Poppins'] font-bold text-3xl md:text-[60px] text-white mb-8 leading-tight">WHAT WE DREAM</h2>
      <div className="max-w-[1300px] mx-auto">
        <img src={ASSETS.teamPhoto} alt="TRipplesPH Team" className="w-full max-w-3xl mx-auto h-auto object-cover rounded-3xl mb-8" />
        <p className="font-['Inter'] font-semibold text-base md:text-xl text-[#007595] leading-relaxed mb-4 max-w-4xl mx-auto">
          TRipples aims to become the world's most influential digital marketing company by constantly creating positive ripple effects for humanity, businesses, and the society.
        </p>
        <p className="font-['Inter'] text-base md:text-xl text-white leading-relaxed max-w-4xl mx-auto">
          We believe to "first seek the Kingdom of God" [Matthew 6:33]. Thus, we don't dream of becoming big alone.{" "}
          <strong>We grow together. Most importantly, we extend to our community by spreading the Word of God and His love.</strong>
        </p>
      </div>
    </section>
  );
}

// ── Why We Exist ─────────────────────────────────────────────────────────────
function WhyWeExist() {
  const items = [
    { id: "we1", title: "Humanity", desc: "We exist for humanity. We compensate our online community with cash and rewardable gift items, vouchers, and points." },
    { id: "we2", title: "Brands and SMEs", desc: "We exist for brands and SMEs. Understanding what is in their heart, we design, create, and deliver quality services." },
    { id: "we3", title: "Non-profit organizations", desc: "We exist for non-profit organizations. We help them promote their advocacies, and it is FREE!" },
  ];
  return (
    <section className="bg-[#187797] py-16 px-6 text-center">
      <h2 className="font-['Poppins'] font-bold text-3xl md:text-[60px] text-white mb-6 leading-tight">WHY WE EXIST</h2>
      <p className="font-['Inter'] font-semibold text-base md:text-xl text-white mb-12 max-w-4xl mx-auto leading-relaxed">
        TRipples exists to create positive ripple effects for humanity, businesses, and the society by connecting the hearts of the brands and nonprofits with those of the customers and audiences.
      </p>
      <div className="flex flex-wrap justify-center gap-6 max-w-[1400px] mx-auto">
        {items.map((item) => (
          <article key={item.id} className="bg-[#f2fcfd] border border-[#a2f4fd] rounded-3xl p-8 flex-1 min-w-[240px] max-w-[440px] text-center">
            <h3 className="font-['Inter'] font-semibold text-xl md:text-2xl text-[#007595] mb-4">{item.title}</h3>
            <p className="font-['Inter'] text-sm md:text-base text-black leading-relaxed">{item.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

// ── Benefits ─────────────────────────────────────────────────────────────────
function Benefits() {
  return (
    <section className="bg-[#187797] py-16 px-6">
      <h2 className="font-['Poppins'] font-bold text-3xl md:text-[60px] text-white text-center mb-4 leading-tight">WHAT WE OFFER</h2>
      <p className="font-['Inter'] font-semibold text-center text-base md:text-xl text-white mb-12">
        Join our team and experience a workplace that values your growth, well-being, and success
      </p>
      <div className="max-w-[1400px] mx-auto flex flex-col gap-12">
        {BENEFIT_GROUPS.map((group) => (
          <div key={group.id}>
            <h3 className="font-['Poppins'] font-bold text-2xl md:text-[36px] text-white mb-6">{group.groupTitle}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.items.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#308da7] border border-[#74bbcb] rounded-3xl p-5 flex items-start gap-4"
                >
                  <div
                    className="w-[67px] h-[67px] flex-shrink-0 rounded-xl flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #6bb4c5 0%, #49a7af 50%, #28809c 100%)" }}
                  />
                  <div>
                    <h4 className="font-['Poppins'] font-bold text-base md:text-xl text-white leading-tight mb-1">{item.title}</h4>
                    <p className="font-['Inter'] text-sm text-white leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <HowWeStarted />
      <Awards />
      <HowWeStrive />
      <WhatWeDream />
      <WhyWeExist />
      <Benefits />
      <CTABanner />
    </main>
  );
}