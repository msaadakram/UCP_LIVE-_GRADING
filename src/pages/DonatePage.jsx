import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, DollarSign, Coffee, Code, Star, Gift, Shield, TrendingUp,
  Lock, Database, Users, Target, CheckCircle2, Send, ArrowRight,
  ArrowLeft, Terminal, Copy, Check, Bitcoin, Zap, Smartphone,
  CreditCard, Globe, Wallet,
} from "lucide-react";

/* ── Matrix Rain ── */
function MatrixRain() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const chars = "アイウエオカキクケコ0123456789ABCDEF</>{}[]";
    const fontSize = 13;
    let cols = Math.floor(canvas.width / fontSize);
    let drops = Array.from({ length: cols }, () => Math.random() * -100);
    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.04)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      cols = Math.floor(canvas.width / fontSize);
      if (drops.length !== cols) drops = Array.from({ length: cols }, () => Math.random() * -100);
      ctx.font = `${fontSize}px monospace`;
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const b = Math.random();
        ctx.fillStyle = b > 0.95 ? "#ffffff" : b > 0.8 ? "#00ffaa" : "rgba(0,200,130,0.6)";
        ctx.fillText(char, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.5;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, opacity: 0.18, pointerEvents: "none" }} />;
}

/* ── Glow Orbs ── */
function GlowOrbs() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "15%", left: "10%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(0,200,130,0.06) 0%, transparent 70%)", borderRadius: "50%" }} />
      <div style={{ position: "absolute", bottom: "20%", right: "8%", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(0,150,200,0.04) 0%, transparent 70%)", borderRadius: "50%" }} />
    </div>
  );
}

/* ── CyberCard ── */
function CyberCard({ children, style = {}, glowColor = "rgba(0,200,130,0.15)" }) {
  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: `0 16px 48px ${glowColor}, 0 0 0 1px rgba(0,200,130,0.2)` }}
      style={{
        background: "linear-gradient(135deg, rgba(10,20,16,0.95) 0%, rgba(5,12,10,0.98) 100%)",
        border: "1px solid rgba(0,200,130,0.15)",
        borderRadius: "16px",
        overflow: "hidden",
        position: "relative",
        transition: "box-shadow 300ms ease",
        ...style,
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, rgba(0,200,130,0.6), transparent)" }} />
      <div style={{ position: "absolute", top: 0, left: 0, width: "80px", height: "80px", background: "radial-gradient(circle at top left, rgba(0,200,130,0.08), transparent 70%)", pointerEvents: "none" }} />
      {children}
    </motion.div>
  );
}

/* ── NeonBadge ── */
function NeonBadge({ children, color = "#00c882" }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: `rgba(0,200,130,0.08)`, border: `1px solid rgba(0,200,130,0.3)`, color, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "3px 10px", borderRadius: "100px" }}>
      <span style={{ width: "5px", height: "5px", background: color, borderRadius: "50%", boxShadow: `0 0 6px ${color}`, animation: "neonPulse 2s ease-in-out infinite", display: "inline-block" }} />
      {children}
    </span>
  );
}

/* ── CopyButton ── */
function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <motion.button
      onClick={handleCopy}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      style={{
        background: copied ? "rgba(0,200,130,0.15)" : "rgba(255,255,255,0.06)",
        border: `1px solid ${copied ? "rgba(0,200,130,0.4)" : "rgba(255,255,255,0.12)"}`,
        borderRadius: "8px",
        padding: "6px 10px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "5px",
        color: copied ? "#00c882" : "#64748b",
        fontSize: "0.75rem",
        fontWeight: 600,
        flexShrink: 0,
        transition: "all 200ms ease",
      }}
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? "Copied!" : "Copy"}
    </motion.button>
  );
}

