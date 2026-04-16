import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "../../lib/data";
import { useTheme } from "../../lib/ThemeContext";

// ── Sun icon ─────────────────────────────────────────────────────────────────
function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 7a5 5 0 100 10A5 5 0 0012 7zm0-5a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm0 18a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM4.22 4.22a1 1 0 011.42 0l.7.71a1 1 0 11-1.42 1.42l-.7-.71a1 1 0 010-1.42zm13.44 13.44a1 1 0 011.41 0l.71.7a1 1 0 11-1.41 1.42l-.71-.7a1 1 0 010-1.42zM3 11h1a1 1 0 110 2H3a1 1 0 110-2zm17 0h1a1 1 0 110 2h-1a1 1 0 110-2zM4.92 18.36l.71-.7a1 1 0 111.41 1.41l-.7.71a1 1 0 11-1.42-1.42zm13.44-13.44l.71-.71a1 1 0 111.41 1.42l-.71.7a1 1 0 01-1.41-1.41z" />
    </svg>
  );
}

// ── Moon icon ─────────────────────────────────────────────────────────────────
function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
    </svg>
  );
}

// ── Theme toggle pill ──────────────────────────────────────────────────────────
function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative flex items-center w-14 h-7 rounded-full border transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      style={{
        background: isDark
          ? "rgba(164,230,255,0.12)"
          : "rgba(0,100,160,0.10)",
        borderColor: isDark
          ? "rgba(164,230,255,0.25)"
          : "rgba(0,120,200,0.25)",
      }}
    >
      {/* Track icons */}
      <span className={`absolute left-1.5 transition-opacity duration-200 ${isDark ? "opacity-40" : "opacity-80"}`}>
        <SunIcon />
      </span>
      <span className={`absolute right-1.5 transition-opacity duration-200 ${isDark ? "opacity-80" : "opacity-40"}`}>
        <MoonIcon />
      </span>

      {/* Sliding knob */}
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
        className="absolute w-5 h-5 rounded-full shadow-md flex items-center justify-center"
        style={{
          left: isDark ? "auto" : "4px",
          right: isDark ? "4px" : "auto",
          background: isDark
            ? "linear-gradient(135deg, #a4e6ff, #d1bcff)"
            : "linear-gradient(135deg, #f59e0b, #f97316)",
        }}
      >
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="text-white"
          style={{ fontSize: 9 }}
        >
          {isDark ? "●" : "☀"}
        </motion.span>
      </motion.span>
    </button>
  );
}

// ── Section index for breadcrumb label ───────────────────────────────────────
const SECTION_ICONS: Record<string, string> = {
  "#hero": "🏠",
  "#about": "👤",
  "#projects": "🚀",
  "#skills": "⚡",
  "#experience": "💼",
  "#contact": "📡",
};

