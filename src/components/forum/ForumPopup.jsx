import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DEFAULT_URL = 'https://conexzion.cl/upload/index.php';

export default function ForumPopup({ isOpen, onClose, url }) {
  const iframeRef = useRef(null);
  const targetUrl = url || DEFAULT_URL;

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-[rgba(2,6,23,0.88)] backdrop-blur-2xl"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ scale: 0.92, y: 24 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, y: 24 }}
            transition={{ type: 'spring', damping: 28, stiffness: 350 }}
            className="w-full max-w-[1100px] h-[82vh] bg-[#0b1120] border border-white/[0.08] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.7),0_0_40px_rgba(34,197,94,0.1)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-4 bg-muted/50 border-b border-white/[0.06] flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3 font-display text-lg uppercase tracking-wide">
                <i className="ri-discuss-line text-primary" />
                Foro <span className="text-secondary">vBulletin Conexzion</span>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/5 text-muted-foreground grid place-items-center text-lg hover:bg-destructive hover:text-white hover:rotate-90 transition-all duration-300"
              >
                <i className="ri-close-line" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 min-h-0 bg-[#020617]">
              <iframe
                ref={iframeRef}
                src={targetUrl}
                title="Foro Interno"
                allow="autoplay; encrypted-media; fullscreen"
                className="w-full h-full border-none block"
                style={{ minHeight: 0 }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}