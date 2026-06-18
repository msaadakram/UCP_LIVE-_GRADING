import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────
   Matrix Rain Canvas Background
───────────────────────────────────────────── */
function MatrixRain() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF</>{}[]";
    const fontSize = 13;
    let cols = Math.floor(canvas.width / fontSize);
    let drops = Array.from({ length: cols }, () => Math.random() * -100);
    let frame = 0;
    const draw = () => {
      frame++;
      ctx.fillStyle = "rgba(0,0,0,0.04)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      cols = Math.floor(canvas.width / fontSize);
      if (drops.length !== cols) drops = Array.from({ length: cols }, () => Math.random() * -100);
      ctx.font = `${fontSize}px monospace`;
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const brightness = Math.random();
        if (brightness > 0.95) {
          ctx.fillStyle = "#ffffff";
        } else if (brightness > 0.8) {
          ctx.fillStyle = "#00ffaa";
        } else {
          ctx.fillStyle = "rgba(0,200,130,0.6)";
        }
        ctx.fillText(char, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.5;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100%", height: "100%",
        zIndex: 0,
        opacity: 0.18,
        pointerEvents: "none",
      }}
    />
  );
}

/* ─────────────────────────────────────────────
   Accept / Decline Modal
───────────────────────────────────────────── */
function ConsentModal({ onAccept, onDecline }) {
  const [scrolled, setScrolled] = useState(false);
  const scrollRef = useRef(null);
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 20) setScrolled(true);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(8px)",
        zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1rem",
      }}
    >
      <motion.div
        initial={{ scale: 0.85, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        style={{
          background: "linear-gradient(135deg, #0a0f1a 0%, #0d1520 100%)",
          border: "1px solid rgba(0,200,130,0.35)",
          borderRadius: "16px",
          width: "100%", maxWidth: "520px",
          overflow: "hidden",
          boxShadow: "0 0 60px rgba(0,200,130,0.15), 0 0 120px rgba(0,200,130,0.05)",
        }}
      >
        {/* Modal header */}
        <div style={{
          padding: "1.5rem 1.75rem 1rem",
          borderBottom: "1px solid rgba(0,200,130,0.15)",
          display: "flex", alignItems: "center", gap: "12px",
        }}>
          <div style={{
            width: "40px", height: "40px",
            background: "rgba(0,200,130,0.1)",
            border: "1px solid rgba(0,200,130,0.4)",
            borderRadius: "10px",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <svg width="20" height="20" fill="none" stroke="#00c882" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: "1rem", fontWeight: 700, color: "#e2e8f0" }}>Privacy &amp; Data Agreement</div>
            <div style={{ fontSize: "0.75rem", color: "#4a9e8a" }}>UCP Live Grading Extension</div>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <span style={{
              background: "rgba(0,200,130,0.1)", border: "1px solid rgba(0,200,130,0.3)",
              color: "#00c882", fontSize: "0.65rem", fontWeight: 700,
              letterSpacing: "0.08em", textTransform: "uppercase",
              padding: "3px 10px", borderRadius: "100px",
            }}>Required</span>
          </div>
        </div>

        {/* Scrollable body */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          style={{
            height: "260px", overflowY: "auto",
            padding: "1.25rem 1.75rem",
            fontSize: "0.82rem", lineHeight: 1.75, color: "#94a3b8",
          }}
        >
          <p style={{ marginBottom: "1rem" }}>
            By clicking <strong style={{ color: "#e2e8f0" }}>Accept &amp; Continue</strong>, you agree that UCP Live Grading
            may collect and process the following data from the UCP Horizon portal:
          </p>
          {[
            ["Course &amp; Grade Data", "Your enrolled course grades, quiz and assignment marks visible on the Horizon portal."],
            ["Student ID", "Your UCP registration number to link your leaderboard entry — never publicly exposed."],
            ["Aggregated Leaderboard Data", "Anonymised, opt-in class-rank data so you can compare performance with classmates."],
            ["Extension Telemetry", "Basic, non-personal click signals to improve reliability. No browsing history outside Horizon."],
          ].map(([title, desc], i) => (
            <div key={i} style={{
              background: "rgba(0,200,130,0.04)", border: "1px solid rgba(0,200,130,0.1)",
              borderRadius: "8px", padding: "0.75rem 1rem", marginBottom: "0.6rem",
            }}>
              <div style={{ fontWeight: 600, color: "#c8f0e8", marginBottom: "2px" }} dangerouslySetInnerHTML={{ __html: title }} />
              <div style={{ color: "#64748b" }}>{desc}</div>
            </div>
          ))}
          <p style={{ marginTop: "1rem", color: "#64748b", fontSize: "0.78rem" }}>
            We <strong style={{ color: "#e2e8f0" }}>never</strong> collect passwords, financial data, or anything outside horizon.ucp.edu.pk.
            You may opt out at any time from extension settings. Full policy below.
          </p>
          {!scrolled && (
            <div style={{
              textAlign: "center", padding: "0.75rem",
              color: "rgba(0,200,130,0.5)", fontSize: "0.75rem",
              animation: "bounce 1.5s infinite",
            }}>
              ↓ Scroll to read more
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div style={{
          padding: "1rem 1.75rem 1.5rem",
          borderTop: "1px solid rgba(0,200,130,0.1)",
          display: "flex", gap: "0.75rem",
        }}>
          <button
            onClick={onDecline}
            style={{
              flex: "0 0 auto",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#64748b", fontSize: "0.85rem", fontWeight: 500,
              padding: "10px 20px", borderRadius: "8px",
              cursor: "pointer", transition: "all 150ms ease",
            }}
            onMouseOver={e => e.currentTarget.style.color = "#e2e8f0"}
            onMouseOut={e => e.currentTarget.style.color = "#64748b"}
          >
            Decline
          </button>
          <motion.button
            onClick={onAccept}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            style={{
              flex: 1,
              background: "linear-gradient(135deg, #00c882, #00a86b)",
              border: "none", color: "#000",
              fontSize: "0.9rem", fontWeight: 700,
              padding: "10px 20px", borderRadius: "8px",
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              boxShadow: "0 0 20px rgba(0,200,130,0.3)",
            }}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Accept &amp; Continue
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Glowing section card
───────────────────────────────────────────── */
function SectionCard({ id, icon, title, children, delay = 0 }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      style={{
        background: "linear-gradient(135deg, rgba(10,15,26,0.9) 0%, rgba(13,21,32,0.95) 100%)",
        border: "1px solid rgba(0,200,130,0.12)",
        borderRadius: "16px",
        padding: "1.75rem 2rem",
        marginBottom: "1.25rem",
        backdropFilter: "blur(4px)",
        transition: "border-color 220ms ease, box-shadow 220ms ease",
        position: "relative",
        overflow: "hidden",
      }}
      whileHover={{
        borderColor: "rgba(0,200,130,0.3)",
        boxShadow: "0 0 30px rgba(0,200,130,0.07)",
      }}
    >
      {/* Subtle corner glow */}
      <div style={{
        position: "absolute", top: 0, left: 0,
        width: "120px", height: "120px",
        background: "radial-gradient(circle at top left, rgba(0,200,130,0.06), transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1rem" }}>
        <div style={{
          width: "38px", height: "38px",
          background: "rgba(0,200,130,0.1)",
          border: "1px solid rgba(0,200,130,0.25)",
          borderRadius: "10px",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1.15rem", flexShrink: 0,
        }}>{icon}</div>
        <h2 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: "#e2e8f0" }}>{title}</h2>
      </div>
      {children}
    </motion.section>
  );
}

/* ─────────────────────────────────────────────
   Main Page
───────────────────────────────────────────── */
export function PrivacyPolicyPage() {
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(() => {
    try { return sessionStorage.getItem("pp_accepted") === "1"; } catch { return false; }
  });
  const [showModal, setShowModal] = useState(!accepted);
  const [showDeclinedMsg, setShowDeclinedMsg] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleAccept = () => {
    try { sessionStorage.setItem("pp_accepted", "1"); } catch {}
    setAccepted(true);
    setShowModal(false);
  };

  const handleDecline = () => {
    setShowModal(false);
    setShowDeclinedMsg(true);
  };

  const sections = [
    {
      id: "overview", icon: "🛡️", title: "Overview",
      content: `UCP Live Grading Extension ("we", "our", or "the Extension") is a browser extension developed for University of Central Punjab (UCP) students. This Privacy Policy explains exactly what data we collect, how we use it, and how we protect it when you install and use our Chrome Extension alongside our web dashboard.`,
    },
    {
      id: "data-collected", icon: "📊", title: "Data We Collect",
      items: [
        { label: "Course & Grade Data", desc: "When you visit your Horizon UCP course page, the extension reads your enrolled courses, assignment marks, quiz scores, and grade summaries from the page DOM." },
        { label: "Student Identifier", desc: "We collect your UCP student ID (registration number) visible in the Horizon portal to associate your grades with your leaderboard entry." },
        { label: "Classmate Comparison Data", desc: "Aggregated, anonymized grade ranges are shared across students who opt in to the leaderboard feature, so you can see your relative performance without exposing individual student details." },
        { label: "Extension Usage Telemetry", desc: "Basic, non-personal interaction signals (e.g., feature clicks) to help us improve reliability. No browsing history outside Horizon is captured." },
      ],
    },
    {
      id: "data-not-collected", icon: "🚫", title: "Data We Do NOT Collect",
      simple: [
        "Passwords or login credentials",
        "Browsing history outside of horizon.ucp.edu.pk",
        "Personal financial or payment information",
        "Camera, microphone, or location data",
        "Any data from pages outside the UCP Horizon portal",
      ],
    },
    {
      id: "how-used", icon: "⚙️", title: "How We Use Your Data",
      items: [
        { label: "Live Grade Display", desc: "Grade data is parsed locally in your browser and displayed on the Horizon page in real time. It is also sent securely to our database to power the leaderboard." },
        { label: "Leaderboard Rankings", desc: "Your course performance is compared with classmates who have also installed the extension to generate a class leaderboard. Your name appears only if you opt in." },
        { label: "Trend Analysis", desc: "We track your grade history over time so you can visualize your academic progress through charts on the dashboard." },
      ],
    },
    {
      id: "data-security", icon: "🔒", title: "Data Security",
      content: "All data transmitted between your browser and our servers is encrypted using TLS/HTTPS. Data stored in our database is secured with access controls, and no raw student records are exposed to third parties. Leaderboard entries use anonymized display names by default — your real name or ID is never publicly shown without your explicit consent.",
    },
    {
      id: "sharing", icon: "🤝", title: "Data Sharing & Third Parties",
      content: "We do not sell, rent, or trade your data. We do not share individual student data with any third party, including advertisers or analytics companies. The only data visible to other users is your opt-in leaderboard rank with a display name you control.",
    },
    {
      id: "retention", icon: "🗄️", title: "Data Retention",
      content: "Your data is retained for as long as you have the extension installed and your account is active. You may request deletion of your data at any time by uninstalling the extension or contacting us. Upon uninstallation, locally cached data is cleared automatically.",
    },
    {
      id: "your-rights", icon: "⚖️", title: "Your Rights",
      simple: [
        "Access a copy of the data we hold about you",
        "Request correction of inaccurate data",
        "Request deletion of your data",
        "Opt out of the leaderboard at any time from extension settings",
        "Withdraw consent for data sharing without penalty",
      ],
    },
    {
      id: "contact", icon: "📬", title: "Contact Us",
      content: "For any privacy concerns, data requests, or questions about this policy, contact the developer at: ucplivegrading@support.com or open an issue on our GitHub repository. We aim to respond within 48 hours.",
    },
  ];

  const tocLinks = sections.map(s => ({ id: s.id, icon: s.icon, title: s.title }));

  return (
    <div style={{
      minHeight: "100vh",
      background: "#050a10",
      color: "#e2e8f0",
      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      position: "relative",
    }}>
      <MatrixRain />

      {/* Consent Modal */}
      <AnimatePresence>
        {showModal && (
          <ConsentModal onAccept={handleAccept} onDecline={handleDecline} />
        )}
      </AnimatePresence>

      {/* Declined message banner */}
      <AnimatePresence>
        {showDeclinedMsg && (
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            style={{
              position: "fixed", top: 0, left: 0, right: 0, zIndex: 900,
              background: "rgba(200,30,30,0.92)", backdropFilter: "blur(8px)",
              padding: "0.85rem 1.5rem",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              gap: "1rem", flexWrap: "wrap",
              borderBottom: "1px solid rgba(255,80,80,0.4)",
            }}
          >
            <span style={{ fontSize: "0.88rem", color: "#ffe5e5" }}>
              ⚠️ You declined the privacy policy. The extension will not function without consent.
            </span>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                onClick={() => { setShowModal(true); setShowDeclinedMsg(false); }}
                style={{
                  background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)",
                  color: "#fff", fontSize: "0.82rem", fontWeight: 600,
                  padding: "6px 14px", borderRadius: "6px", cursor: "pointer",
                }}
              >Review Again</button>
              <button
                onClick={() => navigate("/")}
                style={{
                  background: "transparent", border: "none",
                  color: "rgba(255,255,255,0.6)", fontSize: "0.82rem",
                  cursor: "pointer",
                }}
              >Go Home</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top nav bar */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(5,10,16,0.9)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(0,200,130,0.15)",
        padding: "0 2rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: "58px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "30px", height: "30px",
            background: "rgba(0,200,130,0.15)",
            border: "1px solid rgba(0,200,130,0.4)",
            borderRadius: "8px",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="16" height="16" fill="none" stroke="#00c882" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "#e2e8f0", letterSpacing: "0.02em" }}>
            UCP Live Grading
          </span>
          <span style={{
            background: "rgba(0,200,130,0.1)", border: "1px solid rgba(0,200,130,0.25)",
            color: "#00c882", fontSize: "0.65rem", fontWeight: 700,
            letterSpacing: "0.08em", textTransform: "uppercase",
            padding: "2px 8px", borderRadius: "100px",
          }}>Privacy Policy</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {accepted && (
            <span style={{
              display: "flex", alignItems: "center", gap: "5px",
              color: "#00c882", fontSize: "0.78rem", fontWeight: 600,
            }}>
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Policy Accepted
            </span>
          )}
          <Link to="/" style={{
            color: "#64748b", fontSize: "0.82rem",
            textDecoration: "none", padding: "6px 12px",
            borderRadius: "7px", border: "1px solid rgba(255,255,255,0.07)",
            transition: "color 150ms ease",
          }}>← Home</Link>
        </div>
      </nav>

      {/* ─────── Hero ─────── */}
      <div style={{
        position: "relative", zIndex: 1,
        padding: "5rem 2rem 3.5rem",
        background: "linear-gradient(180deg, rgba(0,200,130,0.03) 0%, transparent 100%)",
        borderBottom: "1px solid rgba(0,200,130,0.1)",
        textAlign: "center",
        overflow: "hidden",
      }}>
        {/* Glowing circle */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "500px", height: "500px",
          background: "radial-gradient(circle, rgba(0,200,130,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          style={{ position: "relative", zIndex: 1, display: "inline-block", marginBottom: "1.5rem" }}
        >
          <div style={{
            width: "80px", height: "80px", margin: "0 auto",
            background: "linear-gradient(135deg, rgba(0,200,130,0.15), rgba(0,200,130,0.05))",
            border: "1px solid rgba(0,200,130,0.4)",
            borderRadius: "20px",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 40px rgba(0,200,130,0.2), inset 0 0 20px rgba(0,200,130,0.05)",
          }}>
            <svg width="36" height="36" fill="none" stroke="#00c882" strokeWidth="1.75" viewBox="0 0 24 24">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{ position: "relative", zIndex: 1 }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "7px",
            background: "rgba(0,200,130,0.08)", border: "1px solid rgba(0,200,130,0.25)",
            color: "#00c882", fontSize: "0.72rem", fontWeight: 700,
            letterSpacing: "0.1em", textTransform: "uppercase",
            padding: "5px 14px", borderRadius: "100px",
            marginBottom: "1.25rem",
          }}>
            <span style={{
              width: "6px", height: "6px",
              background: "#00c882", borderRadius: "50%",
              boxShadow: "0 0 8px #00c882",
              animation: "ppPulse 2s ease-in-out infinite",
              display: "inline-block",
            }} />
            Last Updated · June 18, 2026
          </div>

          <h1 style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: "1rem",
            letterSpacing: "-0.02em",
          }}>
            <span style={{ color: "#e2e8f0" }}>Your Privacy, </span>
            <span style={{
              background: "linear-gradient(135deg, #00c882, #00a86b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Our Code.</span>
          </h1>
          <p style={{
            fontSize: "1.05rem", lineHeight: 1.7, color: "#64748b",
            maxWidth: "52ch", margin: "0 auto 2rem",
          }}>
            UCP Live Grading is built on transparency. This page explains exactly what data
            the extension accesses, how it's used, and how you stay in control.
          </p>

          {/* Trust badges row */}
          <div style={{
            display: "flex", justifyContent: "center",
            gap: "0.75rem", flexWrap: "wrap",
            marginBottom: "0.5rem",
          }}>
            {[
              { icon: "🔒", label: "TLS Encrypted" },
              { icon: "🚫", label: "No Password Access" },
              { icon: "👁️", label: "No 3rd Party Sales" },
              { icon: "⚡", label: "Opt-out Anytime" },
              { icon: "🎓", label: "UCP Students Only" },
            ].map(b => (
              <div key={b.label} style={{
                display: "flex", alignItems: "center", gap: "6px",
                background: "rgba(0,200,130,0.06)",
                border: "1px solid rgba(0,200,130,0.15)",
                borderRadius: "100px",
                padding: "5px 12px",
                fontSize: "0.78rem", color: "#94a3b8",
              }}>
                <span style={{ fontSize: "0.85rem" }}>{b.icon}</span>
                {b.label}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ─────── Body ─────── */}
      <div style={{
        position: "relative", zIndex: 1,
        maxWidth: "1100px", margin: "0 auto",
        padding: "3rem 1.5rem 4rem",
        display: "grid",
        gridTemplateColumns: "220px 1fr",
        gap: "2.5rem",
        alignItems: "start",
      }}>
        {/* Sticky TOC */}
        <div style={{ position: "sticky", top: "72px" }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            style={{
              background: "rgba(10,15,26,0.9)",
              border: "1px solid rgba(0,200,130,0.12)",
              borderRadius: "14px",
              padding: "1.25rem",
              backdropFilter: "blur(8px)",
            }}
          >
            <div style={{
              fontSize: "0.65rem", fontWeight: 800,
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: "#00c882", marginBottom: "1rem",
            }}>Contents</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {tocLinks.map(t => (
                <li key={t.id}>
                  <a
                    href={`#${t.id}`}
                    style={{
                      display: "flex", alignItems: "center", gap: "8px",
                      padding: "7px 10px", borderRadius: "8px",
                      fontSize: "0.8rem", color: "#64748b",
                      textDecoration: "none",
                      transition: "all 150ms ease",
                    }}
                    onMouseOver={e => {
                      e.currentTarget.style.background = "rgba(0,200,130,0.07)";
                      e.currentTarget.style.color = "#00c882";
                    }}
                    onMouseOut={e => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#64748b";
                    }}
                  >
                    <span style={{ fontSize: "0.85rem" }}>{t.icon}</span>
                    {t.title}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Sections */}
        <div>
          {sections.map((s, i) => (
            <SectionCard key={s.id} id={s.id} icon={s.icon} title={s.title} delay={i * 0.05}>
              {s.content && (
                <p style={{ fontSize: "0.88rem", lineHeight: 1.85, color: "#94a3b8", margin: 0 }}>{s.content}</p>
              )}
              {s.items && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {s.items.map((item, j) => (
                    <div key={j} style={{
                      background: "rgba(0,200,130,0.04)",
                      border: "1px solid rgba(0,200,130,0.1)",
                      borderRadius: "10px",
                      padding: "0.85rem 1rem",
                    }}>
                      <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#c8f0e8", marginBottom: "3px" }}>{item.label}</div>
                      <div style={{ fontSize: "0.82rem", lineHeight: 1.7, color: "#64748b" }}>{item.desc}</div>
                    </div>
                  ))}
                </div>
              )}
              {s.simple && (
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {s.simple.map((txt, j) => (
                    <li key={j} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.88rem", color: "#94a3b8" }}>
                      <span style={{
                        width: "6px", height: "6px",
                        background: "#00c882",
                        boxShadow: "0 0 6px rgba(0,200,130,0.6)",
                        borderRadius: "50%", flexShrink: 0,
                      }} />
                      {txt}
                    </li>
                  ))}
                </ul>
              )}
            </SectionCard>
          ))}
        </div>
      </div>

      {/* ─────── Footer CTA ─────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{
          position: "relative", zIndex: 1,
          background: "linear-gradient(135deg, rgba(0,200,130,0.08) 0%, rgba(0,200,130,0.02) 100%)",
          borderTop: "1px solid rgba(0,200,130,0.15)",
          padding: "3.5rem 2rem",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <div style={{
            fontSize: "2rem", marginBottom: "0.75rem",
          }}>🔐</div>
          <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#e2e8f0", marginBottom: "0.5rem" }}>
            Ready to Install?
          </h3>
          <p style={{ fontSize: "0.9rem", color: "#64748b", marginBottom: "1.75rem" }}>
            By installing UCP Live Grading, you agree to this Privacy Policy.
            Your data stays secure and under your control.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "0.875rem", flexWrap: "wrap" }}>
            <motion.a
              href="https://chromewebstore.google.com/detail/jffoifnchlblakelloghlmjldkpniglj?utm_source=item-share-cb"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "linear-gradient(135deg, #00c882, #00a86b)",
                color: "#000", fontSize: "0.9rem", fontWeight: 700,
                padding: "12px 24px", borderRadius: "10px",
                textDecoration: "none",
                boxShadow: "0 0 30px rgba(0,200,130,0.3)",
              }}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
              Install Chrome Extension
            </motion.a>
            <Link to="/" style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#94a3b8", fontSize: "0.9rem", fontWeight: 500,
              padding: "12px 24px", borderRadius: "10px",
              textDecoration: "none",
            }}>
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </motion.div>

      {/* ─────── Global keyframes ─────── */}
      <style>{`
        @keyframes ppPulse {
          0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 0 8px #00c882; }
          50% { opacity: 0.4; transform: scale(1.4); box-shadow: 0 0 4px #00c882; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(4px); }
        }
        @media (max-width: 768px) {
          .pp-body-grid { grid-template-columns: 1fr !important; }
          .pp-toc { display: none !important; }
        }
      `}</style>
    </div>
  );
}
