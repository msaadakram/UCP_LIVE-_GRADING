import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Home, HeartHandshake, GraduationCap } from "lucide-react";

/* ── Green matrix rain matching site theme ── */
function MatrixRain() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const chars = "404</>UCP_LIVE_GRADINGエラー01";
    const fs = 13;
    let drops = Array.from(
      { length: Math.floor(window.innerWidth / fs) },
      () => Math.random() * -80
    );
    const draw = () => {
      ctx.fillStyle = "rgba(2,6,9,0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fs}px monospace`;
      drops.forEach((y, i) => {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        const bright = Math.random() > 0.92;
        ctx.fillStyle = bright ? "#00c882" : "rgba(0,200,130,0.25)";
        ctx.fillText(ch, i * fs, y * fs);
        if (y * fs > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.45;
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
        position: "fixed", inset: 0,
        width: "100%", height: "100%",
        zIndex: 0, opacity: 0.18,
        pointerEvents: "none",
      }}
    />
  );
}

/* ── Floating orb blobs matching site green theme ── */
function Orbs() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", top: "15%", left: "10%",
          width: 320, height: 320, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,200,130,0.12) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />
      <motion.div
        animate={{ x: [0, -35, 0], y: [0, 45, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{
          position: "absolute", bottom: "20%", right: "8%",
          width: 280, height: 280, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,168,107,0.1) 0%, transparent 70%)",
          filter: "blur(55px)",
        }}
      />
      <motion.div
        animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          width: 200, height: 200, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,200,130,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
    </div>
  );
}

export function NotFoundPage() {
  const [glitch, setGlitch] = useState(false);

  /* random glitch flicker on the 404 number */
  useEffect(() => {
    const id = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 120);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020609",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Inter', system-ui, sans-serif",
        position: "relative", overflow: "hidden",
      }}
    >
      <MatrixRain />
      <Orbs />

      {/* Grid overlay */}
      <div
        style={{
          position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(0,200,130,0.03) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(0,200,130,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0,  scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "relative", zIndex: 1,
          textAlign: "center",
          padding: "clamp(2rem,6vw,3.5rem) clamp(1.5rem,5vw,3rem)",
          background: "rgba(2,6,9,0.7)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(0,200,130,0.15)",
          borderRadius: 20,
          boxShadow: "0 0 60px rgba(0,200,130,0.08), 0 24px 60px rgba(0,0,0,0.6)",
          maxWidth: 480,
          width: "calc(100% - 2rem)",
        }}
      >
        {/* Logo badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(0,200,130,0.08)",
            border: "1px solid rgba(0,200,130,0.25)",
            borderRadius: 40, padding: "6px 14px",
            marginBottom: "1.5rem",
          }}
        >
          <GraduationCap size={14} color="#00c882" strokeWidth={2} />
          <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#00c882", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            UCP Live Grading
          </span>
        </motion.div>

        {/* 404 number with glitch */}
        <motion.div
          animate={{
            opacity:    [1, 0.3, 1],
            scale:      [1, 1.02, 1],
            x:          glitch ? [-3, 3, -2, 0] : 0,
            skewX:      glitch ? [-2, 2, 0]     : 0,
            filter:     glitch
              ? ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(0deg)"]
              : "hue-rotate(0deg)",
          }}
          transition={{ duration: glitch ? 0.12 : 1.6, repeat: glitch ? 0 : Infinity }}
          style={{
            fontSize: "clamp(5.5rem, 22vw, 10rem)",
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: "-0.04em",
            color: "#00c882",
            textShadow:
              "0 0 30px rgba(0,200,130,0.6)," +
              "0 0 60px rgba(0,200,130,0.3)," +
              "0 0 100px rgba(0,200,130,0.1)",
            fontFamily: "monospace",
            marginBottom: "0.15rem",
          }}
        >
          404
        </motion.div>

        {/* Sub-label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          style={{
            fontSize: "0.72rem", fontWeight: 700,
            letterSpacing: "0.22em", textTransform: "uppercase",
            color: "rgba(0,200,130,0.55)",
            fontFamily: "monospace",
            marginBottom: "1.2rem",
          }}
        >
          // PAGE_NOT_FOUND
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{
            height: 1, margin: "0 auto 1.4rem",
            width: "60%",
            background: "linear-gradient(90deg, transparent, rgba(0,200,130,0.4), transparent)",
          }}
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          style={{
            fontSize: "0.88rem", color: "#475569",
            maxWidth: "34ch", margin: "0 auto 1.8rem",
            lineHeight: 1.7,
          }}
        >
          The page you're looking for doesn't exist or has been moved to another node.
        </motion.p>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          style={{ display: "flex", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap" }}
        >
          <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/"
              style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                background: "linear-gradient(135deg, #00c882, #00a86b)",
                color: "#000", fontSize: "0.85rem", fontWeight: 700,
                padding: "11px 22px", borderRadius: 10,
                textDecoration: "none",
                boxShadow: "0 0 24px rgba(0,200,130,0.35)",
                whiteSpace: "nowrap",
              }}
            >
              <Home size={14} strokeWidth={2.5} />
              Return Home
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/donate"
              style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                background: "rgba(0,200,130,0.06)",
                border: "1px solid rgba(0,200,130,0.2)",
                color: "#64748b", fontSize: "0.85rem", fontWeight: 600,
                padding: "11px 22px", borderRadius: 10,
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              <HeartHandshake size={14} strokeWidth={2} />
              Support Us
            </Link>
          </motion.div>
        </motion.div>

        {/* Error code badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          style={{
            marginTop: "1.8rem",
            display: "inline-block",
            fontFamily: "monospace",
            fontSize: "0.68rem",
            color: "rgba(0,200,130,0.3)",
            letterSpacing: "0.1em",
          }}
        >
          ERR_ROUTE_NOT_FOUND · STATUS 404
        </motion.div>
      </motion.div>
    </div>
  );
}
