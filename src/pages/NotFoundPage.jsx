import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

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
    const chars = "404エラーERROR404NOT_FOUND</>";
    const fs = 14;
    let drops = Array.from({ length: Math.floor(window.innerWidth / fs) }, () => Math.random() * -60);
    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fs}px monospace`;
      drops.forEach((y, i) => {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = Math.random() > 0.9 ? "#ff4444" : "rgba(200,30,30,0.4)";
        ctx.fillText(ch, i * fs, y * fs);
        if (y * fs > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.5;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 0, opacity: 0.2, pointerEvents: "none" }} />;
}

export function NotFoundPage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#050a10",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Inter', system-ui, sans-serif",
      position: "relative", overflow: "hidden",
    }}>
      <MatrixRain />
      <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "2rem" }}>
        <motion.div
          animate={{ opacity: [1, 0.3, 1], scale: [1, 1.02, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            fontSize: "clamp(5rem, 20vw, 10rem)",
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: "-0.04em",
            color: "#ff4444",
            textShadow: "0 0 40px rgba(255,68,68,0.5), 0 0 80px rgba(255,68,68,0.2)",
            fontFamily: "monospace",
            marginBottom: "0.25rem",
          }}
        >404</motion.div>
        <div style={{
          fontSize: "0.8rem", fontWeight: 700,
          letterSpacing: "0.2em", textTransform: "uppercase",
          color: "rgba(255,68,68,0.6)",
          fontFamily: "monospace",
          marginBottom: "1.5rem",
        }}>// PAGE NOT FOUND</div>
        <p style={{ fontSize: "0.92rem", color: "#475569", maxWidth: "36ch", margin: "0 auto 2rem" }}>
          The page you're looking for doesn't exist or has been moved to another matrix node.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link to="/" style={{
              display: "inline-flex", alignItems: "center", gap: "7px",
              background: "linear-gradient(135deg, #00c882, #00a86b)",
              color: "#000", fontSize: "0.88rem", fontWeight: 700,
              padding: "11px 22px", borderRadius: "10px",
              textDecoration: "none",
              boxShadow: "0 0 24px rgba(0,200,130,0.3)",
            }}>
              ← Return Home
            </Link>
          </motion.div>
          <Link to="/leaderboard" style={{
            display: "inline-flex", alignItems: "center",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#94a3b8", fontSize: "0.88rem",
            padding: "11px 22px", borderRadius: "10px",
            textDecoration: "none",
          }}>Leaderboard</Link>
        </div>
      </div>
    </div>
  );
}
