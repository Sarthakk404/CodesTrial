import { useState, useEffect, useRef } from "react";

const API = "https://resilient-adaptation-production-a17c.up.railway.app/";

const SEV = {
  light:   { label: "Light Roast",  emoji: "🕯️", color: "#fbbf24", shadow: "#fbbf2444", desc: "A gentle slap on the wrist" },
  medium:  { label: "Medium Roast", emoji: "⚔️", color: "#f97316", shadow: "#f9731644", desc: "Draws blood. Hurts feelings." },
  nuclear: { label: "☢ NUCLEAR",    emoji: "💀", color: "#c084fc", shadow: "#c084fc44", desc: "No survivors. No mercy." },
};

function useHash() {
  const [hash, setHash] = useState(window.location.hash || "#home");
  useEffect(() => {
    const fn = () => setHash(window.location.hash || "#home");
    window.addEventListener("hashchange", fn);
    return () => window.removeEventListener("hashchange", fn);
  }, []);
  return [hash, (h) => { window.location.hash = h; }];
}



const BRICK_BG = `url("data:image/svg+xml,%3Csvg width='120' height='60' viewBox='0 0 120 60' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='120' height='60' fill='%23374151'/%3E%3Crect x='1' y='1' width='58' height='28' rx='1' fill='%234b5563'/%3E%3Crect x='61' y='1' width='58' height='28' rx='1' fill='%23455368'/%3E%3Crect x='1' y='31' width='28' height='28' rx='1' fill='%23455368'/%3E%3Crect x='31' y='31' width='58' height='28' rx='1' fill='%234b5563'/%3E%3Crect x='91' y='31' width='28' height='28' rx='1' fill='%23405060'/%3E%3C/svg%3E")`;

