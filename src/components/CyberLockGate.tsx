import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, KeyRound, Radio, Cpu, Terminal, ArrowRight, EyeOff } from 'lucide-react';

interface CyberLockGateProps {
  onUnlock: (name: string) => void;
}

export default function CyberLockGate({ onUnlock }: CyberLockGateProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [unlockState, setUnlockState] = useState<'locked' | 'decrypting' | 'granted'>('locked');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [inputName, setInputName] = useState('');

  const getDecryptLines = (name: string) => {
    const alias = name.trim() ? name.toUpperCase() : "SECURE_GUEST";
    return [
      `INITIALIZING COGNITIVE INTERACTION BYPASS FOR ${alias}...`,
      `HANDSHAKE PROTOCOL REGISTERED TO: [${alias}] // STATUS OK`,
      "QUERYING RETINAL VECTOR DECRYPTION...",
      "CONNECTING TO OBAFEMI AWOLOWO UNIVERSITY CBT ONLINE SECTOR...",
      "SECURITY SANDBOX COMPROMISED // INTRODUCING COGNITIVE OVERRIDE",
      `DECRYPTING AES-256 FILES FOR AGENT [${alias}]...`,
      "SYSTEM CHANNELS RE-ROUTE COMPLETED",
      `CORPUS NODE VERIFICATION REGISTERED: [${alias}_KEY]`,
      "COMPILING SYSTEM BIOGRAPHICS & RESUME ENGINES...",
      "BYPASSING LOCAL DECK PROTOCOLS COMPLETED",
      `CORE ACCESS: GRANTED // REDIRECTING STREAM TO AGENT [${alias}]`
    ];
  };

  const hackLines = getDecryptLines(inputName);

  // Binary Matrix Rain
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Matrix particles
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize) + 1;
    const rainDrops: number[] = Array(columns).fill(1).map(() => Math.floor(Math.random() * -100));

    // Green color palettes for true hacker feel
    const colors = ['#00FF41', '#80FF00', '#00FF66', '#33CC33'];

    const draw = () => {
      // Semi-transparent redraw to leave a motion trail
      ctx.fillStyle = 'rgba(10, 10, 12, 0.12)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00FF41';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < rainDrops.length; i++) {
        // Random binary digit
        const binaryDigit = Math.random() > 0.5 ? '1' : '0';
        
        // Pick randomized green shades
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        
        // Highlight the lead character in pure white
        if (Math.random() > 0.96) {
          ctx.fillStyle = '#FFFFFF';
        }

        const x = i * fontSize;
        const y = rainDrops[i] * fontSize;

        ctx.fillText(binaryDigit, x, y);

        // Reset drops when they hit the screen bottom
        if (y > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }

        // Speed increases depending on decryption phase
        const speedMultiplier = unlockState === 'decrypting' ? 3.5 : 1;
        rainDrops[i] += speedMultiplier;
      }
    };

    const circuitLoop = () => {
      draw();
      animationFrameId = requestAnimationFrame(circuitLoop);
    };
    circuitLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [unlockState]);

  // Terminal line progression stream
  useEffect(() => {
    if (unlockState !== 'decrypting') return;

    const interval = setInterval(() => {
      if (currentLineIndex < hackLines.length) {
        setTerminalLogs(prev => [...prev, hackLines[currentLineIndex]]);
        setCurrentLineIndex(prev => prev + 1);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setUnlockState('granted');
          // Complete unlock callback
          setTimeout(() => {
            onUnlock(inputName.trim() || 'GUEST');
          }, 1400);
        }, 600);
      }
    }, 180); // Fast line printing

    return () => clearInterval(interval);
  }, [unlockState, currentLineIndex, hackLines, inputName, onUnlock]);

  const handleStartDecryption = () => {
    setUnlockState('decrypting');
  };

  return (
    <div id="cyber-gate-screen" className="fixed inset-0 w-screen h-screen bg-[#0d0d11] z-[110] flex flex-col justify-center items-center overflow-hidden font-mono text-xs select-none">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40" />

      {/* Cyber holographic visual elements overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(10,10,12,0.95))] pointer-events-none z-10" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.2)_50%),linear-gradient(90deg,rgba(0,255,100,0.03),rgba(0,100,255,0.02),rgba(100,255,0,0.03))] bg-[length:100%_4px,3px_100%] pointer-events-none z-10" />

      {/* Content wrapper */}
      <div className="relative z-20 w-full max-w-xl px-6 flex flex-col items-center">
        <AnimatePresence mode="wait">
          {unlockState === 'locked' && (
            <motion.div
              key="system-locked"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6 }}
              className="w-full bg-black/60 backdrop-blur-3xl border border-[#00FF41]/35 rounded-2xl p-8 md:p-12 text-center shadow-[0_24px_64px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.15),0_0_30px_rgba(0,255,65,0.1)] flex flex-col items-center gap-6"
            >
              {/* Spinning visual core */}
              <div className="relative flex items-center justify-center w-20 h-20">
                <div className="absolute inset-0 border border-[#00FF41]/20 rounded-full animate-spin-slow" />
                <div className="absolute w-16 h-16 border border-dashed border-[#00FF41]/40 rounded-full animate-reverse-spin" />
                <div className="absolute w-12 h-12 bg-[#00FF41]/10 rounded-full flex items-center justify-center text-[#00FF41]">
                  <KeyRound size={20} className="animate-pulse" />
                </div>
              </div>

              <div>
                <span className="text-red-500 font-bold uppercase tracking-[0.4em] text-[10px] block mb-2 flex items-center justify-center gap-2">
                  <ShieldAlert size={12} className="animate-bounce" /> PORTAL MEMORY ENCRYPTED
                </span>
                <h1 className="text-xl md:text-2xl font-black uppercase text-white tracking-widest">
                  ICEPAB SYSTEMS // NODE_SECURE
                </h1>
                <p className="text-text-dim/80 text-[10px] uppercase tracking-wider mt-3 max-w-xs mx-auto leading-relaxed">
                  Decryption sequence required to map human assets and automated portfolios to active viewport.
                </p>
              </div>

              {/* Sub-panels telemetry */}
              <div className="w-full grid grid-cols-2 gap-3 py-4 border-t border-b border-[#00FF41]/10 text-left font-mono text-[9px]">
                <div className="space-y-1">
                  <span className="text-white/30 uppercase tracking-widest block font-bold">NODE ADDRESS</span>
                  <span className="text-[#00FF41] font-semibold">ICEPAB_CBT_SECURE_ALPHA</span>
                </div>
                <div className="space-y-1 border-l border-white/5 pl-3">
                  <span className="text-white/30 uppercase tracking-widest block font-bold">ALGORITHM TYPE</span>
                  <span className="text-white font-semibold">AES-256-GCM_LINKED</span>
                </div>
              </div>

              {/* Cognitive Agent Name Input Field */}
              <div className="w-full space-y-3 text-left">
                <label className="text-[9px] font-bold text-[#00FF41]/80 uppercase tracking-[0.2em] block">
                  Identify Yourself (Register Agent Moniker):
                </label>
                <div className="relative flex items-center bg-black/75 border border-[#00FF41]/30 rounded-xl px-4 py-3 focus-within:border-[#00FF41] focus-within:shadow-[0_0_15px_rgba(0,255,65,0.15)] transition-all">
                  <span className="text-[#00FF41] font-semibold mr-2 font-mono">agent://</span>
                  <input
                    type="text"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value.replace(/[^a-zA-Z0-9\s-_]/g, '').slice(0, 16))}
                    placeholder="ENTER AGENT NAME..."
                    className="w-full bg-transparent border-none outline-none text-white font-mono text-sm placeholder:text-[#00FF41]/20 uppercase focus:ring-0"
                    maxLength={16}
                  />
                  <div className="w-2 h-2 rounded-full bg-[#00FF41] animate-pulse ml-2" />
                </div>
                <p className="text-[8px] text-white/40 uppercase tracking-widest">
                  * Empty inputs will fallback as GUEST mode.
                </p>
              </div>

              {/* Action Decrypt button */}
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 0 25px rgba(0,255,65,0.4)' }}
                whileTap={{ scale: 0.97 }}
                onClick={handleStartDecryption}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#00FF41] hover:bg-[#80FF00] text-black font-black uppercase tracking-[0.25em] text-xs rounded-xl shadow-[0_0_15px_rgba(0,255,65,0.2)] transition-colors"
                id="click-to-continue-btn"
              >
                {inputName.trim() ? `AUTHORIZE AS ${inputName.trim().toUpperCase()}` : 'CLICK TO CONTINUE'}
                <ArrowRight size={14} className="animate-pulse" />
              </motion.button>

              <div className="text-[8px] text-white/30 uppercase tracking-widest">
                [ AUTH_HANDSHAKE: STANDARD // PERSISTENT SECURITY ]
              </div>
            </motion.div>
          )}

          {unlockState === 'decrypting' && (
            <motion.div
              key="system-decrypting"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full bg-black/60 backdrop-blur-3xl border border-electric-blue/30 rounded-2xl p-6 md:p-8 shadow-[0_24px_64px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.15),0_0_30px_rgba(0,229,255,0.1)] font-mono text-left"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <Terminal className="text-electric-blue w-4 h-4 animate-pulse" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">CRACKING MAIN KEY INJECT STATE...</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 animate-ping" />
                  <span className="text-[9px] text-[#00FF41] font-bold">RUNNING</span>
                </div>
              </div>

              {/* Interactive terminal output stream */}
              <div className="h-64 overflow-y-auto no-scrollbar space-y-2 pr-2 font-mono text-[10px] leading-relaxed select-text">
                {terminalLogs.map((log, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex gap-2"
                  >
                    <span className="text-[#00FF41] font-bold">{">>"}</span>
                    <span className={i === terminalLogs.length - 1 ? 'text-white' : 'text-white/60'}>
                      {log}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Progress Bar Loading */}
              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-[9px] uppercase font-bold tracking-wider text-white/50">
                  <span>SYSTEM OVERLOAD OVERRIDE SEQUENCE</span>
                  <span className="text-electric-blue">
                    {Math.min(100, Math.floor((terminalLogs.length / hackLines.length) * 100))}%
                  </span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: `${(terminalLogs.length / hackLines.length) * 100}%` }}
                    transition={{ ease: "easeInOut" }}
                    className="h-full bg-electric-blue shadow-[0_0_10px_rgba(0,229,255,0.8)]"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {unlockState === 'granted' && (
            <motion.div
              key="system-granted"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", damping: 15 }}
              className="text-center space-y-6"
            >
              <motion.div
                initial={{ rotate: -180, scale: 0.5 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", damping: 12 }}
                className="w-24 h-24 rounded-full border-2 border-[#00FF41] bg-black/80 flex items-center justify-center text-[#00FF41] mx-auto shadow-[0_0_50px_rgba(0,255,65,0.4)]"
              >
                <Cpu size={36} className="animate-pulse" />
              </motion.div>
              
              <div className="space-y-2">
                <motion.h2 
                  initial={{ letterSpacing: '0.1em' }}
                  animate={{ letterSpacing: '0.4em' }}
                  transition={{ duration: 1.2 }}
                  className="text-2xl md:text-3xl font-black text-[#00FF41] uppercase block"
                >
                  ACCESS GRANTED
                </motion.h2>
                <p className="text-white/70 text-[10px] uppercase tracking-[0.2em] font-semibold animate-pulse">
                  WELCOMEBACK, AGENT {inputName.trim() ? inputName.trim().toUpperCase() : 'GUEST'}
                </p>
                <span className="text-[9px] text-white/40 block tracking-widest uppercase mt-1">STREAM SECURED ENGINES ON DECK</span>
              </div>

              <div className="w-48 h-[1px] bg-[#00FF41]/30 mx-auto animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
