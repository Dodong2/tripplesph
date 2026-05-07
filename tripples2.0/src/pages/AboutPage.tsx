import type { ReactNode } from "react";
import CTABanner from "../components/CTABanner";
import { ASSETS } from "../data";
import { PILLARS, AWARDS, BENEFIT_GROUPS } from "../data/about";
import { STORY_CARD_1 } from "../data/about";

// ── About Hero ────────────────────────────────────────────────────────────────
function AboutHero() {
  return (
    <section className="bg-black min-h-[400px] relative flex items-start justify-center overflow-hidden pt-10 pb-12 px-6">
      <div className="text-center max-w-5xl z-10">
        <h2 className="font-['Poppins'] font-bold text-2xl md:text-4xl text-[#287489] mb-6 leading-tight">
          The Philippines' FIRST and BIGGEST Online Community for Promoting Campaigns
        </h2>
        <p className="font-['Inter'] text-lg md:text-2xl text-[#287489] mb-8">
          It is where people who care for Man, Money and Mother Earth Meet
        </p>
        <h1 className="font-['Poppins'] font-bold text-[80px] sm:text-[120px] md:text-[128px] text-white leading-none">
          WHO WE ARE
        </h1>
        <blockquote className="font-['Inter'] text-lg md:text-2xl text-white mt-6 leading-relaxed max-w-3xl mx-auto">
          "You shall remember the LORD your God, for it is he who gives you power to get wealth." – Deuteronomy 8:18a
        </blockquote>
        <p className="font-['Inter'] text-lg md:text-2xl text-white mt-4 leading-relaxed">
          TRipples is God's business. We believe and live by the fact that everything came and comes from Him, and so, we remember Him and dedicate this business to Him.
        </p>
      </div>
    </section>
  );
}

// ── Reusable story card ───────────────────────────────────────────────────────
function StoryCard({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#1e8faa]/40 border border-[#4fb8cc]/40 rounded-2xl p-4 flex flex-col gap-3">
      {children}
    </div>
  );
}


// ── How We Started ────────────────────────────────────────────────────────────
function HowWeStarted() {
  return (
    
    <section className="bg-[#187797] py-16 px-6">
      <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-10 items-start">

        {/* ── Left col: title + photo ── */}
        <div className="flex-shrink-0 w-full lg:w-[280px] flex flex-col gap-6">
          <h2 className="font-['Poppins'] font-bold text-3xl lg:text-[42px] text-white leading-tight text-left">
            HOW WE STARTED
          </h2>
          <img
            src={ASSETS.founderImg}
            alt="Mr. Ryan and Ms. Oliva Soon"
            className="ml-36 lg:ml-0 w-56 h-56 lg:w-64 lg:h-64 rounded-full object-cover border-4 border-white/30 self-start"
          />
        </div>

        {/* ── Right col: cards ── */}
        <div className="flex-1 flex flex-col gap-4">

         

          {/* Card 1 — pioneers + ripple + innovation + growth */}
          <StoryCard>
             {/* Intro text — plain, no card */}
          <p className="font-['Inter'] text-base md:text-lg text-white leading-relaxed">
            TRipples is the brainchild of Mr. Sison Soon, who started the company back in 2017.
          </p>
            {STORY_CARD_1.map((item) => (
              <p key={item.label} className="font-['Inter'] text-sm md:text-base text-white leading-relaxed">
                <span className="font-semibold text-[#7ee8f8]">{item.label}: </span>
                {item.text}
              </p>
            ))}
          </StoryCard>

          {/* Card 2 — "Today" closing paragraph */}
          <StoryCard>
            <p className="font-['Inter'] text-sm md:text-base text-white leading-relaxed">
              Today, TRipples is the first and only full-stack digital marketing company in the Philippines.{" "}
              <strong className="text-white">
                "The first and the largest online community in the Philippines for spreading campaigns"
              </strong>{" "}
              is one of its taglines because of an in-house Cost per Click (CPC) execution technology that
              drives traffic to a particular landing URL using various social media channels.
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
      <div className="flex flex-wrap justify-center gap-6 max-w-[1400px] mx-auto">
        {AWARDS.map((aw) => (
          <div
            key={aw.id}
            className="flex-1 min-w-[280px] max-w-[520px] rounded-3xl overflow-hidden border border-[#4691a7]"
            style={{ background: "linear-gradient(135deg, #2f788e 0%, #398ca4 100%)" }}
          >
            <div className="p-7">
              <img src={aw.imageUrl} alt={aw.title} className="w-full h-44 object-cover rounded-xl mb-5" />
              <h3 className="font-['Poppins'] font-semibold text-2xl md:text-[28px] text-white mb-2 leading-tight">{aw.title}</h3>
              {aw.badge && <p className="font-['Poppins'] font-medium text-base text-[#74bbcb] mb-4">{aw.badge}</p>}
              <p className="font-['Inter'] text-sm md:text-base text-white leading-relaxed mb-2">{aw.description}</p>
              {aw.category && <p className="font-['Inter'] text-sm text-white/80">{aw.category}</p>}
            </div>
          </div>
        ))}
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
                <Icon size={30}/>
              </span>
            </div>
            <h3 className="font-['Inter'] font-semibold text-2xl md:text-[34px] text-[#007595] mb-1">{p.title}</h3>
            <p className="font-['Inter'] font-medium text-lg md:text-2xl text-black mb-1">{p.subtitle}</p>
            <p className="font-['Inter'] text-sm md:text-base text-black leading-relaxed">{p.description}</p>
          </article>
        )})}
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