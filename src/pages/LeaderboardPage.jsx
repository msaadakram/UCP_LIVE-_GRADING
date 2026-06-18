import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Navigation } from "../components/Navigation";

/* ───────────── Matrix Rain ───────────── */
function MatrixRain({ opacity = 0.13 }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const chars = "アイウエオカキクケコサシスセソ0123456789ABCDEF</>{}[]";
    const fs = 13;
    let drops = [];
    const init = () => { drops = Array.from({ length: Math.floor(canvas.width / fs) }, () => Math.random() * -80); };
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
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 0, opacity, pointerEvents: "none" }} />;
}

/* ───────────── Rank badge ───────────── */
function RankBadge({ rank }) {
  if (rank === 1) return <span style={{ fontSize: "1.2rem" }}>🥇</span>;
  if (rank === 2) return <span style={{ fontSize: "1.2rem" }}>🥈</span>;
  if (rank === 3) return <span style={{ fontSize: "1.2rem" }}>🥉</span>;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      width: "26px", height: "26px",
      background: "rgba(0,200,130,0.07)",
      border: "1px solid rgba(0,200,130,0.15)",
      borderRadius: "6px",
      fontSize: "0.72rem", fontWeight: 700, color: "#64748b",
    }}>{rank}</span>
  );
}

/* ───────────── Trend arrow ───────────── */
function Trend({ val }) {
  if (val > 0) return <span style={{ color: "#00c882", fontSize: "0.75rem", fontWeight: 700 }}>▲ {val}</span>;
  if (val < 0) return <span style={{ color: "#f87171", fontSize: "0.75rem", fontWeight: 700 }}>▼ {Math.abs(val)}</span>;
  return <span style={{ color: "#475569", fontSize: "0.75rem" }}>─</span>;
}

/* ───────────── Podium card ───────────── */
function PodiumCard({ rank, name, gpa, course, height, delay, isYou }) {
  const colors = [
    { bg: "rgba(255,200,0,0.08)", border: "rgba(255,200,0,0.3)", glow: "rgba(255,200,0,0.2)", accent: "#ffd700" },
    { bg: "rgba(180,190,200,0.06)", border: "rgba(180,190,200,0.25)", glow: "rgba(180,190,200,0.15)", accent: "#94a3b8" },
    { bg: "rgba(180,100,30,0.07)", border: "rgba(180,100,30,0.3)", glow: "rgba(180,100,30,0.15)", accent: "#cd7f32" },
  ];
  const c = colors[rank - 1];
  const medals = ["🥇", "🥈", "🥉"];
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 180, damping: 22 }}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "flex-end",
        flex: 1, minWidth: 0,
      }}
    >
      {/* avatar + name */}
      <div style={{ textAlign: "center", marginBottom: "0.75rem" }}>
        <motion.div
          animate={rank === 1 ? { boxShadow: ["0 0 16px rgba(255,200,0,0.3)", "0 0 32px rgba(255,200,0,0.5)", "0 0 16px rgba(255,200,0,0.3)"] } : {}}
          transition={{ duration: 2.5, repeat: Infinity }}
          style={{
            width: rank === 1 ? "62px" : "50px",
            height: rank === 1 ? "62px" : "50px",
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${c.accent}33, ${c.accent}11)`,
            border: `2px solid ${c.accent}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: rank === 1 ? "1.6rem" : "1.3rem",
            margin: "0 auto 8px",
          }}
        >🎓</motion.div>
        <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#e2e8f0", marginBottom: "2px" }}>{name}</div>
        {isYou && <span style={{ fontSize: "0.62rem", background: "rgba(0,200,130,0.15)", border: "1px solid rgba(0,200,130,0.3)", color: "#00c882", padding: "1px 7px", borderRadius: "100px", fontWeight: 700 }}>YOU</span>}
        <div style={{ fontSize: "0.72rem", color: "#64748b", marginTop: "2px" }}>{course}</div>
      </div>
      {/* bar */}
      <div style={{
        width: "100%",
        height: `${height}px`,
        background: c.bg,
        border: `1px solid ${c.border}`,
        borderRadius: "12px 12px 0 0",
        boxShadow: `0 0 24px ${c.glow}`,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "flex-start",
        padding: "1rem 0.5rem 0",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ fontSize: "1.5rem" }}>{medals[rank - 1]}</div>
        <div style={{ fontSize: "1rem", fontWeight: 800, color: c.accent, marginTop: "4px" }}>{gpa}</div>
        <div style={{ fontSize: "0.68rem", color: "#64748b" }}>GPA</div>
        {/* shimmer */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "1px",
          background: `linear-gradient(90deg, transparent, ${c.accent}, transparent)`,
          opacity: 0.6,
        }} />
      </div>
    </motion.div>
  );
}

