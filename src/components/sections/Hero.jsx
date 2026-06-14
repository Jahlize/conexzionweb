import React from 'react';
import { motion } from 'framer-motion';
import { useRadio } from '../radio/RadioContext';

const COVER_URL = 'https://xatimg.com/image/QTZjTTmDGhwO.gif';

export default function Hero() {
  const { isPlaying, status, toggle } = useRadio();

  const statusLabel = {
    stopped: 'Radio Apagada',
    connecting: 'Conectando...',
    playing: 'Al Aire — Conectado',
    error: 'Error de conexión',
  }[status];

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-glow-green" />
      <div className="absolute inset-0 bg-glow-gold" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/30"
            style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
            animate={{ y: [-20, 20, -20], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-5 w-full max-w-4xl mx-auto">
        {/* Spinning cover */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative mx-auto w-[240px] h-[240px] sm:w-[270px] sm:h-[270px]"
        >
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl" />
          <img
            src={COVER_URL}
            alt="Conexzion Radio"
            className={`relative w-full h-full rounded-full object-cover border-4 border-white/[0.08] shadow-[0_0_60px_rgba(34,197,94,0.3)] ${isPlaying ? 'animate-vinyl-spin-slow' : ''}`}
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-display text-5xl sm:text-7xl md:text-8xl uppercase leading-none mt-8"
        >
          Positive <span className="text-gradient">Conexzion</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mt-4 text-muted-foreground text-sm sm:text-base tracking-[4px] uppercase"
        >
          Reggae • Dancehall • Culture
        </motion.p>

        {/* Action buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex justify-center gap-4 flex-wrap mt-10"
        >
          <button
            onClick={toggle}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm bg-gradient-to-r from-primary to-secondary text-black shadow-[0_10px_30px_rgba(34,197,94,0.25)] hover:-translate-y-1 transition-all duration-300"
          >
            <i className={`ri-${isPlaying ? 'pause' : 'play'}-fill text-lg`} />
            {isPlaying ? 'Pausar Radio' : 'Escuchar Radio'}
          </button>
          <a
            href="#chat"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm border border-white/10 bg-white/[0.03] text-white hover:border-primary hover:text-primary transition-all duration-300"
          >
            <i className="ri-chat-3-line text-lg" />
            Entrar al Chat
          </a>
        </motion.div>

        {/* Status badge */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="mt-8 flex justify-center"
        >
          <div className={`inline-flex items-center gap-3 px-6 py-2.5 rounded-full text-sm backdrop-blur-lg transition-all duration-500 ${
            status === 'playing'
              ? 'bg-primary/10 border border-primary/30 text-white shadow-[0_0_20px_rgba(34,197,94,0.15)]'
              : 'bg-muted/40 border border-white/5 text-muted-foreground opacity-60'
          }`}>
            <span className={`w-2 h-2 rounded-full ${
              status === 'playing' ? 'bg-primary animate-live-pulse' : 'bg-destructive'
            }`} />
            {statusLabel}
          </div>
        </motion.div>
      </div>
    </section>
  );
}