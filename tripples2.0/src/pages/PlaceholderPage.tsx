interface PlaceholderPageProps {
  title: string;
}

export default function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <section className="bg-[#197996] min-h-[70vh] flex items-center justify-center">
      <h1 className="font-['Poppins'] font-bold text-5xl md:text-6xl text-white text-center">
        {title} — Coming Soon
      </h1>
    </section>
  );
}