const AVATARS = {
  warrior: (
    <svg viewBox="0 0 32 48" width="56" height="84" xmlns="http://www.w3.org/2000/svg" style={{imageRendering:"pixelated"}}>
      <rect x="10" y="2" width="12" height="2" fill="#6b7280"/><rect x="8" y="4" width="16" height="2" fill="#9ca3af"/>
      <rect x="8" y="6" width="16" height="8" fill="#6b7280"/><rect x="10" y="6" width="12" height="6" fill="#9ca3af"/>
      <rect x="10" y="8" width="12" height="4" fill="#374151"/><rect x="12" y="9" width="3" height="2" fill="#60a5fa"/>
      <rect x="17" y="9" width="3" height="2" fill="#60a5fa"/><rect x="13" y="14" width="6" height="2" fill="#d1a06a"/>
      <rect x="8" y="16" width="16" height="14" fill="#991b1b"/><rect x="10" y="16" width="12" height="12" fill="#dc2626"/>
      <rect x="13" y="18" width="6" height="2" fill="#fca5a5"/><rect x="4" y="16" width="6" height="6" fill="#6b7280"/>
      <rect x="22" y="16" width="6" height="6" fill="#6b7280"/><rect x="2" y="22" width="4" height="10" fill="#6b7280"/>
      <rect x="0" y="20" width="2" height="16" fill="#d1d5db"/><rect x="0" y="18" width="4" height="2" fill="#d1d5db"/>
      <rect x="26" y="22" width="4" height="10" fill="#6b7280"/><rect x="28" y="20" width="4" height="14" fill="#1e40af"/>
      <rect x="29" y="22" width="2" height="10" fill="#3b82f6"/><rect x="8" y="29" width="16" height="3" fill="#78350f"/>
      <rect x="14" y="29" width="4" height="3" fill="#d97706"/><rect x="9" y="32" width="6" height="12" fill="#1d4ed8"/>
      <rect x="17" y="32" width="6" height="12" fill="#1d4ed8"/><rect x="8" y="42" width="10" height="6" fill="#44403c"/>
      <rect x="16" y="42" width="10" height="6" fill="#44403c"/>
    </svg>
  ),
  mage: (
    <svg viewBox="0 0 32 48" width="56" height="84" xmlns="http://www.w3.org/2000/svg" style={{imageRendering:"pixelated"}}>
      <rect x="14" y="0" width="4" height="2" fill="#4c1d95"/><rect x="12" y="2" width="8" height="2" fill="#5b21b6"/>
      <rect x="10" y="4" width="12" height="2" fill="#6d28d9"/><rect x="6" y="8" width="20" height="2" fill="#4c1d95"/>
      <rect x="10" y="10" width="12" height="10" fill="#d4a574"/><rect x="12" y="13" width="3" height="3" fill="#1c1917"/>
      <rect x="17" y="13" width="3" height="3" fill="#1c1917"/><rect x="13" y="14" width="2" height="2" fill="#a78bfa"/>
      <rect x="18" y="14" width="2" height="2" fill="#a78bfa"/><rect x="11" y="19" width="10" height="3" fill="#e5e7eb"/>
      <rect x="8" y="22" width="16" height="18" fill="#6d28d9"/><rect x="13" y="24" width="6" height="2" fill="#a78bfa"/>
      <rect x="15" y="30" width="2" height="4" fill="#fbbf24"/><rect x="14" y="31" width="4" height="2" fill="#fbbf24"/>
      <rect x="4" y="22" width="4" height="14" fill="#6d28d9"/><rect x="2" y="10" width="2" height="28" fill="#78350f"/>
      <rect x="0" y="8" width="6" height="6" fill="#7c3aed"/><rect x="1" y="9" width="4" height="4" fill="#a78bfa"/>
      <rect x="2" y="10" width="2" height="2" fill="#ddd6fe"/><rect x="24" y="22" width="4" height="12" fill="#6d28d9"/>
      <rect x="9" y="38" width="6" height="8" fill="#4c1d95"/><rect x="17" y="38" width="6" height="8" fill="#4c1d95"/>
      <rect x="8" y="44" width="8" height="4" fill="#1c1917"/><rect x="16" y="44" width="8" height="4" fill="#1c1917"/>
    </svg>
  ),
  rogue: (
    <svg viewBox="0 0 32 48" width="56" height="84" xmlns="http://www.w3.org/2000/svg" style={{imageRendering:"pixelated"}}>
      <rect x="8" y="4" width="16" height="8" fill="#292524"/><rect x="10" y="6" width="12" height="6" fill="#44403c"/>
      <rect x="10" y="10" width="12" height="8" fill="#c9965a"/><rect x="11" y="12" width="4" height="3" fill="#1c1917"/>
      <rect x="17" y="12" width="4" height="3" fill="#1c1917"/><rect x="12" y="13" width="3" height="2" fill="#22c55e"/>
      <rect x="18" y="13" width="3" height="2" fill="#22c55e"/><rect x="8" y="17" width="16" height="4" fill="#dc2626"/>
      <rect x="8" y="20" width="16" height="14" fill="#292524"/><rect x="13" y="20" width="2" height="12" fill="#78350f"/>
      <rect x="17" y="20" width="2" height="12" fill="#78350f"/><rect x="10" y="26" width="12" height="2" fill="#78350f"/>
      <rect x="6" y="18" width="2" height="12" fill="#9ca3af"/><rect x="24" y="18" width="2" height="12" fill="#9ca3af"/>
      <rect x="4" y="20" width="4" height="12" fill="#292524"/><rect x="24" y="20" width="4" height="12" fill="#292524"/>
      <rect x="0" y="28" width="2" height="8" fill="#9ca3af"/><rect x="30" y="28" width="2" height="8" fill="#9ca3af"/>
      <rect x="8" y="33" width="16" height="3" fill="#78350f"/><rect x="14" y="33" width="4" height="3" fill="#d97706"/>
      <rect x="9" y="36" width="6" height="10" fill="#1c1917"/><rect x="17" y="36" width="6" height="10" fill="#1c1917"/>
      <rect x="7" y="44" width="10" height="4" fill="#44403c"/><rect x="15" y="44" width="10" height="4" fill="#44403c"/>
    </svg>
  ),
  skeleton: (
    <svg viewBox="0 0 32 48" width="56" height="84" xmlns="http://www.w3.org/2000/svg" style={{imageRendering:"pixelated"}}>
      <rect x="8" y="2" width="16" height="14" fill="#f3f4f6"/><rect x="6" y="6" width="20" height="10" fill="#f3f4f6"/>
      <rect x="9" y="7" width="6" height="6" fill="#1c1917"/><rect x="17" y="7" width="6" height="6" fill="#1c1917"/>
      <rect x="10" y="8" width="4" height="4" fill="#dc2626"/><rect x="18" y="8" width="4" height="4" fill="#dc2626"/>
      <rect x="11" y="9" width="2" height="2" fill="#fca5a5"/><rect x="19" y="9" width="2" height="2" fill="#fca5a5"/>
      <rect x="14" y="12" width="4" height="3" fill="#1c1917"/><rect x="9" y="14" width="14" height="2" fill="#1c1917"/>
      <rect x="10" y="14" width="2" height="4" fill="#e5e7eb"/><rect x="13" y="14" width="2" height="4" fill="#e5e7eb"/>
      <rect x="16" y="14" width="2" height="4" fill="#e5e7eb"/><rect x="19" y="14" width="2" height="4" fill="#e5e7eb"/>
      <rect x="13" y="16" width="6" height="4" fill="#e5e7eb"/><rect x="10" y="20" width="12" height="12" fill="#e5e7eb"/>
      <rect x="12" y="20" width="8" height="10" fill="#1c1917"/><rect x="10" y="22" width="4" height="2" fill="#e5e7eb"/>
      <rect x="18" y="22" width="4" height="2" fill="#e5e7eb"/><rect x="10" y="25" width="4" height="2" fill="#e5e7eb"/>
      <rect x="18" y="25" width="4" height="2" fill="#e5e7eb"/><rect x="14" y="20" width="4" height="12" fill="#d1d5db"/>
      <rect x="4" y="20" width="4" height="14" fill="#e5e7eb"/><rect x="24" y="20" width="4" height="14" fill="#e5e7eb"/>
      <rect x="2" y="34" width="8" height="4" fill="#e5e7eb"/><rect x="22" y="34" width="8" height="4" fill="#e5e7eb"/>
      <rect x="10" y="32" width="12" height="4" fill="#e5e7eb"/><rect x="10" y="36" width="4" height="12" fill="#e5e7eb"/>
      <rect x="18" y="36" width="4" height="12" fill="#e5e7eb"/><rect x="8" y="46" width="8" height="2" fill="#e5e7eb"/>
      <rect x="16" y="46" width="8" height="2" fill="#e5e7eb"/>
    </svg>
  ),
};

