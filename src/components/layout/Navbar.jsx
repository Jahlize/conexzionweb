import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOGO_URL = 'https://xatimg.com/image/v6RoQlSSzJvE.jpg';

export default function Navbar({ onOpenForum }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Chat', href: '#chat' },
    { label: 'Foro', action: onOpenForum },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-background/90 backdrop-blur-xl shadow-lg shadow-black/20' : 'bg-background/60 backdrop-blur-md'} border-b border-white/[0.06]`}>
      <div className="max-w-7xl mx-auto px-5 h-[76px] flex items-center justify-between">
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-3 group">
          <div className="relative">
            <img
              src={LOGO_URL}
              alt="Conexzion"
              className="w-12 h-12 rounded-full object-cover border-2 border-primary shadow-[0_0_20px_rgba(34,197,94,0.3)] group-hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-shadow duration-500"
            />
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-30" style={{ animationDuration: '3s' }} />
          </div>
          <span className="font-display text-2xl font-bold tracking-wider text-gradient">
            CONEXZION.CL
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) =>
            link.action ? (
              <button
                key={link.label}
                onClick={link.action}
                className="px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wide text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
              >
                {link.label}
              </button>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wide text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
              >
                {link.label}
              </a>
            )
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-10 h-10 rounded-xl flex flex-col items-center justify-center gap-1.5 hover:bg-white/5 transition-colors"
        >
          <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-t border-white/[0.06]"
          >
            <div className="px-5 py-4 flex flex-col gap-2">
              {navLinks.map((link) =>
                link.action ? (
                  <button
                    key={link.label}
                    onClick={() => { link.action(); setMobileOpen(false); }}
                    className="px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wide text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all text-left"
                  >
                    {link.label}
                  </button>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wide text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                  >
                    {link.label}
                  </a>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}