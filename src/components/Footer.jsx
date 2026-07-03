import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Github, Shield, Zap, Heart, Lock, Code, Mail, BookOpen } from "lucide-react";
import { useEffect, useRef } from "react";

export function Footer() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    const chars = "01アイウエカサタナ</>{}[]";
    const fontSize = 11;
    let cols = Math.floor(canvas.width / fontSize);
    let drops = Array.from({ length: cols }, () => Math.random() * -50);
    let id;
    const draw = () => {
      ctx.fillStyle = "rgba(2,6,9,0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      cols = Math.floor(canvas.width / fontSize);
      if (drops.length !== cols) drops = Array.from({ length: cols }, () => Math.random() * -50);
      ctx.font = `${fontSize}px monospace`;
      drops.forEach((y, i) => {
        const b = Math.random();
        ctx.fillStyle = b > 0.97 ? "#ffffff" : b > 0.85 ? "rgba(0,230,150,0.9)" : "rgba(0,200,130,0.3)";
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.4;
      });
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(id);
  }, []);

  const links = [
    { group: "Product", items: [
      { to: "/",          label: "Home",       icon: Zap },
      { to: "/resources", label: "Resources",  icon: BookOpen },
      { to: "/donate",    label: "Support Us", icon: Heart },
    ]},
    { group: "Legal", items: [
      { to: "/privacy",   label: "Privacy Policy", icon: Lock },
      { to: "/privacy",   label: "Data Security",  icon: Shield },
    ]},
    { group: "Developer", items: [
      { href: "https://github.com/msaadakram",     label: "GitHub",      icon: Github },
      { href: "mailto:ucplivegrading@support.com", label: "Contact",     icon: Mail },
      { to: "/",                                   label: "Source Code", icon: Code },
    ]},
  ];

  return (
    <footer style={{ position:"relative",background:"#020609",borderTop:"1px solid rgba(0,230,150,0.15)",overflow:"hidden" }}>
      <canvas ref={canvasRef} style={{ position:"absolute",inset:0,width:"100%",height:"100%",opacity:0.35,pointerEvents:"none" }} />
      <div style={{ position:"absolute",top:0,left:0,right:0,height:"1px",background:"linear-gradient(90deg,transparent,rgba(0,230,150,0.6),transparent)" }} />

      <div style={{ position:"relative",zIndex:1,maxWidth:"1200px",margin:"0 auto",padding:"3.5rem 1.5rem 2rem" }}>
        <div style={{ display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:"2.5rem" }}>
          {/* Brand */}
          <motion.div initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }}>
            <div style={{ display:"flex",alignItems:"center",gap:"10px",marginBottom:"1rem" }}>
              <div style={{ width:38,height:38,background:"rgba(0,230,150,0.1)",border:"1px solid rgba(0,230,150,0.4)",borderRadius:"10px",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 15px rgba(0,230,150,0.2)" }}>
                <Shield size={18} style={{ color:"#00e696",filter:"drop-shadow(0 0 4px #00e696)" }} />
              </div>
              <div>
                <div style={{ fontFamily:"'Orbitron',monospace",fontSize:"0.85rem",fontWeight:900,background:"linear-gradient(135deg,#00e696,#00c882)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text" }}>UCP_LIVE_GRADING</div>
                <div style={{ fontFamily:"'Share Tech Mono',monospace",fontSize:"0.6rem",color:"rgba(0,230,150,0.4)",letterSpacing:"0.12em" }}>v2.0 // MATRIX EDITION</div>
              </div>
            </div>
            <p style={{ fontSize:"0.83rem",lineHeight:1.75,color:"rgba(120,200,160,0.6)",maxWidth:"32ch",marginBottom:"1.25rem" }}>
              Real-time grade tracking &amp; free study resources for UCP students.
            </p>
            <div style={{ display:"flex",gap:"0.6rem" }}>
              {[Github, Mail, Code].map((Icon, i) => (
                <motion.a key={i}
                  href={i===0?"https://github.com/msaadakram":i===1?"mailto:ucplivegrading@support.com":"/"}
                  target={i===0?"_blank":undefined} rel="noopener noreferrer"
                  whileHover={{ scale:1.15,y:-2 }}
                  style={{ width:36,height:36,background:"rgba(0,230,150,0.07)",border:"1px solid rgba(0,230,150,0.2)",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(0,230,150,0.7)",transition:"all 150ms ease" }}
                  onMouseOver={e=>{e.currentTarget.style.borderColor="rgba(0,230,150,0.6)";e.currentTarget.style.boxShadow="0 0 12px rgba(0,230,150,0.3)";}}
                  onMouseOut={e=>{e.currentTarget.style.borderColor="rgba(0,230,150,0.2)";e.currentTarget.style.boxShadow="none";}}
                ><Icon size={15} /></motion.a>
              ))}
            </div>
          </motion.div>

          {links.map((group, gi) => (
            <motion.div key={group.group} initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ delay:(gi+1)*0.08 }}>
              <div style={{ fontFamily:"'Orbitron',monospace",fontSize:"0.65rem",fontWeight:800,letterSpacing:"0.14em",textTransform:"uppercase",color:"#00e696",marginBottom:"1rem" }}>{group.group}</div>
              <ul style={{ listStyle:"none",padding:0,display:"flex",flexDirection:"column",gap:"6px" }}>
                {group.items.map(({ to, href, label, icon: Icon }) => (
                  <li key={label}>
                    {href ? (
                      <a href={href} target="_blank" rel="noopener noreferrer"
                        style={{ display:"flex",alignItems:"center",gap:"7px",fontSize:"0.82rem",color:"rgba(120,200,160,0.65)",textDecoration:"none",padding:"4px 0",transition:"color 150ms ease" }}
                        onMouseOver={e=>e.currentTarget.style.color="#00e696"}
                        onMouseOut={e=>e.currentTarget.style.color="rgba(120,200,160,0.65)"}
                      ><Icon size={12} />{label}</a>
                    ) : (
                      <Link to={to}
                        style={{ display:"flex",alignItems:"center",gap:"7px",fontSize:"0.82rem",color:"rgba(120,200,160,0.65)",textDecoration:"none",padding:"4px 0",transition:"color 150ms ease" }}
                        onMouseOver={e=>e.currentTarget.style.color="#00e696"}
                        onMouseOut={e=>e.currentTarget.style.color="rgba(120,200,160,0.65)"}
                      ><Icon size={12} />{label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div style={{ marginTop:"2.5rem",paddingTop:"1.5rem",borderTop:"1px solid rgba(0,230,150,0.08)",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"0.75rem" }}>
          <div style={{ fontFamily:"'Share Tech Mono',monospace",fontSize:"0.75rem",color:"rgba(0,230,150,0.35)" }}>
            &copy; 2026 UCP Live Grading // Built by Muhammad Saad Akram
          </div>
          <div style={{ display:"flex",alignItems:"center",gap:"6px" }}>
            <span style={{ width:6,height:6,background:"#00e696",borderRadius:"50%",boxShadow:"0 0 6px #00e696",animation:"neonPulse 2s ease-in-out infinite",display:"inline-block" }} />
            <span style={{ fontFamily:"'Share Tech Mono',monospace",fontSize:"0.72rem",color:"rgba(0,230,150,0.5)" }}>SYSTEM ONLINE</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmerH{0%{background-position:-200% 0;}100%{background-position:200% 0;}}
        @keyframes neonPulse{0%,100%{opacity:1;}50%{opacity:0.4;}}
        @media(max-width:768px){footer>div>div:first-child>div:first-child{grid-template-columns:1fr 1fr!important;}}
      `}</style>
    </footer>
  );
}
