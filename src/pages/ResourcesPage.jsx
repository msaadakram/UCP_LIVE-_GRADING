import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, Download, Search, Filter, FileText, ClipboardList,
  HelpCircle, Award, GraduationCap, ChevronDown, X, ExternalLink,
  Calendar, Tag, Star, Zap, Database, Shield, Clock, CheckCircle,
  FolderOpen, BookMarked, PenTool, BarChart3, Cpu
} from "lucide-react";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";

/* ── Matrix Rain ────────────────────────────────── */
function MatrixRain({ opacity = 0.13 }) {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d");
    let id;
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize(); window.addEventListener("resize", resize);
    const chars = "アイウエオ01234ABCDEFabcdef</>{}[]=+-*&^";
    const fs = 13;
    let drops = Array.from({ length: Math.floor(c.width / fs) }, () => Math.random() * -100);
    const draw = () => {
      ctx.fillStyle = "rgba(2,6,9,0.045)";
      ctx.fillRect(0, 0, c.width, c.height);
      if (drops.length !== Math.floor(c.width / fs)) drops = Array.from({ length: Math.floor(c.width / fs) }, () => Math.random() * -100);
      ctx.font = `${fs}px monospace`;
      drops.forEach((y, i) => {
        const r = Math.random();
        ctx.fillStyle = r > 0.97 ? "#fff" : r > 0.82 ? "#00f5d4" : r > 0.5 ? "rgba(0,230,150,0.8)" : "rgba(0,180,110,0.35)";
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

/* ── Data ──────────────────────────────────────── */
const SUBJECTS = [
  "All Subjects",
  "Data Structures (CS-401)",
  "Algorithms (CS-403)",
  "Discrete Mathematics (MATH-301)",
  "Operating Systems (CS-405)",
  "Database Systems (CS-301)",
  "Computer Networks (CS-501)",
  "Software Engineering (CS-502)",
  "Object Oriented Programming (CS-201)",
  "Digital Logic Design (CS-101)",
  "Calculus & Analytical Geometry (MATH-101)",
  "Linear Algebra (MATH-201)",
  "Physics (PHY-101)",
  "Pakistan Studies (HUM-101)",
  "Islamic Studies (ISL-101)",
];

const RESOURCE_TYPES = [
  { key: "all",        label: "All",          icon: FolderOpen },
  { key: "pastpaper",  label: "Past Papers",  icon: FileText },
  { key: "assignment", label: "Assignments",  icon: ClipboardList },
  { key: "quiz",       label: "Quizzes",      icon: HelpCircle },
  { key: "midterm",    label: "Midterms",     icon: BookMarked },
  { key: "final",      label: "Finals",       icon: Award },
  { key: "notes",      label: "Lecture Notes",icon: BookOpen },
  { key: "lab",        label: "Lab Manuals",  icon: Cpu },
];

const RESOURCES = [
  /* ── Data Structures ── */
  { id:1,  title:"DS Midterm 2024 Solved",      subject:"Data Structures (CS-401)",   type:"midterm",    semester:"Fall 2024",   pages:12, downloads:342, rating:4.8, size:"1.2 MB", tags:["Solved","2024"],         url:"#" },
  { id:2,  title:"DS Final 2024",               subject:"Data Structures (CS-401)",   type:"final",      semester:"Fall 2024",   pages:18, downloads:289, rating:4.6, size:"2.1 MB", tags:["2024","Unsolved"],      url:"#" },
  { id:3,  title:"DS Assignment 1 — Linked Lists",subject:"Data Structures (CS-401)", type:"assignment",  semester:"Fall 2024",   pages:5,  downloads:215, rating:4.5, size:"0.4 MB", tags:["Assignment","Linked List"],url:"#" },
  { id:4,  title:"DS Quiz 1-3 Solved",          subject:"Data Structures (CS-401)",   type:"quiz",       semester:"Fall 2024",   pages:6,  downloads:410, rating:4.9, size:"0.6 MB", tags:["Solved","Quiz"],         url:"#" },
  { id:5,  title:"DS Past Paper 2023",          subject:"Data Structures (CS-401)",   type:"pastpaper",  semester:"Fall 2023",   pages:10, downloads:520, rating:4.7, size:"1.0 MB", tags:["2023","Past Paper"],     url:"#" },
  /* ── Algorithms ── */
  { id:6,  title:"Algorithms Midterm 2024",     subject:"Algorithms (CS-403)",        type:"midterm",    semester:"Fall 2024",   pages:14, downloads:198, rating:4.4, size:"1.5 MB", tags:["2024"],                 url:"#" },
  { id:7,  title:"Algorithms Final 2023 Solved",subject:"Algorithms (CS-403)",        type:"final",      semester:"Fall 2023",   pages:20, downloads:311, rating:4.7, size:"2.4 MB", tags:["Solved","2023"],         url:"#" },
  { id:8,  title:"Algorithms Quiz Pack (1-5)",  subject:"Algorithms (CS-403)",        type:"quiz",       semester:"Fall 2024",   pages:8,  downloads:276, rating:4.6, size:"0.9 MB", tags:["Quiz Pack"],             url:"#" },
  { id:9,  title:"Algorithms Assignment 2 — DP",subject:"Algorithms (CS-403)",        type:"assignment",  semester:"Fall 2024",   pages:4,  downloads:190, rating:4.3, size:"0.3 MB", tags:["DP","Assignment"],       url:"#" },
  /* ── Discrete Math ── */
  { id:10, title:"Discrete Math Midterm 2024",  subject:"Discrete Mathematics (MATH-301)",type:"midterm", semester:"Fall 2024",  pages:11, downloads:450, rating:4.8, size:"1.1 MB", tags:["Solved","2024"],         url:"#" },
  { id:11, title:"Discrete Math Past Paper 2022",subject:"Discrete Mathematics (MATH-301)",type:"pastpaper",semester:"Fall 2022", pages:9, downloads:600, rating:4.9, size:"0.8 MB", tags:["2022","Past Paper"],     url:"#" },
  { id:12, title:"Discrete Math Quiz 1-4",      subject:"Discrete Mathematics (MATH-301)",type:"quiz",    semester:"Fall 2024",   pages:7,  downloads:380, rating:4.7, size:"0.7 MB", tags:["Quiz"],                 url:"#" },
  /* ── Operating Systems ── */
  { id:13, title:"OS Midterm 2024 Solved",      subject:"Operating Systems (CS-405)", type:"midterm",    semester:"Fall 2024",   pages:13, downloads:260, rating:4.5, size:"1.3 MB", tags:["Solved","2024"],         url:"#" },
  { id:14, title:"OS Final 2023",               subject:"Operating Systems (CS-405)", type:"final",      semester:"Fall 2023",   pages:16, downloads:290, rating:4.6, size:"1.9 MB", tags:["2023"],                 url:"#" },
  { id:15, title:"OS Lab Manual Complete",      subject:"Operating Systems (CS-405)", type:"lab",        semester:"Fall 2024",   pages:45, downloads:320, rating:4.8, size:"5.2 MB", tags:["Lab","Complete"],        url:"#" },
  /* ── Database Systems ── */
  { id:16, title:"DB Systems Midterm 2024",     subject:"Database Systems (CS-301)",  type:"midterm",    semester:"Fall 2024",   pages:12, downloads:310, rating:4.6, size:"1.2 MB", tags:["2024"],                 url:"#" },
  { id:17, title:"DB Final 2023 Solved",        subject:"Database Systems (CS-301)",  type:"final",      semester:"Fall 2023",   pages:19, downloads:400, rating:4.8, size:"2.2 MB", tags:["Solved","2023"],         url:"#" },
  { id:18, title:"DB Assignment 3 — SQL Queries",subject:"Database Systems (CS-301)", type:"assignment",  semester:"Fall 2024",   pages:6,  downloads:230, rating:4.5, size:"0.5 MB", tags:["SQL","Assignment"],       url:"#" },
  { id:19, title:"DB Past Paper 2022",          subject:"Database Systems (CS-301)",  type:"pastpaper",  semester:"Fall 2022",   pages:10, downloads:490, rating:4.7, size:"1.0 MB", tags:["2022","Past Paper"],     url:"#" },
  /* ── OOP ── */
  { id:20, title:"OOP Midterm 2024",            subject:"Object Oriented Programming (CS-201)",type:"midterm",semester:"Fall 2024",pages:11,downloads:370,rating:4.7,size:"1.1 MB",tags:["2024"],url:"#" },
  { id:21, title:"OOP Final 2023 Solved",       subject:"Object Oriented Programming (CS-201)",type:"final",  semester:"Fall 2023",pages:18,downloads:420,rating:4.8,size:"2.0 MB",tags:["Solved","2023"],url:"#" },
  { id:22, title:"OOP Assignment Pack (1-4)",   subject:"Object Oriented Programming (CS-201)",type:"assignment",semester:"Fall 2024",pages:16,downloads:280,rating:4.6,size:"1.4 MB",tags:["Assignment Pack"],url:"#" },
  /* ── Networks ── */
  { id:23, title:"CN Midterm 2024 Solved",      subject:"Computer Networks (CS-501)", type:"midterm",    semester:"Fall 2024",   pages:13, downloads:210, rating:4.4, size:"1.3 MB", tags:["Solved","2024"],         url:"#" },
  { id:24, title:"CN Lab Manual",               subject:"Computer Networks (CS-501)", type:"lab",        semester:"Fall 2024",   pages:38, downloads:275, rating:4.7, size:"4.5 MB", tags:["Lab"],                  url:"#" },
  /* ── Software Engineering ── */
  { id:25, title:"SE Midterm 2024",             subject:"Software Engineering (CS-502)",type:"midterm",  semester:"Fall 2024",   pages:10, downloads:185, rating:4.3, size:"0.9 MB", tags:["2024"],                 url:"#" },
  { id:26, title:"SE Final 2023",               subject:"Software Engineering (CS-502)",type:"final",    semester:"Fall 2023",   pages:15, downloads:220, rating:4.5, size:"1.7 MB", tags:["2023"],                 url:"#" },
  /* ── Digital Logic ── */
  { id:27, title:"DLD Midterm 2024 Solved",     subject:"Digital Logic Design (CS-101)",type:"midterm",  semester:"Fall 2024",   pages:12, downloads:440, rating:4.8, size:"1.2 MB", tags:["Solved","2024"],         url:"#" },
  { id:28, title:"DLD Past Paper 2023",         subject:"Digital Logic Design (CS-101)",type:"pastpaper",semester:"Fall 2023",   pages:9,  downloads:510, rating:4.7, size:"0.9 MB", tags:["2023","Past Paper"],     url:"#" },
  { id:29, title:"DLD Lab Manual",              subject:"Digital Logic Design (CS-101)",type:"lab",      semester:"Fall 2024",   pages:40, downloads:360, rating:4.8, size:"4.8 MB", tags:["Lab","Complete"],        url:"#" },
  /* ── Calculus ── */
  { id:30, title:"Calculus Midterm 2024",       subject:"Calculus & Analytical Geometry (MATH-101)",type:"midterm",semester:"Fall 2024",pages:14,downloads:390,rating:4.6,size:"1.4 MB",tags:["2024"],url:"#" },
  { id:31, title:"Calculus Past Paper 2023 Solved",subject:"Calculus & Analytical Geometry (MATH-101)",type:"pastpaper",semester:"Fall 2023",pages:10,downloads:560,rating:4.9,size:"1.0 MB",tags:["Solved","2023","Past Paper"],url:"#" },
  { id:32, title:"Calculus Quiz 1-6 Solved",    subject:"Calculus & Analytical Geometry (MATH-101)",type:"quiz",semester:"Fall 2024",pages:9,downloads:470,rating:4.8,size:"0.8 MB",tags:["Quiz","Solved"],url:"#" },
  /* ── Linear Algebra ── */
  { id:33, title:"Linear Algebra Midterm 2024", subject:"Linear Algebra (MATH-201)",  type:"midterm",    semester:"Fall 2024",   pages:11, downloads:330, rating:4.5, size:"1.0 MB", tags:["2024"],                 url:"#" },
  { id:34, title:"Linear Algebra Notes",        subject:"Linear Algebra (MATH-201)",  type:"notes",      semester:"Fall 2024",   pages:55, downloads:410, rating:4.7, size:"6.1 MB", tags:["Notes","Complete"],      url:"#" },
];

const TYPE_COLORS = {
  pastpaper:  { bg: "rgba(0,230,150,0.1)",  border: "rgba(0,230,150,0.4)",  text: "#00e696" },
  assignment: { bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.4)", text: "#f59e0b" },
  quiz:       { bg: "rgba(139,92,246,0.1)", border: "rgba(139,92,246,0.4)", text: "#a78bfa" },
  midterm:    { bg: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.4)", text: "#60a5fa" },
  final:      { bg: "rgba(239,68,68,0.1)",  border: "rgba(239,68,68,0.4)",  text: "#f87171" },
  notes:      { bg: "rgba(20,184,166,0.1)", border: "rgba(20,184,166,0.4)", text: "#2dd4bf" },
  lab:        { bg: "rgba(249,115,22,0.1)", border: "rgba(249,115,22,0.4)", text: "#fb923c" },
};

const TYPE_ICONS = {
  pastpaper: FileText, assignment: ClipboardList, quiz: HelpCircle,
  midterm: BookMarked, final: Award, notes: BookOpen, lab: Cpu,
};

function TypeBadge({ type }) {
  const c = TYPE_COLORS[type] || TYPE_COLORS.notes;
  const label = RESOURCE_TYPES.find(r => r.key === type)?.label || type;
  const Icon  = TYPE_ICONS[type] || FileText;
  return (
    <span style={{ display:"inline-flex",alignItems:"center",gap:4,background:c.bg,border:`1px solid ${c.border}`,color:c.text,fontSize:"0.65rem",fontWeight:700,padding:"2px 8px",borderRadius:100,letterSpacing:"0.05em",whiteSpace:"nowrap" }}>
      <Icon size={10} />{label}
    </span>
  );
}

function StarRating({ value }) {
  return (
    <span style={{ display:"inline-flex",alignItems:"center",gap:2,color:"#f59e0b",fontSize:"0.72rem",fontWeight:700 }}>
      <Star size={11} fill="#f59e0b" />{value.toFixed(1)}
    </span>
  );
}

function ResourceCard({ r, delay = 0 }) {
  const TypeIcon = TYPE_ICONS[r.type] || FileText;
  const c = TYPE_COLORS[r.type] || TYPE_COLORS.notes;
  return (
    <motion.div
      initial={{ opacity:0, y:20 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true }}
      transition={{ duration:0.45, delay }}
      whileHover={{ y:-4, borderColor:"rgba(0,230,150,0.35)", boxShadow:"0 0 30px rgba(0,230,150,0.08), 0 16px 48px rgba(0,0,0,0.5)" }}
      style={{ background:"rgba(5,15,22,0.9)",border:"1px solid rgba(0,230,150,0.1)",borderRadius:14,padding:"1.25rem",display:"flex",flexDirection:"column",gap:"0.85rem",position:"relative",overflow:"hidden",transition:"all 220ms ease" }}
    >
      {/* Corner accent */}
      <div style={{ position:"absolute",top:0,left:0,width:60,height:60,background:`radial-gradient(circle at top left,${c.bg},transparent 70%)`,pointerEvents:"none" }} />

      {/* Header */}
      <div style={{ display:"flex",alignItems:"flex-start",gap:10 }}>
        <div style={{ width:40,height:40,background:c.bg,border:`1px solid ${c.border}`,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:`0 0 12px ${c.bg}` }}>
          <TypeIcon size={18} color={c.text} strokeWidth={2} />
        </div>
        <div style={{ flex:1,minWidth:0 }}>
          <div style={{ fontSize:"0.88rem",fontWeight:700,color:"#e8f5f0",lineHeight:1.3,marginBottom:3 }}>{r.title}</div>
          <div style={{ fontSize:"0.72rem",color:"rgba(0,230,150,0.5)",fontFamily:"'Share Tech Mono',monospace" }}>{r.subject}</div>
        </div>
      </div>

      {/* Badges row */}
      <div style={{ display:"flex",flexWrap:"wrap",gap:5,alignItems:"center" }}>
        <TypeBadge type={r.type} />
        <span style={{ display:"inline-flex",alignItems:"center",gap:3,background:"rgba(0,230,150,0.05)",border:"1px solid rgba(0,230,150,0.15)",color:"rgba(0,230,150,0.6)",fontSize:"0.62rem",padding:"2px 7px",borderRadius:100 }}>
          <Calendar size={9} />{r.semester}
        </span>
        {r.tags.map(tag => (
          <span key={tag} style={{ display:"inline-flex",alignItems:"center",gap:3,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",color:"#475569",fontSize:"0.6rem",padding:"2px 6px",borderRadius:100 }}>
            <Tag size={8} />{tag}
          </span>
        ))}
      </div>

      {/* Stats row */}
      <div style={{ display:"flex",alignItems:"center",gap:12,fontSize:"0.72rem",color:"#475569" }}>
        <span style={{ display:"flex",alignItems:"center",gap:4 }}><FileText size={10} />{r.pages}p</span>
        <span style={{ display:"flex",alignItems:"center",gap:4 }}><Database size={10} />{r.size}</span>
        <span style={{ display:"flex",alignItems:"center",gap:4 }}><Download size={10} />{r.downloads.toLocaleString()}</span>
        <span style={{ marginLeft:"auto" }}><StarRating value={r.rating} /></span>
      </div>

      {/* Download button */}
      <motion.a
        href={r.url}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale:1.02 }}
        whileTap={{ scale:0.97 }}
        style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:7,background:`linear-gradient(135deg,${c.text}22,${c.text}11)`,border:`1px solid ${c.border}`,color:c.text,fontSize:"0.78rem",fontWeight:700,padding:"9px 0",borderRadius:9,textDecoration:"none",letterSpacing:"0.04em",transition:"all 180ms ease",fontFamily:"'Orbitron',monospace" }}
      >
        <Download size={13} strokeWidth={2.5} />
        DOWNLOAD
      </motion.a>
    </motion.div>
  );
}

export function ResourcesPage() {
  const [activeType,    setActiveType]    = useState("all");
  const [activeSubject, setActiveSubject] = useState("All Subjects");
  const [search,        setSearch]        = useState("");
  const [sortBy,        setSortBy]        = useState("downloads");
  const [subjectOpen,   setSubjectOpen]   = useState(false);

  const filtered = RESOURCES
    .filter(r => activeType === "all" || r.type === activeType)
    .filter(r => activeSubject === "All Subjects" || r.subject === activeSubject)
    .filter(r => !search || r.title.toLowerCase().includes(search.toLowerCase()) || r.subject.toLowerCase().includes(search.toLowerCase()) || r.tags.some(t => t.toLowerCase().includes(search.toLowerCase())))
    .sort((a, b) => sortBy === "downloads" ? b.downloads - a.downloads : sortBy === "rating" ? b.rating - a.rating : b.id - a.id);

  const totalDownloads = RESOURCES.reduce((s, r) => s + r.downloads, 0);

  return (
    <div style={{ minHeight:"100vh",background:"#020609",color:"#e8f5f0",position:"relative",overflowX:"hidden" }}>
      <MatrixRain />
      <Navigation />

      {/* ═══ HERO ═══ */}
      <section style={{ position:"relative",zIndex:1,padding:"120px 1.5rem 60px",textAlign:"center" }}>
        <motion.div initial={{ opacity:0,y:30 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.6 }}>
          <div style={{ display:"inline-flex",alignItems:"center",gap:7,background:"rgba(0,230,150,0.08)",border:"1px solid rgba(0,230,150,0.3)",color:"#00e696",fontSize:"0.7rem",fontWeight:700,fontFamily:"'Share Tech Mono',monospace",letterSpacing:"0.12em",padding:"5px 14px",borderRadius:100,marginBottom:"1.5rem" }}>
            <span style={{ width:6,height:6,background:"#00e696",borderRadius:"50%",boxShadow:"0 0 8px #00e696",animation:"neonPulse 2s infinite",display:"inline-block" }} />
            UCP RESOURCE HUB // UPDATED 2026
          </div>
          <h1 style={{ fontFamily:"'Orbitron',monospace",fontSize:"clamp(2rem,5vw,4rem)",fontWeight:900,lineHeight:1.1,marginBottom:"1rem",letterSpacing:"-0.01em" }}>
            <span style={{ color:"#e8f5f0" }}>STUDY </span>
            <span style={{ background:"linear-gradient(135deg,#00e696,#00c882,#00f5d4)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text" }}>RESOURCES</span>
          </h1>
          <p style={{ fontSize:"clamp(0.9rem,2.5vw,1.05rem)",lineHeight:1.75,color:"rgba(120,200,160,0.7)",maxWidth:"56ch",margin:"0 auto 3rem" }}>
            Past papers, assignments, quizzes, midterms &amp; finals — all subjects, all semesters, free to download.
          </p>

          {/* Stats bar */}
          <div style={{ display:"flex",justifyContent:"center",gap:"2rem",flexWrap:"wrap" }}>
            {[
              { v: RESOURCES.length+"+",      l:"Resources",    icon:FolderOpen },
              { v: totalDownloads.toLocaleString()+"+", l:"Downloads", icon:Download },
              { v: (SUBJECTS.length-1)+"+",   l:"Subjects",     icon:BookOpen },
              { v: "100%",                    l:"Free",          icon:CheckCircle },
            ].map((s,i) => (
              <motion.div key={i} initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.2+i*0.08 }}
                style={{ display:"flex",alignItems:"center",gap:10,background:"rgba(0,230,150,0.04)",border:"1px solid rgba(0,230,150,0.12)",borderRadius:12,padding:"10px 20px" }}
              >
                <s.icon size={16} color="#00e696" />
                <div>
                  <div style={{ fontFamily:"'Orbitron',monospace",fontSize:"1rem",fontWeight:900,color:"#00e696" }}>{s.v}</div>
                  <div style={{ fontFamily:"'Share Tech Mono',monospace",fontSize:"0.62rem",color:"rgba(0,230,150,0.45)",letterSpacing:"0.08em" }}>{s.l}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══ FILTERS ═══ */}
      <section style={{ position:"relative",zIndex:1,padding:"0 1.5rem 2rem" }}>
        <div style={{ maxWidth:1300,margin:"0 auto" }}>

          {/* Search + Sort row */}
          <div style={{ display:"flex",gap:"0.75rem",flexWrap:"wrap",marginBottom:"1.25rem" }}>
            {/* Search */}
            <div style={{ position:"relative",flex:"1 1 260px" }}>
              <Search size={15} style={{ position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:"rgba(0,230,150,0.4)",pointerEvents:"none" }} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search resources, subjects, tags…"
                style={{ width:"100%",background:"rgba(5,15,22,0.9)",border:"1px solid rgba(0,230,150,0.2)",borderRadius:10,padding:"10px 12px 10px 36px",color:"#e8f5f0",fontSize:"0.85rem",outline:"none",boxSizing:"border-box",fontFamily:"inherit" }}
              />
              {search && (
                <button onClick={() => setSearch("")} style={{ position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"#475569",padding:2,display:"flex" }}>
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Subject dropdown */}
            <div style={{ position:"relative",flex:"1 1 220px" }}>
              <button
                onClick={() => setSubjectOpen(o => !o)}
                style={{ width:"100%",background:"rgba(5,15,22,0.9)",border:"1px solid rgba(0,230,150,0.2)",borderRadius:10,padding:"10px 14px",color:activeSubject==="All Subjects"?"#475569":"#00e696",fontSize:"0.82rem",cursor:"pointer",display:"flex",alignItems:"center",gap:8,fontFamily:"inherit",textAlign:"left" }}
              >
                <Filter size={13} />
                <span style={{ flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{activeSubject}</span>
                <ChevronDown size={13} style={{ transform:subjectOpen?"rotate(180deg)":"none",transition:"200ms" }} />
              </button>
              <AnimatePresence>
                {subjectOpen && (
                  <motion.div initial={{ opacity:0,y:-8 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0,y:-8 }}
                    style={{ position:"absolute",top:"calc(100% + 4px)",left:0,right:0,background:"rgba(5,15,22,0.98)",border:"1px solid rgba(0,230,150,0.2)",borderRadius:10,overflow:"hidden",zIndex:100,maxHeight:280,overflowY:"auto" }}
                  >
                    {SUBJECTS.map(s => (
                      <button key={s} onClick={() => { setActiveSubject(s); setSubjectOpen(false); }}
                        style={{ width:"100%",background:activeSubject===s?"rgba(0,230,150,0.08)":"transparent",border:"none",padding:"10px 14px",color:activeSubject===s?"#00e696":"#64748b",fontSize:"0.8rem",cursor:"pointer",textAlign:"left",borderBottom:"1px solid rgba(0,230,150,0.05)",fontFamily:"inherit" }}
                      >{s}</button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              style={{ background:"rgba(5,15,22,0.9)",border:"1px solid rgba(0,230,150,0.2)",borderRadius:10,padding:"10px 14px",color:"#64748b",fontSize:"0.82rem",cursor:"pointer",fontFamily:"inherit",outline:"none",flex:"0 0 auto" }}
            >
              <option value="downloads">Most Downloaded</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest First</option>
            </select>
          </div>

          {/* Type filter pills */}
          <div style={{ display:"flex",gap:"0.5rem",flexWrap:"wrap" }}>
            {RESOURCE_TYPES.map(({ key, label, icon: Icon }) => (
              <motion.button
                key={key}
                onClick={() => setActiveType(key)}
                whileHover={{ scale:1.04 }}
                whileTap={{ scale:0.96 }}
                style={{ display:"inline-flex",alignItems:"center",gap:5,background:activeType===key?"rgba(0,230,150,0.15)":"rgba(5,15,22,0.8)",border:`1px solid ${activeType===key?"rgba(0,230,150,0.5)":"rgba(0,230,150,0.12)"}`,color:activeType===key?"#00e696":"#475569",fontSize:"0.78rem",fontWeight:activeType===key?700:500,padding:"7px 14px",borderRadius:100,cursor:"pointer",transition:"all 160ms ease",fontFamily:"inherit",whiteSpace:"nowrap" }}
              >
                <Icon size={12} />{label}
                <span style={{ background:"rgba(0,230,150,0.1)",borderRadius:100,padding:"1px 6px",fontSize:"0.65rem",fontWeight:700,color:"rgba(0,230,150,0.7)" }}>
                  {RESOURCES.filter(r => key==="all" || r.type===key).filter(r => activeSubject==="All Subjects"||r.subject===activeSubject).length}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ GRID ═══ */}
      <section style={{ position:"relative",zIndex:1,padding:"0 1.5rem 5rem" }}>
        <div style={{ maxWidth:1300,margin:"0 auto" }}>

          {/* Result count */}
          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1.25rem" }}>
            <div style={{ fontFamily:"'Share Tech Mono',monospace",fontSize:"0.75rem",color:"rgba(0,230,150,0.4)" }}>
              // {filtered.length} RESULT{filtered.length!==1?"S":""} FOUND
            </div>
            {(search || activeType!=="all" || activeSubject!=="All Subjects") && (
              <button onClick={() => { setSearch(""); setActiveType("all"); setActiveSubject("All Subjects"); }}
                style={{ background:"none",border:"1px solid rgba(0,230,150,0.2)",borderRadius:8,padding:"4px 12px",color:"rgba(0,230,150,0.5)",fontSize:"0.72rem",cursor:"pointer",display:"flex",alignItems:"center",gap:5,fontFamily:"inherit" }}
              >
                <X size={11} />Clear Filters
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
              style={{ textAlign:"center",padding:"5rem 1rem",color:"rgba(0,230,150,0.3)" }}
            >
              <HelpCircle size={48} style={{ margin:"0 auto 1rem" }} />
              <div style={{ fontFamily:"'Orbitron',monospace",fontSize:"1rem",fontWeight:700,marginBottom:"0.5rem" }}>NO RESOURCES FOUND</div>
              <div style={{ fontFamily:"'Share Tech Mono',monospace",fontSize:"0.8rem",color:"#475569" }}>Try adjusting your search or filters</div>
            </motion.div>
          ) : (
            <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:"1.25rem" }}>
              {filtered.map((r, i) => <ResourceCard key={r.id} r={r} delay={Math.min(i*0.04, 0.3)} />)}
            </div>
          )}
        </div>
      </section>

      {/* ═══ CTA: Contribute ═══ */}
      <section style={{ position:"relative",zIndex:1,padding:"0 1.5rem 6rem" }}>
        <div style={{ maxWidth:860,margin:"0 auto" }}>
          <motion.div initial={{ opacity:0,scale:0.96 }} whileInView={{ opacity:1,scale:1 }} viewport={{ once:true }}
            style={{ background:"linear-gradient(135deg,rgba(0,200,130,0.07),rgba(0,180,110,0.03))",border:"1px solid rgba(0,230,150,0.2)",borderRadius:20,padding:"3rem 2rem",textAlign:"center" }}
          >
            <Zap size={40} style={{ color:"#00e696",filter:"drop-shadow(0 0 10px #00e696)",marginBottom:"1rem" }} />
            <h2 style={{ fontFamily:"'Orbitron',monospace",fontSize:"clamp(1.2rem,3vw,2rem)",fontWeight:900,color:"#e8f5f0",marginBottom:"0.75rem" }}>
              HAVE RESOURCES TO <span style={{ background:"linear-gradient(135deg,#00e696,#00f5d4)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text" }}>SHARE?</span>
            </h2>
            <p style={{ fontSize:"0.92rem",lineHeight:1.75,color:"rgba(120,200,160,0.6)",maxWidth:"48ch",margin:"0 auto 2rem" }}>
              Help your fellow UCP students by contributing past papers, notes, or solved assignments.
            </p>
            <motion.a
              href="mailto:ucplivegrading@support.com?subject=Resource Contribution"
              whileHover={{ scale:1.04,y:-3 }}
              whileTap={{ scale:0.96 }}
              style={{ display:"inline-flex",alignItems:"center",gap:8,background:"linear-gradient(135deg,#00c882,#00a86b)",color:"#000",fontWeight:900,fontFamily:"'Orbitron',monospace",fontSize:"0.78rem",letterSpacing:"0.06em",padding:"13px 28px",borderRadius:10,boxShadow:"0 0 30px rgba(0,200,130,0.35)",textDecoration:"none" }}
            >
              <PenTool size={14} />CONTRIBUTE A RESOURCE
            </motion.a>
          </motion.div>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes neonPulse { 0%,100%{opacity:1;box-shadow:0 0 8px #00e696;}50%{opacity:0.3;box-shadow:0 0 4px #00e696;} }
        input::placeholder { color: rgba(0,230,150,0.25); }
        input:focus { border-color: rgba(0,230,150,0.45) !important; box-shadow: 0 0 0 3px rgba(0,230,150,0.08); }
        select option { background: #020609; }
        @media (max-width: 640px) {
          section { padding-left: 1rem !important; padding-right: 1rem !important; }
        }
      `}</style>
    </div>
  );
}
