import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getLatestTopics } from '@/lib/vbulletin-api';

// Avatar fallback from initials
function Avatar({ src, name, size = 40, className = '' }) {
  const [err, setErr] = useState(false);
  const initial = (name || 'U')[0].toUpperCase();
  if (src && !err) {
    return (
      <img
        src={src}
        alt={name}
        onError={() => setErr(true)}
        className={className}
        style={{ width: size, height: size, objectFit: 'cover', borderRadius: '50%', flexShrink: 0 }}
      />
    );
  }
  return (
    <div
      className={`grid place-items-center font-bold text-primary bg-primary/10 border border-primary/20 rounded-full flex-shrink-0 ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.38 }}
    >
      {initial}
    </div>
  );
}

export default function ForumSidebar({ onOpenForum }) {
  const [temas, setTemas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const [toastTema, setToastTema] = useState(null);
  const panelRef = useRef(null);

  useEffect(() => {
    async function load() {
      try {
        const temas = await getLatestTopics(10);
        if (temas.length > 0) {
          setTemas(temas);
          setUnread(temas.length);
          setTimeout(() => setToastTema(temas[0]), 1200);
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Auto-dismiss toast
  useEffect(() => {
    if (!toastTema) return;
    const t = setTimeout(() => setToastTema(null), 6000);
    return () => clearTimeout(t);
  }, [toastTema]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) setOpen(false);
    };
    if (open) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const handleOpen = () => {
    setOpen(!open);
    if (!open) setUnread(0);
  };

  const handleClickTema = (url) => {
    setOpen(false);
    onOpenForum(url);
  };

  return (
    <>
      {/* ── Toast notification (latest topic) ─────────────────────── */}
      <AnimatePresence>
        {toastTema && (
          <motion.div
            initial={{ x: 120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 120, opacity: 0 }}
            transition={{ type: 'spring', damping: 22, stiffness: 300 }}
            className="fixed bottom-[108px] right-4 z-[1100] w-[300px] cursor-pointer"
            onClick={() => { setToastTema(null); onOpenForum(toastTema.url); }}
          >
            <div className="relative bg-[#0d1425] border border-primary/30 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.6),0_0_20px_rgba(34,197,94,0.12)] overflow-hidden">
              {/* Green top accent bar */}
              <div className="h-[3px] w-full bg-gradient-to-r from-primary to-secondary" />

              <div className="p-3 flex items-start gap-3">
                {/* Thumbnail image or avatar */}
                <div className="flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden border border-white/[0.08] bg-white/[0.04]">
                  {toastTema.imagen ? (
                    <img
                      src={toastTema.imagen}
                      alt={toastTema.titulo}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  ) : (
                    <div className="w-full h-full grid place-items-center bg-primary/10 text-primary text-2xl">
                      <i className="ri-music-2-line" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-live-pulse flex-shrink-0" />
                    <span className="text-[0.62rem] text-primary font-bold uppercase tracking-wide">Nuevo Aporte</span>
                  </div>
                  <p className="text-[0.82rem] font-semibold text-white leading-snug line-clamp-2">{toastTema.titulo}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Avatar src={toastTema.avatar_autor} name={toastTema.autor} size={16} />
                    <span className="text-[0.68rem] text-muted-foreground truncate">{toastTema.autor}</span>
                  </div>
                </div>

                {/* Close */}
                <button
                  onClick={(e) => { e.stopPropagation(); setToastTema(null); }}
                  className="w-6 h-6 flex-shrink-0 rounded-full bg-white/[0.06] text-muted-foreground/60 hover:text-white hover:bg-white/10 transition-colors grid place-items-center text-sm"
                >
                  <i className="ri-close-line" />
                </button>
              </div>

              {/* Progress bar */}
              <motion.div
                className="h-[2px] bg-primary/40"
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 6, ease: 'linear' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bell button + dropdown ─────────────────────────────────── */}
      <div ref={panelRef} className="fixed top-[18px] right-16 z-[1001] md:right-5 md:top-[20px]">
        {/* Bell */}
        <button
          onClick={handleOpen}
          className="relative w-10 h-10 rounded-xl flex items-center justify-center bg-white/[0.06] border border-white/[0.08] text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
        >
          <i className={`ri-notification-3-line text-lg ${open ? 'text-primary' : ''}`} />
          {unread > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary text-black text-[0.6rem] font-bold grid place-items-center border-2 border-background"
            >
              {unread > 9 ? '9+' : unread}
            </motion.span>
          )}
        </button>

        {/* Dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute top-12 right-0 w-[320px] bg-[#0d1425] border border-white/[0.08] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_20px_rgba(34,197,94,0.08)] overflow-hidden"
            >
              {/* Header */}
              <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2 font-display text-sm uppercase text-white">
                  <i className="ri-notification-3-line text-primary" />
                  Aportes Recientes
                </div>
                <span className="text-[0.65rem] text-muted-foreground/60 uppercase tracking-wide">Foro</span>
              </div>

              {/* List */}
              <div className="flex flex-col max-h-[380px] overflow-y-auto">
                {loading ? (
                  <div className="flex flex-col gap-2 p-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-16 rounded-xl bg-white/[0.03] animate-pulse" />
                    ))}
                  </div>
                ) : temas.length === 0 ? (
                  <p className="text-xs text-muted-foreground/60 text-center py-6">Sin aportes recientes</p>
                ) : (
                  temas.map((tema, i) => (
                    <button
                      key={i}
                      onClick={() => handleClickTema(tema.url)}
                      className={`flex items-center gap-3 px-4 py-3 hover:bg-primary/[0.06] transition-colors text-left group border-b border-white/[0.04] last:border-none ${i === 0 ? 'bg-primary/[0.03]' : ''}`}
                    >
                      {/* Thumbnail */}
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/[0.08] flex-shrink-0 bg-white/[0.04]">
                        {tema.imagen ? (
                          <img
                            src={tema.imagen}
                            alt={tema.titulo}
                            className="w-full h-full object-cover"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          />
                        ) : (
                          <div className={`w-full h-full grid place-items-center text-lg ${i === 0 ? 'bg-secondary/15 text-secondary' : 'bg-primary/10 text-primary'}`}>
                            <i className="ri-music-2-line" />
                          </div>
                        )}
                      </div>

                      {/* Text */}
                      <div className="min-w-0 flex-1">
                        {i === 0 && (
                          <span className="text-[0.58rem] text-secondary font-bold uppercase block mb-0.5 tracking-wide">
                            ★ Último aporte
                          </span>
                        )}
                        <span className="text-[0.8rem] font-medium text-white block truncate group-hover:text-primary transition-colors">
                          {tema.titulo}
                        </span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <Avatar src={tema.avatar_autor} name={tema.autor} size={14} />
                          <span className="text-[0.65rem] text-muted-foreground truncate">{tema.autor}</span>
                        </div>
                      </div>

                      <i className="ri-arrow-right-s-line text-muted-foreground/40 group-hover:text-primary transition-colors flex-shrink-0" />
                    </button>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="p-2.5 bg-background/60 border-t border-white/[0.06]">
                <button
                  onClick={() => { setOpen(false); onOpenForum(); }}
                  className="w-full py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wide hover:bg-primary hover:text-black transition-all duration-300"
                >
                  Ver todo el foro
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}