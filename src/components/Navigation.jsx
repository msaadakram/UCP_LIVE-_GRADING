import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const navLinks = [
    { to: "/",           label: "Home",        icon: "⚡" },
    { to: "/leaderboard", label: "Leaderboard", icon: "🏆" },
    { to: "/privacy",    label: "Privacy",     icon: "🔒" },
    { to: "/donate",     label: "Support",     icon: "💚" },
  ];

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <>
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0,
          zIndex: 500,
          height: "60px",
          display: "flex", alignItems: "center",
          padding: "0 1.5rem",
          background: isScrolled
            ? "rgba(5,10,16,0.95)"
            : "rgba(5,10,16,0.7)",
          backdropFilter: "blur(14px)",
          borderBottom: isScrolled
            ? "1px solid rgba(0,200,130,0.18)"
            : "1px solid rgba(0,200,130,0.07)",
          transition: "background 220ms ease, border-color 220ms ease, box-shadow 220ms ease",
          boxShadow: isScrolled ? "0 4px 32px rgba(0,0,0,0.5)" : "none",
        }}
      >
        {/* ── Logo ── */}
        <Link
          to="/"
          style={{
            display: "flex", alignItems: "center", gap: "10px",
            textDecoration: "none", flex: "0 0 auto",
          }}
        >
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: "34px", height: "34px",
              background: "linear-gradient(135deg, rgba(0,200,130,0.2), rgba(0,200,130,0.05))",
              border: "1px solid rgba(0,200,130,0.45)",
              borderRadius: "9px",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 14px rgba(0,200,130,0.15)",
            }}
          >
            <svg width="18" height="18" fill="none" stroke="#00c882" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
          <div style={{ lineHeight: 1.15 }}>
            <div style={{
              fontSize: "0.82rem", fontWeight: 800,
              color: "#e2e8f0", letterSpacing: "0.03em",
            }}>UCP LIVE</div>
            <div style={{
              fontSize: "0.62rem", fontWeight: 600,
              color: "#00c882", letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}>Grading</div>
          </div>
        </Link>

        {/* ── Desktop links ── */}
        <div style={{
          display: "flex", alignItems: "center", gap: "0.25rem",
          marginLeft: "auto", marginRight: "1rem",
        }} className="nav-desktop-links">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{ textDecoration: "none" }}
            >
              <motion.div
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  padding: "6px 13px",
                  borderRadius: "8px",
                  fontSize: "0.82rem", fontWeight: isActive(link.to) ? 700 : 500,
                  color: isActive(link.to) ? "#00c882" : "#64748b",
                  background: isActive(link.to)
                    ? "rgba(0,200,130,0.08)"
                    : "transparent",
                  border: isActive(link.to)
                    ? "1px solid rgba(0,200,130,0.2)"
                    : "1px solid transparent",
                  transition: "all 160ms ease",
                }}
              >
                <span style={{ fontSize: "0.78rem" }}>{link.icon}</span>
                {link.label}
                {isActive(link.to) && (
                  <motion.div
                    layoutId="nav-active-dot"
                    style={{
                      width: "4px", height: "4px",
                      background: "#00c882",
                      borderRadius: "50%",
                      boxShadow: "0 0 6px #00c882",
                    }}
                  />
                )}
              </motion.div>
            </Link>
          ))}
        </div>

        {/* ── Install CTA ── */}
        <motion.a
          href="https://chromewebstore.google.com/detail/jffoifnchlblakelloghlmjldkpniglj?utm_source=item-share-cb"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.04, boxShadow: "0 0 20px rgba(0,200,130,0.4)" }}
          whileTap={{ scale: 0.96 }}
          className="nav-install-btn"
          style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            background: "linear-gradient(135deg, #00c882, #00a86b)",
            color: "#000", fontSize: "0.78rem", fontWeight: 700,
            padding: "7px 16px", borderRadius: "8px",
            textDecoration: "none",
            boxShadow: "0 0 14px rgba(0,200,130,0.25)",
            flexShrink: 0,
          }}
        >
          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
          </svg>
          <span className="nav-install-text">Install</span>
        </motion.a>

        {/* ── Mobile burger ── */}
        <button
          onClick={() => setMobileOpen(o => !o)}
          className="nav-burger"
          aria-label="Toggle menu"
          style={{
            display: "none",
            marginLeft: "0.75rem",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(0,200,130,0.2)",
            borderRadius: "7px",
            padding: "7px",
            cursor: "pointer",
            color: "#94a3b8",
          }}
        >
          {mobileOpen ? (
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          ) : (
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M3 12h18M3 6h18M3 18h18"/>
            </svg>
          )}
        </button>
      </nav>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              top: "60px", left: 0, right: 0,
              zIndex: 499,
              background: "rgba(5,10,16,0.98)",
              backdropFilter: "blur(16px)",
              borderBottom: "1px solid rgba(0,200,130,0.15)",
              padding: "1rem 1.5rem 1.5rem",
            }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={link.to}
                  style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    marginBottom: "4px",
                    textDecoration: "none",
                    fontSize: "0.9rem", fontWeight: isActive(link.to) ? 700 : 500,
                    color: isActive(link.to) ? "#00c882" : "#94a3b8",
                    background: isActive(link.to)
                      ? "rgba(0,200,130,0.07)"
                      : "rgba(255,255,255,0.02)",
                    border: `1px solid ${ isActive(link.to) ? "rgba(0,200,130,0.2)" : "rgba(255,255,255,0.05)" }`,
                  }}
                >
                  <span>{link.icon}</span>
                  {link.label}
                  {isActive(link.to) && (
                    <span style={{
                      marginLeft: "auto",
                      width: "6px", height: "6px",
                      background: "#00c882",
                      borderRadius: "50%",
                      boxShadow: "0 0 6px #00c882",
                    }} />
                  )}
                </Link>
              </motion.div>
            ))}
            <div style={{ marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid rgba(0,200,130,0.1)" }}>
              <a
                href="https://chromewebstore.google.com/detail/jffoifnchlblakelloghlmjldkpniglj?utm_source=item-share-cb"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  background: "linear-gradient(135deg, #00c882, #00a86b)",
                  color: "#000", fontSize: "0.88rem", fontWeight: 700,
                  padding: "11px", borderRadius: "10px",
                  textDecoration: "none",
                  boxShadow: "0 0 20px rgba(0,200,130,0.3)",
                }}
              >
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
                Install Chrome Extension
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Responsive CSS ── */}
      <style>{`
        @media (max-width: 768px) {
          .nav-desktop-links { display: none !important; }
          .nav-install-btn .nav-install-text { display: none; }
          .nav-burger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
