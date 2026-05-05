import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ASSETS, NAV_LINKS } from "../data";
import type { PageId } from "../types";

// Map route paths to page ids
const pathToPage: Record<string, PageId> = {
  "/": "home",
  "/about": "about",
  "/services": "services",
  "/blog": "blog",
  "/contacts": "contacts",
};

const pageToPath: Record<PageId, string> = {
  home: "/",
  about: "/about",
  services: "/services",
  blog: "/blog",
  contacts: "/contacts",
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const currentPage = pathToPage[pathname] ?? "home";

  return (
    <header>
      <nav className="fixed top-0 left-0 w-full h-[69px] bg-white z-50 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 cursor-pointer" onClick={() => setMenuOpen(false)}>
            <img src={ASSETS.logoIcon} alt="TRipplesPH icon" className="w-10 h-10 object-cover" />
            <img src={ASSETS.logoWordmark} alt="TRipplesPH" className="h-[26px] w-[104px] object-cover" />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map(({ label, page }) => (
              <li key={page}>
                <Link
                  to={pageToPath[page]}
                  className={`font-['Poppins'] text-[15px] transition-colors whitespace-nowrap ${
                    currentPage === page ? "text-[#00bbff]" : "text-black hover:text-[#197996]"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop actions */}
          <div className="hidden md:flex gap-2.5">
            <button className="--font-dm-sans text-base px-4 h-[38px] rounded-[7px] border border-[#1a7997] text-[#1a7997] bg-white cursor-pointer hover:bg-[#f0f9fb] transition-colors">
              Login
            </button>
            <button className="--font-dm-sans text-base px-4 h-[38px] rounded-[7px] border-none text-white bg-[#1a7997] cursor-pointer hover:opacity-90 transition-opacity">
              Sign Up
            </button>
          </div>

          {/* Hamburger */}
          <button
            aria-label="Toggle navigation"
            className="flex md:hidden flex-col gap-[5px] w-[30px] bg-transparent border-none p-1 cursor-pointer"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className={`block h-[3px] w-full bg-[#197996] rounded transition-transform duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-[3px] w-full bg-[#197996] rounded transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-[3px] w-full bg-[#197996] rounded transition-transform duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden absolute top-[69px] left-0 w-full bg-white shadow-md overflow-hidden transition-[max-height] duration-300 ease-in-out z-50 ${
            menuOpen ? "max-h-[420px]" : "max-h-0"
          }`}
        >
          {NAV_LINKS.map(({ label, page }) => (
            <Link
              key={page}
              to={pageToPath[page]}
              className={`block px-6 py-3.5 font-['Poppins'] text-base border-b border-gray-100 ${currentPage === page ? "text-[#00bbff]" : "text-black"}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <div className="flex gap-2.5 px-6 py-3.5">
            <button className="flex-1 font-['Poppins'] text-base h-[38px] rounded-[7px] border border-[#1a7997] text-[#1a7997] bg-white cursor-pointer">Login</button>
            <button className="flex-1 font-['Poppins'] text-base h-[38px] rounded-[7px] text-white bg-[#1a7997] cursor-pointer">Sign Up</button>
          </div>
        </div>
      </nav>
    </header>
  );
}
