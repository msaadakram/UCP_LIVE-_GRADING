import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import "../styles/responsive.css";

/* ───────────── Matrix Rain ───────────── */
function MatrixRain({ opacity = 0.13 }) {
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
    const chars = "アイウエオカキクケコサシスセソ0123456789ABCDEF</>{}[]";
    const fs = 13;
    let drops = [];
    const init = () => {
      drops = Array.from({ length: Math.floor(canvas.width / fs) }, () => Math.random() * -80);
    };
    init();
    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.04)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fs}px monospace`;
      drops.forEach((y, i) => {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        const b = Math.random();
        ctx.fillStyle = b > 0.95 ? "#ffffff" : b > 0.8 ? "#00ffaa" : "rgba(0,180,110,0.55)";
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
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 0, opacity, pointerEvents: "none" }}
    />
  );
}

/* ───────────── Rank badge ───────────── */
function RankBadge({ rank }) {
  if (rank === 1) return <span style={{ fontSize: "1.2rem" }}>🥇</span>;
  if (rank === 2) return <span style={{ fontSize: "1.2rem" }}>🥈</span>;
  if (rank === 3) return <span style={{ fontSize: "1.2rem" }}>🥉</span>;