/* ── AnimatedAddress ── */
function AnimatedAddress({ address, color = "#00c882" }) {
  const [revealed, setRevealed] = useState(false);
  const [displayChars, setDisplayChars] = useState([]);
  const CHARS = "ABCDEF0123456789abcdefghijklmnopqrstuvwxyz";

  useEffect(() => {
    if (!revealed) { setDisplayChars([]); return; }
    let i = 0;
    const interval = setInterval(() => {
      if (i >= address.length) { clearInterval(interval); setDisplayChars(address.split("")); return; }
      setDisplayChars(prev => {
        const next = [...prev];
        next[i] = address[i];
        // scramble upcoming chars
        for (let j = i + 1; j < Math.min(i + 4, address.length); j++) {
          next[j] = CHARS[Math.floor(Math.random() * CHARS.length)];
        }
        return next;
      });
      i++;
    }, 28);
    return () => clearInterval(interval);
  }, [revealed, address]);

  return (
    <div style={{ marginTop: "0.6rem" }}>
      {!revealed ? (
        <motion.button
          onClick={() => setRevealed(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          style={{ background: `rgba(0,200,130,0.07)`, border: `1px dashed rgba(0,200,130,0.3)`, borderRadius: "10px", padding: "10px 18px", cursor: "pointer", color: color, fontSize: "0.82rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px", width: "100%", justifyContent: "center" }}
        >
          <Wallet size={14} /> Click to Reveal Address
        </motion.button>
      ) : (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
          style={{ background: "rgba(0,0,0,0.4)", border: `1px solid rgba(0,200,130,0.2)`, borderRadius: "10px", padding: "10px 14px", display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}
        >
          <code style={{ flex: 1, fontSize: "0.72rem", fontFamily: "'Courier New', monospace", color, wordBreak: "break-all", letterSpacing: "0.04em", lineHeight: 1.6 }}>
            {displayChars.join("") || address}
          </code>
          <CopyButton text={address} />
        </motion.div>
      )}
    </div>
  );
}

/* ── Payment Method Card ── */
function PaymentCard({ icon: Icon, title, subtitle, badge, color, glowColor, children }) {
  return (
    <CyberCard glowColor={glowColor} style={{ padding: "1.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1rem" }}>
        <div style={{ width: "44px", height: "44px", background: `${color}18`, border: `1px solid ${color}40`, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: `0 0 16px ${color}20` }}>
          <Icon size={20} color={color} strokeWidth={2} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: "1rem", fontWeight: 700, color: "#e2e8f0", marginBottom: "2px" }}>{title}</div>
          <div style={{ fontSize: "0.78rem", color: "#64748b" }}>{subtitle}</div>
        </div>
        {badge && <NeonBadge color={color}>{badge}</NeonBadge>}
      </div>
      {children}
    </CyberCard>
  );
}

export function DonatePage() {
  const [donateSuccess, setDonateSuccess] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(500);
  const [customAmount, setCustomAmount] = useState("");

  const amounts = [100, 250, 500, 1000, 2500];

  const whyItems = [
    { Icon: Coffee, label: "Keep servers running", desc: "Hosting, DB, CDN costs for all UCP students" },
    { Icon: Code,   label: "New features faster",  desc: "GPA predictor, AI insights, push notifications" },
    { Icon: Shield, label: "Security audits",       desc: "Regular penetration testing & code reviews" },
    { Icon: TrendingUp, label: "Scale to all UCP",  desc: "Expand leaderboard to every department" },
  ];

  const impactTiers = [
    { amount: "Rs. 100",  Icon: Coffee,   label: "Coffee Tier",   desc: "Keeps the server alive for a week",       color: "#f59e0b" },
    { amount: "Rs. 500",  Icon: Code,     label: "Dev Tier",      desc: "Funds a new feature build",               color: "#00c882" },
    { amount: "Rs. 1000", Icon: Star,     label: "Star Tier",     desc: "Monthly hosting + backups covered",       color: "#8b5cf6" },
    { amount: "Rs. 2500", Icon: Target,   label: "Champion Tier", desc: "Security audit + major upgrade sprint",   color: "#ef4444" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#020609", color: "#e2e8f0", fontFamily: "'Orbitron','Share Tech Mono',monospace", position: "relative", paddingTop: "60px" }}>
      <MatrixRain />
      <GlowOrbs />

      {/* ── Hero ── */}
      <div style={{ position: "relative", zIndex: 1, padding: "5rem 2rem 3rem", textAlign: "center" }}>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.15, type: "spring", stiffness: 180 }} style={{ display: "inline-block", marginBottom: "1.5rem" }}>
          <div style={{ width: "80px", height: "80px", margin: "0 auto", background: "linear-gradient(135deg, rgba(0,200,130,0.15), rgba(0,200,130,0.05))", border: "1px solid rgba(0,200,130,0.45)", borderRadius: "20px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 40px rgba(0,200,130,0.25)" }}>
            <Heart size={36} color="#00c882" strokeWidth={1.75} />
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.6 }}>
          <NeonBadge>Open Source · Student Built</NeonBadge>
          <h1 style={{ fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 900, lineHeight: 1.1, margin: "1.25rem 0 1rem", letterSpacing: "-0.02em" }}>
            <span style={{ color: "#e2e8f0" }}>Support </span>
            <span style={{ background: "linear-gradient(135deg, #00c882, #00a86b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>UCP Live Grading</span>
          </h1>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "#64748b", maxWidth: "56ch", margin: "0 auto" }}>
            Built by a UCP student, for UCP students — 100% free, no ads, no selling your data. Your support keeps it alive and growing.
          </p>
        </motion.div>
      </div>

      {/* ── Main Grid ── */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem 5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "start" }} className="donate-grid">

        {/* Left: Payment Methods */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ marginBottom: "0.25rem" }}>
            <div style={{ fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "#00c882", marginBottom: "0.35rem" }}>Payment Methods</div>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#e2e8f0", margin: 0 }}>Choose Your Way to Give</h2>
          </div>

          {/* EasyPaisa */}
          <PaymentCard icon={Smartphone} title="EasyPaisa" subtitle="Pakistan's #1 mobile wallet" badge="PKR" color="#00c882" glowColor="rgba(0,200,130,0.2)">
            <div style={{ background: "rgba(0,200,130,0.05)", border: "1px solid rgba(0,200,130,0.15)", borderRadius: "10px", padding: "1rem" }}>
              <div style={{ fontSize: "0.75rem", color: "#64748b", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Account Number</div>
              <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "#00c882", letterSpacing: "0.12em", fontFamily: "'Courier New', monospace" }}>0332 657 4555</div>
              <div style={{ fontSize: "0.78rem", color: "#475569", marginTop: "4px" }}>Send to Mobile Account · EasyPaisa App</div>
            </div>
          </PaymentCard>

          {/* JazzCash */}
          <PaymentCard icon={CreditCard} title="JazzCash" subtitle="Send via JazzCash mobile" badge="PKR" color="#f59e0b" glowColor="rgba(245,158,11,0.15)">
            <div style={{ background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.15)", borderRadius: "10px", padding: "1rem" }}>
              <div style={{ fontSize: "0.75rem", color: "#64748b", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Mobile Number</div>
              <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "#f59e0b", letterSpacing: "0.12em", fontFamily: "'Courier New', monospace" }}>0332 657 4555</div>
              <div style={{ fontSize: "0.78rem", color: "#475569", marginTop: "4px" }}>JazzCash Mobile Account · Instant Transfer</div>
            </div>
          </PaymentCard>

          {/* Bitcoin */}
          <PaymentCard icon={Bitcoin} title="Bitcoin (BTC)" subtitle="On-chain Bitcoin payment" badge="CRYPTO" color="#f7931a" glowColor="rgba(247,147,26,0.15)">
            <div style={{ background: "rgba(247,147,26,0.05)", border: "1px solid rgba(247,147,26,0.15)", borderRadius: "10px", padding: "1rem" }}>
              <div style={{ fontSize: "0.75rem", color: "#64748b", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.08em" }}>BTC Address · SegWit (bc1q)</div>
              <AnimatedAddress address="bc1qfqmkdqa80fzhcadgt7ep58vwrphwahmjcm6t7a" color="#f7931a" />
              <div style={{ marginTop: "0.6rem", display: "flex", alignItems: "center", gap: "6px", fontSize: "0.75rem", color: "#475569" }}>
                <Globe size={12} color="#f7931a" /> Any BTC wallet · Minimum any amount
              </div>
            </div>
          </PaymentCard>

          {/* Ravencoin */}
          <PaymentCard icon={Zap} title="Ravencoin (RVN)" subtitle="Community-first crypto" badge="CRYPTO" color="#384de3" glowColor="rgba(56,77,227,0.15)">
            <div style={{ background: "rgba(56,77,227,0.06)", border: "1px solid rgba(56,77,227,0.2)", borderRadius: "10px", padding: "1rem" }}>
              <div style={{ fontSize: "0.75rem", color: "#64748b", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.08em" }}>RVN Address</div>
              <AnimatedAddress address="RDMaQ1mTaQpW59wNUsnGYAyhRm4spAfKc3" color="#818cf8" />
              <div style={{ marginTop: "0.6rem", display: "flex", alignItems: "center", gap: "6px", fontSize: "0.75rem", color: "#475569" }}>
                <Globe size={12} color="#818cf8" /> Official Ravencoin wallet · KuCoin · Gate.io
              </div>
            </div>
          </PaymentCard>
        </div>

        {/* Right: Why Donate + Terminal + Impact */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

          {/* Why Donate */}
          <CyberCard style={{ padding: "1.5rem" }}>
            <div style={{ fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "#00c882", marginBottom: "1rem" }}>Why Support?</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {whyItems.map(({ Icon, label, desc }, i) => (
                <motion.div key={i} whileHover={{ x: 4 }} style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "0.85rem", background: "rgba(0,200,130,0.04)", border: "1px solid rgba(0,200,130,0.1)", borderRadius: "10px" }}>
                  <div style={{ width: "34px", height: "34px", background: "rgba(0,200,130,0.1)", border: "1px solid rgba(0,200,130,0.2)", borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={16} color="#00c882" strokeWidth={2} />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#e2e8f0", marginBottom: "2px" }}>{label}</div>
                    <div style={{ fontSize: "0.78rem", color: "#64748b" }}>{desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CyberCard>

          {/* Terminal */}
          <CyberCard style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ background: "rgba(0,0,0,0.5)", borderBottom: "1px solid rgba(0,200,130,0.15)", padding: "10px 14px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Terminal size={13} color="#00c882" />
              <span style={{ fontSize: "0.72rem", color: "#64748b", fontFamily: "monospace" }}>donation_impact.sh</span>
              <div style={{ display: "flex", gap: "5px", marginLeft: "auto" }}>
                {["#ef4444", "#f59e0b", "#00c882"].map(c => <div key={c} style={{ width: "10px", height: "10px", background: c, borderRadius: "50%", opacity: 0.7 }} />)}
              </div>
            </div>
            <div style={{ padding: "1rem 1.25rem", fontFamily: "'Courier New', monospace", fontSize: "0.78rem", lineHeight: 1.9 }}>
              {[
                { prompt: "$", cmd: "uptime --servers", out: "99.8% uptime · 2,400+ students served" },
                { prompt: "$", cmd: "git log --features", out: "47 features shipped · 3 in progress" },
                { prompt: "$", cmd: "check donations", out: "Each rupee → 1 student gets better grades" },
                { prompt: "$", cmd: "status", out: "Extension: LIVE ✓  DB: SECURE ✓  FREE: ∞" },
              ].map(({ prompt, cmd, out }, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}>
                  <div><span style={{ color: "#00c882" }}>{prompt} </span><span style={{ color: "#e2e8f0" }}>{cmd}</span></div>
                  <div style={{ color: "#64748b", paddingLeft: "1.2rem" }}>{out}</div>
                </motion.div>
              ))}
            </div>
          </CyberCard>

          {/* Impact Tiers */}
          <CyberCard style={{ padding: "1.5rem" }}>
            <div style={{ fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "#00c882", marginBottom: "1rem" }}>Impact Tiers</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              {impactTiers.map(({ amount, Icon, label, desc, color }, i) => (
                <motion.div key={i} whileHover={{ x: 4 }} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "0.85rem 1rem", background: `${color}0a`, border: `1px solid ${color}22`, borderRadius: "10px" }}>
                  <Icon size={18} color={color} strokeWidth={2} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#e2e8f0" }}>{label} <span style={{ color, marginLeft: "4px" }}>{amount}</span></div>
                    <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{desc}</div>
                  </div>
                  <div style={{ width: "100%", maxWidth: "80px", height: "4px", background: "rgba(255,255,255,0.06)", borderRadius: "4px", overflow: "hidden" }}>
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${(i + 1) * 22}%` }} viewport={{ once: true }} transition={{ delay: i * 0.1 + 0.3 }} style={{ height: "100%", background: color, borderRadius: "4px", boxShadow: `0 0 8px ${color}` }} />
                  </div>
                </motion.div>
              ))}
            </div>
          </CyberCard>

          {/* Security note */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "1rem", background: "rgba(0,200,130,0.04)", border: "1px solid rgba(0,200,130,0.12)", borderRadius: "12px" }}>
            <Lock size={15} color="#00c882" style={{ marginTop: "2px", flexShrink: 0 }} />
            <p style={{ margin: 0, fontSize: "0.78rem", color: "#64748b", lineHeight: 1.6 }}>
              <strong style={{ color: "#94a3b8" }}>Privacy guaranteed.</strong> All crypto addresses belong exclusively to the developer. No middlemen. Donations go directly to server costs and development time.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap');
        @keyframes neonPulse { 0%,100%{opacity:1;box-shadow:0 0 6px currentColor;}50%{opacity:0.4;} }
        @media(max-width:900px){.donate-grid{grid-template-columns:1fr !important;}}
      `}</style>
    </div>
  );
}
