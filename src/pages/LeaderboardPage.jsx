import { useState, useEffect } from "react";

const MOCK_STUDENTS = [
  { id: 1, name: "Ahmad Raza", regNo: "F2021-BS-001", gpa: 3.85, courses: { "CS-401": 88, "CS-403": 92, "MATH-301": 79 }, trend: "up", avatar: "AR" },
  { id: 2, name: "You (Muhammad Saad)", regNo: "F2021-BS-042", gpa: 3.72, courses: { "CS-401": 84, "CS-403": 88, "MATH-301": 76 }, trend: "up", avatar: "MS", isMe: true },
  { id: 3, name: "Zara Khan", regNo: "F2021-BS-018", gpa: 3.69, courses: { "CS-401": 81, "CS-403": 85, "MATH-301": 82 }, trend: "same", avatar: "ZK" },
  { id: 4, name: "Bilal Hussain", regNo: "F2021-BS-007", gpa: 3.55, courses: { "CS-401": 78, "CS-403": 80, "MATH-301": 74 }, trend: "down", avatar: "BH" },
  { id: 5, name: "Sara Ahmed", regNo: "F2021-BS-023", gpa: 3.48, courses: { "CS-401": 75, "CS-403": 77, "MATH-301": 71 }, trend: "up", avatar: "SA" },
  { id: 6, name: "Umar Farooq", regNo: "F2021-BS-031", gpa: 3.41, courses: { "CS-401": 72, "CS-403": 74, "MATH-301": 68 }, trend: "same", avatar: "UF" },
  { id: 7, name: "Nida Malik", regNo: "F2021-BS-015", gpa: 3.35, courses: { "CS-401": 70, "CS-403": 71, "MATH-301": 66 }, trend: "down", avatar: "NM" },
  { id: 8, name: "Hamza Ali", regNo: "F2021-BS-009", gpa: 3.22, courses: { "CS-401": 67, "CS-403": 68, "MATH-301": 63 }, trend: "up", avatar: "HA" },
  { id: 9, name: "Ayesha Siddiq", regNo: "F2021-BS-040", gpa: 3.10, courses: { "CS-401": 63, "CS-403": 65, "MATH-301": 60 }, trend: "same", avatar: "AS" },
  { id: 10, name: "Faisal Iqbal", regNo: "F2021-BS-052", gpa: 2.98, courses: { "CS-401": 60, "CS-403": 61, "MATH-301": 57 }, trend: "down", avatar: "FI" },
];

const COURSES = ["All Courses", "CS-401", "CS-403", "MATH-301"];

function getRankSuffix(n) {
  if (n === 1) return "st";
  if (n === 2) return "nd";
  if (n === 3) return "rd";
  return "th";
}

function getTrendIcon(trend) {
  if (trend === "up") return (
    <span style={{ color: "#22c55e", display: "inline-flex", alignItems: "center" }}>
      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M18 15l-6-6-6 6"/></svg>
    </span>
  );
  if (trend === "down") return (
    <span style={{ color: "#ef4444", display: "inline-flex", alignItems: "center" }}>
      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
    </span>
  );
  return <span style={{ color: "#94a3b8" }}>—</span>;
}

function getMedalColor(rank) {
  if (rank === 1) return { bg: "rgba(234,179,8,0.15)", border: "rgba(234,179,8,0.5)", text: "#fbbf24" };
  if (rank === 2) return { bg: "rgba(148,163,184,0.15)", border: "rgba(148,163,184,0.5)", text: "#94a3b8" };
  if (rank === 3) return { bg: "rgba(217,119,6,0.15)", border: "rgba(217,119,6,0.5)", text: "#f59e0b" };
  return { bg: "transparent", border: "transparent", text: "#64748b" };
}

