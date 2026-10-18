import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, X, ExternalLink, Heart, Sparkles } from 'lucide-react';

export default function RatePopupCard() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('icepab_rate_popup_dismissed');
    if (dismissed === 'true') return;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 30000); // 30 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('icepab_rate_popup_dismissed', 'true');
  };

  const handleRate = (rating: number) => {
    setSelectedRating(rating);
    setSubmitted(true);
    setTimeout(() => {
      window.open('https://g.page/r/CQs_XxkTjtm3EBE/review', '_blank');
      handleClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          className="fixed bottom-8 right-8 z-[100] max-w-sm w-full mx-4 sm:mx-0 p-6 bg-charcoal/90 backdrop-blur-2xl border border-electric-blue/40 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(0,229,255,0.15)]"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white/50 hover:text-white p-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X size={16} />
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-electric-blue to-lime-green p-0.5 flex items-center justify-center">
              <div className="w-full h-full bg-charcoal rounded-[14px] flex items-center justify-center">
                <Sparkles size={18} className="text-electric-blue" />
              </div>
            </div>
            <div>
              <span className="font-mono text-[9px] text-lime-green uppercase tracking-widest block">FEEDBACK PROTOCOL</span>
              <h3 className="text-lg font-black uppercase tracking-tight text-white">Rate IcePab's Work</h3>
            </div>
          </div>

          {!submitted ? (
            <>
              <p className="text-xs text-text-dim mb-6 leading-relaxed">
                You've been exploring the digital infrastructure for 30 seconds. How would you rate your experience with IcePab's web apps & design?
              </p>

              <div className="flex justify-center gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(null)}
                    onClick={() => handleRate(star)}
                    className="p-2 transition-transform hover:scale-125 focus:outline-none"
                    aria-label={`Rate ${star} stars`}
                  >
                    <Star
                      size={28}
                      className={`transition-colors ${
                        (hoveredRating !== null ? star <= hoveredRating : false) || (selectedRating !== null && star <= selectedRating)
                          ? 'fill-lime-green text-lime-green drop-shadow-[0_0_10px_rgba(57,255,20,0.5)]'
                          : 'text-white/20 hover:text-white/60'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <a
                  href="https://g.page/r/CQs_XxkTjtm3EBE/review"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleClose}
                  className="w-full py-3 bg-lime-green text-black font-black text-xs uppercase tracking-[0.2em] rounded-xl text-center hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(57,255,20,0.25)]"
                >
                  <span>Leave Google Review</span>
                  <ExternalLink size={14} />
                </a>
                <button
                  onClick={handleClose}
                  className="w-full py-2 bg-transparent text-text-dim text-[10px] font-mono uppercase tracking-widest hover:text-white transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-6 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-lime-green/20 text-lime-green flex items-center justify-center mx-auto mb-4">
                <Heart size={24} className="fill-lime-green text-lime-green animate-bounce" />
              </div>
              <h4 className="font-black uppercase text-sm mb-2 text-white">Thank You for Rating!</h4>
              <p className="text-xs text-text-dim font-mono">Redirecting you to Google review portal...</p>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
