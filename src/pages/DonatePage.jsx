import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Heart, Coffee, Code, Star, Gift, Users, Shield, CheckCircle2,
  Sparkles, ArrowLeft, Zap, ArrowRight, Terminal, Cpu,
  TrendingUp, Lock, Database, DollarSign, Send, MessageSquare,
  ChevronDown, Target
} from "lucide-react";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";

/* ─── Matrix Rain ─────────────────────────────────────── */
function MatrixRain({ opacity = 0.13 }) {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d");
    let id;
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize(); window.addEventListener("resize", resize);
    const chars = "アイウエオカキクケコ01234ABCDEFabcdef</>{}$#@!+-*";
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

/* ─── Glow Orbs ───────────────────────────────────────── */
function GlowOrbs() {
  const orbs = [
    { top: "10%", left: "5%",  size: 450, color: "rgba(0,230,150,0.055)", delay: 0 },
    { top: "55%", right: "4%", size: 500, color: "rgba(0,212,170,0.035)", delay: 3 },
    { top: "80%", left: "25%", size: 360, color: "rgba(0,180,110,0.045)", delay: 6 },
  ];
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      {orbs.map((o, i) => (
        <motion.div key={i}
          animate={{ scale: [1, 1.15, 0.92, 1], x: [0, 30, -20, 0], y: [0, -40, 25, 0] }}
          transition={{ duration: 14 + i * 3, delay: o.delay, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute", top: o.top, left: o.left, right: o.right,
            width: o.size, height: o.size, borderRadius: "50%",
            background: `radial-gradient(circle, ${o.color} 0%, transparent 70%)`,
            filter: "blur(40px)",
          }}
        />
      ))}
    </div>
  );
}

/* ─── CyberCard ───────────────────────────────────────── */
function CyberCard({ children, style = {}, delay = 0, hover = true, glowColor = "rgba(0,230,150,0.07)" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      whileHover={hover ? { y: -4, borderColor: "rgba(0,230,150,0.4)", boxShadow: "0 0 30px rgba(0,230,150,0.1), 0 20px 60px rgba(0,0,0,0.5)" } : {}}
      style={{
        background: "rgba(5,15,22,0.88)",
        border: "1px solid rgba(0,230,150,0.14)",
        borderRadius: "16px",
        backdropFilter: "blur(8px)",
        position: "relative", overflow: "hidden",
        transition: "all 200ms ease",
        ...style,
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0,
        width: "110px", height: "110px",
        background: `radial-gradient(circle at top left, ${glowColor}, transparent 70%)`,
        pointerEvents: "none",
      }} />
      {children}
    </motion.div>
  );
}

/* ─── Section ─────────────────────────────────────────── */
function Section({ children, style = {} }) {
  return <section style={{ position: "relative", zIndex: 1, ...style }}>{children}</section>;
}

/* ─── Neon Badge ──────────────────────────────────────── */
function NeonBadge({ children }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: "6px",
      background: "rgba(0,230,150,0.08)", border: "1px solid rgba(0,230,150,0.3)",
      color: "#00e696", fontSize: "0.7rem", fontWeight: 700,
      fontFamily: "'Share Tech Mono', monospace", letterSpacing: "0.12em",
      padding: "5px 14px", borderRadius: "100px", marginBottom: "1rem",
    }}>
      <span style={{ width: "6px", height: "6px", background: "#00e696", borderRadius: "50%", boxShadow: "0 0 8px #00e696", animation: "neonPulse 2s infinite", display: "inline-block" }} />
      {children}
    </div>
  );
}

