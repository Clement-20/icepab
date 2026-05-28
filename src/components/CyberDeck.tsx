import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Cpu, Eye, ShieldAlert, Compass, CornerDownLeft, Maximize, Play, Sliders, ExternalLink } from 'lucide-react';
import { SITE_METADATA } from '../metadata';
import { projectData } from '../data/projects';

interface ConsoleLine {
  text: string;
  type: 'input' | 'system' | 'success' | 'warning' | 'data';
}

interface CyberDeckProps {
  isXrActive: boolean;
  onXrToggle: () => void;
  spatialDepth: number;
  onSpatialDepthChange: (val: number) => void;
}

export default function CyberDeck({ isXrActive, onXrToggle, spatialDepth, onSpatialDepthChange }: CyberDeckProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cliInput, setCliInput] = useState('');
  const [cliHistory, setCliHistory] = useState<ConsoleLine[]>([
    { text: "ICEPAB NEURAL CORE v4.1.0 // ONLINE", type: "system" },
    { text: "Type 'help' to review authorized terminal routines.", type: "system" }
  ]);
  const [activeTab, setActiveTab] = useState<'cli' | 'ar_hud' | 'ai_feed'>('cli');
  
  // AR Coordinate telemetries
  const [coords, setCoords] = useState({ pitch: 12, yaw: -45, roll: 0, fov: 90 });
  // AI State values
  const [aiState, setAiState] = useState({
    modelStatus: 'ACTIVE',
    safetyMargin: '100.00%',
    predictionConfidence: '99.84%',
    threatIndex: '0.00%',
    tokenLoad: '0/32k',
    thinkingState: 'standby'
  });

  const cliEndRef = useRef<HTMLDivElement>(null);

  // Update AR random vectors to feel real-time and alive
  useEffect(() => {
    const interval = setInterval(() => {
      setCoords(prev => ({
        pitch: +(prev.pitch + (Math.random() - 0.5) * 1.5).toFixed(2),
        yaw: +(prev.yaw + (Math.random() - 0.5) * 2.1).toFixed(2),
        roll: +(prev.roll + (Math.random() - 0.5) * 0.4).toFixed(2),
        fov: prev.fov
      }));

      // Update AI thoughts occasionally
      const states = ['analyzing viewport structure', 'evaluating system security', 'measuring connection latency', 'compiling vector paths', 'standby'];
      setAiState(prev => ({
        ...prev,
        threatIndex: (Math.random() * 0.05).toFixed(4) + '%',
        tokenLoad: Math.floor(Math.random() * 450) + '/32k',
        thinkingState: states[Math.floor(Math.random() * states.length)]
      }));
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  // Sync scroll
  useEffect(() => {
    cliEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [cliHistory]);

  const handleCliSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCmd = cliInput.trim().toLowerCase();
    if (!cleanCmd) return;

    const newLines: ConsoleLine[] = [
      ...cliHistory,
      { text: `guest@icepab:~$ ${cliInput}`, type: 'input' }
    ];

    switch (cleanCmd) {
      case 'help':
        newLines.push(
          { text: "AUTHORIZED DIRECTORY ROUTINES:", type: 'system' },
          { text: "  bio         - Stream professional biographical index", type: 'data' },
          { text: "  projects    - Query live SaaS applications and testing modules", type: 'data' },
          { text: "  skills      - Enumerate automated workflows & technical frameworks", type: 'data' },
          { text: "  contacts    - Transmit global secure handles and social accounts", type: 'data' },
          { text: "  scan        - Execute telemetry sweeping sequence across active node", type: 'data' },
          { text: "  xr-toggle   - Command viewport to trigger holographic XR modes", type: 'data' },
          { text: "  clear       - Purge local diagnostic terminal buffer", type: 'data' }
        );
        break;
      case 'bio':
        newLines.push(
          { text: "RETRIEVING BIOGRAPHICAL SCHEMATIC...", type: 'system' },
          { text: `FULL IDENTITY: ${SITE_METADATA.fullName}`, type: 'success' },
          { text: `ACRONYM ROOT: ${SITE_METADATA.acronymMeaning}`, type: 'success' },
          { text: `ACADEMIC HUB: Obafemi Awolowo University (OAU) // Business Admin`, type: 'data' },
          { text: `${SITE_METADATA.description}`, type: 'data' }
        );
        break;
      case 'projects':
        newLines.push(
          { text: "QUERYING DATABASE INTEGRITY...", type: 'system' }
        );
        projectData.forEach(p => {
          newLines.push({
            text: `[${p.name}] - ${p.tagline}\n  ↳ STATUS: ${p.status.toUpperCase()} | URL: ${p.url}`,
            type: 'data'
          });
        });
        break;
      case 'skills':
        newLines.push(
          { text: "MAPPED FRAMEWORKS & COGNITIVE STACK:", type: 'system' },
          { text: `- FRONTEND COG: React 18, Vite, Tailwind CSS, motion engine`, type: 'data' },
          { text: `- BACKEND ENGINE: Node.js, Express, custom API routers, secure proxies`, type: 'data' },
          { text: `- SYSTEMS ARCHITECTURE: Automated digital storage, CBT platform optimization`, type: 'data' }
        );
        break;
      case 'contacts':
        newLines.push(
          { text: "OPEN TRANSMISSION PATHWAYS:", type: 'system' },
          { text: `X/Twitter: ${SITE_METADATA.social.x.url}`, type: 'success' },
          { text: `LinkedIn:  ${SITE_METADATA.social.linkedin.url}`, type: 'success' },
          { text: `GitHub:    ${SITE_METADATA.social.github.url}`, type: 'success' },
          { text: `Target Email: banmekeifeoluwa@gmail.com (Root Secure Gateway)`, type: 'success' }
        );
        break;
      case 'scan':
        newLines.push(
          { text: "COMMENCING HARDWARE TRANSLATION HARVEST...", type: 'warning' },
          { text: `>> Memory footprint optimal. Threads scaled.`, type: 'data' },
          { text: `>> Render Refresh: 60fps stable. Latency: 12ms.`, type: 'data' },
          { text: `>> Substrate Status: Verified secure under OAU CBT node guidelines.`, type: 'success' }
        );
        break;
      case 'xr-toggle':
        onXrToggle();
        newLines.push({
          text: `XR PROJECTOR ORDER DISPATCHED. STATE: ${!isXrActive ? 'ENABLED' : 'DISABLED'}`,
          type: 'warning'
        });
        break;
      case 'clear':
        setCliHistory([]);
        setCliInput('');
        return;
      default:
        newLines.push({
          text: `SYS_ERR: Security rule unauthorized or unknown routine '${cleanCmd}'. Enter 'help'.`,
          type: 'warning'
        });
    }

    setCliHistory(newLines);
    setCliInput('');
  };

  const executeShortcut = (cmd: string) => {
    setCliInput(cmd);
    setTimeout(() => {
      // Simulate click submit helper
      const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
      setCliInput(cmd);
      // Directly call implementation using state matching
      const cleanCmd = cmd.toLowerCase();
      const nLines = [
        ...cliHistory,
        { text: `guest@icepab:~$ ${cmd}`, type: 'input' as const }
      ];
      if (cleanCmd === 'bio') {
        nLines.push(
          { text: "RETRIEVING BIOGRAPHICAL SCHEMATIC...", type: 'system' },
          { text: `IDENTITY: ${SITE_METADATA.alternateNames.join(" // ")}`, type: 'success' },
          { text: `ACCR: ${SITE_METADATA.acronymMeaning}`, type: 'success' },
          { text: `OAU student optimizing human automation systems.`, type: 'data' }
        );
      } else if (cleanCmd === 'projects') {
        nLines.push({ text: "QUERYING DATABASE INTEGRITY...", type: 'system' });
        projectData.forEach(p => {
          nLines.push({ text: `[${p.name}] - ${p.tagline}\n  LINK: ${p.url}`, type: 'data' });
        });
      } else if (cleanCmd === 'scan') {
        nLines.push(
          { text: "SCAN SEQUENCE COMMENCED...", type: 'warning' },
          { text: `Threats: Zero. Latency: Stabilized at 14ms.`, type: 'success' }
        );
      } else if (cleanCmd === 'xr-toggle') {
        onXrToggle();
        nLines.push({ text: `Holographic layout toggle dispatched!`, type: 'warning' });
      }
      setCliHistory(nLines);
      setCliInput('');
    }, 50);
  };

  return (
    <React.Fragment>
      {/* Floating Spark Control Trigger */}
      <div className="fixed bottom-6 left-6 z-[95]">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-2 px-5 py-3 rounded-full border shadow-[0_12px_40px_rgba(0,0,0,0.5)] font-mono text-[11px] font-bold uppercase tracking-widest transition-all ${
            isOpen 
              ? 'bg-electric-blue text-black border-electric-blue' 
              : 'bg-white/[0.04] backdrop-blur-2xl text-electric-blue border-white/10 hover:border-electric-blue/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.08)]'
          }`}
        >
          <div className={`w-2 h-2 rounded-full ${isOpen ? 'bg-black animate-pulse' : 'bg-lime-green animate-ping'}`} />
          {isOpen ? "Close CyberDeck" : "Open CyberDeck console"}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 120 }}
            className="fixed bottom-24 left-6 w-[95%] sm:w-[480px] h-[550px] bg-black/55 backdrop-blur-3xl border border-electric-blue/30 rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.15),0_0_30px_rgba(0,229,255,0.1)] flex flex-col z-[95] overflow-hidden"
          >
            {/* Console Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-3">
                <Compass className="text-electric-blue w-4 h-4 animate-spin-slow" />
                <div>
                  <h3 className="text-xs font-black uppercase tracking-[0.25em] text-white">ICEPAB CYBERDECK</h3>
                  <p className="text-[8px] font-mono text-lime-green uppercase tracking-widest mt-0.5">Real System Cyber-Link</p>
                </div>
              </div>
              <div className="flex gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/30" />
              </div>
            </div>

            {/* Sub Tabs Selection */}
            <div className="flex border-b border-white/5 text-[9px] font-mono font-bold uppercase tracking-widest">
              <button 
                onClick={() => setActiveTab('cli')}
                className={`flex-1 py-3 text-center border-r border-white/5 transition-colors flex items-center justify-center gap-1.5 ${activeTab === 'cli' ? 'bg-electric-blue/10 text-electric-blue' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
              >
                <Terminal size={12} /> HACKER_CLI
              </button>
              <button 
                onClick={() => setActiveTab('ar_hud')}
                className={`flex-1 py-3 text-center border-r border-white/5 transition-colors flex items-center justify-center gap-1.5 ${activeTab === 'ar_hud' ? 'bg-electric-blue/10 text-electric-blue' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
              >
                <Eye size={12} /> AR_SPATIAL_HUD
              </button>
              <button 
                onClick={() => setActiveTab('ai_feed')}
                className={`flex-1 py-3 text-center transition-colors flex items-center justify-center gap-1.5 ${activeTab === 'ai_feed' ? 'bg-electric-blue/10 text-electric-blue' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
              >
                <Cpu size={12} /> AI_METRICS
              </button>
            </div>

            {/* Tab Views Content */}
            <div className="flex-1 p-6 overflow-y-auto no-scrollbar font-mono text-[11px] leading-relaxed select-text">
              <AnimatePresence mode="wait">
                {activeTab === 'cli' && (
                  <motion.div 
                    key="cli_view" 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col justify-between"
                  >
                    <div className="flex-1 overflow-y-auto space-y-2 pr-2 no-scrollbar">
                      {cliHistory.map((line, idx) => (
                        <div key={idx} className="whitespace-pre-wrap">
                          {line.type === 'input' && (
                            <span className="text-white font-bold">{line.text}</span>
                          )}
                          {line.type === 'system' && (
                            <span className="text-electric-blue font-semibold">{line.text}</span>
                          )}
                          {line.type === 'success' && (
                            <span className="text-lime-green">{line.text}</span>
                          )}
                          {line.type === 'warning' && (
                            <span className="text-red-400">{line.text}</span>
                          )}
                          {line.type === 'data' && (
                            <span className="text-white/60">{line.text}</span>
                          )}
                        </div>
                      ))}
                      <div ref={cliEndRef} />
                    </div>

                    {/* Shortcut Buttons grid to execute commands in 1 click! (Interactive/Real) */}
                    <div className="pt-4 border-t border-white/5 flex gap-1.5 flex-wrap">
                      <button onClick={() => executeShortcut('bio')} className="px-2 py-1 bg-white/5 hover:bg-electric-blue/10 border border-white/10 hover:border-electric-blue/30 rounded text-[9px] text-white">/bio</button>
                      <button onClick={() => executeShortcut('projects')} className="px-2 py-1 bg-white/5 hover:bg-electric-blue/10 border border-white/10 hover:border-electric-blue/30 rounded text-[9px] text-white">/projects</button>
                      <button onClick={() => executeShortcut('scan')} className="px-2 py-1 bg-white/5 hover:bg-electric-blue/10 border border-white/10 hover:border-electric-blue/30 rounded text-[9px] text-white">/scan</button>
                      <button onClick={() => executeShortcut('xr-toggle')} className="px-2 py-1 bg-white/5 hover:bg-electric-blue/10 border border-white/10 hover:border-electric-blue/30 rounded text-[9px] text-white">/hologram</button>
                    </div>

                    {/* Command Input Action Form */}
                    <form onSubmit={handleCliSubmit} className="mt-4 flex items-center bg-black border border-white/10 rounded-xl px-4 py-2">
                      <span className="text-lime-green mr-2">guest@icepab:~$</span>
                      <input
                        type="text"
                        value={cliInput}
                        onChange={(e) => setCliInput(e.target.value)}
                        placeholder="type 'help' or commands..."
                        className="flex-1 bg-transparent text-white focus:outline-none min-w-0"
                      />
                      <button type="submit" className="text-white/40 hover:text-white ml-2">
                        <CornerDownLeft size={12} />
                      </button>
                    </form>
                  </motion.div>
                )}

                {activeTab === 'ar_hud' && (
                  <motion.div 
                    key="ar_hud_view"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Sliders className="text-electric-blue w-4 h-4" />
                        <div>
                          <h4 className="font-bold text-white text-xs uppercase tracking-wider">Spatial Focal Alignment</h4>
                          <p className="text-[9px] text-text-dim uppercase tracking-widest mt-0.5">Adjust Virtual VR Projection Depth</p>
                        </div>
                      </div>
                      <button
                        id="vr-toggle-ar-tab"
                        onClick={onXrToggle}
                        className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest border transition-all ${
                          isXrActive 
                            ? 'bg-lime-green border-lime-green text-charcoal' 
                            : 'bg-black border-white/10 text-white hover:border-electric-blue/50 hover:text-electric-blue'
                        }`}
                      >
                        {isXrActive ? "ACTIVE" : "ENABLE"}
                      </button>
                    </div>

                    {/* Interactive Real Slider for spatial depth constraint */}
                    <div className="space-y-3 p-4 bg-black/40 border border-white/5 rounded-xl">
                      <div className="flex justify-between items-center text-[10px] uppercase">
                        <span className="text-text-dim text-[9px]">Holographic Depth Projection</span>
                        <span className="text-electric-blue font-bold tracking-wider">{spatialDepth}px</span>
                      </div>
                      <input 
                        type="range"
                        min="0"
                        max="24"
                        step="1"
                        value={spatialDepth}
                        onChange={(e) => onSpatialDepthChange(Number(e.target.value))}
                        className="w-full accent-electric-blue cursor-pointer h-1.5 bg-white/10 rounded-lg appearance-none"
                      />
                      <div className="flex justify-between text-[8px] text-white/30 tracking-widest">
                        <span>MIN_FLAT</span>
                        <span>MAX_HOLOGRAM</span>
                      </div>
                    </div>

                    {/* Live Telemetries Vectors */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-black/30 border border-white/5 rounded-xl text-center space-y-1">
                        <span className="text-[8px] uppercase tracking-wider text-white/30">Target FOV Vector</span>
                        <h5 className="text-sm font-semibold text-lime-green">{coords.fov}° APEX</h5>
                      </div>
                      <div className="p-3 bg-black/30 border border-white/5 rounded-xl text-center space-y-1">
                        <span className="text-[8px] uppercase tracking-wider text-white/30">Yaw Angle Deviation</span>
                        <h5 className="text-sm font-semibold text-electric-blue">{coords.yaw}° ARC</h5>
                      </div>
                      <div className="p-3 bg-black/30 border border-white/5 rounded-xl text-center space-y-1">
                        <span className="text-[8px] uppercase tracking-wider text-white/30">Spatial Pitch Slope</span>
                        <h5 className="text-sm font-semibold text-white/95">{coords.pitch}° DEVI</h5>
                      </div>
                      <div className="p-3 bg-black/30 border border-white/5 rounded-xl text-center space-y-1">
                        <span className="text-[8px] uppercase tracking-wider text-white/30">Active System Threat</span>
                        <h5 className="text-sm font-semibold text-red-400">{aiState.threatIndex}</h5>
                      </div>
                    </div>

                    <div className="p-4 bg-lime-green/5 border border-lime-green/20 rounded-xl">
                      <p className="text-[9px] text-lime-green font-mono uppercase tracking-widest leading-relaxed">
                        ★ AR HUD system maps layout boundaries in real-time. Feel free to tweak the slider to adjust perspective skews.
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'ai_feed' && (
                  <motion.div 
                    key="ai_view"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-xl">
                      <div>
                        <span className="text-[8px] uppercase tracking-widest text-text-dim">Current Cognitive Model</span>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">GEMINI-2-PRO_AGENT</h4>
                      </div>
                      <span className="text-[9px] font-bold px-2.5 py-1 bg-lime-green/20 border border-lime-green/40 text-lime-green rounded">
                        {aiState.modelStatus}
                      </span>
                    </div>

                    {/* Live cognitive thinking buffer stream */}
                    <div className="p-4 bg-charcoal/50 border border-white/5 rounded-xl space-y-3">
                      <div className="flex items-center justify-between text-[10px] uppercase">
                        <span className="text-text-dim">Agent Cognition Loop</span>
                        <span className="text-white/30">T-STREAM: {aiState.tokenLoad}</span>
                      </div>
                      <div className="p-3 bg-black/50 border border-white/5 rounded-lg flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-electric-blue animate-pulse" />
                        <span className="text-electric-blue text-[10px] uppercase tracking-wide">
                          Thinking: {aiState.thinkingState}...
                        </span>
                      </div>
                    </div>

                    {/* Actual data attributes */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-[10px] uppercase py-1 border-b border-white/5">
                        <span className="text-text-dim">Model Confidence Score</span>
                        <span className="text-white font-bold">{aiState.predictionConfidence}</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] uppercase py-1 border-b border-white/5">
                        <span className="text-text-dim">AI Operational Integrity</span>
                        <span className="text-white font-bold">{aiState.safetyMargin} OK</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] uppercase py-1 border-b border-white/5">
                        <span className="text-text-dim">Active Host Link Mode</span>
                        <span className="text-lime-green font-mono font-bold">OAU.CBT SECURITY SECURE</span>
                      </div>
                    </div>

                    <div className="p-4 bg-electric-blue/5 border border-electric-blue/20 rounded-xl">
                      <p className="text-[9px] text-electric-blue leading-relaxed uppercase tracking-wider">
                        Integrates metadata parameters directly with the offline profile representation for high-efficiency, fully organic processing.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick footer switch for active Holographic project */}
            <div className="px-6 py-4 bg-white/5 border-t border-white/10 flex justify-between items-center">
              <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/40">
                PROJ_DECK // STATUS: LEVEL_ACTIVE
              </span>
              <button
                id="vr-3d-toggle-footer"
                onClick={onXrToggle}
                className={`flex items-center gap-2 px-3.5 py-1.5 border rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(0,229,255,0.1)] ${
                  isXrActive 
                    ? 'bg-lime-green border-lime-green text-charcoal shadow-[0_0_20px_rgba(128,255,0,0.4)]' 
                    : 'bg-black text-white border-white/10 hover:border-electric-blue/50 hover:text-electric-blue'
                }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full bg-current ${isXrActive ? 'animate-ping' : ''}`} />
                {isXrActive ? "VR 3D MODE: ON" : "TRIGGER VR 3D MODE"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </React.Fragment>
  );
}
