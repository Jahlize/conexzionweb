import React from 'react';

const LOGO_URL = 'https://xatimg.com/image/QTZjTTmDGhwO.gif';

const socials = [
  { icon: 'ri-whatsapp-line', href: 'https://chat.whatsapp.com/CH2hPQLQxWL8He8lThLyzI', label: 'WhatsApp' },
  { icon: 'ri-telegram-line', href: 'https://t.me/positiveconexzioncrew', label: 'Telegram' },
];

export default function Footer() {
  return (
    <footer className="py-16 pb-8 bg-[#020617] border-t border-white/[0.06] text-center">
      <div className="max-w-7xl mx-auto px-5">
        <div className="relative inline-block">
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl" />
          <img
            src={LOGO_URL}
            alt="Conexzion"
            className="relative w-20 h-20 rounded-full object-cover mx-auto border-[3px] border-primary shadow-[0_0_25px_rgba(34,197,94,0.35)]"
          />
        </div>

        <h3 className="font-display text-2xl mt-5 text-gradient">CONEXZION.CL</h3>
        <p className="text-muted-foreground mt-2 text-sm">Radio Online Reggae & Dancehall 24/7</p>

        <div className="flex justify-center gap-4 mt-8">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="w-12 h-12 rounded-full grid place-items-center bg-card border border-white/[0.08] text-xl text-muted-foreground hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-black hover:-translate-y-1 transition-all duration-300"
            >
              <i className={s.icon} />
            </a>
          ))}
        </div>

        <p className="mt-10 text-xs text-muted-foreground/50">
          © {new Date().getFullYear()} Conexzion.cl — Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
}