// ── Main Navbar ───────────────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    NAV_LINKS.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(href); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const activeLink = NAV_LINKS.find((l) => l.href === active);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "nav-glass shadow-cyan-glow" : "bg-transparent"
        }`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 md:px-8 h-20">
        {/* Logo */}
        <a
          href="#hero"
          className={`font-headline font-bold text-lg tracking-widest uppercase transition-colors ${isDark ? "text-white hover:text-primary" : "text-gray-900 hover:text-blue-600"
            }`}
        >
          JR<span className="text-primary">.</span>AI
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7 font-label tracking-tight">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className={`text-sm transition-colors relative pb-1 ${active === href
                  ? "text-primary"
                  : isDark
                    ? "text-on-surface-variant hover:text-white"
                    : "text-gray-500 hover:text-gray-900"
                }`}
            >
              {label}
              {active === href && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 w-full h-px bg-primary"
                />
              )}
            </a>
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          {/* Theme toggle - always visible */}
          <ThemeToggle />

          {/* Connect CTA - desktop only */}
          <a
            href="#contact"
            className="hidden md:block bg-primary text-on-primary px-5 py-2 text-sm font-bold font-headline hover:shadow-neon-primary transition-all duration-300"
          >
            Connect
          </a>

          {/* Hamburger - mobile only */}
          <button
            className={`md:hidden p-2 rounded transition-colors ${isDark ? "text-on-surface-variant hover:text-white" : "text-gray-500 hover:text-gray-900"
              }`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <motion.div animate={menuOpen ? "open" : "closed"} className="w-5 flex flex-col gap-1">
              <motion.span
                variants={{ open: { rotate: 45, y: 6 }, closed: { rotate: 0, y: 0 } }}
                className="block h-0.5 bg-current origin-center transition-colors"
              />
              <motion.span
                variants={{ open: { opacity: 0, scaleX: 0 }, closed: { opacity: 1, scaleX: 1 } }}
                className="block h-0.5 bg-current"
              />
              <motion.span
                variants={{ open: { rotate: -45, y: -6 }, closed: { rotate: 0, y: 0 } }}
                className="block h-0.5 bg-current origin-center"
              />
            </motion.div>
          </button>
        </div>
      </div>

      {/* ── Mobile breadcrumb strip (shows current section when menu is closed) ── */}
      <AnimatePresence>
        {!menuOpen && scrolled && (
          <motion.div
            key="breadcrumb"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
          >
            <div
              className="px-6 py-2 flex items-center gap-2"
              style={{
                background: isDark
                  ? "rgba(16,19,26,0.5)"
                  : "rgba(244,246,251,0.5)",
                borderTop: isDark
                  ? "1px solid rgba(164,230,255,0.06)"
                  : "1px solid rgba(0,100,160,0.06)",
              }}
            >
              {/* Section path */}
              <span className={`text-[11px] font-label uppercase tracking-widest ${isDark ? "text-outline" : "text-gray-400"}`}>
                Portfolio
              </span>
              <span className={`text-[11px] ${isDark ? "text-outline/50" : "text-gray-300"}`}>/</span>
              <span className="text-[11px] font-label font-semibold text-primary uppercase tracking-widest flex items-center gap-1">
                <span>{SECTION_ICONS[active] ?? "📍"}</span>
                {activeLink?.label ?? "Home"}
              </span>

              {/* Progress dots */}
              <div className="ml-auto flex items-center gap-1.5">
                {NAV_LINKS.map(({ href }) => (
                  <a
                    key={href}
                    href={href}
                    aria-label={href.replace("#", "")}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`block rounded-full transition-all duration-300 ${active === href
                        ? "w-4 h-1.5 bg-primary"
                        : isDark
                          ? "w-1.5 h-1.5 bg-outline-variant"
                          : "w-1.5 h-1.5 bg-gray-300"
                      }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile full menu ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
            style={{
              background: isDark
                ? "rgba(16,19,26,0.95)"
                : "rgba(244,246,251,0.97)",
              backdropFilter: "blur(20px) saturate(150%)",
              borderBottom: isDark
                ? "1px solid rgba(164,230,255,0.08)"
                : "1px solid rgba(0,100,160,0.08)",
            }}
          >
            {/* Section grid - attractive tiles */}
            <div className="px-6 pt-4 pb-6">
              <p className={`text-[10px] font-label uppercase tracking-[0.25em] mb-4 ${isDark ? "text-outline" : "text-gray-400"}`}>
                Navigate
              </p>
              <div className="grid grid-cols-2 gap-2">
                {NAV_LINKS.map(({ label, href }) => {
                  const isActive = active === href;
                  return (
                    <a
                      key={href}
                      href={href}
                      onClick={(e) => {
                        e.preventDefault();
                        setMenuOpen(false);
                        setTimeout(() => {
                          document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
                        }, 50);
                      }}
                      className={`relative flex items-center gap-3 px-4 py-3.5 rounded transition-all duration-200 ${isActive
                          ? isDark
                            ? "bg-primary/15 border border-primary/30"
                            : "bg-blue-50 border border-blue-200"
                          : isDark
                            ? "bg-surface-container-highest/60 border border-outline-variant/20 hover:border-primary/30 hover:bg-primary/8"
                            : "bg-white/70 border border-gray-200 hover:border-blue-200 hover:bg-blue-50/50"
                        }`}
                    >
                      <span className="text-lg leading-none">{SECTION_ICONS[href]}</span>
                      <span
                        className={`text-sm font-label font-medium ${isActive
                            ? "text-primary"
                            : isDark
                              ? "text-on-surface-variant"
                              : "text-gray-600"
                          }`}
                      >
                        {label}
                      </span>
                      {isActive && (
                        <motion.span
                          layoutId="mobile-active"
                          className="absolute right-2.5 w-1.5 h-1.5 rounded-full bg-primary"
                        />
                      )}
                    </a>
                  );
                })}
              </div>

              {/* Connect CTA in menu */}
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(false);
                  setTimeout(() => {
                    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                  }, 50);
                }}
                className="mt-4 flex items-center justify-center gap-2 w-full bg-primary text-on-primary py-3.5 text-sm font-bold font-headline tracking-widest uppercase hover:shadow-neon-primary transition-all"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                Initiate Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
