import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, ShieldCheck, HeartHandshake,
  Download, Menu, X, GraduationCap, BarChart3, BookOpen,
} from "lucide-react";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth <= breakpoint
  );
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);
  return isMobile;
}

const NAV_LINKS = [
  { to: "/",            label: "Home",        Icon: Home },
  { to: "/leaderboard", label: "Leaderboard", Icon: BarChart3 },
  { to: "/resources",   label: "Resources",   Icon: BookOpen },
  { to: "/privacy",     label: "Privacy",     Icon: ShieldCheck },
  { to: "/donate",      label: "Support",     Icon: HeartHandshake },
];

const INSTALL_URL =
  "https://chromewebstore.google.com/detail/jffoifnchlblakelloghlmjldkpniglj?utm_source=item-share-cb";

const S = {
  nav: (scrolled) => ({
    position: "fixed", top: 0, left: 0, right: 0,
    zIndex: 1000, height: 60,
    display: "flex", alignItems: "center",
    padding: "0 clamp(0.85rem, 4vw, 1.5rem)",
    background: scrolled ? "rgba(2,6,9,0.97)" : "rgba(2,6,9,0.82)",
    backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
    borderBottom: `1px solid ${scrolled ? "rgba(0,200,130,0.22)" : "rgba(0,200,130,0.09)"}`,
    boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.6)" : "none",
    transition: "background 220ms ease, border-color 220ms ease, box-shadow 220ms ease",
  }),
  logo: { display:"flex",alignItems:"center",gap:9,textDecoration:"none",flexShrink:0 },
  logoBox: { width:34,height:34,background:"linear-gradient(135deg,rgba(0,200,130,0.2),rgba(0,200,130,0.05))",border:"1px solid rgba(0,200,130,0.45)",borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 14px rgba(0,200,130,0.18)" },
  logoText: { lineHeight:1.15 },
  logoTitle: { fontSize:"0.82rem",fontWeight:800,color:"#e2e8f0",letterSpacing:"0.03em" },
  logoSub: { fontSize:"0.6rem",fontWeight:600,color:"#00c882",letterSpacing:"0.12em",textTransform:"uppercase" },
  desktopLinks: { display:"flex",alignItems:"center",gap:"0.2rem",marginLeft:"auto",marginRight:"0.75rem" },
  desktopLink: (active) => ({ display:"flex",alignItems:"center",gap:6,padding:"6px 11px",borderRadius:8,fontSize:"0.8rem",fontWeight:active?700:500,color:active?"#00c882":"#64748b",background:active?"rgba(0,200,130,0.08)":"transparent",border:active?"1px solid rgba(0,200,130,0.2)":"1px solid transparent",textDecoration:"none",transition:"all 160ms ease",whiteSpace:"nowrap" }),
  activeDot: { width:4,height:4,background:"#00c882",borderRadius:"50%",boxShadow:"0 0 6px #00c882" },
  installBtn: { display:"inline-flex",alignItems:"center",gap:6,background:"linear-gradient(135deg,#00c882,#00a86b)",color:"#000",fontSize:"0.78rem",fontWeight:700,padding:"7px 14px",borderRadius:8,textDecoration:"none",boxShadow:"0 0 14px rgba(0,200,130,0.25)",flexShrink:0,minHeight:36,whiteSpace:"nowrap" },
  burger: { display:"flex",alignItems:"center",justifyContent:"center",marginLeft:"0.65rem",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(0,200,130,0.22)",borderRadius:8,padding:7,cursor:"pointer",color:"#94a3b8",minHeight:38,minWidth:38,flexShrink:0 },
  backdrop: { position:"fixed",inset:0,top:60,background:"rgba(0,0,0,0.55)",zIndex:998,backdropFilter:"blur(3px)",WebkitBackdropFilter:"blur(3px)" },
  drawer: { position:"fixed",top:60,left:0,right:0,zIndex:999,background:"rgba(2,6,9,0.98)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",borderBottom:"1px solid rgba(0,200,130,0.15)",padding:"0.85rem clamp(0.85rem,4vw,1.5rem) 1.25rem" },
  drawerLink: (active) => ({ display:"flex",alignItems:"center",gap:11,padding:"12px 14px",borderRadius:10,marginBottom:5,textDecoration:"none",fontSize:"0.9rem",fontWeight:active?700:500,color:active?"#00c882":"#94a3b8",background:active?"rgba(0,200,130,0.07)":"rgba(255,255,255,0.02)",border:`1px solid ${active?"rgba(0,200,130,0.2)":"rgba(255,255,255,0.05)"}`,minHeight:48 }),
  drawerInstall: { display:"flex",alignItems:"center",justifyContent:"center",gap:8,background:"linear-gradient(135deg,#00c882,#00a86b)",color:"#000",fontSize:"0.88rem",fontWeight:700,padding:13,borderRadius:10,textDecoration:"none",boxShadow:"0 0 20px rgba(0,200,130,0.3)",minHeight:48 },
};

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const location                = useLocation();
  const isMobile                = useIsMobile(768);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => { setOpen(false); }, [location.pathname]);
  useEffect(() => { document.body.style.overflow = (isMobile && open) ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [isMobile, open]);
  useEffect(() => { if (!isMobile) setOpen(false); }, [isMobile]);

  const isActive = useCallback(
    (p) => (p === "/" ? location.pathname === "/" : location.pathname.startsWith(p)),
    [location.pathname]
  );

  return (
    <>
      <nav style={S.nav(scrolled)}>
        <Link to="/" style={S.logo}>
          <motion.div whileHover={{ scale:1.08 }} whileTap={{ scale:0.95 }} style={S.logoBox}>
            <GraduationCap size={17} color="#00c882" strokeWidth={2} />
          </motion.div>
          <div style={S.logoText}>
            <div style={S.logoTitle}>UCP LIVE</div>
            <div style={S.logoSub}>Grading</div>
          </div>
        </Link>

        {!isMobile && (
          <div style={S.desktopLinks}>
            {NAV_LINKS.map(({ to, label, Icon }) => {
              const active = isActive(to);
              return (
                <Link key={to} to={to} style={S.desktopLink(active)}>
                  <motion.span whileHover={{ y:-1 }} whileTap={{ scale:0.96 }} style={{ display:"flex",alignItems:"center",gap:6 }}>
                    <Icon size={13} strokeWidth={active?2.5:2} />{label}
                    {active && <span style={S.activeDot} />}
                  </motion.span>
                </Link>
              );
            })}
          </div>
        )}

        <div style={{ marginLeft:isMobile?"auto":0,display:"flex",alignItems:"center",gap:8 }}>
          <motion.a href={INSTALL_URL} target="_blank" rel="noopener noreferrer"
            whileHover={{ scale:1.04,boxShadow:"0 0 22px rgba(0,200,130,0.5)" }} whileTap={{ scale:0.96 }}
            style={S.installBtn}
          >
            <Download size={13} strokeWidth={2.5} />{!isMobile && "Install"}
          </motion.a>
          {isMobile && (
            <motion.button onClick={() => setOpen(o => !o)} aria-label={open?"Close menu":"Open menu"} aria-expanded={open} whileTap={{ scale:0.92 }} style={S.burger}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={open?"x":"menu"} initial={{ rotate:-90,opacity:0 }} animate={{ rotate:0,opacity:1 }} exit={{ rotate:90,opacity:0 }} transition={{ duration:0.15 }} style={{ display:"flex" }}>
                  {open ? <X size={18} /> : <Menu size={18} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          )}
        </div>
      </nav>

      <AnimatePresence>
        {isMobile && open && (
          <>
            <motion.div key="backdrop" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.18 }} onClick={() => setOpen(false)} style={S.backdrop} />
            <motion.div key="drawer" initial={{ opacity:0,y:-16 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0,y:-16 }} transition={{ type:"spring",stiffness:320,damping:30 }} style={S.drawer}>
              {NAV_LINKS.map(({ to, label, Icon }, i) => {
                const active = isActive(to);
                return (
                  <motion.div key={to} initial={{ opacity:0,x:-18 }} animate={{ opacity:1,x:0 }} transition={{ delay:i*0.045 }}>
                    <Link to={to} style={S.drawerLink(active)}>
                      <Icon size={16} strokeWidth={active?2.5:2} />{label}
                      {active && <span style={{ marginLeft:"auto",width:6,height:6,background:"#00c882",borderRadius:"50%",boxShadow:"0 0 6px #00c882" }} />}
                    </Link>
                  </motion.div>
                );
              })}
              <div style={{ marginTop:"0.65rem",paddingTop:"0.65rem",borderTop:"1px solid rgba(0,200,130,0.1)" }}>
                <motion.a href={INSTALL_URL} target="_blank" rel="noopener noreferrer" whileTap={{ scale:0.97 }} style={S.drawerInstall}>
                  <Download size={15} strokeWidth={2.5} />Install Chrome Extension — Free
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