function TorchFlame({ style = {} }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", ...style }}>
      <div style={{ position:"relative", width:30, height:44 }}>
        <div style={{ position:"absolute", bottom:0, left:"50%", transform:"translateX(-50%)", width:22, height:38, background:"radial-gradient(ellipse at 50% 85%,#fef08a,#f97316,#dc2626 80%,transparent)", borderRadius:"50% 50% 30% 30%", animation:"flame1 .45s ease-in-out infinite alternate", filter:"blur(1.5px)" }} />
        <div style={{ position:"absolute", bottom:0, left:"50%", transform:"translateX(-50%)", width:14, height:28, background:"radial-gradient(ellipse at 50% 85%,#fff,#fef08a,#f97316)", borderRadius:"50% 50% 30% 30%", animation:"flame2 .35s ease-in-out infinite alternate" }} />
        <div style={{ position:"absolute", inset:-20, background:"radial-gradient(ellipse,#f9731628 0%,transparent 65%)", pointerEvents:"none" }} />
      </div>
      <div style={{ width:30, height:10, background:"linear-gradient(180deg,#78716c,#44403c)", borderRadius:"0 0 3px 3px", border:"1px solid #57534e" }} />
      <div style={{ width:7, height:54, background:"linear-gradient(90deg,#78716c,#57534e,#44403c)", borderRadius:3 }} />
      <div style={{ width:20, height:8, background:"linear-gradient(180deg,#78716c,#1c1917)", borderRadius:"0 0 4px 4px" }} />
    </div>
  );
}

