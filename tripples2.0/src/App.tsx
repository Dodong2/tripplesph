import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
/* components */
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatBot from "./components/tripples-chatbot/ChatBot";
/* hooks */
import { ScrollToTop } from "./hooks/ScrollToTop";
/* pages */
const HomePage    = lazy(() => import("./pages/HomePage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const AboutPage   = lazy(() => import("./pages/AboutPage"));
const BlogPage    = lazy(() => import("./pages/BlogPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));


function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#197996]">
      <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter >
      {/* ScrollToTop must be inside BrowserRouter to access useLocation */}
      <ScrollToTop />
      <Navbar />
      <div className="pt-[69px] overflow-x-hidden">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/"         element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about"    element={<AboutPage />} />
            <Route path="/blog"     element={<BlogPage />} />
            <Route path="/contacts" element={<ContactPage />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
      <ChatBot/>
    </BrowserRouter>
  );
}