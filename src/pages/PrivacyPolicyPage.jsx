import { useEffect, useRef, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import {
  ShieldCheck, BarChart2, Ban, Settings2, Lock, Handshake,
  Archive, Scale, Mail, CheckCircle2, AlertTriangle, ArrowLeft,
  Download, Eye, EyeOff, Fingerprint, Globe, Database, Cpu,
  Zap, Star, Layers, ChevronRight, X, Menu, RefreshCw,
  BookOpen, UserCheck, Trash2, LogOut, MessageSquare, Shield,
} from "lucide-react";

/* ─────────────────────────────────────────────
   PARTICLE FIELD
───────────────────────────────────────────── */
function ParticleField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const PARTICLE_COUNT = 80;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,200,130,${p.alpha})`;
        ctx.fill();
      });
      // draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,200,130,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.7 }} />;
}

/* ─────────────────────────────────────────────
   FLOATING ORBS
───────────────────────────────────────────── */
function FloatingOrbs() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      {[
        { size: 600, x: "-15%", y: "-20%", color: "rgba(0,200,130,0.04)", delay: 0 },
        { size: 400, x: "75%", y: "60%", color: "rgba(0,168,107,0.05)", delay: 2 },
        { size: 300, x: "50%", y: "20%", color: "rgba(0,200,130,0.03)", delay: 4 },
      ].map((orb, i) => (
        <motion.div key={i}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, delay: orb.delay, ease: "easeInOut" }}
          style={{
            position: "absolute", left: orb.x, top: orb.y,
            width: orb.size, height: orb.size,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            borderRadius: "50%",
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   SCROLL PROGRESS BAR
───────────────────────────────────────────── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div style={{
      position: "fixed", top: 0, left: 0, right: 0, height: "3px", zIndex: 9999,
      background: "linear-gradient(90deg,#00c882,#00e5ff,#00c882)",
      scaleX, transformOrigin: "0%",
      boxShadow: "0 0 12px rgba(0,200,130,0.8)",
    }} />
  );
}

/* ─────────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────────── */
function AnimatedCounter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      let start = 0;
      const step = () => {
        start += Math.ceil(target / 60);
        if (start >= target) { setCount(target); return; }
        setCount(start);
        requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      observer.disconnect();
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─────────────────────────────────────────────
   CONSENT MODAL (redesigned)
───────────────────────────────────────────── */
function ConsentModal({ onAccept, onDecline }) {
  const [scrolled, setScrolled] = useState(false);
  const [step, setStep] = useState(0);
  const scrollRef = useRef(null);
  const handleScroll = () => {
    const el = scrollRef.current;
    if (el && el.scrollTop + el.clientHeight >= el.scrollHeight - 20) setScrolled(true);
  };

  const points = [
    { Icon: BarChart2, title: "Course & Grade Data", desc: "Your grades visible on the Horizon portal." },
    { Icon: Fingerprint, title: "Student ID", desc: "Your UCP registration number for leaderboard." },
    { Icon: Globe, title: "Leaderboard Data", desc: "Anonymised opt-in class-rank comparisons." },
    { Icon: Cpu, title: "Extension Telemetry", desc: "Basic, non-personal usage signals." },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", backdropFilter: "blur(12px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}
    >
      {/* glow */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, background: "radial-gradient(circle, rgba(0,200,130,0.08), transparent 65%)", pointerEvents: "none" }} />

      <motion.div initial={{ scale: 0.8, y: 60, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }} transition={{ type: "spring", stiffness: 280, damping: 26 }}
        style={{ background: "linear-gradient(145deg,#060d14,#0b1622)", border: "1px solid rgba(0,200,130,0.3)", borderRadius: "20px", width: "100%", maxWidth: "500px", overflow: "hidden", boxShadow: "0 0 80px rgba(0,200,130,0.12), 0 40px 80px rgba(0,0,0,0.6)" }}
      >
        {/* header */}
        <div style={{ padding: "1.5rem 1.75rem 1.25rem", background: "linear-gradient(135deg,rgba(0,200,130,0.08),rgba(0,200,130,0.02))", borderBottom: "1px solid rgba(0,200,130,0.12)", display: "flex", alignItems: "center", gap: 14 }}>
          <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 48, height: 48, background: "rgba(0,200,130,0.12)", border: "1.5px solid rgba(0,200,130,0.4)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 0 20px rgba(0,200,130,0.15)" }}
          >
            <ShieldCheck size={22} color="#00c882" />
          </motion.div>
          <div>
            <div style={{ fontSize: "1rem", fontWeight: 800, color: "#e2e8f0", letterSpacing: "-0.01em" }}>Privacy Agreement</div>
            <div style={{ fontSize: "0.72rem", color: "#00c882", fontWeight: 600, letterSpacing: "0.05em" }}>UCP Live Grading · Required</div>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
            {[0, 1].map(i => (
              <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: step === i ? "#00c882" : "rgba(0,200,130,0.2)", boxShadow: step === i ? "0 0 8px #00c882" : "none", transition: "all 300ms" }} />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              ref={scrollRef} onScroll={handleScroll}
              style={{ maxHeight: 280, overflowY: "auto", padding: "1.25rem 1.75rem" }}
            >
              <p style={{ fontSize: "0.83rem", lineHeight: 1.8, color: "#64748b", marginBottom: "1rem" }}>
                By proceeding, you agree that <strong style={{ color: "#c8f0e8" }}>UCP Live Grading</strong> may collect and process:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {points.map(({ Icon, title, desc }, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                    style={{ display: "flex", alignItems: "flex-start", gap: 12, background: "rgba(0,200,130,0.04)", border: "1px solid rgba(0,200,130,0.1)", borderRadius: 10, padding: "0.75rem 1rem" }}
                  >
                    <div style={{ width: 32, height: 32, background: "rgba(0,200,130,0.1)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                      <Icon size={15} color="#00c882" strokeWidth={2} />
                    </div>
                    <div>
                      <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#c8f0e8" }}>{title}</div>
                      <div style={{ fontSize: "0.76rem", color: "#4a6070", lineHeight: 1.5 }}>{desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
              {!scrolled && <div style={{ textAlign: "center", color: "rgba(0,200,130,0.4)", fontSize: "0.72rem", paddingTop: 12 }}>↓ scroll to continue</div>}
            </motion.div>
          )}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              style={{ padding: "1.5rem 1.75rem", textAlign: "center" }}
            >
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                <CheckCircle2 size={48} color="#00c882" style={{ margin: "0 auto 1rem" }} />
              </motion.div>
              <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#e2e8f0", marginBottom: 6 }}>You're all set!</div>
              <div style={{ fontSize: "0.83rem", color: "#64748b", lineHeight: 1.7 }}>Your privacy is protected. Data is encrypted and never sold.</div>
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ padding: "1rem 1.75rem 1.5rem", borderTop: "1px solid rgba(0,200,130,0.08)", display: "flex", gap: 10 }}>
          <button onClick={onDecline} style={{ flex: "0 0 auto", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "#4a5568", fontSize: "0.83rem", fontWeight: 600, padding: "10px 18px", borderRadius: 10, cursor: "pointer", transition: "all 150ms" }}
            onMouseOver={e => e.currentTarget.style.color = "#94a3b8"} onMouseOut={e => e.currentTarget.style.color = "#4a5568"}
          >Decline</button>
          {step === 0 ? (
            <motion.button onClick={() => setStep(1)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              style={{ flex: 1, background: "rgba(0,200,130,0.1)", border: "1px solid rgba(0,200,130,0.35)", color: "#00c882", fontSize: "0.88rem", fontWeight: 700, padding: "10px 20px", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
            >
              Continue <ChevronRight size={16} strokeWidth={2.5} />
            </motion.button>
          ) : (
            <motion.button onClick={onAccept} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              style={{ flex: 1, background: "linear-gradient(135deg,#00c882,#00a86b)", border: "none", color: "#000", fontSize: "0.9rem", fontWeight: 800, padding: "10px 20px", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 0 24px rgba(0,200,130,0.4)" }}
            >
              <CheckCircle2 size={16} strokeWidth={2.5} /> Accept & Continue
            </motion.button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   SECTION DEFINITIONS
───────────────────────────────────────────── */
const SECTIONS = [
  {
    id: "overview", Icon: ShieldCheck, title: "Overview", color: "#00c882",
    content: `UCP Live Grading Extension ("we", "our") is a browser extension built exclusively for University of Central Punjab students. This Privacy Policy explains what data the extension accesses, how it is used, and how we protect it. Transparency is our core principle.`,
  },
  {
    id: "data-collected", Icon: Database, title: "Data We Collect", color: "#00b8e6",
    items: [
      { Icon: BarChart2, label: "Course & Grade Data", desc: "When you visit your Horizon UCP course page, the extension reads enrolled courses, assignment marks, quiz scores, and grade summaries from the page DOM." },
      { Icon: Fingerprint, label: "Student Identifier", desc: "Your UCP student ID (registration number) visible in the Horizon portal, used to associate grades with your leaderboard entry." },
      { Icon: Layers, label: "Classmate Comparison Data", desc: "Aggregated, anonymized grade ranges shared across students who opt in to the leaderboard feature." },
      { Icon: Cpu, label: "Extension Usage Telemetry", desc: "Basic, non-personal interaction signals to help improve reliability. No browsing history outside Horizon is captured." },
    ],
  },
  {
    id: "data-not-collected", Icon: Ban, title: "We Do NOT Collect", color: "#ff6b6b",
    simple: [
      { Icon: EyeOff, text: "Passwords or login credentials" },
      { Icon: Globe, text: "Browsing history outside horizon.ucp.edu.pk" },
      { Icon: Lock, text: "Personal financial or payment information" },
      { Icon: Eye, text: "Camera, microphone, or location data" },
      { Icon: Shield, text: "Any data from pages outside UCP Horizon portal" },
    ],
  },
  {
    id: "how-used", Icon: Settings2, title: "How We Use Your Data", color: "#a78bfa",
    items: [
      { Icon: Zap, label: "Live Grade Display", desc: "Grade data is parsed locally and displayed on the Horizon page in real time." },
      { Icon: Star, label: "Leaderboard Rankings", desc: "Your course performance is compared with opted-in classmates to generate a class leaderboard." },
      { Icon: BarChart2, label: "Trend Analysis", desc: "Track your grade history to visualize academic progress over time." },
    ],
  },
  {
    id: "data-security", Icon: Lock, title: "Data Security", color: "#fbbf24",
    content: "All data is encrypted using TLS/HTTPS in transit. Our database is secured with strict access controls and regular audits. Leaderboard entries use anonymized display names by default. We apply industry-standard security best practices.",
  },
  {
    id: "sharing", Icon: Handshake, title: "Data Sharing", color: "#34d399",
    content: "We do not sell, rent, or trade your data. We never share individual student data with any third party. The only data visible to others is your opt-in leaderboard rank — fully anonymized unless you choose to display your name.",
  },
  {
    id: "retention", Icon: Archive, title: "Data Retention", color: "#f97316",
    content: "Your data is retained while the extension is installed. You may request deletion at any time by uninstalling or contacting us. Local cached data is cleared on uninstall. Remote data is purged within 30 days of a deletion request.",
  },
  {
    id: "your-rights", Icon: Scale, title: "Your Rights", color: "#60a5fa",
    simple: [
      { Icon: Eye, text: "Access a copy of the data we hold about you" },
      { Icon: RefreshCw, text: "Request correction of inaccurate data" },
      { Icon: Trash2, text: "Request deletion of your data" },
      { Icon: LogOut, text: "Opt out of the leaderboard at any time" },
      { Icon: UserCheck, text: "Withdraw consent without penalty" },
    ],
  },
  {
    id: "contact", Icon: Mail, title: "Contact Us", color: "#e879f9",
    content: "For privacy concerns or data requests, contact the developer at ucplivegrading@support.com or open an issue on our GitHub repository. We aim to respond within 48 hours.",
  },
];

const STATS = [
  { Icon: Lock, value: 100, suffix: "%", label: "TLS Encrypted" },
  { Icon: Ban, value: 0, suffix: "", label: "Data Sold" },
  { Icon: ShieldCheck, value: 48, suffix: "h", label: "Response SLA" },
  { Icon: Globe, value: 1, suffix: " Domain", label: "Data Source" },
];

/* ─────────────────────────────────────────────
   SECTION CARD
───────────────────────────────────────────── */
function SectionCard({ id, Icon, title, color, content, items, simple, delay = 0 }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.section id={id}
      initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative", overflow: "hidden", marginBottom: "1.25rem",
        background: "linear-gradient(145deg,rgba(8,14,24,0.95),rgba(10,18,28,0.98))",
        border: `1px solid ${hovered ? color + "44" : "rgba(255,255,255,0.06)"}`,
        borderRadius: 18, padding: "1.75rem 2rem",
        backdropFilter: "blur(12px)",
        boxShadow: hovered ? `0 0 40px ${color}12, 0 20px 40px rgba(0,0,0,0.4)` : "0 4px 20px rgba(0,0,0,0.3)",
        transition: "border-color 250ms ease, box-shadow 300ms ease",
      }}
    >
      {/* corner glow */}
      <div style={{ position: "absolute", top: 0, left: 0, width: 160, height: 160, background: `radial-gradient(circle at top left, ${color}10 0%, transparent 65%)`, pointerEvents: "none", transition: "opacity 300ms", opacity: hovered ? 1 : 0.5 }} />
      {/* right-bottom glow */}
      <div style={{ position: "absolute", bottom: 0, right: 0, width: 120, height: 120, background: `radial-gradient(circle at bottom right, ${color}08 0%, transparent 65%)`, pointerEvents: "none" }} />

      {/* title row */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 14, marginBottom: "1.25rem" }}>
        <motion.div animate={hovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{ width: 42, height: 42, background: `${color}16`, border: `1.5px solid ${color}40`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: hovered ? `0 0 18px ${color}30` : "none", transition: "box-shadow 300ms" }}
        >
          <Icon size={19} color={color} strokeWidth={1.75} />
        </motion.div>
        <h2 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 800, color: "#e2e8f0", letterSpacing: "-0.01em" }}>{title}</h2>
        <motion.div animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0 }} transition={{ duration: 0.2 }} style={{ marginLeft: "auto" }}>
          <ChevronRight size={18} color={color} />
        </motion.div>
      </div>

      {/* content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {content && <p style={{ fontSize: "0.875rem", lineHeight: 1.85, color: "#8899aa", margin: 0 }}>{content}</p>}

        {items && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 10 }}>
            {items.map(({ Icon: ItemIcon, label, desc }, j) => (
              <motion.div key={j} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: j * 0.06 }}
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 12, padding: "0.875rem 1rem" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                  <ItemIcon size={14} color={color} strokeWidth={2} />
                  <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#c8f0e8" }}>{label}</span>
                </div>
                <p style={{ margin: 0, fontSize: "0.78rem", lineHeight: 1.65, color: "#546070" }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        )}

        {simple && (
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
            {simple.map(({ Icon: ListIcon, text }, j) => (
              <motion.li key={j} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: j * 0.05 }}
                style={{ display: "flex", alignItems: "center", gap: 12, fontSize: "0.875rem", color: "#8899aa" }}
              >
                <div style={{ width: 30, height: 30, background: `${color}10`, border: `1px solid ${color}25`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <ListIcon size={13} color={color} strokeWidth={2} />
                </div>
                {text}
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </motion.section>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export function PrivacyPolicyPage() {
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(() => { try { return sessionStorage.getItem("pp_accepted") === "1"; } catch { return false; } });
  const [showModal, setShowModal] = useState(!accepted);
  const [showDeclinedMsg, setShowDeclinedMsg] = useState(false);
  const [activeToc, setActiveToc] = useState(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  // active TOC section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActiveToc(entry.target.id); });
    }, { rootMargin: "-30% 0px -60% 0px" });
    SECTIONS.forEach(s => { const el = document.getElementById(s.id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const handleAccept = () => { try { sessionStorage.setItem("pp_accepted", "1"); } catch {} setAccepted(true); setShowModal(false); };
  const handleDecline = () => { setShowModal(false); setShowDeclinedMsg(true); };

  return (
    <div style={{ minHeight: "100vh", background: "#04080f", color: "#e2e8f0", fontFamily: "'Inter','Segoe UI',system-ui,sans-serif", position: "relative", paddingTop: 64 }}>
      <ScrollProgress />
      <ParticleField />
      <FloatingOrbs />

      <AnimatePresence>
        {showModal && <ConsentModal onAccept={handleAccept} onDecline={handleDecline} />}
      </AnimatePresence>

      {/* declined banner */}
      <AnimatePresence>
        {showDeclinedMsg && (
          <motion.div initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -60, opacity: 0 }}
            style={{ position: "fixed", top: 64, left: 0, right: 0, zIndex: 900, background: "rgba(180,20,20,0.95)", backdropFilter: "blur(12px)", padding: "0.875rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", borderBottom: "1px solid rgba(255,100,100,0.3)" }}
          >
            <span style={{ fontSize: "0.85rem", color: "#ffe5e5", display: "flex", alignItems: "center", gap: 8 }}>
              <AlertTriangle size={15} /> You declined the privacy policy. Extension will not function without consent.
            </span>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => { setShowModal(true); setShowDeclinedMsg(false); }} style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff", fontSize: "0.8rem", fontWeight: 600, padding: "6px 14px", borderRadius: 8, cursor: "pointer" }}>Review Again</button>
              <button onClick={() => navigate("/")} style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", cursor: "pointer" }}>Go Home</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section style={{ position: "relative", zIndex: 1, padding: "5rem 2rem 4rem", textAlign: "center", overflow: "hidden" }}>
        {/* grid bg */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,200,130,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,200,130,0.04) 1px,transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 0%,rgba(0,200,130,0.07) 0%,transparent 70%)", pointerEvents: "none" }} />

        {/* shield icon */}
        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 18 }}
          style={{ position: "relative", zIndex: 1, display: "inline-block", marginBottom: "1.75rem" }}
        >
          <motion.div animate={{ boxShadow: ["0 0 30px rgba(0,200,130,0.3)", "0 0 60px rgba(0,200,130,0.5)", "0 0 30px rgba(0,200,130,0.3)"] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 88, height: 88, margin: "0 auto", background: "linear-gradient(145deg,rgba(0,200,130,0.18),rgba(0,200,130,0.06))", border: "1.5px solid rgba(0,200,130,0.5)", borderRadius: 22, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <ShieldCheck size={40} color="#00c882" strokeWidth={1.5} />
          </motion.div>
          {/* ring */}
          <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 2.5, repeat: Infinity }}
            style={{ position: "absolute", inset: -12, border: "1px solid rgba(0,200,130,0.25)", borderRadius: 36, pointerEvents: "none" }}
          />
        </motion.div>

        {/* badge */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          style={{ position: "relative", zIndex: 1, display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(0,200,130,0.08)", border: "1px solid rgba(0,200,130,0.25)", color: "#00c882", fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", padding: "5px 16px", borderRadius: 100, marginBottom: "1.5rem" }}
        >
          <span style={{ width: 6, height: 6, background: "#00c882", borderRadius: "50%", boxShadow: "0 0 8px #00c882", display: "inline-block", animation: "ppPulse 2s ease-in-out infinite" }} />
          Last Updated · June 18, 2026
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.7 }}
          style={{ position: "relative", zIndex: 1, fontSize: "clamp(2.2rem,6vw,4.2rem)", fontWeight: 900, lineHeight: 1.06, letterSpacing: "-0.03em", marginBottom: "1.25rem" }}
        >
          <span style={{ color: "#e2e8f0" }}>Your Privacy,<br /></span>
          <span style={{ background: "linear-gradient(135deg,#00c882 0%,#00e5c0 50%,#00b8e6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Our Promise.</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          style={{ position: "relative", zIndex: 1, fontSize: "1.05rem", lineHeight: 1.75, color: "#55677a", maxWidth: "52ch", margin: "0 auto 2.5rem" }}
        >
          UCP Live Grading is built on transparency. This page explains exactly what data the extension accesses, how it's used, and how you stay in complete control.
        </motion.p>

        {/* trust badges */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
          style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 10 }}
        >
          {[
            { Icon: Lock, label: "TLS Encrypted", color: "#00c882" },
            { Icon: Ban, label: "No Data Sales", color: "#ff6b6b" },
            { Icon: ShieldCheck, label: "GDPR Aligned", color: "#60a5fa" },
            { Icon: Settings2, label: "Opt-out Anytime", color: "#a78bfa" },
            { Icon: Globe, label: "UCP Only", color: "#fbbf24" },
          ].map(({ Icon, label, color }) => (
            <motion.div key={label} whileHover={{ scale: 1.06, y: -2 }}
              style={{ display: "flex", alignItems: "center", gap: 7, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 100, padding: "6px 14px", fontSize: "0.78rem", color: "#8899aa", cursor: "default" }}
            >
              <Icon size={13} color={color} strokeWidth={2} />
              {label}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── STATS ── */}
      <section style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", padding: "0 1.5rem 3rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 14 }}>
          {STATS.map(({ Icon, value, suffix, label }, i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, boxShadow: "0 12px 30px rgba(0,200,130,0.1)" }}
              style={{ background: "linear-gradient(145deg,rgba(8,14,24,0.9),rgba(10,18,28,0.95))", border: "1px solid rgba(0,200,130,0.12)", borderRadius: 16, padding: "1.5rem 1.25rem", textAlign: "center", transition: "box-shadow 250ms" }}
            >
              <div style={{ width: 44, height: 44, background: "rgba(0,200,130,0.1)", border: "1px solid rgba(0,200,130,0.2)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.75rem" }}>
                <Icon size={20} color="#00c882" strokeWidth={1.75} />
              </div>
              <div style={{ fontSize: "1.9rem", fontWeight: 900, color: "#00c882", lineHeight: 1, marginBottom: 4, fontVariantNumeric: "tabular-nums" }}>
                <AnimatedCounter target={value} suffix={suffix} />
              </div>
              <div style={{ fontSize: "0.75rem", color: "#4a6070", fontWeight: 600, letterSpacing: "0.04em" }}>{label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── BODY: TOC + SECTIONS ── */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem 5rem", display: "grid", gridTemplateColumns: "220px 1fr", gap: "2.5rem", alignItems: "start" }} className="pp-body-grid">

        {/* sticky TOC */}
        <div style={{ position: "sticky", top: 80 }} className="pp-toc">
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.6 }}
            style={{ background: "rgba(8,14,24,0.95)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "1.25rem", backdropFilter: "blur(16px)" }}
          >
            <div style={{ fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "#00c882", marginBottom: "1rem", display: "flex", alignItems: "center", gap: 6 }}>
              <BookOpen size={11} strokeWidth={2.5} /> Contents
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {SECTIONS.map(s => {
                const isActive = activeToc === s.id;
                return (
                  <li key={s.id}>
                    <a href={`#${s.id}`}
                      style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", borderRadius: 9, fontSize: "0.78rem", fontWeight: isActive ? 700 : 400, color: isActive ? s.color : "#4a5568", textDecoration: "none", background: isActive ? `${s.color}12` : "transparent", borderLeft: isActive ? `2px solid ${s.color}` : "2px solid transparent", transition: "all 200ms ease", marginBottom: 2 }}
                    >
                      <s.Icon size={12} strokeWidth={2} />
                      {s.title}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* mini actions */}
            <div style={{ marginTop: "1.5rem", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              <motion.a href="https://chromewebstore.google.com/detail/jffoifnchlblakelloghlmjldkpniglj?utm_source=item-share-cb" target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7, background: "linear-gradient(135deg,#00c882,#00a86b)", color: "#000", fontSize: "0.78rem", fontWeight: 800, padding: "9px 12px", borderRadius: 10, textDecoration: "none", marginBottom: 8 }}
              >
                <Download size={13} strokeWidth={2.5} /> Install Extension
              </motion.a>
              <Link to="/"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", color: "#4a5568", fontSize: "0.75rem", fontWeight: 500, padding: "8px 12px", borderRadius: 10, textDecoration: "none" }}
              >
                <ArrowLeft size={12} /> Back Home
              </Link>
            </div>
          </motion.div>
        </div>

        {/* sections */}
        <div>
          {SECTIONS.map((s, i) => (
            <SectionCard key={s.id} {...s} delay={i * 0.04} />
          ))}
        </div>
      </div>

      {/* ── FOOTER CTA ── */}
      <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
        style={{ position: "relative", zIndex: 1, overflow: "hidden", borderTop: "1px solid rgba(0,200,130,0.1)", padding: "4rem 2rem 5rem", textAlign: "center" }}
      >
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 70% at 50% 50%,rgba(0,200,130,0.05) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 560, margin: "0 auto" }}>
          <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} style={{ display: "inline-block", marginBottom: "1.25rem" }}>
            <div style={{ width: 64, height: 64, background: "rgba(0,200,130,0.1)", border: "1.5px solid rgba(0,200,130,0.3)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Lock size={28} color="#00c882" strokeWidth={1.75} />
            </div>
          </motion.div>
          <h3 style={{ fontSize: "2rem", fontWeight: 900, color: "#e2e8f0", letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>Ready to Install?</h3>
          <p style={{ fontSize: "0.93rem", color: "#55677a", lineHeight: 1.75, marginBottom: "2rem" }}>By installing UCP Live Grading, you agree to this Privacy Policy. Your data stays secure and under your control.</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <motion.a href="https://chromewebstore.google.com/detail/jffoifnchlblakelloghlmjldkpniglj?utm_source=item-share-cb" target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "linear-gradient(135deg,#00c882,#00a86b)", color: "#000", fontSize: "0.93rem", fontWeight: 800, padding: "13px 26px", borderRadius: 12, textDecoration: "none", boxShadow: "0 0 40px rgba(0,200,130,0.35)" }}
            >
              <Download size={17} strokeWidth={2.5} /> Install Chrome Extension
            </motion.a>
            <Link to="/"
              style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", color: "#8899aa", fontSize: "0.93rem", fontWeight: 600, padding: "13px 26px", borderRadius: 12, textDecoration: "none" }}
            >
              <ArrowLeft size={15} /> Back to Dashboard
            </Link>
          </div>
        </div>
      </motion.section>

      <style>{`
        @keyframes ppPulse { 0%,100%{opacity:1;box-shadow:0 0 8px #00c882;}50%{opacity:0.3;box-shadow:0 0 4px #00c882;} }
        @media(max-width:768px){
          .pp-body-grid{grid-template-columns:1fr !important;}
          .pp-toc{display:none !important;}
        }
      `}</style>
    </div>
  );
}
