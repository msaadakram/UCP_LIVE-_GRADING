import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Zap, BarChart3, Users, Lock, CheckCircle2, Star, Clock,
  TrendingUp, MessageSquare, Heart, Coffee, Gift, Code,
  Sparkles, Shield, Target, ArrowRight, ChevronDown,
  Terminal, Cpu, Database, Wifi, Eye
} from "lucide-react";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";

/* ─── Matrix Rain Canvas ──────────────────────────────── */
function MatrixRain({ opacity = 0.15 }) {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d");
    let id;
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize(); window.addEventListener("resize", resize);
    const chars = "アイウエオカキクケコサシスセソ01234ABCDEFabcdef</>{}[]=+-*&^%$#@!";
    const fs = 13;
    let drops = [];
    const initDrops = () => { drops = Array.from({ length: Math.floor(c.width / fs) }, () => Math.random() * -100); };
    initDrops();
    const draw = () => {
      ctx.fillStyle = "rgba(2,6,9,0.045)";
      ctx.fillRect(0, 0, c.width, c.height);
      if (drops.length !== Math.floor(c.width / fs)) initDrops();
      ctx.font = `${fs}px monospace`;
      drops.forEach((y, i) => {
        const r = Math.random();
        ctx.fillStyle = r > 0.97 ? "#ffffff" : r > 0.82 ? "#00f5d4" : r > 0.5 ? "rgba(0,230,150,0.8)" : "rgba(0,180,110,0.35)";
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fs, y * fs);
        if (y * fs > c.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.55;
      });
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 0, opacity, pointerEvents: "none" }} />;
}