/* ─── Main Donate Page ────────────────────────────────── */
export function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState(10);
  const [customAmount, setCustomAmount]     = useState("");
  const [donorName, setDonorName]           = useState("");
  const [message, setMessage]               = useState("");
  const [donated, setDonated]               = useState(false);
  const [termLines, setTermLines]           = useState([]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Terminal boot sequence
  useEffect(() => {
    const lines = [
      "> DONATION_MODULE.SYS LOADED...",
      "> PAYMENT GATEWAY: SECURE",
      "> ENCRYPTION: TLS 1.3 ACTIVE",
      "> FUND TRACKER: ONLINE",
      "> THANK YOU FOR SUPPORTING UCP ♥",
    ];
    let i = 0;
    const t = setInterval(() => {
      if (i < lines.length) { setTermLines(p => [...p, lines[i]]); i++; }
      else clearInterval(t);
    }, 480);
    return () => clearInterval(t);
  }, []);

  const amounts = [5, 10, 25, 50, 100];
  const finalAmount = customAmount || selectedAmount;

  const handleDonate = () => {
    setDonated(true);
    setTimeout(() => setDonated(false), 4000);
    setDonorName(""); setMessage(""); setCustomAmount("");
  };

  const tiers = [
    { icon: Coffee,    amount: "$5",   label: "BUY A COFFEE",      desc: "Keeps the dev fuelled and coding into the night.",     color: "linear-gradient(135deg,#f59e0b,#d97706)" },
    { icon: Code,      amount: "$25",  label: "WEEK OF DEV",       desc: "Funds one week of feature development work.",          color: "linear-gradient(135deg,#3b82f6,#06b6d4)" },
    { icon: Star,      amount: "$50",  label: "NEW FEATURE",       desc: "Help ship one new leaderboard or analytics feature.",   color: "linear-gradient(135deg,#8b5cf6,#ec4899)" },
    { icon: Gift,      amount: "$100+",label: "PREMIUM SUPPORTER", desc: "You become a named sponsor in the extension credits.",   color: "linear-gradient(135deg,#00c882,#00e696)" },
  ];

  const allocation = [
    { label: "Development",        pct: 60, color: "#00e696" },
    { label: "Server & Hosting",   pct: 25, color: "#00c882" },
    { label: "Community Support",  pct: 15, color: "#00d4aa" },
  ];

  const reasons = [
    { icon: Shield,        text: "Keep the extension free for all UCP students" },
    { icon: TrendingUp,    text: "Fund new leaderboard & analytics features"    },
    { icon: Database,      text: "Cover server, database and hosting costs"     },
    { icon: Users,         text: "Grow the open-source community around UCP"   },
    { icon: Lock,          text: "Maintain enterprise-grade encryption & security" },
    { icon: Target,        text: "Ship faster with dedicated development time"  },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#020609", overflowX: "hidden", fontFamily: "'Orbitron', monospace" }}>
      <MatrixRain opacity={0.13} />
      <GlowOrbs />
      <Navigation />

      {/* ═══════════ HERO ═══════════ */}
      <Section style={{ padding: "110px 1.5rem 60px", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
          <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: "6px", textDecoration: "none", color: "rgba(0,230,150,0.5)", fontSize: "0.72rem", fontFamily: "'Share Tech Mono', monospace", letterSpacing: "0.08em", marginBottom: "2rem" }}>
            <ArrowLeft size={13} /> BACK_TO_HOME
          </Link>

          <div style={{ marginBottom: "1.5rem" }}>
            <NeonBadge>COMMUNITY SUPPORTED // OPEN SOURCE</NeonBadge>
          </div>

          {/* Animated heart icon */}
          <motion.div
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: "80px", height: "80px",
              background: "rgba(0,200,130,0.1)",
              border: "1px solid rgba(0,230,150,0.35)",
              borderRadius: "20px",
              marginBottom: "1.75rem",
              boxShadow: "0 0 40px rgba(0,230,150,0.15)",
            }}
          >
            <Heart size={38} style={{ color: "#00e696", filter: "drop-shadow(0 0 10px #00e696)" }} fill="rgba(0,230,150,0.2)" />
          </motion.div>

          <h1 style={{
            fontSize: "clamp(2rem, 5vw, 4rem)",
            fontWeight: 900, lineHeight: 1.08,
            letterSpacing: "-0.01em",
            marginBottom: "1.25rem",
          }}>
            <span style={{ color: "#e8f5f0" }}>SUPPORT THE</span>{" "}
            <span style={{
              background: "linear-gradient(135deg, #00e696 0%, #00c882 40%, #00f5d4 80%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              backgroundSize: "200% auto", animation: "shimmerH 3s linear infinite",
            }}>MISSION.</span>
          </h1>
          <p style={{
            fontSize: "1rem", lineHeight: 1.75,
            color: "rgba(120,200,160,0.65)",
            maxWidth: "52ch", margin: "0 auto",
            fontFamily: "'Share Tech Mono', monospace",
            fontWeight: 400,
          }}>
            Built by a UCP student, for UCP students. Your support keeps servers running,
            features shipping, and the mission alive — 100% transparent.
          </p>
        </motion.div>
      </Section>

      {/* ═══════════ MAIN CONTENT ═══════════ */}
      <Section style={{ padding: "0 1.5rem 80px" }}>
        <div style={{ maxWidth: "1160px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "start" }}>

          {/* ─── LEFT: Donation Form ─── */}
          <CyberCard style={{ padding: "2.25rem" }} delay={0.1} hover={false}>
            {/* Card header */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "2rem", paddingBottom: "1rem", borderBottom: "1px solid rgba(0,230,150,0.1)" }}>
              <div style={{ width: "36px", height: "36px", background: "rgba(0,230,150,0.12)", border: "1px solid rgba(0,230,150,0.3)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <DollarSign size={18} style={{ color: "#00e696" }} />
              </div>
              <div>
                <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#e8f5f0", letterSpacing: "0.04em" }}>MAKE A DONATION</div>
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem", color: "rgba(0,230,150,0.45)", marginTop: "2px" }}>// secure_payment_module</div>
              </div>
            </div>

            {/* Amount selector */}
            <div style={{ marginBottom: "1.75rem" }}>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.7rem", color: "rgba(0,230,150,0.55)", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>SELECT_AMOUNT</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.6rem", marginBottom: "0.75rem" }}>
                {amounts.map(a => (
                  <motion.button
                    key={a}
                    onClick={() => { setSelectedAmount(a); setCustomAmount(""); }}
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    style={{
                      padding: "12px",
                      borderRadius: "10px",
                      border: selectedAmount === a && !customAmount
                        ? "1px solid rgba(0,230,150,0.5)"
                        : "1px solid rgba(0,230,150,0.1)",
                      background: selectedAmount === a && !customAmount
                        ? "rgba(0,230,150,0.1)"
                        : "rgba(5,15,22,0.6)",
                      cursor: "pointer",
                      transition: "all 150ms ease",
                      boxShadow: selectedAmount === a && !customAmount ? "0 0 16px rgba(0,230,150,0.15)" : "none",
                    }}
                  >
                    <div style={{
                      fontFamily: "'Orbitron', monospace",
                      fontSize: "1.1rem", fontWeight: 900,
                      color: selectedAmount === a && !customAmount ? "#00e696" : "rgba(120,200,160,0.6)",
                      textShadow: selectedAmount === a && !customAmount ? "0 0 12px rgba(0,230,150,0.5)" : "none",
                    }}>${a}</div>
                  </motion.button>
                ))}
              </div>

              {/* Custom amount */}
              <div style={{ position: "relative" }}>
                <DollarSign size={14} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "rgba(0,230,150,0.4)", pointerEvents: "none" }} />
                <input
                  type="number"
                  placeholder="Custom amount..."
                  value={customAmount}
                  onChange={e => setCustomAmount(e.target.value)}
                  style={{
                    width: "100%",
                    background: "rgba(0,230,150,0.03)",
                    border: customAmount ? "1px solid rgba(0,230,150,0.4)" : "1px solid rgba(0,230,150,0.1)",
                    borderRadius: "10px",
                    padding: "11px 12px 11px 34px",
                    color: customAmount ? "#e8f5f0" : "rgba(120,200,160,0.4)",
                    fontFamily: "'Orbitron', monospace",
                    fontSize: "0.85rem", outline: "none",
                    transition: "border-color 150ms ease",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            </div>

            {/* Name */}
            <div style={{ marginBottom: "1.25rem" }}>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.7rem", color: "rgba(0,230,150,0.55)", letterSpacing: "0.1em", marginBottom: "0.6rem" }}>DONOR_NAME // OPTIONAL</div>
              <input
                placeholder="Anonymous"
                value={donorName}
                onChange={e => setDonorName(e.target.value)}
                style={{
                  width: "100%",
                  background: "rgba(0,230,150,0.03)",
                  border: "1px solid rgba(0,230,150,0.1)",
                  borderRadius: "10px",
                  padding: "11px 14px",
                  color: "#e8f5f0",
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "0.82rem", outline: "none",
                  transition: "border-color 150ms ease",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Message */}
            <div style={{ marginBottom: "1.75rem" }}>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.7rem", color: "rgba(0,230,150,0.55)", letterSpacing: "0.1em", marginBottom: "0.6rem" }}>MESSAGE // OPTIONAL</div>
              <textarea
                placeholder="> Why you're supporting us..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                rows={3}
                style={{
                  width: "100%",
                  background: "rgba(0,230,150,0.03)",
                  border: "1px solid rgba(0,230,150,0.1)",
                  borderRadius: "10px",
                  padding: "11px 14px",
                  color: "#e8f5f0",
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "0.82rem", outline: "none",
                  resize: "vertical",
                  transition: "border-color 150ms ease",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* CTA Button */}
            <AnimatePresence mode="wait">
              {donated ? (
                <motion.div
                  key="success"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                    background: "rgba(0,230,150,0.1)",
                    border: "1px solid rgba(0,230,150,0.4)",
                    borderRadius: "12px",
                    padding: "16px",
                    boxShadow: "0 0 30px rgba(0,230,150,0.15)",
                  }}
                >
                  <CheckCircle2 size={20} style={{ color: "#00e696" }} />
                  <span style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.8rem", fontWeight: 700, color: "#00e696" }}>THANK YOU! DONATION RECEIVED ✓</span>
                </motion.div>
              ) : (
                <motion.button
                  key="cta"
                  onClick={handleDonate}
                  whileHover={{ scale: 1.03, y: -3, boxShadow: "0 0 40px rgba(0,200,130,0.5), 0 0 80px rgba(0,200,130,0.2)" }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    width: "100%",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "9px",
                    background: "linear-gradient(135deg, #00c882, #00a86b)",
                    color: "#000", fontFamily: "'Orbitron', monospace",
                    fontSize: "0.82rem", fontWeight: 900, letterSpacing: "0.06em",
                    border: "none", borderRadius: "12px",
                    padding: "16px",
                    cursor: "pointer",
                    boxShadow: "0 0 24px rgba(0,200,130,0.3)",
                    transition: "all 200ms ease",
                  }}
                >
                  <Heart size={16} fill="#000" />
                  DONATE ${finalAmount}
                  <ArrowRight size={15} />
                </motion.button>
              )}
            </AnimatePresence>

            <p style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.66rem", color: "rgba(0,230,150,0.3)",
              textAlign: "center", marginTop: "0.9rem",
              letterSpacing: "0.04em",
            }}>// TLS_ENCRYPTED // 100% GOES TO DEVELOPMENT</p>
          </CyberCard>

          {/* ─── RIGHT: Info cards ─── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

            {/* Terminal widget */}
            <CyberCard style={{ overflow: "hidden" }} delay={0.15} hover={false}>
              <div style={{ padding: "10px 16px", background: "rgba(0,230,150,0.05)", borderBottom: "1px solid rgba(0,230,150,0.1)", display: "flex", alignItems: "center", gap: "8px" }}>
                {["#ff5f57", "#febc2e", "#28c840"].map((col, i) => <div key={i} style={{ width: "9px", height: "9px", borderRadius: "50%", background: col }} />)}
                <div style={{ flex: 1 }} />
                <Terminal size={11} style={{ color: "rgba(0,230,150,0.4)" }} />
                <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.62rem", color: "rgba(0,230,150,0.4)" }}>donation_tracker.exe</span>
              </div>
              <div style={{ padding: "1.1rem 1.4rem", minHeight: "120px" }}>
                <AnimatePresence>
                  {termLines.map((line, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                      style={{
                        fontFamily: "'Share Tech Mono', monospace", fontSize: "0.76rem", lineHeight: 1.9,
                        color: i === termLines.length - 1 ? "#00f5d4" : "rgba(0,230,150,0.6)",
                        textShadow: i === termLines.length - 1 ? "0 0 8px rgba(0,245,212,0.5)" : "none",
                      }}
                    >{line}</motion.div>
                  ))}
                </AnimatePresence>
                <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }}
                  style={{ display: "inline-block", width: "7px", height: "14px", background: "#00e696", verticalAlign: "middle", marginLeft: "2px", boxShadow: "0 0 6px #00e696" }}
                />
              </div>
            </CyberCard>

            {/* Donation tiers */}
            <CyberCard style={{ padding: "1.75rem" }} delay={0.2}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1.25rem" }}>
                <Sparkles size={16} style={{ color: "#00e696" }} />
                <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#e8f5f0", letterSpacing: "0.04em" }}>YOUR IMPACT</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {tiers.map((tier, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25 + i * 0.08 }}
                    whileHover={{ x: 6 }}
                    style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}
                  >
                    <motion.div
                      whileHover={{ rotate: 15 }}
                      style={{
                        width: "42px", height: "42px", flexShrink: 0,
                        background: tier.color,
                        borderRadius: "11px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: "0 0 16px rgba(0,230,150,0.15)",
                      }}
                    >
                      <tier.icon size={20} style={{ color: "#000" }} />
                    </motion.div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
                        <span style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.78rem", fontWeight: 900, color: "#00e696" }}>{tier.amount}</span>
                        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.62rem", color: "rgba(0,230,150,0.45)", letterSpacing: "0.08em" }}>// {tier.label}</span>
                      </div>
                      <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.76rem", lineHeight: 1.65, color: "rgba(120,200,160,0.58)", margin: 0 }}>{tier.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CyberCard>

            {/* Fund allocation */}
            <CyberCard style={{ padding: "1.75rem" }} delay={0.25}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1.25rem" }}>
                <TrendingUp size={16} style={{ color: "#00e696" }} />
                <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#e8f5f0", letterSpacing: "0.04em" }}>WHERE DONATIONS GO</div>
              </div>
              {allocation.map((item, i) => (
                <div key={i} style={{ marginBottom: i < allocation.length - 1 ? "1rem" : 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.74rem", color: "rgba(120,200,160,0.7)" }}>{item.label}</span>
                    <span style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.74rem", fontWeight: 700, color: item.color }}>{item.pct}%</span>
                  </div>
                  <div style={{ height: "5px", background: "rgba(0,230,150,0.07)", borderRadius: "3px", overflow: "hidden" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.9 }}
                      style={{
                        height: "100%",
                        background: `linear-gradient(90deg, ${item.color}, rgba(0,230,150,0.4))`,
                        borderRadius: "3px",
                        boxShadow: `0 0 6px ${item.color}`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </CyberCard>

            {/* Why donate */}
            <CyberCard style={{ padding: "1.75rem" }} delay={0.3}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1.25rem" }}>
                <CheckCircle2 size={16} style={{ color: "#00e696" }} />
                <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#e8f5f0", letterSpacing: "0.04em" }}>WHY DONATE?</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {reasons.map((r, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.07 }}
                    whileHover={{ x: 6 }}
                    style={{ display: "flex", alignItems: "center", gap: "12px" }}
                  >
                    <r.icon size={15} style={{ color: "#00c882", flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.78rem", color: "rgba(120,200,160,0.7)" }}>{r.text}</span>
                  </motion.div>
                ))}
              </div>
            </CyberCard>
          </div>
        </div>
      </Section>

      {/* ═══════════ TRUST BANNER ═══════════ */}
      <Section style={{ padding: "0 1.5rem 80px" }}>
        <div style={{ maxWidth: "1160px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              background: "rgba(0,230,150,0.03)",
              border: "1px solid rgba(0,230,150,0.12)",
              borderRadius: "16px",
              padding: "1.75rem 2rem",
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1.5rem",
              position: "relative", overflow: "hidden",
            }}
          >
            {/* Scan line */}
            <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 3 }}
              style={{ position: "absolute", top: 0, bottom: 0, width: "2px", background: "linear-gradient(180deg,transparent,rgba(0,230,150,0.5),transparent)", pointerEvents: "none" }}
            />
            {[
              { icon: Shield,       label: "TLS ENCRYPTED" },
              { icon: Users,        label: "OPEN SOURCE" },
              { icon: CheckCircle2, label: "100% TRANSPARENT" },
              { icon: Heart,        label: "STUDENT BUILT" },
            ].map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring" }}
                whileHover={{ scale: 1.06 }}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", textAlign: "center" }}
              >
                <item.icon size={22} style={{ color: "#00e696", filter: "drop-shadow(0 0 6px rgba(0,230,150,0.5))" }} />
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.68rem", color: "rgba(0,230,150,0.5)", letterSpacing: "0.08em" }}>{item.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* Styles */}
      <style>{`
        @keyframes shimmerH { 0%{background-position:-200% 0}100%{background-position:200% 0} }
        @keyframes neonPulse { 0%,100%{opacity:1;box-shadow:0 0 8px #00e696}50%{opacity:.3;box-shadow:0 0 4px #00e696} }
        input::placeholder, textarea::placeholder { color: rgba(0,180,110,0.3); }
        input:focus, textarea:focus { border-color: rgba(0,230,150,0.35) !important; box-shadow: 0 0 0 2px rgba(0,230,150,0.07); }
        @media(max-width:900px){
          section > div > div[style*='grid-template-columns: 1fr 1fr'] { grid-template-columns: 1fr !important; }
          section > div > div[style*='repeat(4, 1fr)'] { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      <Footer />
    </div>
  );
}
