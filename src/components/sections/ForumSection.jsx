import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getLatestTopics } from '@/lib/vbulletin-api';

function TemasGrid({ temas, onOpenPopup }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-8">
      {temas.map((tema, i) => (
        <motion.button
          key={i}
          onClick={() => onOpenPopup(tema.url)}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          className="group relative flex flex-col rounded-xl border border-white/[0.07] bg-white/[0.03] overflow-hidden hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.3)] text-left w-full"
        >
          {/* Thumbnail */}
          <div className="w-full aspect-video bg-[#0d1425] flex items-center justify-center overflow-hidden">
            {tema.imagen ? (
              <img
                src={tema.imagen}
                alt={tema.titulo}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'flex'; }}
              />
            ) : null}
            <div
              className="w-full h-full items-center justify-center text-primary text-3xl"
              style={{ display: tema.imagen ? 'none' : 'flex' }}
            >
              <i className="ri-music-2-line" />
            </div>
          </div>

          {/* Badge "nuevo" for first */}
          {i === 0 && (
            <span className="absolute top-1.5 left-1.5 text-[0.55rem] font-bold uppercase bg-secondary text-black px-1.5 py-0.5 rounded-full">
              Nuevo
            </span>
          )}

          {/* Info */}
          <div className="p-2.5 flex flex-col gap-0.5 flex-1">
            <p className="text-[0.72rem] font-semibold text-white leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {tema.titulo}
            </p>
            <p className="text-[0.62rem] text-muted-foreground mt-auto pt-1 truncate">
              {tema.autor}
            </p>
          </div>

          {/* Hover overlay arrow */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="w-9 h-9 rounded-full bg-primary text-black grid place-items-center text-base">
              <i className="ri-arrow-right-up-line" />
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
}

export default function ForumSection({ onOpenPopup }) {
  const [temas, setTemas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const temas = await getLatestTopics(10);
        setTemas(temas);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <section id="foro" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-primary text-xs font-bold uppercase tracking-[4px]">Interacción</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase mt-3">
            Zona <span className="text-secondary">Foro</span>
          </h2>
        </motion.div>

        {/* Últimos Aportes */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-2"
        >
          <div className="flex items-center gap-2 mb-4">
            <i className="ri-notification-3-line text-primary" />
            <h3 className="font-display text-base uppercase tracking-widest text-white">
              Últimos <span className="text-primary">Aportes</span>
            </h3>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-8">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="rounded-xl bg-white/[0.03] animate-pulse aspect-[4/5]" />
              ))}
            </div>
          ) : temas.length > 0 ? (
            <TemasGrid temas={temas} onOpenPopup={onOpenPopup} />
          ) : null}
        </motion.div>

        {/* Forum CTA — iframe blocked by X-Frame-Options SAMEORIGIN */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="w-full rounded-2xl border border-white/[0.08] bg-[#0b1220] shadow-[0_15px_40px_rgba(0,0,0,0.4)] overflow-hidden"
        >
          {/* Banner image / visual */}
          <div className="relative w-full h-48 sm:h-64 bg-gradient-to-br from-[#0d1a10] to-[#0b1120] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-glow-green opacity-60" />
            <div className="absolute inset-0 bg-glow-gold opacity-40" />
            {/* Big icon */}
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center text-5xl text-primary shadow-[0_0_40px_rgba(34,197,94,0.2)]">
                <i className="ri-discuss-line" />
              </div>
              <p className="text-muted-foreground text-sm text-center px-4">
                El foro no puede mostrarse aquí por restricciones del servidor.<br />
                Ábrelo para navegar completo.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 p-6">
            <button
              onClick={onOpenPopup}
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-bold text-sm bg-gradient-to-r from-primary to-secondary text-black shadow-[0_10px_30px_rgba(34,197,94,0.25)] hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto justify-center"
            >
              <i className="ri-window-line text-base" />
              Abrir Foro
            </button>
            <a
              href="https://conexzion.cl/upload/index.php"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-bold text-sm border border-white/10 bg-white/[0.03] text-white hover:border-primary hover:text-primary transition-all duration-300 w-full sm:w-auto justify-center"
            >
              <i className="ri-external-link-line text-base" />
              Abrir en Nueva Pestaña
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}