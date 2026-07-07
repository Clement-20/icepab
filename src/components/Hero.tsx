import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

interface DecodedLetterProps {
  letter: string;
  delay: number;
  index: number;
  className?: string;
  glowColor?: string;
}

function DecodedLetter({ letter, delay, index, className, glowColor = "rgba(0,229,255,0.6)" }: DecodedLetterProps) {
  const [current, setCurrent] = useState(' ');
  const [isSolid, setIsSolid] = useState(false);
  const chars = "01$¢XØ#@%&*+=-[]/\\<>:_";

  useEffect(() => {
    let frameId: number;
    let startTimeout: NodeJS.Timeout;
    
    startTimeout = setTimeout(() => {
      const startTime = Date.now();
      const scrambleDuration = 400 + Math.random() * 300; // scramble for 400-700ms

      const update = () => {
        const elapsed = Date.now() - startTime;
        if (elapsed < scrambleDuration) {
          const randChar = chars[Math.floor(Math.random() * chars.length)];
          setCurrent(randChar);
          frameId = requestAnimationFrame(update);
        } else {
          setCurrent(letter);
          setIsSolid(true);
        }
      };
      
      update();
    }, delay + index * 40);

    return () => {
      clearTimeout(startTimeout);
      cancelAnimationFrame(frameId);
    };
  }, [letter, delay, index]);

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.5, filter: "blur(6px)", y: 15 }}
      animate={isSolid ? { 
        opacity: 1, 
        scale: 1, 
        filter: "blur(0px)",
        y: 0,
        textShadow: [`0 0 12px ${glowColor}`, "0 0 0px rgba(0,0,0,0)"],
      } : { 
        opacity: [0.4, 1, 0.4], 
        scale: 1.1, 
        filter: "blur(1px)",
        y: -1,
      }}
      transition={{ 
        type: "spring", 
        stiffness: 180, 
        damping: 14,
      }}
      className={`inline-block font-black select-none ${className} ${isSolid ? '' : 'font-mono text-electric-blue/80'}`}
    >
      {current === " " ? "\u00A0" : current}
    </motion.span>
  );
}

function TypewriterPersonas() {
  const personas = [
    "SaaS Architect",
    "UI/UX Designer",
    "Systems Engineer",
    "Distributed Systems Developer",
    "Creative Tech Director"
  ];
  
  const [currentPersonaIdx, setCurrentPersonaIdx] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullText = personas[currentPersonaIdx];

    const handleType = () => {
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(100);

        if (currentText === fullText) {
          timer = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(50);

        if (currentText === "") {
          setIsDeleting(false);
          setCurrentPersonaIdx((prev) => (prev + 1) % personas.length);
          setTypingSpeed(200);
          return;
        }
      }

      timer = setTimeout(handleType, typingSpeed);
    };

    timer = setTimeout(handleType, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentPersonaIdx, typingSpeed]);

  return (
    <span className="inline-flex items-center">
      <span className="bg-gradient-to-r from-electric-blue to-lime-green bg-clip-text text-transparent font-black tracking-wider uppercase font-mono">
        {currentText}
      </span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        className="inline-block w-2.5 h-4 ml-1.5 bg-lime-green shadow-[0_0_8px_rgba(128,255,0,0.8)]"
      />
    </span>
  );
}

function CPUCoreSimulator() {
  return (
    <div className="flex items-center gap-1.5 bg-white/[0.02] border border-white/5 rounded-xl px-3 py-1.5">
      <span className="text-[9px] text-white/30 uppercase tracking-widest font-mono">CPU_CORES</span>
      <div className="flex items-end gap-1 h-3 w-16">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1.5 rounded-sm bg-electric-blue"
            animate={{ 
              height: ["20%", "90%", "40%", "100%", "30%", "70%", "15%"] 
            }}
            transition={{
              duration: 1.0 + i * 0.15,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "reverse"
            }}
          />
        ))}
      </div>
    </div>
  );
}

function SectorMatrix() {
  return (
    <div className="grid grid-cols-6 gap-1 bg-white/[0.02] border border-white/5 rounded-xl p-2.5">
      {[...Array(18)].map((_, i) => {
        const isLoaded = Math.random() > 0.4;
        return (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-[1px]"
            animate={isLoaded ? {
              backgroundColor: ["rgba(0,229,255,0.05)", "rgba(128,255,0,0.8)", "rgba(0,229,255,0.2)"],
            } : {
              backgroundColor: "rgba(255,255,255,0.02)",
            }}
            transition={{
              duration: 2.0,
              repeat: Infinity,
              delay: i * 0.08,
              repeatType: "reverse"
            }}
          />
        );
      })}
    </div>
  );
}

