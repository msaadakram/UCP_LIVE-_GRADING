import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Shield, Zap, BarChart3, Heart, Lock } from "lucide-react";

const navLinks = [
  { to: "/",        label: "Home",       icon: Zap },
  { to: "/leaderboard", label: "Leaderboard", icon: BarChart3 },
  { to: "/donate",  label: "Support",     icon: Heart },
  { to: "/privacy", label: "Privacy",     icon: Lock },
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const canvasRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  // Mini matrix rain in logo area
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = 48; canvas.height = 48;
    const chars = "01アイウエオ</>";
    const drops = [0, 0, 0, 0];
    let id;
    const draw = () => {
      ctx.fillStyle = "rgba(2,6,9,0.25)";
      ctx.fillRect(0, 0, 48, 48);
      ctx.fillStyle = "rgba(0,230,150,0.7)";
      ctx.font = "6px monospace";
      drops.forEach((y, i) => {
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 12 + 1, y);
        drops[i] = y > 48 ? 0 : y + 8;
      });
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
          height: "64px",
          background: scrolled
            ? "rgba(2,6,9,0.96)"
            : "rgba(2,6,9,0.75)",
          backdropFilter: "blur(16px)",
          borderBottom: scrolled
            ? "1px solid rgba(0,230,150,0.25)"
            : "1px solid rgba(0,230,150,0.1)",
          transition: "all 300ms ease",
          boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.6)" : "none",
        }}
      >
        {/* Scan line */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent 0%, rgba(0,230,150,0.4) 50%, transparent 100%)",
          animation: "shimmerH 3s linear infinite",
        }} />

        <div style={{
          maxWidth: "1200px", margin: "0 auto",
          padding: "0 1.5rem",
          height: "100%",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* Logo */}
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <motion.div
              whileHover={{ scale: 1.08, rotate: 5 }}
              style={{
                position: "relative", width: "40px", height: "40px",
                background: "rgba(0,230,150,0.1)",
                border: "1px solid rgba(0,230,150,0.4)",
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 0 15px rgba(0,230,150,0.2)",
              }}
            >
              <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
              <div style={{
                position: "absolute", inset: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Shield size={18} style={{ color: "#00e696", filter: "drop-shadow(0 0 4px #00e696)" }} />
              </div>
            </motion.div>
            <div style={{ lineHeight: 1.1 }}>
              <div style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: "0.8rem", fontWeight: 900,
                letterSpacing: "0.06em",
                background: "linear-gradient(135deg, #00e696, #00c882)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>UCP_LIVE</div>
              <div style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.6rem", color: "rgba(0,230,150,0.5)",
                letterSpacing: "0.14em",
              }}>GRADING.SYS</div>
            </div>
          </Link>

          {/* Desktop Links */}
          <div style={{
            display: "flex", alignItems: "center", gap: "4px",
          }} className="nav-desktop">
            {navLinks.map(({ to, label, icon: Icon }) => {
              const active = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  style={{
                    display: "flex", alignItems: "center", gap: "6px",
                    padding: "7px 14px", borderRadius: "8px",
                    fontSize: "0.82rem", fontWeight: active ? 700 : 500,
                    fontFamily: "'Orbitron', monospace",
                    letterSpacing: "0.04em",
                    color: active ? "#00e696" : "rgba(120,200,160,0.7)",
                    background: active ? "rgba(0,230,150,0.1)" : "transparent",
                    border: active ? "1px solid rgba(0,230,150,0.3)" : "1px solid transparent",
                    transition: "all 180ms ease",
                    textDecoration: "none",
                    textShadow: active ? "0 0 10px rgba(0,230,150,0.5)" : "none",
                  }}
                  onMouseOver={e => {
                    if (!active) {
                      e.currentTarget.style.color = "#00e696";
                      e.currentTarget.style.background = "rgba(0,230,150,0.06)";
                    }
                  }}
                  onMouseOut={e => {
                    if (!active) {
                      e.currentTarget.style.color = "rgba(120,200,160,0.7)";
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  <Icon size={13} />
                  {label}
                </Link>
              );
            })}
          </div>

          {/* CTA + Mobile toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <motion.a
              href="https://chromewebstore.google.com/detail/jffoifnchlblakelloghlmjldkpniglj"
              target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              style={{
                display: "flex", alignItems: "center", gap: "6px",
                background: "linear-gradient(135deg, #00c882, #00a86b)",
                color: "#000", fontWeight: 800,
                fontFamily: "'Orbitron', monospace",
                fontSize: "0.72rem", letterSpacing: "0.06em",
                padding: "8px 16px", borderRadius: "8px",
                boxShadow: "0 0 16px rgba(0,200,130,0.35)",
                textDecoration: "none",
              }}
              className="nav-cta"
            >
              <Zap size={13} fill="#000" />
              INSTALL
            </motion.a>
            <button
              onClick={() => setOpen(o => !o)}
              style={{
                width: "38px", height: "38px",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(0,230,150,0.06)",
                border: "1px solid rgba(0,230,150,0.2)",
                borderRadius: "8px", color: "#00e696",
              }}
              aria-label="Toggle menu"
              className="nav-mobile-btn"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed", top: "64px", left: 0, right: 0, zIndex: 499,
              background: "rgba(2,6,9,0.98)",
              borderBottom: "1px solid rgba(0,230,150,0.2)",
              backdropFilter: "blur(20px)",
              padding: "1rem 1.5rem 1.5rem",
            }}
          >
            {navLinks.map(({ to, label, icon: Icon }, i) => (
              <motion.div
                key={to}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  to={to}
                  style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    padding: "12px 14px", borderRadius: "10px", marginBottom: "4px",
                    color: location.pathname === to ? "#00e696" : "rgba(120,200,160,0.8)",
                    background: location.pathname === to ? "rgba(0,230,150,0.08)" : "transparent",
                    fontFamily: "'Orbitron', monospace",
                    fontSize: "0.82rem", fontWeight: 700,
                    letterSpacing: "0.05em",
                    textDecoration: "none",
                    borderLeft: location.pathname === to ? "2px solid #00e696" : "2px solid transparent",
                  }}
                >
                  <Icon size={16} />
                  {label}
                </Link>
              </motion.div>
            ))}
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              href="https://chromewebstore.google.com/detail/jffoifnchlblakelloghlmjldkpniglj"
              target="_blank" rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                background: "linear-gradient(135deg, #00c882, #00a86b)",
                color: "#000", fontWeight: 800,
                fontFamily: "'Orbitron', monospace", fontSize: "0.82rem",
                padding: "12px", borderRadius: "10px", marginTop: "0.75rem",
                textDecoration: "none",
                boxShadow: "0 0 20px rgba(0,200,130,0.4)",
              }}
            >
              <Zap size={15} fill="#000" />
              INSTALL EXTENSION
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 769px) { .nav-mobile-btn { display: none !important; } }
        @media (max-width: 768px) { .nav-desktop { display: none !important; } .nav-cta { display: none !important; } }
        @keyframes shimmerH {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </>
  );
}