function StonePanel({ children, style={}, glow=null }) {
  return (
    <div style={{
      background:"#111827ee",
      backgroundImage:`${BRICK_BG},linear-gradient(160deg,#1f2937cc,#111827ee)`,
      backgroundBlendMode:"multiply",
      border:"3px solid",
      borderColor:"#6b728088 #1f293788 #1f293788 #6b728088",
      borderRadius:6,
      boxShadow: glow
        ? `inset 0 0 60px #00000099,0 0 0 1px #374151,0 0 24px ${glow}33,4px 4px 0 #00000066`
        : "inset 0 0 60px #00000099,0 0 0 1px #374151,4px 4px 0 #00000066",
      position:"relative", overflow:"hidden", ...style
    }}>
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(160deg,rgba(255,255,255,.04) 0%,transparent 40%,rgba(0,0,0,.4) 100%)", pointerEvents:"none", zIndex:0 }} />
      <div style={{ position:"relative", zIndex:1 }}>{children}</div>
    </div>
  );
}

export default function App() {
  const [hash, navigate] = useHash();
  const [code, setCode] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [sev, setSev] = useState("medium");
  const [mode, setMode] = useState("paste");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const handleSevChange = (key) => { setSev(key); };

  const handleRoast = async () => {
    if (!code.trim() && !githubUrl.trim()) return;
    setLoading(true); setError("");
    try {
      let res;
      if (mode === "paste") {
        res = await fetch(`${API}/roast`, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({code, severity:sev}) });
      } else {
        res = await fetch(`${API}/roast-github?repo_url=${encodeURIComponent(githubUrl)}&severity=${sev}`, { method:"POST" });
      }
      if (!res.ok) throw new Error();
      const data = await res.json();
      setResult(data); navigate("#result");
    } catch { setError("⚠ Dungeon master is offline. Is FastAPI running on port 8000?"); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight:"100vh", background:"#0c0f14", color:"#e2e8f0", fontFamily:"'Press Start 2P',monospace", position:"relative", overflow:"hidden", cursor:"url('/Skeleton_Hand(1).svg') 0 0, auto" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Cinzel:wght@700;900&family=Crimson+Text:ital,wght@0,400;1,400&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        html,body,#root,*{cursor:url('/Skeleton_Hand(1).svg') 0 0, auto !important}
        button,.pbtn,a,[role=button]{cursor:url('/Skeleton_Hand(1).svg') 0 0, pointer !important}
        ::-webkit-scrollbar{width:8px}
        ::-webkit-scrollbar-track{background:#0c0f14}
        ::-webkit-scrollbar-thumb{background:#374151;border-radius:4px}

        @keyframes flame1{0%{transform:translateX(-50%) scaleX(1)}100%{transform:translateX(-48%) scaleX(1.12) scaleY(.95)}}
        @keyframes flame2{0%{transform:translateX(-50%)}100%{transform:translateX(-52%) scaleX(.88)}}
        @keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes glow-t{0%,100%{text-shadow:2px 2px 0 #92400e,0 0 20px #f9731655}50%{text-shadow:2px 2px 0 #92400e,0 0 50px #f97316bb,0 0 90px #fbbf2433}}
        @keyframes in{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
        @keyframes ember{0%{opacity:0;transform:translateY(0) translateX(0)}15%{opacity:.9}85%{opacity:.5}100%{opacity:0;transform:translateY(-90px) translateX(var(--dx))}}
        @keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}
        @keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
        @keyframes bat{0%{transform:translateX(0) translateY(0)}25%{transform:translateX(40px) translateY(-20px)}50%{transform:translateX(80px) translateY(0)}75%{transform:translateX(40px) translateY(20px)}100%{transform:translateX(0) translateY(0)}}
        @keyframes torch-glow{0%,100%{opacity:.7}50%{opacity:1}}
        @keyframes sev-select{0%{transform:scale(1)}40%{transform:scale(1.08)}100%{transform:scale(1)}}

        .pbtn{font-family:'Press Start 2P',monospace;border:none;transition:all .15s;letter-spacing:.04em;line-height:1.8;position:relative}
        .pbtn:hover:not(:disabled){filter:brightness(1.3);transform:translateY(-2px)}
        .pbtn:active:not(:disabled){transform:translateY(1px);filter:brightness(.9)}
        .pbtn:disabled{opacity:.4}

        .mainbtn{background:linear-gradient(180deg,#b45309,#78350f);color:#fef3c7;font-size:12px;padding:16px 36px;outline:3px solid #d97706;outline-offset:2px;box-shadow:0 5px 0 #451a03,0 0 24px #f9731644,inset 0 1px 0 #fcd34d33;border-radius:4px}
        .mainbtn:hover:not(:disabled){box-shadow:0 5px 0 #451a03,0 0 50px #f97316aa,inset 0 1px 0 #fcd34d33}
        .mainbtn:active:not(:disabled){box-shadow:0 1px 0 #451a03,inset 0 1px 0 #fcd34d33;transform:translateY(4px)}

        .sevbtn{background:linear-gradient(180deg,#1f2937,#111827);color:#9ca3af;font-size:9px;padding:11px 14px;border:2px solid #374151;border-radius:4px;box-shadow:0 4px 0 #060810;transition:all .2s}
        .sevbtn.on{color:#fff;border-color:var(--sc);box-shadow:0 4px 0 #060810,0 0 20px var(--sc)55;animation:sev-select .3s ease}
        .sevbtn:hover:not(:disabled){border-color:#6b7280;color:#f3f4f6}

        .modebtn{background:linear-gradient(180deg,#1f2937,#111827);color:#6b7280;font-size:9px;padding:10px 14px;border:2px solid #374151;border-radius:4px}
        .modebtn.on{color:#fbbf24;border-color:#d97706;background:linear-gradient(180deg,#292524,#1c1917)}
        .modebtn:hover:not(:disabled){color:#d1d5db;border-color:#4b5563}

        .backbtn{background:linear-gradient(180deg,#1f2937,#111827);color:#9ca3af;font-size:9px;padding:11px 20px;border:2px solid #4b5563;border-radius:4px;box-shadow:0 4px 0 #060810}
        .backbtn:hover:not(:disabled){color:#f3f4f6;border-color:#9ca3af}

        .copybtn{background:transparent;color:#6b7280;font-size:9px;padding:8px 14px;border:2px solid #374151;border-radius:4px}
        .copybtn:hover:not(:disabled){color:#fbbf24;border-color:#d97706}
        .copybtn.done{color:#4ade80;border-color:#16a34a}

        textarea{background:#070b0f !important;border:2px solid #374151 !important;color:#d1d5db !important;font-family:'Courier New',monospace !important;font-size:13px !important;line-height:1.7 !important;resize:vertical;border-radius:4px;transition:border-color .3s,box-shadow .3s;caret-color:#f97316}
        textarea:focus{outline:none !important;border-color:#d97706 !important;box-shadow:0 0 0 3px #d9770620 !important}
        textarea::placeholder{color:#2d3748 !important}
        input[type=text]{background:#070b0f;border:2px solid #374151;color:#d1d5db;font-family:'Courier New',monospace;font-size:14px;padding:13px 15px;width:100%;border-radius:4px;transition:border-color .3s,box-shadow .3s;caret-color:#f97316}
        input[type=text]:focus{outline:none;border-color:#d97706;box-shadow:0 0 0 3px #d9770620}
        input::placeholder{color:#2d3748}

        .lbl{font-size:9px;color:#6b7280;letter-spacing:.12em;margin-bottom:10px;display:flex;align-items:center;gap:8px}
        .lbl::after{content:'';flex:1;height:1px;background:linear-gradient(to right,#374151,transparent)}
      `}</style>

      {/* Brick bg */}
      <div style={{ position:"fixed", inset:0, zIndex:0, backgroundImage:BRICK_BG, backgroundSize:"120px 60px", opacity:.2 }} />
      {/* Torch warm glows */}
      <div style={{ position:"fixed", inset:0, zIndex:0, background:"radial-gradient(ellipse at 4% 25%,#f9731625,transparent 35%),radial-gradient(ellipse at 96% 25%,#f9731625,transparent 35%)", pointerEvents:"none", animation:"torch-glow 2s ease-in-out infinite" }} />
      {/* Vignette */}
      <div style={{ position:"fixed", inset:0, zIndex:0, background:"radial-gradient(ellipse at 50% 35%,transparent 25%,#00000077 100%)", pointerEvents:"none" }} />

      {/* Bats */}
      {[0,1,2].map(i => (
        <div key={i} style={{ position:"fixed", fontSize:16, opacity:.2, zIndex:0, top:`${20+i*25}%`, left:`${8+i*4}%`, animation:`bat ${9+i*3}s ease-in-out infinite`, animationDelay:`${i*2.5}s`, pointerEvents:"none" }}>🦇</div>
      ))}

      {/* Embers */}
      {[...Array(10)].map((_,i) => (
        <div key={i} style={{ position:"fixed", width:3, height:3, borderRadius:"50%", background:["#f97316","#fbbf24","#fb923c"][i%3], left:`${[4,5,3,6,93,95,92,96,49,51][i]}%`, bottom:`${[20,30,25,15,20,30,25,15,5,8][i]}%`, animation:`ember ${3+i*.5}s ease-out infinite`, animationDelay:`${i*.45}s`, "--dx":`${(i%2===0?1:-1)*12}px`, zIndex:0, pointerEvents:"none" }} />
      ))}

      <div style={{ position:"relative", zIndex:1 }}>
        {hash==="#home"||hash===""
          ? <Home code={code} setCode={setCode} githubUrl={githubUrl} setGithubUrl={setGithubUrl} sev={sev} onSevChange={handleSevChange} mode={mode} setMode={setMode} loading={loading} error={error} onRoast={handleRoast}/>
          : <Result result={result} sev={sev}/>}
      </div>
    </div>
  );
}

function Home({ code, setCode, githubUrl, setGithubUrl, sev, onSevChange, mode, setMode, loading, error, onRoast }) {
  const cfg = SEV[sev];
  return (
    <div>
      <div style={{ position:"fixed", top:20, left:20, zIndex:10 }}><TorchFlame /></div>
      <div style={{ position:"fixed", top:20, right:20, zIndex:10 }}><TorchFlame /></div>

      <div style={{ maxWidth:760, margin:"0 auto", padding:"28px 20px 48px", animation:"in .5s ease both" }}>

        {/* Avatars */}
        <div style={{ display:"flex", justifyContent:"center", alignItems:"flex-end", gap:20, marginBottom:16 }}>
          {Object.entries(AVATARS).map(([name,svg],i) => (
            <div key={name} style={{ animation:`bob ${1.8+i*.2}s ease-in-out infinite`, animationDelay:`${i*.4}s`, filter:`drop-shadow(0 4px 8px #00000088) drop-shadow(0 0 6px ${["#f9731633","#a78bfa33","#22c55e33","#e5e7eb22"][i]})` }}>
              {svg}
            </div>
          ))}
        </div>

        {/* Title */}
        <div style={{ textAlign:"center", marginBottom:20 }}>
          <div style={{ fontFamily:"'Cinzel',serif", fontSize:"clamp(26px,5.5vw,58px)", fontWeight:900, color:"#fbbf24", letterSpacing:"0.08em", animation:"glow-t 3s ease-in-out infinite", lineHeight:1.1, marginBottom:8 }}>CODESTRIAL</div>
          <div style={{ fontFamily:"'Cinzel',serif", fontSize:"clamp(7px,1.3vw,11px)", color:"#d97706", letterSpacing:"0.22em", marginBottom:8 }}>⚔&nbsp;&nbsp;WHERE CODE MEETS ITS DOOM&nbsp;&nbsp;⚔</div>
          <div style={{ fontFamily:"'Crimson Text',serif", fontSize:18, color:"#9ca3af", fontStyle:"italic" }}>"Submit your code. Face judgment. No survivors."</div>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:16, marginTop:14 }}>
            <div style={{ height:2, width:100, background:"linear-gradient(to right,transparent,#4b5563)" }} />
            <div style={{ width:10, height:10, background:"#4b5563", transform:"rotate(45deg)" }} />
            <div style={{ height:2, width:100, background:"linear-gradient(to left,transparent,#4b5563)" }} />
          </div>
        </div>

        {/* Panel */}
        <StonePanel style={{ padding:28 }} glow={cfg.color}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20, paddingBottom:14, borderBottom:"2px solid #1f2937" }}>
            <span style={{ fontSize:18 }}>📜</span>
            <span style={{ fontFamily:"'Cinzel',serif", fontSize:13, color:"#d97706", letterSpacing:"0.08em" }}>Submit For Judgment</span>
          </div>

          {/* Severity */}
          <div style={{ marginBottom:20 }}>
            <div className="lbl">PUNISHMENT LEVEL</div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {Object.entries(SEV).map(([k,v]) => (
                <button key={k} className={`pbtn sevbtn ${sev===k?"on":""}`} onClick={()=>onSevChange(k)} style={{"--sc":v.color}}>
                  {v.emoji}&nbsp;{v.label}
                </button>
              ))}
            </div>
            <div style={{ fontFamily:"'Crimson Text',serif", fontSize:15, color:"#9ca3af", marginTop:16, fontStyle:"italic" }}>▸ {cfg.desc}</div>
          </div>

          {/* Mode */}
          <div style={{ marginBottom:14 }}>
            <div className="lbl">INPUT METHOD</div>
            <div style={{ display:"flex", gap:6 }}>
              <button className={`pbtn modebtn ${mode==="paste"?"on":""}`} onClick={()=>setMode("paste")}>📜 PASTE CODE</button>
              <button className={`pbtn modebtn ${mode==="github"?"on":""}`} onClick={()=>setMode("github")}>⚔ GITHUB URL</button>
            </div>
          </div>

          {/* Input */}
          {mode==="paste"
            ? <textarea value={code} onChange={e=>setCode(e.target.value)} placeholder="// Drop your cursed code here, adventurer..." style={{ width:"100%", height:180, padding:14, display:"block", marginBottom:18 }}/>
            : <input type="text" placeholder="https://github.com/username/repo" value={githubUrl} onChange={e=>setGithubUrl(e.target.value)} style={{ marginBottom:18 }}/>}

          {error && <div style={{ background:"#1c0a0a", border:"2px solid #dc2626", borderRadius:4, padding:"11px 14px", marginBottom:16, fontFamily:"'Crimson Text',serif", fontSize:15, color:"#fca5a5", animation:"shake .4s ease" }}>{error}</div>}

          <div style={{ textAlign:"center" }}>
            <button className="pbtn mainbtn" onClick={onRoast} disabled={loading||(!code.trim()&&!githubUrl.trim())}>
              {loading
                ? <span style={{ display:"flex", alignItems:"center", gap:10, justifyContent:"center" }}><span style={{ display:"inline-block", animation:"spin 1s linear infinite" }}>⚙</span>SUMMONING...</span>
                : `${cfg.emoji} LET'S ROAST`}
            </button>
          </div>
        </StonePanel>

        <div style={{ display:"flex", justifyContent:"space-between", marginTop:14, padding:"0 4px" }}>
          {["[ ENTER ]","[ ROAST ]","[ SUFFER ]"].map(t=><div key={t} style={{ fontSize:8, color:"#374151" }}>{t}</div>)}
        </div>
      </div>
    </div>
  );
}

function Result({ result, sev }) {
  const cfg = SEV[sev];
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(result?.roast||""); setCopied(true); setTimeout(()=>setCopied(false),2000); };

  if (!result) return (
    <div style={{ textAlign:"center", padding:"100px 20px" }}>
      <div style={{ marginBottom:24, fontSize:11, color:"#6b7280" }}>No roast found.</div>
      <button className="pbtn backbtn" onClick={()=>window.history.back()}>← RETREAT</button>
    </div>
  );

  return (
    <div>
      <div style={{ position:"fixed", top:20, left:20, zIndex:10 }}><TorchFlame /></div>
      <div style={{ position:"fixed", top:20, right:20, zIndex:10 }}><TorchFlame /></div>
      <div style={{ maxWidth:780, margin:"0 auto", padding:"90px 20px 60px", animation:"in .4s ease both" }}>
        <button className="pbtn backbtn" onClick={()=>window.history.back()} style={{ marginBottom:24 }}>← RETREAT</button>
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <div style={{ fontSize:48, marginBottom:12, animation:"bob 1.5s ease-in-out infinite", filter:`drop-shadow(0 0 16px ${cfg.color})` }}>{cfg.emoji}</div>
          <div style={{ fontFamily:"'Cinzel',serif", fontSize:"clamp(18px,3.5vw,32px)", fontWeight:900, color:"#fbbf24", textShadow:`2px 2px 0 #92400e,0 0 24px ${cfg.color}77`, marginBottom:10, letterSpacing:"0.08em" }}>JUDGMENT DELIVERED</div>
          <div style={{ fontFamily:"'Crimson Text',serif", fontSize:17, color:"#9ca3af", fontStyle:"italic" }}>The dungeon master has spoken — {cfg.label}</div>
          <div style={{ height:2, background:`linear-gradient(to right,transparent,${cfg.color}88,transparent)`, marginTop:20 }} />
        </div>
        {result.meme_url && (
          <div style={{ textAlign:"center", marginBottom:28 }}>
            <StonePanel style={{ display:"inline-block", padding:10 }}>
              <img src={result.meme_url} alt="meme" style={{ maxWidth:"100%", maxHeight:380, display:"block", borderRadius:4 }} />
            </StonePanel>
          </div>
        )}
        <StonePanel style={{ padding:28, marginBottom:24 }} glow={cfg.color}>
          <div className="lbl" style={{ marginBottom:14 }}>THE VERDICT</div>
          <p style={{ fontFamily:"'Crimson Text',serif", fontSize:20, lineHeight:1.9, color:"#e2e8f0", margin:0, whiteSpace:"pre-wrap" }}>{result.roast}</p>
          <div style={{ marginTop:18, display:"flex", justifyContent:"flex-end" }}>
            <button className={`pbtn copybtn ${copied?"done":""}`} onClick={copy}>{copied?"✓ COPIED!":"COPY ROAST"}</button>
          </div>
        </StonePanel>
        <div style={{ textAlign:"center" }}>
          <button className="pbtn mainbtn" onClick={()=>window.history.back()}>⚔ ANOTHER VICTIM</button>
        </div>
      </div>
    </div>
  );
}
