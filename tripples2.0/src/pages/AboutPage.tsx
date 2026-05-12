import CTABanner from "../components/CTABanner";
import { ASSETS } from "../data";
import { PILLARS, AWARDS, BENEFIT_GROUPS, EXIST_ITEM, TIME_STEPS } from "../data/about";
import { AwardCardTall } from "../components/AwardCardTall";
import { AwardCardWide } from "../components/AwardCardWide";
import { DecorativeCircles } from "../components/DecorativeCircles";

// ── About Hero ────────────────────────────────────────────────────────────────
function AboutHero() {
  return (
    <section
      className="min-h-screen relative flex flex-col items-center justify-center text-center px-6 pt-12 pb-16 overflow-hidden"
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
        <div className="bg-white border-2 border-[#007595] rounded-2xl px-5 sm:px-10 py-5 text-center shadow-sm max-w-4xl mx-auto">
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
      <DecorativeCircles circles={10} mobileCircles={5} />
    </section>
  );
}

// ── How We Started ────────────────────────────────────────────────────────────


function HowWeStarted() {
  return (
    <section
      className="relative bg-[#187797] overflow-hidden px-6 py-10"
    >
      <div className="mx-auto flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">

        {/* ── Left: title + photo ── */}
        <div className="flex-shrink-0 w-full lg:w-[10px] flex flex-row lg:flex-col items-center gap-4 lg:gap-3">
          <div className="lg:absolute lg:left-10 lg:top-6 flex h-auto">

            {/* Mobile: left side | LG: right side (after image) */}
            <h2 className="order-first lg:order-last mb-5 font-['Poppins'] font-extrabold text-white leading-[1.05] text-[28px] sm:text-[32px] lg:text-[48px] text-left lg:text-center">
              HOW WE<br />STARTED
            </h2>

            <div className="flex-shrink-0 w-full lg:w-[250px] flex flex-row items-center -gap-10 lg:flex-col lg:items-center lg:gap-1">
              <img
                src={ASSETS.founderImg}
                alt="Founders"
                className="w-52 h-52 lg:w-52 lg:h-52 rounded-full object-cover flex-shrink-0 z-20"
              />
              <p className="text-white/80 text-xs text-center leading-snug hidden lg:block mt-1">
                Pastors Francis Oliver and<br />Mai Ryza Sison<br />
                <span className="font-bold text-white/50 uppercase tracking-widest text-[10px]">Founders</span>
              </p>
            </div>

          </div>
        </div>

        {/* ── Right: Diagonal timeline ── */}
        {/* DESKTOP: absolute-positioned ascending diagonal */}
        <div className="flex-1 relative hidden lg:block z-20" style={{ height: 460 }}>



          {TIME_STEPS.map((step, i) => {
            // Ascending diagonal positions
            const positions = [
              { left: 0, top: 335 },
              { left: 200, top: 255 },
              { left: 400, top: 178 },
              { left: 600, top: 105 },
              { left: 800, top: 38 },
              { left: 1000, top: -15 },
            ];
            const pos = positions[i];
            return (
              <div
                key={step.label}
                className="absolute flex flex-col gap-1.5"
                style={{ left: pos.left, top: pos.top }}
              >
                <div
                  className={[
                    "rounded-full px-4 py-2.5 font-['Poppins'] font-bold text-white text-center text-[12px] uppercase tracking-wide whitespace-nowrap transition-transform hover:scale-105",
                    step.highlight
                      ? "bg-white/25 border border-white/60"
                      : "bg-[rgba(0,90,110,0.85)] border border-white/25",
                  ].join(" ")}
                >
                  {step.label}
                </div>
                <p
                  className="text-white/85 text-[11px] leading-snug font-['Inter']"
                  style={{ maxWidth: i >= 3 ? 190 : 175 }}
                >
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* MOBILE: vertical stack */}
        <div className="flex flex-col gap-4 lg:hidden w-full">
          {/* MOBILE: names appear */}
          <p className="text-white/80 text-xs text-center leading-snug -mt-8">
            Pastors Francis Oliver and<br />Mai Ryza Sison
            <br />
            <span className="font-bold text-white/50 uppercase tracking-widest text-[10px]">Founders</span>
          </p>

          {TIME_STEPS.map((step) => (
            <div key={step.label} className="flex gap-3 items-start">
              <div
                className={[
                  "rounded-full px-4 py-2 font-['Poppins'] font-bold text-white text-[11px] uppercase tracking-wide whitespace-nowrap flex-shrink-0",
                  step.highlight
                    ? "bg-white/25 border border-white/60"
                    : "bg-[rgba(0,90,110,0.85)] border border-white/20",
                ].join(" ")}
              >
                {step.label}
              </div>
              <p className="text-white text-[12px] leading-snug font-['Inter'] pt-1.5">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>

      <DecorativeCircles circles={5} mobileCircles={5} />
      <div className="sm:block hidden absolute w-70 h-70 rounded-full bg-[#EDF9FD] -bottom-10 -right-10" />
      <div className="sm:block hidden absolute w-20 h-20 rounded-full bg-[#EDF9FD] -bottom-9 right-50" />
    </section>
  );
}

// ─── Awards Section (usage example) ──────────────────────────────────────────
function Awards() {
  return (
    <section className="bg-[#EDF9FD] py-16 px-6">
      <h2 className="font-['Poppins'] font-bold text-3xl md:text-[60px] text-black/90 text-center mb-6 leading-tight">
        AWARDS & RECOGNITION
      </h2>
      <p className="font-['Inter'] text-center text-lg md:text-xl text-black/90 mb-12 max-w-3xl mx-auto">
        Our dedication to innovation and exceptional results has earned us prestigious recognition
        from leading organizations across Asia and beyond.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 max-w-[1400px] mx-auto">

        {/* Card 1 — wide, image right */}
        <AwardCardWide
          gridClass="md:col-span-3 md:row-span-2"
          imageUrl={AWARDS[0].imageUrl}
          title={AWARDS[0].title}
          badge={AWARDS[0].badge}
          description={AWARDS[0].description}
          category={AWARDS[0].category}
          imagePosition="right"
        />

        {/* Card 2 — tall */}
        <AwardCardTall
          gridClass="md:col-span-2 md:row-span-2 md:col-start-4"
          imageUrl={AWARDS[1].imageUrl}
          title={AWARDS[1].title}
          badge={AWARDS[1].badge}
          description={AWARDS[1].description}
        />

        {/* Card 3 — tall */}
        <AwardCardTall
          gridClass="md:col-span-2 md:row-span-2 md:col-start-1"
          imageUrl={AWARDS[2].imageUrl}
          title={AWARDS[2].title}
          badge={AWARDS[2].badge}
          description={AWARDS[2].description}
        />

        {/* Card 4 — wide, image left */}
        <AwardCardWide
          gridClass="md:col-span-3 md:row-span-2 md:col-start-3"
          imageUrl={AWARDS[3].imageUrl}
          title={AWARDS[3].title}
          badge={AWARDS[3].badge}
          description={AWARDS[3].description}
          category={AWARDS[3].category}
          imagePosition="left"
        />

        {/* Card 5 — wide, image left */}
        <AwardCardWide
          gridClass="md:col-span-3 md:row-span-2 md:col-start-2 md:row-start-5"
          imageUrl={AWARDS[4].imageUrl}
          title={AWARDS[4].title}
          badge={AWARDS[4].badge}
          description={AWARDS[4].description}
          category={AWARDS[4].category}
          imagePosition="left"
        />

      </div>
    </section>
  );
}

// ── How We Strive (Triple Bottom Line) ───────────────────────────────────────
function HowWeStrive() {
  return (
    <section className="bg-[#187797] relative py-16 px-6">
      <h2 className="font-['Poppins'] font-bold text-3xl md:text-[60px] text-white text-center mb-6 leading-tight">
        HOW WE STRIVE
      </h2>
      <div
        className="max-w-4xl bg-white mx-auto mb-12 rounded-2xl px-6 py-4 shadow-xl/20"
      >
        <p className="font-['Inter'] text-center text-base md:text-md text-black/90">
          Our prefix 'TR' came from the{" "}
          <strong className="text-[#007595] font-semibold">Triple Bottom Line concept</strong>, an approach that focuses on actions geared    towards sustainable development. After all, TRipples is committed to contributing to such a                         cause and to impact:
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-6 max-w-[1400px] mx-auto">
        {PILLARS.map((p) => {
          const Icon = p.icon
          return (
            <article key={p.id} className="bg-[#f2fcfd] border border-[#a2f4fd] rounded-3xl p-8 flex-1 min-w-[240px] max-w-[440px] text-center shadow-xl/20">
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
       {/* <DecorativeCircles circles={5} mobileCircles={5}/> */}
    </section>
  );
}

// ── What We Dream ─────────────────────────────────────────────────────────────
function WhatWeDream() {
  return (
    <section className="bg-[#187797] relative text-center">
      <h2 className="font-['Poppins'] font-bold text-3xl md:text-[60px] text-white mb-8 leading-tight">WHAT WE DREAM</h2>
      <div className="max-w-[1300px] mx-auto">
        <div
          className="max-w-4xl bg-white mx-auto mb-12 rounded-2xl px-6 py-4 shadow-xl/20 flex flex-col gap-6"
        >
          <p className="text-[#007595] font-semibold text-base md:text-md">
            <strong>TRipples aims to become the world's most influential digital marketing company by constantly creating positive ripple effects for humanity, businesses, and the society.</strong>
          </p>
          <p className="font-['Inter'] text-base md:text-md text-black/90 leading-relaxed max-w-4xl mx-auto">
            We believe that “man does not live by bread alone” (Matthew 4:4). Thus, we don’t dream of becoming big alone. <strong>We grow together. Most importantly, we extend to our community by spreading the Word of God and His love.</strong>
          </p>
        </div>
        <img src={ASSETS.teamPhoto} alt="TRipplesPH Team" className="w-full max-w-3xl mx-auto h-auto object-cover rounded-3xl mb-8 z-20" />
        <p className="font-['Inter'] font-semibold text-base md:text-xl text-[#007595] leading-relaxed mb-4 max-w-4xl mx-auto">
          TRipples aims to become the world's most influential digital marketing company by constantly creating positive ripple effects for humanity, businesses, and the society.
        </p>

      </div>
      {/* <DecorativeCircles circles={5} mobileCircles={5}/> */}
    </section>
  );
}

// ── Why We Exist ─────────────────────────────────────────────────────────────
function WhyWeExist() {
  return (
    <section className="bg-[#EDF9FD] py-16 px-6 text-center">
      <h2 className="font-['Poppins'] font-bold text-3xl md:text-[60px] text-black/90 mb-6 leading-tight">WHY WE EXIST</h2>
      <p className="font-['Inter'] font-semibold text-base md:text-xl text-black/90 mb-12 max-w-4xl mx-auto leading-relaxed">
        TRipples exists to create positive ripple effects for humanity, businesses, and the society by connecting the hearts of the brands and nonprofits with those of the customers and audiences.
      </p>
      <div className="flex flex-wrap justify-center gap-6 max-w-[1400px] mx-auto">
        {EXIST_ITEM.map((item) => {
          const Icon = item.icon
          return (
            <article key={item.id} className="bg-[#f2fcfd] border border-[#a2f4fd] rounded-3xl p-8 flex-1 min-w-[240px] max-w-[440px] text-center">
              <div
                className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ background: "linear-gradient(143deg, #5fc4dc 14%, #197896 50%, #197896 91%)" }}
              >
                <span className="text-4xl text-white font-bold">
                  <Icon size={30} />
                </span>
              </div>
              <h3 className="font-['Inter'] font-semibold text-xl md:text-2xl text-[#007595] mb-4">{item.title}</h3>
              <p className="font-['Inter'] text-sm md:text-base text-black leading-relaxed">{item.description}</p>
            </article>
          )
        })}
      </div>
    </section>
  );
}

// ── Benefits ─────────────────────────────────────────────────────────────────
function Benefits() {
  return (
    <section className="bg-[#187797] relative py-16 px-6">
      <h2 className="font-['Poppins'] font-bold text-3xl md:text-[60px] text-white text-center mb-4 leading-tight">WHAT WE OFFER</h2>
      <p className="font-['Inter'] font-semibold text-center text-base md:text-xl text-white mb-12">
        Join our team and experience a workplace that values your growth, well-being, and success
      </p>
      <div className="max-w-[1400px] mx-auto flex flex-col gap-12">
        {BENEFIT_GROUPS.map((group) => (
          <div key={group.id}>
            <h3 className="font-['Poppins'] font-bold text-2xl md:text-[36px] text-white mb-6">{group.groupTitle}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.items.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.id}
                    className="bg-[#308da7] border border-[#74bbcb] rounded-3xl p-5 flex items-start gap-4"
                  >
                    <div
                      className="w-[67px] h-[67px] flex-shrink-0 rounded-xl flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, #6bb4c5 0%, #49a7af 50%, #28809c 100%)" }}
                    ><Icon size={30} className="text-white" /></div>
                    <div>
                      <h4 className="font-['Poppins'] font-bold text-base md:text-xl text-white leading-tight mb-1">{item.title}</h4>
                      <p className="font-['Inter'] text-sm text-white leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
       <DecorativeCircles circles={20} mobileCircles={5}/>
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