/* ─── Glowing Orbs Background ──────────────────────────── */
function GlowOrbs() {
  const orbs = [
    { top: "8%", left: "5%",  size: 400, color: "rgba(0,230,150,0.06)",  delay: 0 },
    { top: "50%", right: "5%", size: 500, color: "rgba(0,212,170,0.04)", delay: 3 },
    { top: "80%", left: "20%", size: 350, color: "rgba(0,180,110,0.05)", delay: 6 },
  ];
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      {orbs.map((o, i) => (
        <motion.div key={i}
          animate={{ scale: [1, 1.15, 0.92, 1], x: [0, 30, -20, 0], y: [0, -40, 25, 0] }}
          transition={{ duration: 14 + i * 3, delay: o.delay, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: o.top, left: o.left, right: o.right,
            width: o.size, height: o.size,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${o.color} 0%, transparent 70%)`,
            filter: "blur(40px)",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Section wrapper ──────────────────────────────────── */
function Section({ children, style = {} }) {
  return (
    <section style={{ position: "relative", zIndex: 1, ...style }}>
      {children}
    </section>
  );
}

/* ─── Cyber Card ───────────────────────────────────────── */
function CyberCard({ children, style = {}, delay = 0, hover = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      whileHover={hover ? { y: -5, borderColor: "rgba(0,230,150,0.45)", boxShadow: "0 0 30px rgba(0,230,150,0.1), 0 20px 60px rgba(0,0,0,0.5)" } : {}}
      style={{
        background: "rgba(5,15,22,0.85)",
        border: "1px solid rgba(0,230,150,0.14)",
        borderRadius: "16px",
        backdropFilter: "blur(8px)",
        position: "relative",
        overflow: "hidden",
        transition: "all 200ms ease",
        ...style,
      }}
    >
      {/* Corner glow */}
      <div style={{
        position: "absolute", top: 0, left: 0,
        width: "100px", height: "100px",
        background: "radial-gradient(circle at top left, rgba(0,230,150,0.07), transparent 70%)",
        pointerEvents: "none",
      }} />
      {children}
    </motion.div>
  );
}

/* ─── Stat Counter ─────────────────────────────────────── */
function StatCounter({ value, label, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 200, delay }}
      whileHover={{ scale: 1.05 }}
      style={{ textAlign: "center" }}
    >
      <div style={{
        fontFamily: "'Orbitron', monospace",
        fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
        fontWeight: 900,
        background: "linear-gradient(135deg, #00e696, #00c882, #00f5d4)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        backgroundSize: "200% auto",
        animation: "shimmerH 4s linear infinite",
        lineHeight: 1,
      }}>{value}</div>
      <div style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: "0.72rem", letterSpacing: "0.1em",
        color: "rgba(0,230,150,0.5)", marginTop: "6px",
        textTransform: "uppercase",
      }}>{label}</div>
    </motion.div>
  );
}

/* ─── Feature Item ─────────────────────────────────────── */
function FeatureItem({ icon: Icon, title, desc, color, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.55 }}
      whileHover={{ x: 8 }}
      style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}
    >
      <motion.div
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.5 }}
        style={{
          width: "48px", height: "48px", flexShrink: 0,
          background: color,
          borderRadius: "12px",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 20px rgba(0,230,150,0.2)",
        }}
      >
        <Icon size={22} style={{ color: "#000" }} />
      </motion.div>
      <div>
        <div style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: "0.88rem", fontWeight: 700,
          color: "#e8f5f0", marginBottom: "4px",
          letterSpacing: "0.03em",
        }}>{title}</div>
        <p style={{ fontSize: "0.84rem", lineHeight: 1.7, color: "rgba(120,200,160,0.65)", maxWidth: "40ch" }}>{desc}</p>
      </div>
    </motion.div>
  );
}

/* ─── Main Page ────────────────────────────────────────── */
export function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY    = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const [termLines, setTermLines] = useState([]);

  // Terminal boot sequence
  useEffect(() => {
    const lines = [
      "> INITIALIZING UCP_LIVE_GRADING.SYS...",
      "> LOADING HORIZON_PORTAL_ADAPTER...",
      "> ENCRYPTION MODULE: ONLINE",
      "> GRADE PARSER: ACTIVE",
      "> LEADERBOARD ENGINE: READY",
      "> SYSTEM STATUS: ALL SYSTEMS GO ✓",
    ];
    let i = 0;
    const timer = setInterval(() => {
      if (i < lines.length) { setTermLines(prev => [...prev, lines[i]]); i++; }
      else clearInterval(timer);
    }, 420);
    return () => clearInterval(timer);
  }, []);

  const features = [
    { icon: Zap,         title: "Instant Grading",   desc: "Real-time grade parsing directly from Horizon UCP portal.", color: "linear-gradient(135deg,#00c882,#00a86b)" },
    { icon: MessageSquare,title:"Live Feedback",    desc: "Instant comments and suggestions students see in real time.", color: "linear-gradient(135deg,#00d4aa,#00b090)" },
    { icon: TrendingUp,  title: "Progress Tracking",desc: "Live analytics and detailed academic insights over time.",   color: "linear-gradient(135deg,#00e696,#00c882)" },
    { icon: Lock,        title: "Secure & Private",  desc: "TLS-encrypted. No passwords. No third-party data sales.",   color: "linear-gradient(135deg,#00c882,#009b6a)" },
  ];

  const steps = [
    { icon: Zap,       n: "01", title: "Install Extension", desc: "One-click install from Chrome Web Store. Ready in 30 seconds.", color: "rgba(0,230,150,0.15)" },
    { icon: Shield,    n: "02", title: "Secure Your Data",  desc: "Enterprise-grade encryption ensures total data protection.",    color: "rgba(0,200,130,0.15)" },
    { icon: Eye,       n: "03", title: "Browse Horizon",   desc: "Visit your UCP Horizon course page and data syncs instantly.",  color: "rgba(0,180,110,0.15)" },
    { icon: BarChart3, n: "04", title: "View Leaderboard", desc: "See your rank vs classmates. Compete. Improve. Dominate.",     color: "rgba(0,160,100,0.15)" },
    { icon: TrendingUp,n: "05", title: "Track Progress",   desc: "Historical grade trends give you a clear academic roadmap.",   color: "rgba(0,230,150,0.15)" },
    { icon: Target,    n: "06", title: "Set Goals",        desc: "Custom rubrics and goal tracking push you to excellence.",     color: "rgba(0,200,130,0.15)" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#020609", overflowX: "hidden" }}>
      <MatrixRain opacity={0.14} />
      <GlowOrbs />
      <Navigation />

      {/* ═══════════ HERO ═══════════ */}
      <section ref={heroRef} style={{
        position: "relative", zIndex: 1,
        minHeight: "100vh",
        display: "flex", alignItems: "center",
        padding: "100px 1.5rem 60px",
        overflow: "hidden",
      }}>
        {/* Hex grid overlay */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='52' viewBox='0 0 60 52'%3E%3Cpath d='M30 0 L60 17.3 L60 34.7 L30 52 L0 34.7 L0 17.3 Z' fill='none' stroke='rgba(0,230,150,0.04)' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 52px",
        }} />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
            {/* Left */}
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: "7px",
                  background: "rgba(0,230,150,0.08)", border: "1px solid rgba(0,230,150,0.3)",
                  color: "#00e696", fontSize: "0.7rem", fontWeight: 700,
                  fontFamily: "'Share Tech Mono', monospace", letterSpacing: "0.12em",
                  padding: "5px 14px", borderRadius: "100px", marginBottom: "1.5rem",
                }}>
                  <span style={{ width: "6px", height: "6px", background: "#00e696", borderRadius: "50%", boxShadow: "0 0 8px #00e696", animation: "neonPulse 2s infinite" }} />
                  LIVE GRADING TECHNOLOGY // ACTIVE
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                style={{
                  fontFamily: "'Orbitron', monospace",
                  fontSize: "clamp(2rem, 4.5vw, 3.8rem)",
                  fontWeight: 900,
                  lineHeight: 1.1,
                  marginBottom: "1.25rem",
                  letterSpacing: "-0.01em",
                }}
              >
                <span style={{ color: "#e8f5f0" }}>GRADE</span>{" "}
                <span style={{
                  background: "linear-gradient(135deg, #00e696 0%, #00c882 40%, #00f5d4 80%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  backgroundSize: "200% auto", animation: "shimmerH 3s linear infinite",
                  display: "block",
                }}>SMARTER.</span>
                <span style={{ color: "rgba(0,230,150,0.55)", fontSize: "0.55em", fontWeight: 400, letterSpacing: "0.15em", display: "block", marginTop: "6px" }}>
                  NOT HARDER. // POWERED BY AI
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                style={{ fontSize: "1rem", lineHeight: 1.75, color: "rgba(120,200,160,0.7)", maxWidth: "48ch", marginBottom: "2rem" }}
              >
                Transform your academic journey with real-time grade tracking,
                encrypted leaderboards, and intelligent insights — built exclusively for UCP Horizon.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2.5rem" }}
              >
                <motion.a
                  href="https://chromewebstore.google.com/detail/jffoifnchlblakelloghlmjldkpniglj"
                  target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.04, y: -3 }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    display: "flex", alignItems: "center", gap: "8px",
                    background: "linear-gradient(135deg, #00c882, #00a86b)",
                    color: "#000", fontWeight: 900,
                    fontFamily: "'Orbitron', monospace",
                    fontSize: "0.78rem", letterSpacing: "0.06em",
                    padding: "14px 28px", borderRadius: "10px",
                    boxShadow: "0 0 30px rgba(0,200,130,0.4), 0 0 60px rgba(0,200,130,0.15)",
                    textDecoration: "none",
                    position: "relative", overflow: "hidden",
                  }}
                >
                  <Zap size={16} fill="#000" />
                  INSTALL FREE
                  <ArrowRight size={14} />
                </motion.a>
                <Link to="/leaderboard">
                  <motion.div
                    whileHover={{ scale: 1.04, y: -3 }}
                    whileTap={{ scale: 0.96 }}
                    style={{
                      display: "flex", alignItems: "center", gap: "8px",
                      background: "transparent",
                      color: "#00e696", fontWeight: 700,
                      fontFamily: "'Orbitron', monospace",
                      fontSize: "0.78rem", letterSpacing: "0.06em",
                      padding: "13px 24px", borderRadius: "10px",
                      border: "1px solid rgba(0,230,150,0.4)",
                      boxShadow: "0 0 12px rgba(0,230,150,0.08)",
                      cursor: "pointer",
                    }}
                  >
                    <BarChart3 size={15} />
                    LEADERBOARD
                  </motion.div>
                </Link>
              </motion.div>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                style={{
                  display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "1.5rem",
                  padding: "1.5rem",
                  background: "rgba(0,230,150,0.03)",
                  border: "1px solid rgba(0,230,150,0.1)",
                  borderRadius: "12px",
                }}
              >
                <StatCounter value="10K+" label="Installers" delay={0.6} />
                <StatCounter value="70K+" label="Courses" delay={0.7} />
                <StatCounter value="95%" label="Accuracy" delay={0.8} />
              </motion.div>
            </div>

            {/* Right — Terminal */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              style={{ position: "relative" }}
            >
              {/* Outer glow */}
              <motion.div
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                  position: "absolute", inset: "-20px",
                  background: "radial-gradient(ellipse, rgba(0,230,150,0.08) 0%, transparent 70%)",
                  borderRadius: "24px", pointerEvents: "none",
                }}
              />
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  background: "rgba(5,12,18,0.95)",
                  border: "1px solid rgba(0,230,150,0.3)",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 0 40px rgba(0,230,150,0.15), 0 40px 80px rgba(0,0,0,0.5)",
                }}
              >
                {/* Terminal title bar */}
                <div style={{
                  padding: "12px 16px",
                  background: "rgba(0,230,150,0.05)",
                  borderBottom: "1px solid rgba(0,230,150,0.12)",
                  display: "flex", alignItems: "center", gap: "8px",
                }}>
                  {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
                    <div key={i} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c }} />
                  ))}
                  <div style={{ flex: 1 }} />
                  <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.7rem", color: "rgba(0,230,150,0.5)" }}>
                    ucp_grading.exe
                  </div>
                  <Terminal size={12} style={{ color: "rgba(0,230,150,0.4)" }} />
                </div>
                {/* Terminal content */}
                <div style={{ padding: "1.25rem 1.5rem", minHeight: "280px" }}>
                  <AnimatePresence>
                    {termLines.map((line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        style={{
                          fontFamily: "'Share Tech Mono', monospace",
                          fontSize: "0.8rem",
                          lineHeight: 2,
                          color: i === termLines.length - 1 ? "#00f5d4" : "rgba(0,230,150,0.7)",
                          textShadow: i === termLines.length - 1 ? "0 0 10px rgba(0,245,212,0.6)" : "none",
                        }}
                      >
                        {line}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {/* Blinking cursor */}
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    style={{
                      display: "inline-block",
                      width: "8px", height: "16px",
                      background: "#00e696",
                      verticalAlign: "middle",
                      marginLeft: "2px",
                      boxShadow: "0 0 8px #00e696",
                    }}
                  />
                </div>
                {/* Status bar */}
                <div style={{
                  padding: "8px 16px",
                  background: "rgba(0,230,150,0.04)",
                  borderTop: "1px solid rgba(0,230,150,0.1)",
                  display: "flex", justifyContent: "space-between",
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "0.65rem", color: "rgba(0,230,150,0.4)",
                }}>
                  <span>CPU: 12% | RAM: 48MB</span>
                  <span style={{ color: "#00c882" }}>● CONNECTED</span>
                </div>
              </motion.div>

              {/* Floating data chips */}
              {[{icon: Cpu, v: "AI", t: "PARSER", top: "-20px", right: "-20px"}, {icon: Database, v: "DB", t: "SECURE", bottom: "20px", left: "-30px"}, {icon: Wifi, v: "TLS", t: "ENCRYPTED", top: "40%", right: "-30px"}].map((c, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4 + i, repeat: Infinity, delay: i * 1.2 }}
                  style={{
                    position: "absolute", top: c.top, bottom: c.bottom,
                    left: c.left, right: c.right,
                    background: "rgba(5,15,22,0.9)",
                    border: "1px solid rgba(0,230,150,0.3)",
                    borderRadius: "10px", padding: "8px 12px",
                    display: "flex", alignItems: "center", gap: "6px",
                    boxShadow: "0 0 20px rgba(0,230,150,0.1)",
                  }}
                >
                  <c.icon size={13} style={{ color: "#00e696" }} />
                  <div>
                    <div style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.62rem", color: "#00e696", fontWeight: 700 }}>{c.v}</div>
                    <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.56rem", color: "rgba(0,230,150,0.4)" }}>{c.t}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            position: "absolute", bottom: "2rem", left: "50%",
            transform: "translateX(-50%)",
            display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
          }}
        >
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem", color: "rgba(0,230,150,0.35)", letterSpacing: "0.1em" }}>SCROLL DOWN</div>
          <ChevronDown size={16} style={{ color: "rgba(0,230,150,0.4)" }} />
        </motion.div>
      </section>

      {/* ═══════════ FEATURES ═══════════ */}
      <Section style={{ padding: "100px 1.5rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: "60px" }}
          >
            <div className="neon-badge" style={{ marginBottom: "1rem" }}>
              <span className="neon-dot" />
              CORE FEATURES
            </div>
            <h2 style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)",
              fontWeight: 900, color: "#e8f5f0",
              letterSpacing: "-0.01em",
            }}>Grade Anywhere.<br />
              <span style={{ background: "linear-gradient(135deg,#00e696,#00c882,#00f5d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Anytime.</span>
            </h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {features.map((f, i) => <FeatureItem key={i} {...f} delay={i * 0.1} />)}
            </div>
            {/* Right visual */}
            <CyberCard style={{ padding: "2rem" }} delay={0.2}>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.72rem", color: "rgba(0,230,150,0.5)", marginBottom: "1.5rem" }}>
                // live_grade_monitor.js
              </div>
              {[
                { label: "CS-401 DATA STRUCTURES",  score: 92, color: "#00e696" },
                { label: "CS-403 ALGORITHMS",        score: 78, color: "#00c882" },
                { label: "MATH-301 DISC. MATH",      score: 85, color: "#00d4aa" },
                { label: "CS-405 OS CONCEPTS",       score: 61, color: "#00a86b" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  style={{ marginBottom: "1.25rem" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.75rem", color: "rgba(0,230,150,0.7)" }}>{item.label}</span>
                    <span style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.75rem", fontWeight: 700, color: item.color }}>{item.score}%</span>
                  </div>
                  <div style={{ height: "6px", background: "rgba(0,230,150,0.08)", borderRadius: "3px", overflow: "hidden" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.score}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.12 + 0.3, duration: 0.8 }}
                      style={{
                        height: "100%",
                        background: `linear-gradient(90deg, ${item.color}, rgba(0,230,150,0.4))`,
                        borderRadius: "3px",
                        boxShadow: `0 0 8px ${item.color}`,
                        position: "relative", overflow: "hidden",
                      }}
                    >
                      <div style={{
                        position: "absolute", inset: 0,
                        background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)",
                        animation: "shimmerH 1.5s infinite",
                      }} />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </CyberCard>
          </div>
        </div>
      </Section>

      {/* ═══════════ STATS BANNER ═══════════ */}
      <Section style={{ padding: "60px 1.5rem" }}>
        <div style={{
          maxWidth: "1200px", margin: "0 auto",
          background: "rgba(0,230,150,0.03)",
          border: "1px solid rgba(0,230,150,0.12)",
          borderRadius: "20px",
          padding: "3rem 2rem",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "2rem",
          position: "relative", overflow: "hidden",
        }}>
          {/* Scan line */}
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            style={{
              position: "absolute", top: 0, bottom: 0, width: "2px",
              background: "linear-gradient(180deg, transparent, rgba(0,230,150,0.5), transparent)",
              pointerEvents: "none",
            }}
          />
          {[
            { v: "10K+", l: "Active Users" },
            { v: "70K+", l: "Courses Tracked" },
            { v: "99.9%", l: "Uptime" },
            { v: "< 1s", l: "Sync Speed" },
          ].map((s, i) => <StatCounter key={i} value={s.v} label={s.l} delay={i * 0.1} />)}
        </div>
      </Section>

      {/* ═══════════ HOW IT WORKS ═══════════ */}
      <Section style={{ padding: "100px 1.5rem", background: "rgba(0,15,10,0.4)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: "60px" }}
          >
            <div className="neon-badge" style={{ marginBottom: "1rem" }}>
              <span className="neon-dot" />
              HOW IT WORKS
            </div>
            <h2 style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)",
              fontWeight: 900, color: "#e8f5f0",
            }}>6-Step <span style={{ background: "linear-gradient(135deg,#00e696,#00c882)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Protocol</span></h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
            {steps.map((step, i) => (
              <CyberCard key={i} style={{ padding: "1.75rem" }} delay={i * 0.08}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                  <div style={{
                    width: "44px", height: "44px",
                    background: step.color,
                    border: "1px solid rgba(0,230,150,0.25)",
                    borderRadius: "12px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <step.icon size={20} style={{ color: "#00e696" }} />
                  </div>
                  <span style={{
                    fontFamily: "'Orbitron', monospace",
                    fontSize: "1.5rem", fontWeight: 900,
                    color: "rgba(0,230,150,0.1)",
                    lineHeight: 1,
                  }}>{step.n}</span>
                </div>
                <div style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.82rem", fontWeight: 700, color: "#e8f5f0", marginBottom: "0.5rem", letterSpacing: "0.03em" }}>{step.title}</div>
                <p style={{ fontSize: "0.82rem", lineHeight: 1.7, color: "rgba(120,200,160,0.6)" }}>{step.desc}</p>
              </CyberCard>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════════ SUPPORT CTA ═══════════ */}
      <Section style={{ padding: "100px 1.5rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{
              background: "linear-gradient(135deg, rgba(0,200,130,0.08) 0%, rgba(0,180,110,0.04) 100%)",
              border: "1px solid rgba(0,230,150,0.25)",
              borderRadius: "24px",
              padding: "3.5rem 3rem",
              textAlign: "center",
              position: "relative", overflow: "hidden",
              boxShadow: "0 0 60px rgba(0,230,150,0.06)",
            }}
          >
            {/* Animated border */}
            <motion.div
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(135deg, rgba(0,230,150,0.04), transparent, rgba(0,230,150,0.04))",
                borderRadius: "24px",
                pointerEvents: "none",
              }}
            />
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{ display: "inline-flex", marginBottom: "1.5rem" }}
            >
              <Heart size={48} style={{ color: "#00e696", filter: "drop-shadow(0 0 12px #00e696)" }} />
            </motion.div>
            <h2 style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
              fontWeight: 900, color: "#e8f5f0",
              marginBottom: "1rem",
            }}>
              SUPPORT THE <span style={{ background: "linear-gradient(135deg,#00e696,#00f5d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>MISSION</span>
            </h2>
            <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "rgba(120,200,160,0.65)", maxWidth: "50ch", margin: "0 auto 2rem" }}>
              Built by a student, for students. Your support keeps the servers running,
              the code maintained, and the mission alive.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
              <Link to="/donate">
                <motion.div
                  whileHover={{ scale: 1.04, y: -3 }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    display: "flex", alignItems: "center", gap: "8px",
                    background: "linear-gradient(135deg, #00c882, #00a86b)",
                    color: "#000", fontWeight: 900,
                    fontFamily: "'Orbitron', monospace", fontSize: "0.78rem", letterSpacing: "0.06em",
                    padding: "14px 28px", borderRadius: "10px",
                    boxShadow: "0 0 30px rgba(0,200,130,0.4)",
                    cursor: "pointer",
                  }}
                >
                  <Heart size={15} fill="#000" />
                  DONATE NOW
                </motion.div>
              </Link>
              <motion.a
                href="https://chromewebstore.google.com/detail/jffoifnchlblakelloghlmjldkpniglj"
                target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -3 }}
                style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  background: "transparent",
                  color: "#00e696", fontWeight: 700,
                  fontFamily: "'Orbitron', monospace", fontSize: "0.78rem", letterSpacing: "0.06em",
                  padding: "13px 24px", borderRadius: "10px",
                  border: "1px solid rgba(0,230,150,0.4)",
                  textDecoration: "none",
                }}
              >
                <Zap size={15} />
                GET EXTENSION
              </motion.a>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ═══════════ RESPONSIVE STYLES ═══════════ */}
      <style>{`
        @keyframes shimmerH { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes neonPulse { 0%,100% { opacity:1; box-shadow:0 0 8px #00e696; } 50% { opacity:0.3; box-shadow:0 0 4px #00e696; } }
        .neon-badge { display:inline-flex; align-items:center; gap:6px; background:rgba(0,230,150,0.08); border:1px solid rgba(0,230,150,0.3); color:#00e696; font-size:0.7rem; font-weight:700; font-family:'Share Tech Mono',monospace; letter-spacing:0.1em; text-transform:uppercase; padding:5px 14px; border-radius:100px; }
        .neon-dot { width:6px; height:6px; background:#00e696; border-radius:50%; box-shadow:0 0 8px #00e696; animation:neonPulse 2s ease-in-out infinite; display:inline-block; }
        @media (max-width: 900px) {
          section > div > div[style*='grid-template-columns: 1fr 1fr'] { grid-template-columns: 1fr !important; }
          section > div > div[style*='repeat(4, 1fr)'] { grid-template-columns: 1fr 1fr !important; }
          section > div > div[style*='repeat(3, 1fr)'] { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          section > div > div[style*='repeat(3, 1fr)'] { grid-template-columns: 1fr !important; }
          section > div > div[style*='repeat(4, 1fr)'] { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      <Footer />
    </div>
  );
}