const logsData = [
  { p: 0, text: "INIT // ICEPAB_KERNEL_LOADER v4.21-SECURE" },
  { p: 8, text: "SYS  // RAM CHECK: 65,536 KB ... OK" },
  { p: 18, text: "CORE // RESOLVING COORDINATES... 7.5056° N, 4.5181° E" },
  { p: 28, text: "SYS  // GEO_REGION SPECIFICATION: [OAU-ILE-IFE, NG]" },
  { p: 38, text: "SEC  // KEYSTORE HANDSHAKE... RSA_4096 SUCCESS" },
  { p: 48, text: "SEC  // APERTURE SHUTTERS... MOUNTED" },
  { p: 58, text: "NET  // HOST PROTOCOL: https://icepab.name.ng" },
  { p: 68, text: "DATA // HIGH-CONCURRENCY EXAMGUARD SANDBOX... ACTIVE" },
  { p: 78, text: "UX   // SYNCHRONIZING GRAPHICS ENGINE PIPELINE..." },
  { p: 88, text: "UX   // HAPTIC REFRESH BUFFER STABILIZED @ 60FPS" },
  { p: 94, text: "BOOT // CONSOLIDATING DATA REZONATOR CORES..." },
  { p: 100, text: "READY // BOOT COMPLETE. ALL SYSTEMS ONLINE." }
];

