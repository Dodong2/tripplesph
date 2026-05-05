import { FOOTER_COLUMNS } from "../data";

export default function Footer() {
  return (
    <footer className="bg-white pt-14 pb-9">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex flex-wrap gap-12 md:gap-16 mb-11">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.id} className="flex-1 min-w-[240px] max-w-[400px]">
              <p className="font-['Quicksand'] font-semibold text-lg mb-3">{col.heading}</p>
              <p className="font-['Inter'] text-sm leading-relaxed whitespace-pre-line text-gray-700">{col.body}</p>
            </div>
          ))}
        </div>
        <hr className="border-gray-200 mb-4" />
        <p className="font-['Inter'] text-sm text-gray-700">© 2020 TripplesPH. All rights reserved.</p>
      </div>
    </footer>
  );
}
