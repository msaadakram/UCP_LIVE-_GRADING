import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  ShieldCheck,
  HeartHandshake,
  Download,
  Menu,
  X,
  GraduationCap,
} from "lucide-react";

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
    { to: "/",        label: "Home",    Icon: Home },
    { to: "/privacy", label: "Privacy", Icon: ShieldCheck },
    { to: "/donate",  label: "Support", Icon: HeartHandshake },
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
          background: isScrolled ? "rgba(2,6,9,0.97)" : "rgba(2,6,9,0.82)",
          backdropFilter: "blur(16px)",
          borderBottom: isScrolled
            ? "1px solid rgba(0,200,130,0.22)"
            : "1px solid rgba(0,200,130,0.09)",
          transition: "background 220ms ease, border-color 220ms ease, box-shadow 220ms ease",
          boxShadow: isScrolled ? "0 4px 40px rgba(0,0,0,0.6)" : "none",
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", flex: "0 0 auto" }}>
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: "34px", height: "34px",
              background: "linear-gradient(135deg, rgba(0,200,130,0.2), rgba(0,200,130,0.05))",
              border: "1px solid rgba(0,200,130,0.45)",
              borderRadius: "9px",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 14px rgba(0,200,130,0.18)",
            }}
          >
            <GraduationCap size={17} color="#00c882" strokeWidth={2} />
          </motion.div>
          <div style={{ lineHeight: 1.15 }}>
            <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "#e2e8f0", letterSpacing: "0.03em" }}>UCP LIVE</div>
            <div style={{ fontSize: "0.62rem", fontWeight: 600, color: "#00c882", letterSpacing: "0.12em", textTransform: "uppercase" }}>Grading</div>
          </div>
        </Link>

        {/* Desktop links */}
        <div
          style={{ display: "flex", alignItems: "center", gap: "0.25rem", marginLeft: "auto", marginRight: "1rem" }}
          className="nav-desktop-links"
        >
          {navLinks.map(({ to, label, Icon }) => (
            <Link key={to} to={to} style={{ textDecoration: "none" }}>
              <motion.div
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  padding: "6px 13px",
                  borderRadius: "8px",
                  fontSize: "0.82rem",
                  fontWeight: isActive(to) ? 700 : 500,
                  color: isActive(to) ? "#00c882" : "#64748b",
                  background: isActive(to) ? "rgba(0,200,130,0.08)" : "transparent",
                  border: isActive(to) ? "1px solid rgba(0,200,130,0.2)" : "1px solid transparent",
                  transition: "all 160ms ease",
                }}
              >
                <Icon size={14} strokeWidth={isActive(to) ? 2.5 : 2} />
                {label}
                {isActive(to) && (
                  <motion.div
                    layoutId="nav-active-dot"
                    style={{ width: "4px", height: "4px", background: "#00c882", borderRadius: "50%", boxShadow: "0 0 6px #00c882" }}
                  />
                )}
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Install CTA */}
        <motion.a
          href="https://chromewebstore.google.com/detail/jffoifnchlblakelloghlmjldkpniglj?utm_source=item-share-cb"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.04, boxShadow: "0 0 22px rgba(0,200,130,0.45)" }}
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
          <Download size={13} strokeWidth={2.5} />
          <span className="nav-install-text">Install</span>
        </motion.a>

        {/* Mobile burger */}
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
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile drawer */}
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
              background: "rgba(2,6,9,0.98)",
              backdropFilter: "blur(16px)",
              borderBottom: "1px solid rgba(0,200,130,0.15)",
              padding: "1rem 1.5rem 1.5rem",
            }}
          >
            {navLinks.map(({ to, label, Icon }, i) => (
              <motion.div key={to} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                <Link
                  to={to}
                  style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    marginBottom: "4px",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    fontWeight: isActive(to) ? 700 : 500,
                    color: isActive(to) ? "#00c882" : "#94a3b8",
                    background: isActive(to) ? "rgba(0,200,130,0.07)" : "rgba(255,255,255,0.02)",
                    border: `1px solid ${isActive(to) ? "rgba(0,200,130,0.2)" : "rgba(255,255,255,0.05)"}`,
                  }}
                >
                  <Icon size={16} strokeWidth={isActive(to) ? 2.5 : 2} />
                  {label}
                  {isActive(to) && (
                    <span style={{ marginLeft: "auto", width: "6px", height: "6px", background: "#00c882", borderRadius: "50%", boxShadow: "0 0 6px #00c882" }} />
                  )}
                </Link>
              </motion.div>
            ))}
            <div style={{ marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid rgba(0,200,130,0.1)" }}>
              <a
                href="https://chromewebstore.google.com/detail/jffoifnchlblakelloghlmjldkpniglj?utm_source=item-share-cb"
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  background: "linear-gradient(135deg, #00c882, #00a86b)",
                  color: "#000", fontSize: "0.88rem", fontWeight: 700,
                  padding: "11px", borderRadius: "10px",
                  textDecoration: "none",
                  boxShadow: "0 0 20px rgba(0,200,130,0.3)",
                }}
              >
                <Download size={15} strokeWidth={2.5} />
                Install Chrome Extension
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
