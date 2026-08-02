import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, 
  Download, 
  MessageSquare, 
  FileText, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  ExternalLink, 
  ShieldCheck, 
  Send, 
  CreditCard, 
  Lock, 
  ChevronRight,
  Sparkles,
  FileDown,
  Layers,
  ArrowRight,
  Search
} from 'lucide-react';
import { SITE_METADATA } from '../metadata';

// Types for the 5 Automations
type AutomationTab = 'scoping' | 'portal' | 'faq' | 'invoicing' | 'tracker';

export default function ClientAutomationsHub() {
  const [activeTab, setActiveTab] = useState<AutomationTab>('scoping');

  // --- Automation 1 State: Project Scoping & Cost Estimator ---
  const [projectType, setProjectType] = useState<'web' | 'design' | 'cbt' | 'automation'>('web');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['responsive', 'admin']);
  const [timeline, setTimeline] = useState<'standard' | 'express' | 'enterprise'>('standard');
  const [selectedDate, setSelectedDate] = useState('2026-08-05');
  const [selectedTime, setSelectedTime] = useState('14:00');
  const [scopingSubmitted, setScopingSubmitted] = useState(false);
  const [generatedScopeId, setGeneratedScopeId] = useState('');

  // Feature pricing calculation
  const basePrices = {
    web: 350,
    design: 150,
    cbt: 500,
    automation: 250
  };

  const featureCosts: Record<string, number> = {
    responsive: 50,
    admin: 100,
    payment: 80,
    auth: 60,
    chat: 90,
    sheets: 70,
    anticheat: 150
  };

  const timelineMultipliers = {
    standard: 1,
    express: 1.3,
    enterprise: 1.6
  };

  const calculateTotalCost = () => {
    const base = basePrices[projectType];
    const featuresSum = selectedFeatures.reduce((acc, feat) => acc + (featureCosts[feat] || 0), 0);
    const subtotal = base + featuresSum;
    return Math.round(subtotal * timelineMultipliers[timeline]);
  };

  const toggleFeature = (featId: string) => {
    setSelectedFeatures(prev => 
      prev.includes(featId) ? prev.filter(f => f !== featId) : [...prev, featId]
    );
  };

  const handleScopeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const scopeId = `SCOPE-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedScopeId(scopeId);
    setScopingSubmitted(true);
  };

  // --- Automation 2 State: Client Portal & File Deliverables ---
  const [accessCodeInput, setAccessCodeInput] = useState('DEMO-CLIENT-2026');
  const [portalUnlocked, setPortalUnlocked] = useState(true);
  const [downloadingFile, setDownloadingFile] = useState<string | null>(null);

  const deliverables = [
    { id: '1', name: 'Master Brand Identity Package (PSD, PNG, SVG)', size: '245 MB', type: 'ZIP Archive', category: 'Design Assets', date: 'Jul 28, 2026' },
    { id: '2', name: 'ExamGuard OAU CBT Engine Production Build', size: '1.2 GB', type: 'Docker / Node App', category: 'Source Code', date: 'Jul 29, 2026' },
    { id: '3', name: 'Interactive UI/UX Figma Design System', size: 'Cloud Link', type: 'Figma File', category: 'UI/UX Specs', date: 'Jul 25, 2026' },
    { id: '4', name: 'Glass Box Automation & Sheets API Integration Guide', size: '14 MB', type: 'PDF Document', category: 'Documentation', date: 'Jul 30, 2026' }
  ];

  const handleDownload = (fileName: string) => {
    setDownloadingFile(fileName);
    setTimeout(() => {
      setDownloadingFile(null);
      alert(`[SIMULATION] Delivered file package: ${fileName}`);
    }, 1500);
  };

  // --- Automation 3 State: Smart Support & FAQ Chatbot ---
  const [faqSearch, setFaqSearch] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string }>>([
    { sender: 'bot', text: 'Greetings! I am the IcePab AI Client Assistant. Ask me anything about project pricing, revision policies, delivery timelines, or CBT systems.' }
  ]);
  const [userQuery, setUserQuery] = useState('');

  const faqs = [
    { q: 'What is your typical project timeline?', a: 'Standard web apps take 2-3 weeks. Express design & CBT setups can be delivered in 5-7 days.', cat: 'Timelines' },
    { q: 'How do project revisions work?', a: 'Every project includes up to 3 rounds of comprehensive revisions. Additional tweaks are handled seamlessly via our portal.', cat: 'Policy' },
    { q: 'What payment gateways do you support?', a: 'We accept Paystack, Flutterwave, Stripe, direct bank wire, and major cryptocurrencies.', cat: 'Billing' },
    { q: 'Can ExamGuard CBT run offline on local school servers?', a: 'Yes! ExamGuard supports completely offline LAN deployment with zero internet dependence and anti-cheat hardware locking.', cat: 'CBT Systems' }
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim()) return;
    const text = userQuery;
    setChatMessages(prev => [...prev, { sender: 'user', text }]);
    setUserQuery('');

    // Generate intelligent responses
    setTimeout(() => {
      let botReply = "Thank you for reaching out! Our team handles high-concurrency systems, UI design, and business automation. You can also chat directly on WhatsApp for immediate custom quotes.";
      const lower = text.toLowerCase();
      if (lower.includes('price') || lower.includes('cost') || lower.includes('charge')) {
        botReply = "Projects start from $150 for branding/UI designs and $350 for custom full-stack web applications. Use our interactive Scoping tab for an exact instant cost estimate!";
      } else if (lower.includes('cbt') || lower.includes('examguard') || lower.includes('exam')) {
        botReply = "ExamGuard CBT is our flagship secure testing platform used for university & institutional testing. It features anti-cheat sandbox locking and instant auto-grading.";
      } else if (lower.includes('contact') || lower.includes('whatsapp') || lower.includes('call')) {
        botReply = `You can book an instant call via the Scoping tab, or chat with Clement directly on WhatsApp: ${SITE_METADATA.social.whatsapp.url}`;
      }
      setChatMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
    }, 800);
  };

  // --- Automation 4 State: Contracts, Invoicing & Receipts ---
  const [signerName, setSignerName] = useState('');
  const [isContractSigned, setIsContractSigned] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);

  // --- Automation 5 State: Project Status Tracker ---
  const [activeProjectId, setActiveProjectId] = useState('PROJ-EXAMGUARD-OAU');

  const projectStages = [
    { title: 'Discovery & Scoping', desc: 'Requirements gathered, tech stack locked', status: 'completed', date: 'Jul 10, 2026' },
    { title: 'Wireframing & UI/UX Design', desc: 'Figma prototypes and client sign-off', status: 'completed', date: 'Jul 18, 2026' },
    { title: 'Core Development & API Engine', desc: 'Backend logic, Sheets integration & sandbox', status: 'active', progress: 85, date: 'In Progress' },
    { title: 'QA Audit & CBT Security Lock', desc: 'Stress testing, anti-cheat validation', status: 'upcoming', date: 'Aug 03, 2026' },
    { title: 'Production Handover & Deployment', desc: 'Domain launch, magic link portal access', status: 'upcoming', date: 'Aug 08, 2026' }
  ];

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto text-white">
      {/* Header */}
      <div className="mb-12">
        <span className="text-electric-blue font-mono text-xs uppercase tracking-[0.4em] mb-3 block">
          Client Automation Suite // 24/7 Operations
        </span>
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
          Client Operations & Automation
        </h1>
        <p className="text-text-dim text-sm max-w-2xl mt-3 font-mono">
          Automated scoping, secure file delivery portals, real-time status tracking, instant contracts & AI pre-sales support.
        </p>
      </div>

      {/* Tabs Bar */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-white/[0.03] border border-white/10 rounded-2xl mb-12">
        {[
          { id: 'scoping', label: '1. Scoping & Estimate', icon: Calculator },
          { id: 'portal', label: '2. Client Deliverables Portal', icon: Download },
          { id: 'faq', label: '3. AI Support & Knowledge Base', icon: MessageSquare },
          { id: 'invoicing', label: '4. Contracts & Invoicing', icon: FileText },
          { id: 'tracker', label: '5. Real-Time Status Tracker', icon: Clock }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as AutomationTab)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                isActive 
                  ? 'bg-electric-blue text-charcoal shadow-[0_0_20px_rgba(0,229,255,0.4)]' 
                  : 'text-text-dim hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      <div className="bg-surface border border-accent-border rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
        
        {/* --- TAB 1: Instant Project Inquiries & Scoping --- */}
        {activeTab === 'scoping' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
                  <Calculator className="text-electric-blue" size={28} />
                  Instant Project Scoping & Cost Estimator
                </h2>
                <p className="text-xs text-text-dim font-mono mt-1">Select requirements for an immediate itemized cost breakdown & book an intro call.</p>
              </div>
              <span className="hidden sm:inline-block px-3 py-1 bg-lime-green/10 border border-lime-green/30 text-lime-green font-mono text-[10px] uppercase tracking-widest rounded-full">
                Instant Auto-Quote
              </span>
            </div>

            {scopingSubmitted ? (
              <div className="p-8 bg-lime-green/10 border border-lime-green/30 rounded-2xl text-center">
                <CheckCircle2 size={48} className="text-lime-green mx-auto mb-4" />
                <h3 className="text-2xl font-bold uppercase tracking-tight">Scope Registered & Call Booked!</h3>
                <p className="text-sm font-mono text-white/80 max-w-lg mx-auto mt-2">
                  Your reference ID is <span className="text-lime-green font-black">{generatedScopeId}</span>. Your intro call has been slotted for <span className="text-white font-bold">{selectedDate}</span> at <span className="text-white font-bold">{selectedTime}</span>.
                </p>
                <div className="mt-6 flex justify-center gap-4">
                  <button 
                    onClick={() => setScopingSubmitted(false)} 
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 text-xs font-bold uppercase tracking-widest rounded-xl transition-colors"
                  >
                    Adjust Scope
                  </button>
                  <a 
                    href={SITE_METADATA.social.whatsapp.url}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="px-6 py-3 bg-lime-green text-charcoal text-xs font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-transform"
                  >
                    Confirm via WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleScopeSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left 2 Cols: Form options */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Step 1: Select Project Category */}
                  <div>
                    <label className="text-xs font-mono uppercase text-electric-blue tracking-widest block mb-3 font-bold">
                      1. Select Project Type
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { id: 'web', label: 'Web Application', price: '$350+' },
                        { id: 'design', label: 'UI/UX & Branding', price: '$150+' },
                        { id: 'cbt', label: 'ExamGuard CBT', price: '$500+' },
                        { id: 'automation', label: 'Business Automation', price: '$250+' }
                      ].map(cat => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setProjectType(cat.id as any)}
                          className={`p-4 rounded-2xl border text-left transition-all ${
                            projectType === cat.id 
                              ? 'border-electric-blue bg-electric-blue/10 text-white shadow-[0_0_15px_rgba(0,229,255,0.2)]' 
                              : 'border-white/10 bg-black/40 text-text-dim hover:text-white'
                          }`}
                        >
                          <span className="text-xs font-bold uppercase block">{cat.label}</span>
                          <span className="text-[10px] font-mono text-electric-blue mt-1 block">{cat.price}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 2: Feature Checklist */}
                  <div>
                    <label className="text-xs font-mono uppercase text-electric-blue tracking-widest block mb-3 font-bold">
                      2. Choose Required Modules & Features
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { id: 'responsive', label: 'Fluid Responsive Mobile Layout', cost: '+$50' },
                        { id: 'admin', label: 'Custom Admin Dashboard & Controls', cost: '+$100' },
                        { id: 'payment', label: 'Paystack/Stripe Payment Integration', cost: '+$80' },
                        { id: 'auth', label: 'Secure User Auth & Access Control', cost: '+$60' },
                        { id: 'chat', label: 'Real-Time Support / WebSocket Chat', cost: '+$90' },
                        { id: 'sheets', label: 'Google Sheets & Business Sync', cost: '+$70' },
                        { id: 'anticheat', label: 'Hardware Anti-Cheat CBT Sandbox', cost: '+$150' }
                      ].map(feat => {
                        const checked = selectedFeatures.includes(feat.id);
                        return (
                          <button
                            key={feat.id}
                            type="button"
                            onClick={() => toggleFeature(feat.id)}
                            className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                              checked 
                                ? 'border-lime-green bg-lime-green/10 text-white' 
                                : 'border-white/10 bg-black/30 text-text-dim hover:text-white'
                            }`}
                          >
                            <span className="text-xs font-semibold">{feat.label}</span>
                            <span className="text-[10px] font-mono text-lime-green">{feat.cost}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 3: Timeline & Schedule Call */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/10">
                    <div>
                      <label className="text-xs font-mono uppercase text-electric-blue tracking-widest block mb-2 font-bold">
                        Delivery Pace
                      </label>
                      <select 
                        value={timeline} 
                        onChange={(e) => setTimeline(e.target.value as any)}
                        className="w-full p-3.5 bg-black/50 border border-white/10 rounded-xl text-xs font-mono uppercase text-white focus:outline-none focus:border-electric-blue"
                      >
                        <option value="standard">Standard Pace (2-3 Weeks)</option>
                        <option value="express">Express Delivery (5-7 Days) [+30%]</option>
                        <option value="enterprise">Enterprise Scaled (Priority Sprint) [+60%]</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-electric-blue tracking-widest block mb-2 font-bold">
                        Intro Call Calendar Slot
                      </label>
                      <div className="flex gap-2">
                        <input 
                          type="date" 
                          value={selectedDate} 
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="w-full p-3.5 bg-black/50 border border-white/10 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-electric-blue"
                        />
                        <input 
                          type="time" 
                          value={selectedTime} 
                          onChange={(e) => setSelectedTime(e.target.value)}
                          className="w-32 p-3.5 bg-black/50 border border-white/10 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-electric-blue"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Col: Cost Summary Box */}
                <div className="bg-black/60 border border-white/15 p-6 rounded-2xl flex flex-col justify-between h-full">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-text-dim block mb-2">Estimated Investment</span>
                    <div className="text-4xl md:text-5xl font-black text-lime-green font-mono">
                      ${calculateTotalCost()}
                      <span className="text-xs font-normal text-text-dim ml-2 uppercase font-sans">USD</span>
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/10 space-y-3 font-mono text-xs text-text-dim">
                      <div className="flex justify-between">
                        <span>Base Category:</span>
                        <span className="text-white capitalize">{projectType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Active Modules:</span>
                        <span className="text-white">{selectedFeatures.length} selected</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Timeline Rate:</span>
                        <span className="text-white uppercase">{timeline}</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full mt-8 py-4 bg-lime-green text-charcoal font-black uppercase text-xs tracking-widest rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,255,65,0.3)]"
                  >
                    Submit Scope & Book Call <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        )}

        {/* --- TAB 2: Automated File Delivery & Client Portals --- */}
        {activeTab === 'portal' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-white/10">
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
                  <Download className="text-electric-blue" size={28} />
                  Automated Client Deliverables Portal
                </h2>
                <p className="text-xs text-text-dim font-mono mt-1">Access brand kits, source files, live staging links and documentation securely.</p>
              </div>

              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  value={accessCodeInput}
                  onChange={(e) => setAccessCodeInput(e.target.value)}
                  placeholder="Enter Access Key..."
                  className="px-4 py-2 bg-black/60 border border-white/15 rounded-xl font-mono text-xs text-white uppercase focus:outline-none focus:border-electric-blue"
                />
                <button 
                  onClick={() => setPortalUnlocked(true)}
                  className="px-4 py-2 bg-electric-blue text-charcoal text-xs font-bold uppercase rounded-xl hover:bg-white transition-colors"
                >
                  Verify
                </button>
              </div>
            </div>

            {portalUnlocked ? (
              <div className="space-y-4">
                <div className="p-4 bg-electric-blue/10 border border-electric-blue/30 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="text-electric-blue" size={24} />
                    <div>
                      <h4 className="font-bold text-xs uppercase text-white">Client Portal Unlocked: ICEPAB-OAU-2026</h4>
                      <p className="text-[10px] font-mono text-text-dim">All deliverables verified against final invoice payment.</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-lime-green uppercase bg-lime-green/10 px-3 py-1 rounded-full border border-lime-green/30">
                    Paid & Cleared
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {deliverables.map((item) => (
                    <div key={item.id} className="p-5 bg-black/40 border border-white/10 rounded-2xl flex flex-col justify-between hover:border-electric-blue/50 transition-colors">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-[9px] font-mono text-electric-blue uppercase tracking-wider">{item.category}</span>
                          <span className="text-[9px] font-mono text-text-dim">{item.date}</span>
                        </div>
                        <h3 className="font-bold text-sm uppercase tracking-tight text-white">{item.name}</h3>
                        <p className="text-xs font-mono text-text-dim mt-1">Format: {item.type} • {item.size}</p>
                      </div>

                      <button 
                        onClick={() => handleDownload(item.name)}
                        disabled={downloadingFile === item.name}
                        className="mt-4 py-2.5 px-4 bg-white/10 hover:bg-electric-blue hover:text-charcoal text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2"
                      >
                        {downloadingFile === item.name ? (
                          <span className="animate-pulse">Packaging File...</span>
                        ) : (
                          <>
                            <FileDown size={14} /> Download Asset
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-12 text-center border border-dashed border-white/20 rounded-2xl">
                <Lock size={40} className="text-white/20 mx-auto mb-3" />
                <p className="text-sm font-mono text-text-dim">Enter your client key above to unlock deliverables.</p>
              </div>
            )}
          </motion.div>
        )}

        {/* --- TAB 3: Smart AI Support & Knowledge Base --- */}
        {activeTab === 'faq' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
                  <MessageSquare className="text-electric-blue" size={28} />
                  Smart Support & FAQ Knowledge Base
                </h2>
                <p className="text-xs text-text-dim font-mono mt-1">Instant 24/7 automated answers regarding process, pricing, revision policies & tech stack.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left: Searchable FAQ Knowledge Base */}
              <div>
                <div className="relative mb-6">
                  <Search className="absolute left-4 top-3.5 text-white/40" size={16} />
                  <input 
                    type="text" 
                    value={faqSearch}
                    onChange={(e) => setFaqSearch(e.target.value)}
                    placeholder="Search FAQ topics (e.g. revisions, CBT, timelines)..."
                    className="w-full pl-11 pr-4 py-3 bg-black/50 border border-white/10 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-electric-blue"
                  />
                </div>

                <div className="space-y-4">
                  {faqs
                    .filter(f => f.q.toLowerCase().includes(faqSearch.toLowerCase()) || f.a.toLowerCase().includes(faqSearch.toLowerCase()))
                    .map((faq, i) => (
                      <div key={i} className="p-4 bg-black/40 border border-white/10 rounded-xl">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="font-bold text-xs uppercase text-white">{faq.q}</h4>
                          <span className="text-[9px] font-mono text-lime-green uppercase">{faq.cat}</span>
                        </div>
                        <p className="text-xs text-text-dim font-mono mt-2 leading-relaxed">{faq.a}</p>
                      </div>
                    ))}
                </div>
              </div>

              {/* Right: Interactive AI Support Assistant */}
              <div className="bg-black/60 border border-white/15 p-6 rounded-2xl flex flex-col justify-between h-[450px]">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-lime-green animate-pulse" />
                    <span className="font-mono text-xs uppercase font-bold">IcePab AI Assistant</span>
                  </div>
                  <span className="text-[9px] font-mono text-electric-blue">Active 24/7</span>
                </div>

                <div className="flex-1 overflow-y-auto my-4 space-y-3 pr-2">
                  {chatMessages.map((msg, i) => (
                    <div 
                      key={i} 
                      className={`p-3.5 rounded-xl text-xs font-mono leading-relaxed ${
                        msg.sender === 'user' 
                          ? 'bg-electric-blue/20 text-white ml-8 border border-electric-blue/30' 
                          : 'bg-white/5 text-text-dim mr-8 border border-white/10'
                      }`}
                    >
                      {msg.text}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="flex gap-2 pt-3 border-t border-white/10">
                  <input 
                    type="text" 
                    value={userQuery}
                    onChange={(e) => setUserQuery(e.target.value)}
                    placeholder="Ask a question..."
                    className="flex-1 px-4 py-2.5 bg-black/50 border border-white/10 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-electric-blue"
                  />
                  <button type="submit" className="px-4 py-2.5 bg-electric-blue text-charcoal rounded-xl hover:bg-white transition-colors">
                    <Send size={16} />
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        )}

        {/* --- TAB 4: Automated Invoicing, Receipts & Contracts --- */}
        {activeTab === 'invoicing' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
                  <FileText className="text-electric-blue" size={28} />
                  Automated Contracts, Invoices & Receipts
                </h2>
                <p className="text-xs text-text-dim font-mono mt-1">Review service agreement, sign digitally, settle invoice & receive auto-generated receipts.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Digital Service Contract */}
              <div className="p-6 bg-black/40 border border-white/10 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-mono uppercase text-electric-blue font-bold">MASTER SERVICE AGREEMENT</span>
                    <span className="text-[10px] font-mono text-text-dim">REF: #ICEPAB-AGR-2026</span>
                  </div>
                  
                  <div className="p-4 bg-black/80 rounded-xl border border-white/5 h-48 overflow-y-auto text-xs font-mono text-text-dim space-y-3 leading-relaxed">
                    <p className="font-bold text-white">1. SCOPE OF SERVICES</p>
                    <p>IcePab agrees to design, build, and deploy custom software, UI design assets, or CBT infrastructures as specified in the signed project proposal.</p>
                    <p className="font-bold text-white">2. INTELLECTUAL PROPERTY & DELIVERABLES</p>
                    <p>Upon full settlement of invoices, all final source codes, designs, vector files, and licenses shall transfer unconditionally to the Client.</p>
                    <p className="font-bold text-white">3. CONFIDENTIALITY & INTEGRITY</p>
                    <p>Both parties agree to protect proprietary data and project credentials under strict non-disclosure terms.</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  {isContractSigned ? (
                    <div className="p-3 bg-lime-green/10 border border-lime-green/30 rounded-xl flex items-center gap-2 text-lime-green text-xs font-mono font-bold">
                      <CheckCircle2 size={16} /> Digitally Signed & Timestamped
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={signerName} 
                        onChange={(e) => setSignerName(e.target.value)}
                        placeholder="Type full legal name to sign..."
                        className="flex-1 px-4 py-2 bg-black/60 border border-white/15 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-electric-blue"
                      />
                      <button 
                        onClick={() => {
                          if (signerName.trim()) setIsContractSigned(true);
                          else alert('Please enter your legal name to sign.');
                        }}
                        className="px-5 py-2 bg-electric-blue text-charcoal font-bold uppercase text-xs rounded-xl hover:bg-white transition-colors"
                      >
                        Sign Contract
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Invoice & Payment Simulation */}
              <div className="p-6 bg-black/40 border border-white/10 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-mono uppercase text-lime-green font-bold">INVOICE #INV-2026-089</span>
                    <span className="text-[10px] font-mono text-text-dim">DUE ON SIGNATURE</span>
                  </div>

                  <div className="space-y-3 font-mono text-xs text-text-dim mb-6">
                    <div className="flex justify-between pb-2 border-b border-white/10">
                      <span>Full-Stack Web App + Admin Portal</span>
                      <span className="text-white">$350.00</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-white/10">
                      <span>Sheets Integration & Security Lock</span>
                      <span className="text-white">$100.00</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-white pt-2">
                      <span>Total Amount:</span>
                      <span className="text-lime-green">$450.00 USD</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  {paymentDone ? (
                    <div className="p-4 bg-lime-green/10 border border-lime-green/30 rounded-xl text-center">
                      <CheckCircle2 size={24} className="text-lime-green mx-auto mb-1" />
                      <h4 className="font-bold text-xs uppercase text-white">Payment Received & Receipt Issued</h4>
                      <p className="text-[10px] font-mono text-text-dim mt-1">Kickoff email & portal magic link sent to your inbox.</p>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setPaymentDone(true)}
                      disabled={!isContractSigned}
                      className={`w-full py-3.5 rounded-xl font-black uppercase text-xs tracking-widest transition-all flex items-center justify-center gap-2 ${
                        isContractSigned 
                          ? 'bg-lime-green text-charcoal hover:bg-white cursor-pointer shadow-[0_0_20px_rgba(0,255,65,0.3)]' 
                          : 'bg-white/10 text-white/40 cursor-not-allowed'
                      }`}
                    >
                      <CreditCard size={16} /> {isContractSigned ? 'Settle Invoice ($450.00)' : 'Sign Contract First'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* --- TAB 5: Real-Time Project Status Tracker --- */}
        {activeTab === 'tracker' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
                  <Clock className="text-electric-blue" size={28} />
                  Real-Time Project Status Tracker
                </h2>
                <p className="text-xs text-text-dim font-mono mt-1">Live visual progress updates cutting out manual "any updates?" emails.</p>
              </div>

              <span className="font-mono text-xs text-lime-green bg-lime-green/10 border border-lime-green/30 px-3 py-1 rounded-full uppercase">
                Active Sprint
              </span>
            </div>

            <div className="space-y-6">
              {projectStages.map((stage, idx) => (
                <div 
                  key={idx}
                  className={`p-5 rounded-2xl border transition-all ${
                    stage.status === 'completed' 
                      ? 'border-lime-green/40 bg-lime-green/[0.03]' 
                      : stage.status === 'active' 
                      ? 'border-electric-blue bg-electric-blue/[0.08] shadow-[0_0_20px_rgba(0,229,255,0.15)]' 
                      : 'border-white/10 bg-black/30 text-white/40'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-3">
                      {stage.status === 'completed' && <CheckCircle2 size={18} className="text-lime-green" />}
                      {stage.status === 'active' && <div className="w-2.5 h-2.5 rounded-full bg-electric-blue animate-ping" />}
                      {stage.status === 'upcoming' && <Clock size={18} className="text-white/30" />}
                      <h3 className="font-bold text-sm uppercase tracking-tight text-white">{stage.title}</h3>
                    </div>
                    <span className="text-[10px] font-mono text-text-dim">{stage.date}</span>
                  </div>

                  <p className="text-xs font-mono text-text-dim ml-7">{stage.desc}</p>

                  {stage.status === 'active' && stage.progress && (
                    <div className="mt-4 ml-7">
                      <div className="flex justify-between text-[10px] font-mono text-electric-blue mb-1">
                        <span>Current Phase Progress</span>
                        <span>{stage.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden border border-electric-blue/30">
                        <div className="h-full bg-electric-blue rounded-full transition-all duration-1000" style={{ width: `${stage.progress}%` }} />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}