export function LeaderboardPage() {
  const [selectedCourse, setSelectedCourse] = useState("All Courses");
  const [animateIn, setAnimateIn] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setAnimateIn(true), 100);
  }, []);

  const getSortedStudents = () => {
    if (selectedCourse === "All Courses") {
      return [...MOCK_STUDENTS].sort((a, b) => b.gpa - a.gpa);
    }
    return [...MOCK_STUDENTS]
      .filter((s) => s.courses[selectedCourse] !== undefined)
      .sort((a, b) => (b.courses[selectedCourse] || 0) - (a.courses[selectedCourse] || 0));
  };

  const students = getSortedStudents();
  const myRank = students.findIndex((s) => s.isMe) + 1;
  const myScore = selectedCourse === "All Courses"
    ? students.find((s) => s.isMe)?.gpa.toFixed(2)
    : students.find((s) => s.isMe)?.courses[selectedCourse];

  const top3 = students.slice(0, 3);

  return (
    <div className="lb-page">
      <div className="lb-header">
        <div className="lb-header-inner">
          <div className="lb-header-left">
            <div className="lb-badge">
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M8 21h8M12 17v4M17 7A5 5 0 0 1 7 7v5a5 5 0 0 0 10 0V7z"/>
                <path d="M5 7H3v4a2 2 0 0 0 2 2h0M19 7h2v4a2 2 0 0 1-2 2h0"/>
              </svg>
              Class Leaderboard
            </div>
            <h1 className="lb-title">How You Rank</h1>
            <p className="lb-subtitle">Live rankings among your classmates based on Horizon UCP grades</p>
          </div>
          <div className="lb-my-stat">
            <div className="lb-my-rank">
              <span className="lb-my-rank-num">{myRank}<sup>{getRankSuffix(myRank)}</sup></span>
              <span className="lb-my-rank-label">Your Rank</span>
            </div>
            <div className="lb-my-score-wrap">
              <span className="lb-my-score">{myScore}</span>
              <span className="lb-my-score-label">{selectedCourse === "All Courses" ? "GPA" : "Marks"}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="lb-filter-bar">
        <div className="lb-filter-inner">
          {COURSES.map((c) => (
            <button key={c} onClick={() => setSelectedCourse(c)} className={`lb-filter-btn ${selectedCourse === c ? "active" : ""}`}>
              {c}
            </button>
          ))}
          <div className="lb-filter-right"><span className="lb-count">{students.length} students</span></div>
        </div>
      </div>

      <div className="lb-content">
        <div className={`lb-podium ${animateIn ? "lb-podium-in" : ""}`}>
          {[top3[1], top3[0], top3[2]].map((student, pIdx) => {
            if (!student) return null;
            const actualRank = students.indexOf(student) + 1;
            const podiumHeights = [180, 220, 160];
            const medal = getMedalColor(actualRank);
            return (
              <div key={student.id} className={`lb-podium-item`} style={{ "--podium-h": `${podiumHeights[pIdx]}px`, "--medal-bg": medal.bg, "--medal-border": medal.border, "--medal-text": medal.text }}>
                <div className={`lb-podium-avatar ${student.isMe ? "lb-podium-avatar-me" : ""}`}>
                  {student.avatar}
                  <div className="lb-podium-rank-badge" style={{ background: medal.text, color: "#0f1117" }}>{actualRank}</div>
                </div>
                <div className="lb-podium-name">{student.isMe ? "You" : student.name.split(" ")[0]}</div>
                <div className="lb-podium-score">{selectedCourse === "All Courses" ? student.gpa.toFixed(2) : student.courses[selectedCourse]}<span className="lb-podium-score-unit">{selectedCourse === "All Courses" ? " GPA" : " pts"}</span></div>
                <div className="lb-podium-bar" style={{ height: "var(--podium-h)" }}>
                  <div className="lb-podium-bar-fill" style={{ background: medal.text + "33", borderColor: medal.border }}></div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="lb-table-wrap">
          <div className="lb-table-header-row">
            <span className="lb-th rank">Rank</span>
            <span className="lb-th student">Student</span>
            <span className="lb-th score">{selectedCourse === "All Courses" ? "GPA" : "Score"}</span>
            <span className="lb-th trend">Trend</span>
            <span className="lb-th progress">Progress</span>
          </div>
          {students.map((student, index) => {
            const rank = index + 1;
            const medal = getMedalColor(rank);
            const score = selectedCourse === "All Courses" ? student.gpa : student.courses[selectedCourse];
            const maxScore = selectedCourse === "All Courses" ? 4.0 : 100;
            const pct = Math.round((score / maxScore) * 100);
            return (
              <div key={student.id}
                className={`lb-row ${student.isMe ? "lb-row-me" : ""} ${hoveredRow === student.id ? "lb-row-hover" : ""}`}
                onMouseEnter={() => setHoveredRow(student.id)}
                onMouseLeave={() => setHoveredRow(null)}
                style={{ "--row-delay": `${index * 60}ms`, "--medal-border": medal.border }}
              >
                <div className="lb-cell rank">
                  <div className="lb-rank-badge" style={{ background: medal.bg, borderColor: medal.border, color: medal.text }}>
                    {rank <= 3 ? ["🥇","🥈","🥉"][rank-1] : rank}
                  </div>
                </div>
                <div className="lb-cell student">
                  <div className="lb-avatar" style={{ background: student.isMe ? "rgba(1,105,111,0.2)" : "rgba(255,255,255,0.05)", borderColor: student.isMe ? "#01696f" : "transparent" }}>{student.avatar}</div>
                  <div className="lb-student-info">
                    <span className="lb-student-name">{student.isMe ? <strong>{student.name}</strong> : student.name}{student.isMe && <span className="lb-you-badge">You</span>}</span>
                    <span className="lb-student-reg">{student.regNo}</span>
                  </div>
                </div>
                <div className="lb-cell score">
                  <span className="lb-score-val" style={{ color: rank <= 3 ? medal.text : "#e2e8f0" }}>{selectedCourse === "All Courses" ? score.toFixed(2) : score}</span>
                  <span className="lb-score-unit">{selectedCourse === "All Courses" ? "/ 4.0" : "/ 100"}</span>
                </div>
                <div className="lb-cell trend">{getTrendIcon(student.trend)}</div>
                <div className="lb-cell progress">
                  <div className="lb-progress-track">
                    <div className="lb-progress-fill" style={{ width: `${pct}%`, background: rank === 1 ? "#fbbf24" : rank === 2 ? "#94a3b8" : rank === 3 ? "#f59e0b" : student.isMe ? "#01696f" : "#334155" }}></div>
                  </div>
                  <span className="lb-pct">{pct}%</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="lb-data-note">
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
          Data synced securely from your Horizon UCP portal. Rankings refresh when any classmate visits their course page. All data encrypted in transit.
        </div>
      </div>

      <style>{`
        .lb-page { min-height: 100vh; background: #0f1117; color: #e2e8f0; font-family: 'Inter', system-ui, sans-serif; }
        .lb-header { background: linear-gradient(135deg, #0f1117, #1a1f2e); border-bottom: 1px solid #1e2a3a; padding: 2.5rem 2rem 2rem; }
        .lb-header-inner { max-width: 960px; margin: 0 auto; display: flex; justify-content: space-between; align-items: flex-end; gap: 2rem; flex-wrap: wrap; }
        .lb-badge { display: inline-flex; align-items: center; gap: 7px; background: rgba(1,105,111,0.15); border: 1px solid rgba(1,105,111,0.4); color: #4f98a3; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; padding: 5px 12px; border-radius: 100px; margin-bottom: 0.75rem; }
        .lb-title { font-size: clamp(1.8rem, 4vw, 2.5rem); font-weight: 800; color: #f0f4f8; margin-bottom: 0.4rem; }
        .lb-subtitle { font-size: 0.88rem; color: #64748b; }
        .lb-my-stat { display: flex; gap: 1.5rem; align-items: center; background: rgba(1,105,111,0.08); border: 1px solid rgba(1,105,111,0.25); border-radius: 14px; padding: 1rem 1.5rem; flex-shrink: 0; }
        .lb-my-rank { display: flex; flex-direction: column; align-items: center; }
        .lb-my-rank-num { font-size: 2rem; font-weight: 800; color: #4f98a3; line-height: 1; }
        .lb-my-rank-num sup { font-size: 0.9rem; }
        .lb-my-rank-label { font-size: 0.72rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.06em; margin-top: 3px; }
        .lb-my-score-wrap { display: flex; flex-direction: column; align-items: center; border-left: 1px solid rgba(1,105,111,0.2); padding-left: 1.5rem; }
        .lb-my-score { font-size: 2rem; font-weight: 800; color: #f0f4f8; line-height: 1; }
        .lb-my-score-label { font-size: 0.72rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.06em; margin-top: 3px; }
        .lb-filter-bar { border-bottom: 1px solid #1e2a3a; padding: 0.75rem 2rem; background: #12151d; }
        .lb-filter-inner { max-width: 960px; margin: 0 auto; display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
        .lb-filter-btn { padding: 6px 16px; border-radius: 100px; border: 1px solid #1e2a3a; background: transparent; color: #64748b; font-size: 0.82rem; font-weight: 500; cursor: pointer; transition: all 160ms ease; }
        .lb-filter-btn:hover { color: #94a3b8; border-color: #334155; }
        .lb-filter-btn.active { background: rgba(1,105,111,0.15); border-color: rgba(1,105,111,0.5); color: #4f98a3; font-weight: 600; }
        .lb-filter-right { margin-left: auto; }
        .lb-count { font-size: 0.78rem; color: #334155; }
        .lb-content { max-width: 960px; margin: 0 auto; padding: 2rem; }
        .lb-podium { display: flex; justify-content: center; align-items: flex-end; gap: 1rem; margin-bottom: 2.5rem; opacity: 0; transform: translateY(20px); transition: opacity 500ms ease, transform 500ms ease; }
        .lb-podium.lb-podium-in { opacity: 1; transform: translateY(0); }
        .lb-podium-item { display: flex; flex-direction: column; align-items: center; gap: 6px; flex: 1; max-width: 160px; }
        .lb-podium-avatar { width: 52px; height: 52px; border-radius: 50%; background: #1a1f2e; border: 2px solid #1e2a3a; display: flex; align-items: center; justify-content: center; font-size: 0.9rem; font-weight: 700; color: #94a3b8; position: relative; }
        .lb-podium-avatar-me { border-color: #01696f; color: #4f98a3; background: rgba(1,105,111,0.15); }
        .lb-podium-rank-badge { position: absolute; bottom: -6px; right: -6px; width: 20px; height: 20px; border-radius: 50%; font-size: 0.65rem; font-weight: 800; display: flex; align-items: center; justify-content: center; }
        .lb-podium-name { font-size: 0.82rem; font-weight: 600; color: #e2e8f0; text-align: center; }
        .lb-podium-score { font-size: 1rem; font-weight: 800; color: var(--medal-text); }
        .lb-podium-score-unit { font-size: 0.65rem; font-weight: 400; color: #64748b; }
        .lb-podium-bar { width: 100%; }
        .lb-podium-bar-fill { width: 100%; height: 100%; border-radius: 6px 6px 0 0; border: 1px solid var(--medal-border); border-bottom: none; }
        .lb-table-wrap { background: #1a1f2e; border: 1px solid #1e2a3a; border-radius: 14px; overflow: hidden; }
        .lb-table-header-row { display: grid; grid-template-columns: 60px 1fr 100px 60px 160px; padding: 0.75rem 1.25rem; background: #12151d; border-bottom: 1px solid #1e2a3a; gap: 1rem; }
        .lb-th { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #334155; }
        .lb-row { display: grid; grid-template-columns: 60px 1fr 100px 60px 160px; padding: 0.875rem 1.25rem; gap: 1rem; border-bottom: 1px solid #1a1f2e; align-items: center; transition: background 120ms ease; cursor: default; }
        .lb-row:last-child { border-bottom: none; }
        .lb-row-me { background: rgba(1,105,111,0.05); border-left: 2px solid #01696f; }
        .lb-row-hover { background: rgba(255,255,255,0.025); }
        .lb-cell { display: flex; align-items: center; }
        .lb-rank-badge { width: 32px; height: 32px; border-radius: 8px; border: 1px solid; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 700; }
        .lb-avatar { width: 36px; height: 36px; border-radius: 50%; border: 1.5px solid; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; color: #94a3b8; margin-right: 10px; flex-shrink: 0; }
        .lb-student-info { display: flex; flex-direction: column; gap: 2px; overflow: hidden; }
        .lb-student-name { font-size: 0.88rem; font-weight: 500; color: #e2e8f0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: flex; align-items: center; gap: 6px; }
        .lb-student-reg { font-size: 0.73rem; color: #334155; }
        .lb-you-badge { background: rgba(1,105,111,0.2); color: #4f98a3; font-size: 0.65rem; font-weight: 700; padding: 1px 7px; border-radius: 100px; border: 1px solid rgba(1,105,111,0.4); }
        .lb-score-val { font-size: 1rem; font-weight: 700; font-variant-numeric: tabular-nums; }
        .lb-score-unit { font-size: 0.72rem; color: #334155; margin-left: 3px; }
        .lb-progress-track { flex: 1; height: 6px; background: #1e2a3a; border-radius: 100px; overflow: hidden; }
        .lb-progress-fill { height: 100%; border-radius: 100px; transition: width 600ms cubic-bezier(0.16,1,0.3,1); }
        .lb-pct { font-size: 0.72rem; color: #64748b; margin-left: 8px; width: 36px; text-align: right; font-variant-numeric: tabular-nums; }
        .lb-data-note { display: flex; align-items: center; gap: 8px; margin-top: 1.25rem; font-size: 0.78rem; color: #334155; padding: 0.75rem 1rem; background: rgba(255,255,255,0.02); border: 1px solid #1e2a3a; border-radius: 8px; }
        @media (max-width: 640px) {
          .lb-table-header-row, .lb-row { grid-template-columns: 44px 1fr 80px; }
          .lb-cell.trend, .lb-cell.progress, .lb-th.trend, .lb-th.progress { display: none; }
          .lb-content { padding: 1.5rem 1rem; }
          .lb-header { padding: 2rem 1rem 1.5rem; }
          .lb-my-stat { display: none; }
        }
      `}</style>
    </div>
  );
}
