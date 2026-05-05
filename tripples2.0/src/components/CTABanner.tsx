interface CTABannerProps {
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
}

export default function CTABanner({
  title = "Let's Build Something Great Together",
  subtitle = "Schedule a free consultation to discuss your marketing goals and how we can help achieve them.",
  buttonLabel = "Get in Touch",
}: CTABannerProps) {
  return (
    <section className="bg-[#197996] py-20 px-6 text-center">
      <h2 className="font-['Poppins'] font-medium text-3xl md:text-[40px] text-white mb-5 leading-tight">{title}</h2>
      <p className="font-['Inter'] text-xl md:text-2xl text-white max-w-3xl mx-auto mb-14 leading-relaxed">{subtitle}</p>
      <a
        href="#"
        className="inline-flex items-center justify-center bg-white rounded-xl h-[68px] px-12 font-['Poppins'] font-medium text-2xl text-[#0796b6] hover:opacity-90 transition-opacity"
      >
        {buttonLabel}
      </a>
    </section>
  );
}
