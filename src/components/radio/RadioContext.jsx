import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';

const RadioContext = createContext(null);

const STREAM_URL = 'https://conexzion.net:8002/stream';

export function RadioProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [status, setStatus] = useState('stopped'); // stopped | connecting | playing | error
  const [trackTitle, setTrackTitle] = useState('Cargando señal...');
  const [artworkUrl, setArtworkUrl] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'none';
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Poll SonicPanel metadata
  useEffect(() => {
    const poll = () => {
      const titleEl = document.getElementById('sonic_title');
      const artEl = document.getElementById('sonic_art');
      if (titleEl) {
        const text = titleEl.textContent || titleEl.innerText;
        if (text && text.trim()) setTrackTitle(text.trim());
      }
      if (artEl) {
        const img = artEl.querySelector('img');
        if (img && img.src) setArtworkUrl(img.src);
      }
    };

    poll();
    const interval = setInterval(poll, 3000);
    return () => clearInterval(interval);
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!isPlaying) {
      audio.src = STREAM_URL;
      setStatus('connecting');
      audio.play()
        .then(() => {
          setIsPlaying(true);
          setStatus('playing');
        })
        .catch(() => {
          setStatus('error');
          setIsPlaying(false);
        });
    } else {
      audio.pause();
      audio.src = '';
      setIsPlaying(false);
      setStatus('stopped');
    }
  }, [isPlaying]);

  return (
    <RadioContext.Provider value={{ isPlaying, status, trackTitle, artworkUrl, toggle }}>
      {children}
      {/* Hidden SonicPanel elements */}
      <div style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 0, height: 0, overflow: 'hidden' }}>
        <div id="sonic_art"></div>
        <div id="sonic_title"></div>
      </div>
    </RadioContext.Provider>
  );
}

export function useRadio() {
  const ctx = useContext(RadioContext);
  if (!ctx) throw new Error('useRadio must be used within RadioProvider');
  return ctx;
}