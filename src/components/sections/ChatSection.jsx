import React from 'react';
import { motion } from 'framer-motion';

export default function ChatSection() {
  return (
    <section id="chat" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-primary text-xs font-bold uppercase tracking-[4px]">Comunidad</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase mt-3">
            Zona <span className="text-secondary">Blog</span>
          </h2>
        </motion.div>

        {/* Embed */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="w-full rounded-2xl border border-white/[0.08] bg-muted/40 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.4)] overflow-hidden"
          style={{ height: 'clamp(420px, 70vh, 900px)' }}
        >
          <iframe
            src="https://positiveconexzioncrew.blogspot.com/"
            title="Blog Conexzion"
            loading="lazy"
            className="w-full h-full border-none block"
          />
        </motion.div>
      </div>
    </section>
  );
}