export default function Hero() {
  const [progress, setProgress] = useState(0);
  const [isBooted, setIsBooted] = useState(false);
  const [agentName, setAgentName] = useState('GUEST');

  useEffect(() => {
    const name = sessionStorage.getItem('icepab_agent_name');
    if (name) {
      setAgentName(name.toUpperCase());
    }

    let current = 0;
    const interval = setInterval(() => {
      const step = Math.floor(Math.random() * 8) + 3;
      current = Math.min(current + step, 100);
      setProgress(current);
      
      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsBooted(true);
        }, 800);
      }
    }, 70);

    return () => clearInterval(interval);
  }, []);

  const activeLogs = logsData.filter(log => log.p <= progress).map(log => log.text);

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 overflow-hidden bg-charcoal" aria-label="Welcome to ICEPAB Systems">
      <h1 className="sr-only">Banmeke IfeOluwa Elijah (ICEPAB) - Elite Systems Developer, SaaS Architect, and UI/UX Designer in Nigeria</h1>
      
      <AnimatePresence mode="wait">
        {!isBooted ? (
          <motion.div 
            key="bootloader"
            exit={{ 
              opacity: [1, 1, 0], 
              scaleY: [1, 0.005, 0], 
              scaleX: [1, 1, 0], 
              filter: ["blur(0px)", "blur(2px)", "blur(10px)"],
              transition: { duration: 0.6, times: [0, 0.6, 1], ease: "easeInOut" } 
            }}
            className="absolute inset-0 z-50 bg-[#0A0A0A] flex flex-col items-center justify-center font-mono p-6 select-none"
          >
            {/* CRT scanline overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(0,229,255,0.04),rgba(0,255,0,0.01),rgba(0,229,255,0.04))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-40 z-10" />
            
            <div className="w-full max-w-4xl flex flex-col gap-8">
              
              {/* Header branding */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/10 pb-4 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-lime-green animate-ping" />
                  <span className="text-sm font-black uppercase tracking-[0.3em] text-white">ICEPAB_NET BIOS v4.21</span>
                </div>
                <div className="flex items-center gap-4 text-[10px] text-white/40 uppercase tracking-widest">
                  <span>Node: OAU-IFE</span>
                  <span>Port: 3000</span>
                  <span>SECURE: TRUE</span>
                </div>
              </div>

              {/* Middle Workspace */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                
                {/* Left Column: Diagnostics and Rings */}
                <div className="md:col-span-5 flex flex-col justify-between p-6 bg-white/[0.01] border border-white/5 rounded-2xl gap-8">
                  
                  {/* SVG Rotating Core Ring */}
                  <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
                    {/* Outer circle */}
                    <motion.svg 
                      className="absolute w-full h-full" 
                      viewBox="0 0 100 100"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    >
                      <circle cx="50" cy="50" r="45" stroke="rgba(0, 229, 255, 0.15)" strokeWidth="1" fill="none" />
                      <circle cx="50" cy="50" r="45" stroke="rgba(0, 229, 255, 0.6)" strokeWidth="1.5" strokeDasharray="30 15 10 15" fill="none" />
                    </motion.svg>

                    {/* Inner opposite circle */}
                    <motion.svg 
                      className="absolute w-[80%] h-[80%]" 
                      viewBox="0 0 100 100"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    >
                      <circle cx="50" cy="50" r="40" stroke="rgba(128, 255, 0, 0.15)" strokeWidth="1" fill="none" />
                      <circle cx="50" cy="50" r="40" stroke="rgba(128, 255, 0, 0.6)" strokeWidth="2" strokeDasharray="15 35" fill="none" />
                    </motion.svg>

                    {/* Core Indicator */}
                    <div className="flex flex-col items-center justify-center text-center z-10">
                      <span className="text-[10px] text-white/30 uppercase tracking-widest">PROGRESS</span>
                      <span className="text-2xl font-black text-white">{String(progress).padStart(3, '0')}%</span>
                    </div>
                  </div>

                  {/* Cyber diagnostics widgets */}
                  <div className="grid grid-cols-2 gap-4">
                    <CPUCoreSimulator />
                    <SectorMatrix />
                  </div>
                </div>

                {/* Right Column: Terminal Logs */}
                <div className="md:col-span-7 flex flex-col p-6 bg-white/[0.01] border border-white/5 rounded-2xl h-[280px]">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
                    <div className="flex items-center gap-2">
                      <Terminal size={12} className="text-electric-blue" />
                      <span className="text-[10px] text-white/40 uppercase tracking-wider">Diagnostic_Logs</span>
                    </div>
                    <span className="text-[8px] px-2 py-0.5 bg-white/5 rounded text-white/60 font-mono">LIVE_STREAM</span>
                  </div>

                  {/* Auto-scrolling terminal lines */}
                  <div className="flex-1 overflow-y-auto font-mono text-[10px] space-y-1.5 leading-relaxed text-white/80 no-scrollbar pr-2">
                    {activeLogs.map((log, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-start gap-2"
                      >
                        <span className="text-electric-blue select-none">❯</span>
                        <span className={log.includes('COMPLETE') || log.includes('OK') || log.includes('SUCCESS') ? 'text-lime-green font-bold' : ''}>
                          {log}
                        </span>
                      </motion.div>
                    ))}
                    <div className="w-1.5 h-3 bg-electric-blue inline-block animate-pulse ml-1" />
                  </div>
                </div>
                
              </div>

              {/* Bottom Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-white/40 uppercase tracking-widest">System Booting Process</span>
                  <span className="text-lime-green font-bold uppercase tracking-widest">
                    {progress === 100 ? "READY_STAGE" : "LOADING_RESOURCES..."}
                  </span>
                </div>
                <div className="w-full h-2.5 bg-white/5 border border-white/10 rounded-full overflow-hidden p-[1px]">
                  <motion.div 
                    className="h-full rounded-full bg-gradient-to-r from-electric-blue to-lime-green relative shadow-[0_0_12px_rgba(0,229,255,0.5)]"
                    style={{ width: `${progress}%` }}
                    layoutId="boot-progress-bar"
                  />
                </div>
              </div>

            </div>
          </motion.div>
        ) : (
          <motion.div
            key="hero-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 w-full flex flex-col items-center justify-center py-12"
          >
            {/* Background Grid Pattern inside Content */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(var(--color-electric-blue) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            {/* Cityscape Background Overlay */}
            <div 
              className="absolute inset-0 z-0 opacity-20 bg-cover bg-center pointer-events-none"                
              style={{ backgroundImage: 'url(https://storage.googleapis.com/genai-content-images/user/17495033/generated/image.png)' }}
            />

            {/* Kinetic Typography Title Assembly */}
            <div className="flex flex-col items-center justify-center overflow-hidden mb-8 z-10">
              <h1 className="sr-only">ICEPAB SYSTEMS</h1>
              <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4">
                {/* Word: ICEPAB */}
                <div className="flex justify-center">
                  {"ICEPAB".split("").map((letter, index) => (
                    <DecodedLetter
                      key={`icepab-letter-${index}`}
                      letter={letter}
                      delay={100}
                      index={index}
                      className="text-6xl sm:text-7xl md:text-8xl lg:text-[110px] font-black tracking-tighter text-white"
                      glowColor="rgba(255,255,255,0.4)"
                    />
                  ))}
                </div>
                
                {/* Word: SYSTEMS */}
                <div className="flex justify-center">
                  {"SYSTEMS".split("").map((letter, index) => (
                    <DecodedLetter
                      key={`systems-letter-${index}`}
                      letter={letter}
                      delay={400}
                      index={index}
                      className="text-6xl sm:text-7xl md:text-8xl lg:text-[110px] font-black tracking-tighter bg-gradient-to-r from-electric-blue to-lime-green bg-clip-text text-transparent italic"
                      glowColor="rgba(0,229,255,0.7)"
                    />
                  ))}
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="text-center max-w-xl flex flex-col items-center gap-4 px-4 z-10"
            >
              {/* Glowing Custom Hologram Greet Header */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-lime-green/20 bg-lime-green/5 font-mono text-[9px] text-lime-green uppercase tracking-[0.2em] shadow-[0_4px_24px_rgba(128,255,0,0.04),inset_0_1px_0_rgba(255,255,255,0.05)] animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-lime-green animate-ping" />
                SYSTEMS_ONLINE // WELCOME, AGENT {agentName}
              </div>

              <h2 className="text-text-dim text-lg md:text-xl font-medium leading-relaxed min-h-[3.5rem] flex flex-col md:flex-row items-center justify-center gap-1.5">
                <span>Portfolio of Clement IfeOluwa | </span>
                <TypewriterPersonas />
              </h2>
              <p className="text-white/40 text-[10px] font-mono uppercase tracking-[0.3em] mt-2">
                Minimal latency, maximum reliability under the ICEPAB framework.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2 }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center z-10 hidden md:flex"
            >
              <div className="w-[1px] h-24 bg-gradient-to-b from-electric-blue to-transparent" />
              <span className="text-[10px] uppercase tracking-[0.4em] mt-4 opacity-50 font-mono">Initiate Scan</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
