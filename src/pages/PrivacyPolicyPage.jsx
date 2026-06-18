import { useEffect } from "react";
import { Link } from "react-router-dom";

export function PrivacyPolicyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      id: "overview",
      title: "Overview",
      icon: "🛡️",
      content: `UCP Live Grading Extension ("we", "our", or "the Extension") is a browser extension developed for University of Central Punjab (UCP) students. This Privacy Policy explains what data we collect, how we use it, and how we protect it when you install and use our Chrome Extension alongside our web dashboard.`,
    },
    {
      id: "data-collected",
      title: "Data We Collect",
      icon: "📊",
      items: [
        {
          label: "Course & Grade Data",
          desc: "When you visit your Horizon UCP course page, the extension reads your enrolled courses, assignment marks, quiz scores, and grade summaries from the page DOM.",
        },
        {
          label: "Student Identifier",
          desc: "We collect your UCP student ID (registration number) visible in the Horizon portal to associate your grades with your leaderboard entry.",
        },
        {
          label: "Classmate Comparison Data",
          desc: "Aggregated, anonymized grade ranges are shared across students who opt in to the leaderboard feature, so you can see your relative performance without exposing individual student details.",
        },
        {
          label: "Extension Usage Telemetry",
          desc: "Basic, non-personal interaction signals (e.g., feature clicks) to help us improve reliability. No browsing history outside Horizon is captured.",
        },
      ],
    },
    {
      id: "data-not-collected",
      title: "Data We Do NOT Collect",
      icon: "🚫",
      items: [
        "Passwords or login credentials",
        "Browsing history outside of horizon.ucp.edu.pk",
        "Personal financial or payment information",
        "Camera, microphone, or location data",
        "Any data from pages outside the UCP Horizon portal",
      ],
    },
    {
      id: "how-used",
      title: "How We Use Your Data",
      icon: "⚙️",
      items: [
        {
          label: "Live Grade Display",
          desc: "Grade data is parsed locally in your browser and displayed on the Horizon page in real time. It is also sent securely to our database to power the leaderboard.",
        },
        {
          label: "Leaderboard Rankings",
          desc: "Your course performance is compared with classmates who have also installed the extension to generate a class leaderboard. Your name appears only if you opt in.",
        },
        {
          label: "Trend Analysis",
          desc: "We track your grade history over time so you can visualize your academic progress through charts on the dashboard.",
        },
      ],
    },
    {
      id: "data-security",
      title: "Data Security",
      icon: "🔒",
      content: `All data transmitted between your browser and our servers is encrypted using TLS/HTTPS. Data stored in our database is secured with access controls, and no raw student records are exposed to third parties. Leaderboard entries use anonymized display names by default — your real name or ID is never publicly shown without your explicit consent.`,
    },
    {
      id: "sharing",
      title: "Data Sharing & Third Parties",
      icon: "🤝",
      content: `We do not sell, rent, or trade your data. We do not share individual student data with any third party, including advertisers or analytics companies. The only data visible to other users is your opt-in leaderboard rank with a display name you control.`,
    },
    {
      id: "retention",
      title: "Data Retention",
      icon: "🗄️",
      content: `Your data is retained for as long as you have the extension installed and your account is active. You may request deletion of your data at any time by uninstalling the extension or contacting us. Upon uninstallation, locally cached data is cleared automatically.`,
    },
    {
      id: "your-rights",
      title: "Your Rights",
      icon: "⚖️",
      items: [
        "Access a copy of the data we hold about you",
        "Request correction of inaccurate data",
        "Request deletion of your data",
        "Opt out of the leaderboard at any time from extension settings",
        "Withdraw consent for data sharing without penalty",
      ],
    },
    {
      id: "contact",
      title: "Contact Us",
      icon: "📬",
      content: `For any privacy concerns, data requests, or questions about this policy, contact the developer at: ucplivegrading@support.com or open an issue on our GitHub repository. We aim to respond within 48 hours.`,
    },
  ];

  return (
    <div className="privacy-page">
      {/* Hero Banner */}
      <div className="privacy-hero">
        <div className="privacy-hero-inner">
          <div className="privacy-badge">
            <span className="privacy-badge-dot"></span>
            Privacy Policy
          </div>
          <h1 className="privacy-title">
            Your Privacy,<br />
            <span className="privacy-title-accent">Our Priority</span>
          </h1>
          <p className="privacy-subtitle">
            UCP Live Grading is built on a foundation of transparency. This page explains
            exactly what data the extension accesses, how it's used, and how you stay in control.
          </p>
          <div className="privacy-meta">
            <span className="privacy-meta-item">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
              Last updated: June 18, 2026
            </span>
            <span className="privacy-meta-sep">·</span>
            <span className="privacy-meta-item">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Effective immediately upon installation
            </span>
          </div>
        </div>
        <div className="privacy-hero-art">
          <div className="privacy-shield-wrap">
            <svg className="privacy-shield-svg" viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M60 8L12 28V68C12 96 34 118 60 132C86 118 108 96 108 68V28L60 8Z" fill="rgba(1,105,111,0.15)" stroke="rgba(1,105,111,0.6)" strokeWidth="2"/>
              <path d="M60 24L28 38V66C28 86 42 103 60 114C78 103 92 86 92 66V38L60 24Z" fill="rgba(1,105,111,0.1)" stroke="rgba(1,105,111,0.4)" strokeWidth="1.5"/>
              <path d="M42 65L55 78L80 53" stroke="rgba(1,105,111,0.9)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Quick Trust Bar */}
      <div className="privacy-trust-bar">
        <div className="privacy-trust-inner">
          {[
            { icon: "🔒", label: "TLS Encrypted" },
            { icon: "🚫", label: "No Password Access" },
            { icon: "👁️", label: "No 3rd Party Sales" },
            { icon: "⚡", label: "Opt-out Anytime" },
            { icon: "🎓", label: "UCP Students Only" },
          ].map((item) => (
            <div className="privacy-trust-item" key={item.label}>
              <span className="privacy-trust-icon">{item.icon}</span>
              <span className="privacy-trust-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="privacy-content">
        <div className="privacy-toc">
          <div className="privacy-toc-card">
            <h3 className="privacy-toc-title">Table of Contents</h3>
            <ul className="privacy-toc-list">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="privacy-toc-link">
                    <span className="privacy-toc-icon">{s.icon}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="privacy-sections">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="privacy-section-card">
              <div className="privacy-section-header">
                <span className="privacy-section-icon">{section.icon}</span>
                <h2 className="privacy-section-title">{section.title}</h2>
              </div>

              {section.content && (
                <p className="privacy-section-text">{section.content}</p>
              )}

              {section.items && section.items.length > 0 && (
                <ul className="privacy-item-list">
                  {section.items.map((item, i) => (
                    <li key={i} className="privacy-item">
                      {typeof item === "string" ? (
                        <span className="privacy-item-simple">
                          <span className="privacy-item-dot"></span>
                          {item}
                        </span>
                      ) : (
                        <div className="privacy-item-detailed">
                          <span className="privacy-item-label">{item.label}</span>
                          <span className="privacy-item-desc">{item.desc}</span>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="privacy-footer-cta">
        <div className="privacy-footer-inner">
          <h3>Ready to install the extension?</h3>
          <p>By installing UCP Live Grading, you agree to this Privacy Policy.</p>
          <div className="privacy-footer-actions">
            <a
              href="https://chrome.google.com/webstore"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-install"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
              Install Extension
            </a>
            <Link to="/" className="btn-back">
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .privacy-page {
          min-height: 100vh;
          background: #0f1117;
          color: #e2e8f0;
          font-family: 'Inter', system-ui, sans-serif;
        }
        .privacy-hero {
          background: linear-gradient(135deg, #0f1117 0%, #1a1f2e 50%, #0f1117 100%);
          border-bottom: 1px solid rgba(1,105,111,0.2);
          padding: 4rem 2rem 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4rem;
          position: relative;
          overflow: hidden;
        }
        .privacy-hero::before {
          content: '';
          position: absolute;
          top: -50%; left: -10%;
          width: 40%; height: 200%;
          background: radial-gradient(ellipse, rgba(1,105,111,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .privacy-hero-inner { max-width: 580px; z-index: 1; }
        .privacy-hero-art { z-index: 1; flex-shrink: 0; }
        .privacy-shield-wrap {
          width: 140px; height: 160px;
          animation: floatShield 4s ease-in-out infinite;
        }
        @keyframes floatShield {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .privacy-shield-svg { width: 100%; height: 100%; }
        .privacy-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(1,105,111,0.15);
          border: 1px solid rgba(1,105,111,0.4);
          color: #4f98a3;
          font-size: 0.75rem; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase;
          padding: 6px 14px; border-radius: 100px; margin-bottom: 1.25rem;
        }
        .privacy-badge-dot {
          width: 6px; height: 6px;
          background: #4f98a3; border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
        .privacy-title {
          font-size: clamp(2rem, 5vw, 3.25rem);
          font-weight: 800; line-height: 1.1;
          margin-bottom: 1rem; color: #f0f4f8;
        }
        .privacy-title-accent { color: #4f98a3; }
        .privacy-subtitle {
          font-size: 1.05rem; line-height: 1.7; color: #94a3b8;
          max-width: 50ch; margin-bottom: 1.5rem;
        }
        .privacy-meta {
          display: flex; align-items: center; gap: 0.75rem;
          font-size: 0.8rem; color: #64748b; flex-wrap: wrap;
        }
        .privacy-meta-item { display: flex; align-items: center; gap: 5px; }
        .privacy-meta-sep { color: #334155; }
        .privacy-trust-bar {
          background: rgba(1,105,111,0.05);
          border-bottom: 1px solid rgba(1,105,111,0.1);
          padding: 1rem 2rem;
        }
        .privacy-trust-inner {
          max-width: 960px; margin: 0 auto;
          display: flex; justify-content: center; gap: 2.5rem; flex-wrap: wrap;
        }
        .privacy-trust-item { display: flex; align-items: center; gap: 8px; }
        .privacy-trust-icon { font-size: 1rem; }
        .privacy-trust-label { font-size: 0.8rem; font-weight: 500; color: #94a3b8; }
        .privacy-content {
          max-width: 1100px; margin: 0 auto;
          padding: 3rem 2rem;
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 2.5rem; align-items: start;
        }
        @media (max-width: 768px) {
          .privacy-content { grid-template-columns: 1fr; }
          .privacy-hero { flex-direction: column; text-align: center; gap: 2rem; padding: 3rem 1.5rem; }
          .privacy-hero-art { display: none; }
          .privacy-subtitle { margin: 0 auto 1.5rem; }
          .privacy-meta { justify-content: center; }
        }
        .privacy-toc { position: sticky; top: 5rem; }
        .privacy-toc-card {
          background: #1a1f2e; border: 1px solid #1e2a3a;
          border-radius: 12px; padding: 1.25rem;
        }
        .privacy-toc-title {
          font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: #4f98a3; margin-bottom: 1rem;
        }
        .privacy-toc-list {
          list-style: none; padding: 0; margin: 0;
          display: flex; flex-direction: column; gap: 2px;
        }
        .privacy-toc-link {
          display: flex; align-items: center; gap: 8px;
          padding: 7px 10px; border-radius: 7px;
          font-size: 0.82rem; color: #64748b;
          text-decoration: none; transition: all 160ms ease;
        }
        .privacy-toc-link:hover { background: rgba(79,152,163,0.1); color: #4f98a3; }
        .privacy-toc-icon { font-size: 0.9rem; flex-shrink: 0; }
        .privacy-sections { display: flex; flex-direction: column; gap: 1.5rem; }
        .privacy-section-card {
          background: #1a1f2e; border: 1px solid #1e2a3a;
          border-radius: 14px; padding: 1.75rem 2rem;
          transition: border-color 200ms ease;
        }
        .privacy-section-card:hover { border-color: rgba(79,152,163,0.3); }
        .privacy-section-header { display: flex; align-items: center; gap: 12px; margin-bottom: 1rem; }
        .privacy-section-icon { font-size: 1.4rem; flex-shrink: 0; }
        .privacy-section-title { font-size: 1.15rem; font-weight: 700; color: #f0f4f8; margin: 0; }
        .privacy-section-text { font-size: 0.92rem; line-height: 1.8; color: #94a3b8; }
        .privacy-item-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.75rem; }
        .privacy-item-simple { display: flex; align-items: center; gap: 10px; font-size: 0.9rem; color: #94a3b8; }
        .privacy-item-dot { width: 6px; height: 6px; background: #4f98a3; border-radius: 50%; flex-shrink: 0; }
        .privacy-item-detailed {
          background: rgba(255,255,255,0.03); border: 1px solid #1e2a3a;
          border-radius: 8px; padding: 0.75rem 1rem;
          display: flex; flex-direction: column; gap: 4px;
        }
        .privacy-item-label { font-size: 0.88rem; font-weight: 600; color: #e2e8f0; }
        .privacy-item-desc { font-size: 0.84rem; line-height: 1.6; color: #64748b; }
        .privacy-footer-cta {
          background: linear-gradient(135deg, rgba(1,105,111,0.12), rgba(1,105,111,0.05));
          border-top: 1px solid rgba(1,105,111,0.2);
          padding: 3rem 2rem; text-align: center;
        }
        .privacy-footer-inner { max-width: 540px; margin: 0 auto; }
        .privacy-footer-cta h3 { font-size: 1.4rem; font-weight: 700; color: #f0f4f8; margin-bottom: 0.5rem; }
        .privacy-footer-cta p { font-size: 0.9rem; color: #64748b; margin-bottom: 1.5rem; }
        .privacy-footer-actions { display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; }
        .btn-install {
          display: inline-flex; align-items: center; gap: 8px;
          background: #01696f; color: #fff;
          font-size: 0.9rem; font-weight: 600;
          padding: 11px 22px; border-radius: 9px;
          text-decoration: none; transition: background 160ms ease, transform 160ms ease;
        }
        .btn-install:hover { background: #0c4e54; transform: translateY(-1px); }
        .btn-back {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(255,255,255,0.05); border: 1px solid #1e2a3a;
          color: #94a3b8; font-size: 0.9rem; font-weight: 500;
          padding: 11px 22px; border-radius: 9px;
          text-decoration: none; transition: all 160ms ease;
        }
        .btn-back:hover { background: rgba(255,255,255,0.08); color: #e2e8f0; }
      `}</style>
    </div>
  );
}
