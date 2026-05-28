import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Cpu, Eye, ShieldAlert, Compass, CornerDownLeft, Maximize, Play, Sliders, ExternalLink, Upload, Sparkles, Trash2, Send, AlertTriangle, MessageSquare, Loader2 } from 'lucide-react';
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
  const [agentName, setAgentName] = useState('GUEST');
  const [cliHistory, setCliHistory] = useState<ConsoleLine[]>([]);
  const [activeTab, setActiveTab] = useState<'cli' | 'ar_hud' | 'ai_feed'>('cli');

  useEffect(() => {
    const checkName = () => {
      const stored = sessionStorage.getItem('icepab_agent_name');
      if (stored) {
        setAgentName(stored.toUpperCase());
      }
    };
    checkName();
    const interval = setInterval(checkName, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const name = sessionStorage.getItem('icepab_agent_name') || 'GUEST';
    setCliHistory([
      { text: `ICEPAB NEURAL CORE TERMINAL // ONLINE // IDENTIFIER: ${name.toUpperCase()}`, type: "system" },
      { text: `Secure handshake verified. Welcome back, Agent [${name.toUpperCase()}]. TYPE 'hello' or 'help'.`, type: "success" },
      { text: "Type 'help' to review authorized terminal routines.", type: "system" }
    ]);
  }, [agentName]);
  
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

  // Multimodal Gemini states
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiImage, setAiImage] = useState<string | null>(null);
  const [aiImageName, setAiImageName] = useState<string | null>(null);
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiHistory, setAiHistory] = useState<Array<{ role: 'user' | 'model'; text: string; image?: string | null }>>([]);
  const [aiError, setAiError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        setAiError("File exceeds maximum allowed size (4MB limit)");
        return;
      }
      setAiImageName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAiImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitAiQuery = async (overridePrompt?: string) => {
    const activePrompt = overridePrompt || aiPrompt;
    if (!activePrompt.trim() && !aiImage) return;

    setIsAiLoading(true);
    setAiError(null);
    setAiResponse('');

    const userMessage = { 
      role: 'user' as const, 
      text: activePrompt, 
      image: aiImage 
    };
    setAiHistory(prev => [...prev, userMessage]);
    
    // Clear inputs
    if (!overridePrompt) {
      setAiPrompt('');
    }

    try {
      const response = await fetch('/api/gemini/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt: activePrompt, 
          image: aiImage 
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("Local response stream could not be established.");
      }

      const decoder = new TextDecoder();
      let buffer = '';
      let accumulatedResponse = '';

      setAiState(prev => ({ ...prev, thinkingState: 'streaming quantum bits' }));

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const cleanLine = line.trim();
          if (!cleanLine.startsWith('data: ')) continue;

          const dataStr = cleanLine.slice(6);
          if (dataStr === '[DONE]') {
            break;
          }

          try {
            const parsed = JSON.parse(dataStr);
            if (parsed.text) {
              accumulatedResponse += parsed.text;
              setAiResponse(accumulatedResponse);
            } else if (parsed.error) {
              throw new Error(parsed.error);
            }
          } catch (e) {
            // ignore partial JSON parse faults
          }
        }
      }

      // Flush final elements
      if (buffer.trim()) {
        try {
          const cleanLine = buffer.trim();
          if (cleanLine.startsWith('data: ')) {
            const dataStr = cleanLine.slice(6);
            if (dataStr !== '[DONE]') {
              const parsed = JSON.parse(dataStr);
              if (parsed.text) {
                accumulatedResponse += parsed.text;
                setAiResponse(accumulatedResponse);
              }
            }
          }
        } catch(e) {}
      }

      setAiHistory(prev => [...prev, { role: 'model', text: accumulatedResponse }]);
      setAiResponse('');
      setAiImage(null);
      setAiImageName(null);
      setAiState(prev => ({ ...prev, thinkingState: 'standby' }));
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || "An unexpected communication fault occurred.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const cliEndRef = useRef<HTMLDivElement>(null);

  // Holographic scan & signal flicker entry variants
  const containerVariants = {
    hidden: { 
      opacity: 0, 
      x: -40, 
      scale: 0.96,
      skewX: -2,
    },
    visible: { 
      opacity: [0, 0.5, 0.3, 0.9, 0.85, 1],
      x: 0, 
      scale: 1,
      skewX: 0,
      transition: { 
        type: "spring" as const, 
        damping: 22, 
        stiffness: 140,
        staggerChildren: 0.08,
        delayChildren: 0.05
      }
    },
    exit: { 
      opacity: 0, 
      x: -40, 
      scale: 0.96,
      skewX: 1,
      transition: {
        duration: 0.25,
        ease: "easeIn" as const
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 12,
      clipPath: "inset(0% 0% 100% 0%)",
    },
    visible: { 
      opacity: 1, 
      y: 0,
      clipPath: "inset(0% 0% 0% 0%)",
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 120
      }
    }
  };

  const tabVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        duration: 0.15
      }
    }
  };

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
      { text: `${agentName.toLowerCase()}@icepab:~$ ${cliInput}`, type: 'input' }
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
          { text: "  hello       - Establish interactive cognitive greetings", type: 'data' },
          { text: "  selfdestruct- Simulate terminal thermal shield reactor overload", type: 'data' },
          { text: "  xr-toggle   - Command viewport to trigger holographic XR modes", type: 'data' },
          { text: "  clear       - Purge local diagnostic terminal buffer", type: 'data' }
        );
        break;
      case 'hello':
        newLines.push(
          { text: `UPLINK SECURED: COGNITIVE FEEDBACK ONLINE FOR [${agentName}]`, type: 'success' },
          { text: `System Core: "Greetings, Agent ${agentName}. We have established full neural bypass. How may I facilitate your exploration of Clem's workspace today?"`, type: 'data' },
          { text: "System prompt suggestion: Type 'projects' to scan active systems, or 'bio' for schematic files.", type: 'system' }
        );
        break;
      case 'selfdestruct':
        newLines.push(
          { text: `[!!!] CRITICAL FAILURE WARNING: REACTOR LOAD BYPASS FOR AGENT [${agentName}]`, type: 'warning' },
          { text: "  ↳ [5] SYSTEM DESTRUCTION IN T-MINUS 5 MICROSECONDS", type: 'data' },
          { text: "  ↳ [4] HEURISTIC BUFFER MEMORIES DE-COHERING", type: 'data' },
          { text: "  ↳ [3] DISCONNECTING CORPOREAL HARDWARE SOCKETS", type: 'data' },
          { text: "  ↳ [2] TEMPERATURE HIGH: 1845K NEARING SUB-CRISET LIMIT", type: 'data' },
          { text: "  ↳ [1] ... DESTRUCTION OVERRIDDEN // EMERGENCY SAFETY BLOCK ACTIVATED", type: 'success' },
          { text: "  ↳ SAFE_STATE ENGAGED. Clem's core bypass protocols saved current terminal replica. Stand down, Agent.", type: 'success' }
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
        { text: `${agentName.toLowerCase()}@icepab:~$ ${cmd}`, type: 'input' as const }
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
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed bottom-24 left-6 w-[95%] sm:w-[480px] h-[550px] bg-black/55 backdrop-blur-3xl border border-electric-blue/30 rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.15),0_0_30px_rgba(0,229,255,0.1)] flex flex-col z-[95] overflow-hidden animate-[flicker_0.15s_ease-out]"
          >
            {/* Ambient Holographic Scanline overlay */}
            <motion.div 
              initial={{ y: "-10%" }}
              animate={{ y: "100%" }}
              transition={{ duration: 3, ease: "linear", repeat: Infinity }}
              className="absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent via-electric-blue/5 to-transparent pointer-events-none z-55"
              style={{ top: 0 }}
            />
            <motion.div 
              initial={{ y: "0%" }}
              animate={{ y: "550px" }}
              transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.5 }}
              className="absolute left-0 right-0 h-[1.5px] bg-electric-blue/50 pointer-events-none z-55 shadow-[0_0_8px_rgba(0,229,255,0.6)]"
              style={{ top: 0 }}
            />

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
                    variants={tabVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="h-full flex flex-col justify-between"
                  >
                    <motion.div 
                      variants={itemVariants} 
                      className="flex-1 overflow-y-auto space-y-2 pr-2 no-scrollbar"
                    >
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
                    </motion.div>
 
                    {/* Shortcut Buttons grid to execute commands in 1 click! (Interactive/Real) */}
                    <motion.div 
                      variants={itemVariants} 
                      className="pt-4 border-t border-white/5 flex gap-1.5 flex-wrap"
                    >
                      <button onClick={() => executeShortcut('bio')} className="px-2 py-1 bg-white/5 hover:bg-electric-blue/10 border border-white/10 hover:border-electric-blue/30 rounded text-[9px] text-white">/bio</button>
                      <button onClick={() => executeShortcut('projects')} className="px-2 py-1 bg-white/5 hover:bg-electric-blue/10 border border-white/10 hover:border-electric-blue/30 rounded text-[9px] text-white">/projects</button>
                      <button onClick={() => executeShortcut('scan')} className="px-2 py-1 bg-white/5 hover:bg-[#80FF00]/10 border border-white/10 hover:border-[#80FF00]/30 rounded text-[9px] text-white">/scan</button>
                      <button onClick={() => executeShortcut('xr-toggle')} className="px-2 py-1 bg-white/5 hover:bg-electric-blue/10 border border-white/10 hover:border-electric-blue/30 rounded text-[9px] text-white">/hologram</button>
                    </motion.div>
 
                    {/* Command Input Action Form */}
                    <motion.form 
                      variants={itemVariants} 
                      onSubmit={handleCliSubmit} 
                      className="mt-4 flex items-center bg-black border border-white/10 rounded-xl px-4 py-2"
                    >
                      <span className="text-lime-green mr-2">{agentName.toLowerCase()}@icepab:~$</span>
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
                    </motion.form>
                  </motion.div>
                )}

                {activeTab === 'ar_hud' && (
                  <motion.div 
                    key="ar_hud_view"
                    variants={tabVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6"
                  >
                    <motion.div variants={itemVariants} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
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
                    </motion.div>

                    {/* Interactive Real Slider for spatial depth constraint */}
                    <motion.div variants={itemVariants} className="space-y-3 p-4 bg-black/40 border border-white/5 rounded-xl">
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
                    </motion.div>

                    {/* Live Telemetries Vectors */}
                    <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
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
                    </motion.div>

                    <motion.div variants={itemVariants} className="p-4 bg-lime-green/5 border border-lime-green/20 rounded-xl">
                      <p className="text-[9px] text-lime-green font-mono uppercase tracking-widest leading-relaxed">
                        ★ AR HUD system maps layout boundaries in real-time. Feel free to tweak the slider to adjust perspective skews.
                      </p>
                    </motion.div>
                  </motion.div>
                )}

                {activeTab === 'ai_feed' && (
                  <motion.div 
                    key="ai_view"
                    variants={tabVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-4 h-full flex flex-col justify-between"
                  >
                    {/* Header and Status Monitor */}
                    <div className="flex justify-between items-center p-3.5 bg-white/5 border border-white/10 rounded-xl">
                      <div>
                        <span className="text-[8px] uppercase tracking-widest text-[#00e5ff]/60">Neural Cognitive Platform</span>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">GEMINI-3.5-FLASH LIVE</h4>
                      </div>
                      <span className="text-[9px] font-black px-2.5 py-1 bg-lime-green/20 border border-lime-green/40 text-lime-green rounded flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-lime-green rounded-full animate-ping" />
                        SECURED
                      </span>
                    </div>

                    {/* Chat and Streaming response index */}
                    <div className="flex-1 min-h-[140px] max-h-[220px] overflow-y-auto border border-white/5 bg-black/40 rounded-xl p-3 space-y-3.5 no-scrollbar text-[10px]">
                      {aiHistory.length === 0 && !aiResponse && !isAiLoading && (
                        <div className="text-center py-6 text-white/30 space-y-3">
                          <Sparkles className="mx-auto text-electric-blue w-6 h-6 animate-pulse" />
                          <p className="uppercase tracking-widest text-[8px] max-w-xs mx-auto">
                            UPLINK INITIATED. Drop an image or send a prompt to analyze with Gemini intelligence.
                          </p>
                          <div className="flex flex-col gap-1.5 max-w-xs mx-auto pt-2">
                            <button
                              type="button"
                              onClick={() => submitAiQuery("Explain what Clem can build with ICEPAB platforms.")}
                              className="px-2.5 py-1.5 bg-white/[0.03] hover:bg-white/10 border border-white/10 hover:border-[#00e5ff]/40 text-left text-white/80 rounded uppercase text-[8px] tracking-wider transition-all"
                            >
                              ⚡ What can Clem build with ICEPAB?
                            </button>
                            <button
                              type="button"
                              onClick={() => submitAiQuery("Give me ideas for optimizing OAU CBT center portals under low latency.")}
                              className="px-2.5 py-1.5 bg-white/[0.03] hover:bg-white/10 border border-white/10 hover:border-[#00e5ff]/40 text-left text-white/80 rounded uppercase text-[8px] tracking-wider transition-all"
                            >
                              ⚡ Optimize OAU CBT center latency
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Conversation History log */}
                      {aiHistory.map((item, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between items-center opacity-40 font-bold uppercase text-[8px] tracking-wider">
                            <span>{item.role === 'user' ? agentName : 'GEMINI_AGENT'}</span>
                            <span>UPLINKSECURE</span>
                          </div>
                          {item.image && (
                            <div className="relative inline-block border border-white/10 rounded-lg overflow-hidden max-w-[120px] mt-1">
                              <img src={item.image} alt="uploaded data" className="w-full h-auto object-cover opacity-80" referrerPolicy="no-referrer" />
                              <span className="absolute bottom-1 right-1 bg-black/60 text-[7px] text-lime-green px-1 rounded uppercase tracking-widest font-mono">IMAGE</span>
                            </div>
                          )}
                          <div className={`p-2.5 rounded-lg border leading-relaxed break-words whitespace-pre-wrap ${item.role === 'user' ? 'bg-white/5 border-white/10 text-white/95' : 'bg-[#00e5ff]/5 border-[#00e5ff]/20 text-[#00e5ff]'}`}>
                            {item.text}
                          </div>
                        </div>
                      ))}

                      {/* Active Response Streaming chunk */}
                      {aiResponse && (
                        <div className="space-y-1">
                          <div className="flex justify-between items-center opacity-40 font-bold uppercase text-[8px] tracking-wider text-lime-green">
                            <span>GEMINI_STREAMING_AGENT</span>
                            <span className="animate-pulse">FLOWING...</span>
                          </div>
                          <div className="p-2.5 rounded-lg bg-[#00e5ff]/5 border border-[#00e5ff]/30 text-[#00e5ff] leading-relaxed break-words whitespace-pre-wrap animate-pulse">
                            {aiResponse}
                          </div>
                        </div>
                      )}

                      {/* Stream loading indicator queue */}
                      {isAiLoading && !aiResponse && (
                        <div className="flex items-center gap-2 p-3 bg-black/60 border border-white/5 rounded-lg text-white/40 uppercase tracking-widest text-[8px]">
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-electric-blue" />
                          <span>Streaming low latency neural matrices...</span>
                        </div>
                      )}

                      {/* Error panel handler */}
                      {aiError && (
                        <div className="p-3 bg-red-950/40 border border-red-500/30 text-red-200 rounded-lg space-y-2 uppercase text-[9px] tracking-wider leading-relaxed">
                          <div className="flex items-center gap-2 font-bold text-red-400">
                            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                            <span>COGNITIVE GATEWAY FAILURE</span>
                          </div>
                          <p>{aiError}</p>
                          {aiError.toLowerCase().includes("gemini_api_key") && (
                            <p className="text-[8px] text-red-300 font-bold tracking-widest border-t border-red-500/20 pt-1.5">
                              ★ ACTION REQUIRED: Setup your API Key in the &quot;Settings &gt; Secrets&quot; panel in Google AI Studio before calling Gemini intelligence.
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Dual Form Controller (Image input + Text prompt text and actions) */}
                    <div className="space-y-3 pt-1">
                      {/* Image Drop / Attach Indicator Panel */}
                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          ref={fileInputRef}
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />

                        {aiImage ? (
                          <div className="flex items-center justify-between w-full p-2 bg-lime-green/5 border border-lime-green/20 rounded-xl">
                            <div className="flex items-center gap-2 min-w-0">
                              <img src={aiImage} alt="uploaded matrix preview" className="w-7 h-7 object-cover rounded border border-lime-green/30" referrerPolicy="no-referrer" />
                              <span className="text-[8px] font-mono text-lime-green truncate uppercase tracking-wider max-w-[180px]">
                                {aiImageName || "IMAGE_RESOURCE.DAT"}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => { setAiImage(null); setAiImageName(null); }}
                              className="p-1 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded transition-colors"
                              title="Delete Resource Vector"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-white/[0.02] hover:bg-white/5 border border-dashed border-white/20 hover:border-electric-blue rounded-xl text-white/40 hover:text-[#00e5ff] text-[9px] font-mono uppercase tracking-widest transition-all"
                          >
                            <Upload size={12} />
                            <span>ATTACH IMAGE SCANNER (MAX 4MB)</span>
                          </button>
                        )}
                      </div>

                      {/* Interactive form for submission */}
                      <form
                        onSubmit={(e) => { e.preventDefault(); submitAiQuery(); }}
                        className="flex items-center bg-black border border-white/10 rounded-xl px-3.5 py-1.5 focus-within:border-[#00e5ff] focus-within:shadow-[0_0_15px_rgba(0,229,255,0.08)] transition-all"
                      >
                        <input
                          type="text"
                          value={aiPrompt}
                          onChange={(e) => setAiPrompt(e.target.value)}
                          placeholder={isAiLoading ? "Streaming..." : "Interface prompt..."}
                          className="flex-1 bg-transparent text-white text-[10px] uppercase font-mono tracking-wider focus:outline-none min-w-0 placeholder:text-white/20"
                          disabled={isAiLoading}
                        />
                        <button
                          type="submit"
                          disabled={isAiLoading || (!aiPrompt.trim() && !aiImage)}
                          className={`p-1.5 rounded transition-all ml-1.5 ${isAiLoading || (!aiPrompt.trim() && !aiImage) ? 'text-white/10 cursor-not-allowed' : 'text-[#00e5ff] hover:bg-[#00e5ff]/10 hover:shadow-[0_0_10px_rgba(3,212,253,0.3)]'}`}
                        >
                          <Send size={12} className={isAiLoading ? "animate-spin" : ""} />
                        </button>
                      </form>
                    </div>

                    {/* Operational system telemetry note */}
                    <div className="pt-2 border-t border-white/5 flex justify-between items-center text-[8px] text-white/20 uppercase tracking-widest">
                      <span>LATENCY: ZERO_STREAM</span>
                      <span>SECURE_COG: GEMINI-3.5</span>
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
