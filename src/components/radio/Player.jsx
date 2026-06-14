import React from 'react';
import { useRadio } from './RadioContext';

export default function Player() {
  const { isPlaying, trackTitle, artworkUrl, toggle } = useRadio();

  return (
    <div className="fixed bottom-0 left-0 w-full h-[90px] bg-black border-t-2 border-primary z-[999] shadow-[0_-10px_30px_rgba(34,197,94,0.15)]">
      <div className="max-w-7xl mx-auto px-5 h-full flex items-center justify-between gap-4">
        {/* Track info with vinyl */}
        <div className="flex items-center gap-4 min-w-0 flex-1">
          {/* Vinyl disc */}
          <div className="relative w-[66px] h-[66px] flex-shrink-0">
            <div className={`w-full h-full rounded-full border border-white/10 shadow-[0_4px_10px_rgba(0,0,0,0.6)] flex items-center justify-center ${isPlaying ? 'animate-vinyl-spin' : ''}`}
              style={{
                background: 'radial-gradient(circle, #2c2c2c 30%, #151515 60%, #000000 100%)',
              }}
            >
              {/* Grooves */}
              <div className="absolute inset-[6px] rounded-full border border-dashed border-white/[0.06] pointer-events-none" />
              <div className="absolute inset-[12px] rounded-full border border-white/[0.03] pointer-events-none" />

              {/* Center artwork */}
              <div className="relative w-7 h-7 rounded-full overflow-hidden border-[1.5px] border-black shadow-[inset_0_0_4px_rgba(0,0,0,0.8)] z-10 bg-primary">
                {artworkUrl ? (
                  <img src={artworkUrl} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-primary" />
                )}
                {/* Spindle hole */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[5px] h-[5px] bg-black rounded-full border border-white/20 z-20" />
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="min-w-0 overflow-hidden">
            <p className="text-primary font-bold text-sm uppercase tracking-wide">CONEXZION LIVE</p>
            <p className="text-muted-foreground text-xs sm:text-sm mt-0.5 truncate uppercase tracking-wide">
              {trackTitle}
            </p>
          </div>
        </div>

        {/* Play button */}
        <button
          onClick={toggle}
          className="w-[54px] h-[54px] flex-shrink-0 rounded-full grid place-items-center bg-primary text-black text-xl shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:scale-110 hover:bg-secondary transition-all duration-300"
        >
          <i className={`ri-${isPlaying ? 'pause' : 'play'}-fill`} />
        </button>
      </div>
    </div>
  );
}