/* ───────────── Main Page ───────────── */
export function LeaderboardPage() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [hoveredRow, setHoveredRow] = useState(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const YOU = "Muhammad Saad";

  const allStudents = [
    { rank: 1,  name: "Ayesha Raza",      gpa: 3.92, trend: 0,  course: "CS-401", assignments: 98, quizzes: 95, isYou: false },
    { rank: 2,  name: YOU,                 gpa: 3.87, trend: 2,  course: "CS-401", assignments: 95, quizzes: 93, isYou: true  },
    { rank: 3,  name: "Bilal Ahmed",       gpa: 3.81, trend: -1, course: "CS-401", assignments: 92, quizzes: 90, isYou: false },
    { rank: 4,  name: "Sana Malik",        gpa: 3.74, trend: 1,  course: "CS-403", assignments: 90, quizzes: 88, isYou: false },
    { rank: 5,  name: "Usman Tariq",       gpa: 3.68, trend: 0,  course: "CS-401", assignments: 87, quizzes: 85, isYou: false },
    { rank: 6,  name: "Fatima Noor",       gpa: 3.61, trend: 3,  course: "MATH-301",assignments: 85, quizzes: 82, isYou: false },
    { rank: 7,  name: "Hassan Iqbal",      gpa: 3.55, trend: -2, course: "CS-403", assignments: 83, quizzes: 80, isYou: false },
    { rank: 8,  name: "Mariam Zahid",      gpa: 3.48, trend: 0,  course: "CS-401", assignments: 81, quizzes: 78, isYou: false },
    { rank: 9,  name: "Zaid Hussain",      gpa: 3.40, trend: 1,  course: "MATH-301",assignments: 79, quizzes: 76, isYou: false },
    { rank: 10, name: "Nadia Shahid",      gpa: 3.33, trend: -1, course: "CS-403", assignments: 77, quizzes: 74, isYou: false },
    { rank: 11, name: "Imran Butt",        gpa: 3.25, trend: 0,  course: "CS-401", assignments: 75, quizzes: 72, isYou: false },
    { rank: 12, name: "Hira Khan",         gpa: 3.18, trend: 2,  course: "MATH-301",assignments: 73, quizzes: 70, isYou: false },
  ];

  const courses = ["all", "CS-401", "CS-403", "MATH-301"];

  const filtered = allStudents.filter(s => {
    const courseMatch = filter === "all" || s.course === filter;
    const searchMatch = s.name.toLowerCase().includes(search.toLowerCase());
    return courseMatch && searchMatch;
  });

  const top3 = allStudents.filter(s => s.rank <= 3 && (filter === "all" || s.course === filter));
  const youEntry = allStudents.find(s => s.isYou);

  const podiumOrder = top3.length === 3 ? [top3[1], top3[0], top3[2]] : top3;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#050a10",
      color: "#e2e8f0",
      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      position: "relative",
    }}>
      <MatrixRain opacity={0.12} />
      <Navigation />

      {/* ── Hero ── */}
      <div style={{
        position: "relative", zIndex: 1,
        paddingTop: "90px",
        paddingBottom: "2.5rem",
        textAlign: "center",
        borderBottom: "1px solid rgba(0,200,130,0.1)",
        background: "linear-gradient(180deg, rgba(0,200,130,0.04) 0%, transparent 100%)",
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "7px",
            background: "rgba(0,200,130,0.07)",
            border: "1px solid rgba(0,200,130,0.2)",
            color: "#00c882", fontSize: "0.7rem", fontWeight: 700,
            letterSpacing: "0.1em", textTransform: "uppercase",
            padding: "5px 14px", borderRadius: "100px",
            marginBottom: "1rem",
          }}>
            <span style={{ width: "5px", height: "5px", background: "#00c882", borderRadius: "50%", boxShadow: "0 0 8px #00c882", animation: "ppPulse 2s infinite", display: "inline-block" }} />
            Live • Updated just now
          </div>
          <h1 style={{
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            fontWeight: 900, letterSpacing: "-0.02em",
            marginBottom: "0.5rem", lineHeight: 1.1,
          }}>
            <span style={{ color: "#e2e8f0" }}>Class </span>
            <span style={{ background: "linear-gradient(135deg, #00c882, #00ffaa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Leaderboard</span>
          </h1>
          <p style={{ fontSize: "0.92rem", color: "#64748b", maxWidth: "44ch", margin: "0 auto 1.5rem" }}>
            Real-time rankings from Horizon UCP grade data — updated whenever classmates sync.
          </p>

          {/* Your rank pill */}
          {youEntry && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "12px",
                background: "rgba(0,200,130,0.06)",
                border: "1px solid rgba(0,200,130,0.25)",
                borderRadius: "14px",
                padding: "10px 20px",
              }}
            >
              <span style={{ fontSize: "0.8rem", color: "#64748b" }}>Your Rank</span>
              <span style={{ fontSize: "1.3rem", fontWeight: 900, color: "#00c882" }}>#{youEntry.rank}</span>
              <div style={{ width: "1px", height: "24px", background: "rgba(0,200,130,0.2)" }} />
              <span style={{ fontSize: "0.8rem", color: "#64748b" }}>GPA</span>
              <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "#c8f0e8" }}>{youEntry.gpa}</span>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* ── Podium ── */}
      {top3.length === 3 && (
        <div style={{
          position: "relative", zIndex: 1,
          maxWidth: "700px", margin: "0 auto",
          padding: "2.5rem 1.5rem 0",
        }}>
          <div style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "1rem",
            height: "240px",
          }}>
            {podiumOrder.map((s, i) => (
              <PodiumCard
                key={s.name}
                rank={s.rank}
                name={s.name}
                gpa={s.gpa}
                course={s.course}
                isYou={s.isYou}
                height={s.rank === 1 ? 175 : s.rank === 2 ? 140 : 115}
                delay={[0.3, 0.1, 0.5][i]}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Filters + Search ── */}
      <div style={{
        position: "relative", zIndex: 1,
        maxWidth: "960px", margin: "2rem auto 0",
        padding: "0 1.5rem",
        display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center",
      }}>
        {/* Course filters */}
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
          {courses.map(c => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              style={{
                padding: "6px 14px",
                borderRadius: "8px",
                fontSize: "0.78rem", fontWeight: filter === c ? 700 : 500,
                border: filter === c ? "1px solid rgba(0,200,130,0.35)" : "1px solid rgba(255,255,255,0.08)",
                background: filter === c ? "rgba(0,200,130,0.1)" : "rgba(255,255,255,0.03)",
                color: filter === c ? "#00c882" : "#64748b",
                cursor: "pointer",
                transition: "all 150ms ease",
              }}
            >{c === "all" ? "All Courses" : c}</button>
          ))}
        </div>
        {/* Search */}
        <div style={{ marginLeft: "auto", position: "relative" }}>
          <svg width="14" height="14" fill="none" stroke="#475569" strokeWidth="2" viewBox="0 0 24 24"
            style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search classmate…"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              padding: "7px 12px 7px 32px",
              fontSize: "0.8rem", color: "#e2e8f0",
              outline: "none",
              width: "180px",
            }}
          />
        </div>
      </div>

      {/* ── Table ── */}
      <div style={{
        position: "relative", zIndex: 1,
        maxWidth: "960px", margin: "1.25rem auto 4rem",
        padding: "0 1.5rem",
      }}>
        <div style={{
          background: "rgba(10,15,26,0.85)",
          border: "1px solid rgba(0,200,130,0.12)",
          borderRadius: "16px",
          overflow: "hidden",
          backdropFilter: "blur(8px)",
        }}>
          {/* Table head */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "52px 1fr 90px 90px 90px 70px",
            padding: "0.7rem 1.25rem",
            borderBottom: "1px solid rgba(0,200,130,0.1)",
            fontSize: "0.66rem", fontWeight: 700,
            letterSpacing: "0.1em", textTransform: "uppercase",
            color: "#4a9e8a",
          }}>
            <span>#</span>
            <span>Student</span>
            <span style={{ textAlign: "right" }}>GPA</span>
            <span style={{ textAlign: "right" }}>Assignments</span>
            <span style={{ textAlign: "right" }}>Quizzes</span>
            <span style={{ textAlign: "right" }}>Trend</span>
          </div>

          {/* Table rows */}
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <div style={{ padding: "3rem", textAlign: "center", color: "#475569", fontSize: "0.88rem" }}>
                No students match your filter.
              </div>
            ) : (
              filtered.map((s, i) => (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ delay: i * 0.03, duration: 0.3 }}
                  onMouseEnter={() => setHoveredRow(s.rank)}
                  onMouseLeave={() => setHoveredRow(null)}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "52px 1fr 90px 90px 90px 70px",
                    padding: "0.85rem 1.25rem",
                    borderBottom: i < filtered.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                    alignItems: "center",
                    background: s.isYou
                      ? "rgba(0,200,130,0.05)"
                      : hoveredRow === s.rank
                        ? "rgba(255,255,255,0.025)"
                        : "transparent",
                    borderLeft: s.isYou ? "2px solid rgba(0,200,130,0.5)" : "2px solid transparent",
                    transition: "background 150ms ease",
                    cursor: "default",
                  }}
                >
                  <div><RankBadge rank={s.rank} /></div>

                  <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
                    <div style={{
                      width: "32px", height: "32px",
                      borderRadius: "50%",
                      background: s.isYou
                        ? "rgba(0,200,130,0.15)"
                        : "rgba(255,255,255,0.05)",
                      border: s.isYou ? "1px solid rgba(0,200,130,0.4)" : "1px solid rgba(255,255,255,0.08)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "0.9rem", flexShrink: 0,
                    }}>🎓</div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{
                        fontSize: "0.85rem", fontWeight: s.isYou ? 700 : 500,
                        color: s.isYou ? "#c8f0e8" : "#e2e8f0",
                        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                      }}>
                        {s.name}
                        {s.isYou && (
                          <span style={{
                            marginLeft: "7px",
                            fontSize: "0.6rem", fontWeight: 700,
                            background: "rgba(0,200,130,0.15)",
                            border: "1px solid rgba(0,200,130,0.3)",
                            color: "#00c882",
                            padding: "1px 6px", borderRadius: "100px",
                          }}>YOU</span>
                        )}
                      </div>
                      <div style={{ fontSize: "0.72rem", color: "#475569" }}>{s.course}</div>
                    </div>
                  </div>

                  {/* GPA with bar */}
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "0.88rem", fontWeight: 700, color: s.isYou ? "#00c882" : "#e2e8f0" }}>{s.gpa}</div>
                    <div style={{ height: "3px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", marginTop: "3px" }}>
                      <div style={{ width: `${(s.gpa / 4) * 100}%`, height: "100%", background: s.isYou ? "#00c882" : "rgba(255,255,255,0.2)", borderRadius: "2px" }} />
                    </div>
                  </div>

                  <div style={{ textAlign: "right", fontSize: "0.85rem", color: "#94a3b8" }}>{s.assignments}%</div>
                  <div style={{ textAlign: "right", fontSize: "0.85rem", color: "#94a3b8" }}>{s.quizzes}%</div>
                  <div style={{ textAlign: "right" }}><Trend val={s.trend} /></div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Security note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{
            marginTop: "1rem",
            display: "flex", alignItems: "center", gap: "8px",
            background: "rgba(0,200,130,0.04)",
            border: "1px solid rgba(0,200,130,0.1)",
            borderRadius: "10px",
            padding: "10px 16px",
            fontSize: "0.78rem", color: "#4a9e8a",
          }}
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          All grade data is encrypted in transit from the Horizon UCP portal. Names are opt-in only.
          <Link to="/privacy" style={{ marginLeft: "auto", color: "#00c882", textDecoration: "none", fontWeight: 600, whiteSpace: "nowrap" }}>Privacy Policy →</Link>
        </motion.div>
      </div>

      <style>{`
        @keyframes ppPulse {
          0%,100%{opacity:1;transform:scale(1);box-shadow:0 0 8px #00c882}
          50%{opacity:.4;transform:scale(1.4);box-shadow:0 0 4px #00c882}
        }
        input::placeholder { color: #475569; }
        input:focus { border-color: rgba(0,200,130,0.3) !important; box-shadow: 0 0 0 2px rgba(0,200,130,0.08); }
        @media(max-width:640px){
          [style*="gridTemplateColumns"] { grid-template-columns: 40px 1fr 70px 60px !important; }
          [style*="gridTemplateColumns"] > *:nth-child(5),
          [style*="gridTemplateColumns"] > *:nth-child(6) { display: none; }
        }
      `}</style>
    </div>
  );
}
