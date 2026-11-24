"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export default function CRTPreloader() {
  const [isOn, setIsOn] = useState(false);
  const [isOff, setIsOff] = useState(false);
  const [finished, setFinished] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const isExitingRef = useRef(false);

  // Retro sound synthesizer via Web Audio API (zero external assets needed)
  const playRetroSound = useCallback((type: "connect" | "off") => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      if (type === "connect") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      } else if (type === "off") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(950, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.45);
        gain.gain.setValueAtTime(0.07, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
      }
    } catch {
      // Audio context may be restricted before user gesture; fail silently
    }
  }, []);

  // CRT Turn Off sequence & reveal website
  const handleExit = useCallback(() => {
    if (isExitingRef.current) return;
    isExitingRef.current = true;

    playRetroSound("connect");
    setTimeout(() => {
      playRetroSound("off");
    }, 60);

    setIsOff(true);
    setIsOn(false);

    // Duration of .off animation is 750ms
    setTimeout(() => {
      setFinished(true);
    }, 780);
  }, [playRetroSound]);

  // Prevent background scroll while preloader is active
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Auto power-on TV quickly upon mount
  useEffect(() => {
    const onTimer = setTimeout(() => {
      setIsOn(true);
    }, 60);

    return () => clearTimeout(onTimer);
  }, []);

  // Keyboard navigation: Enter, Space, 1, or Escape to connect
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isExitingRef.current) return;

      if (
        e.key === "Enter" ||
        e.key === " " ||
        e.key === "1" ||
        e.code === "Digit1" ||
        e.key === "Escape"
      ) {
        e.preventDefault();
        handleExit();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleExit]);

  // CRT Static / Snow Noise Animation (Original Animation)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;

    const resize = () => {
      const ww = window.innerWidth;
      canvas.width = ww / 3;
      canvas.height = (ww * 0.5625) / 3;
    };

    resize();
    window.addEventListener("resize", resize);

    function snow(c: CanvasRenderingContext2D) {
      const w = c.canvas.width;
      const h = c.canvas.height;
      const d = c.createImageData(w, h);
      const b = new Uint32Array(d.data.buffer);
      const len = b.length;

      for (let i = 0; i < len; i++) {
        b[i] = ((255 * Math.random()) | 0) << 24;
      }

      c.putImageData(d, 0, 0);
    }

    function animate() {
      if (ctx) {
        snow(ctx);
      }
      frame = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  if (finished) return null;

  return (
    <main
      ref={mainRef}
      className={`scanlines ${isOn ? "on" : ""} ${isOff ? "off" : ""}`}
      aria-label="CRT Screen Preloader"
      onClick={(e) => {
        // If clicked on backdrop outside the connect button, also trigger exit
        if ((e.target as HTMLElement).closest(".connect-btn")) return;
        handleExit();
      }}
    >
      <div className="screen">
        <canvas id="canvas" ref={canvasRef} className="picture" />

        <div className="overlay">
          {/* Glitch AV-1 Channel Indicator in top-left */}
          <div className="text" aria-hidden="true">
            <span>AV-1</span>
            <span>AV-1</span>
            <span>AV-1</span>
            <span>AV-1</span>
            <span>AV-1</span>
          </div>

          {/* Center NO SIGNAL display and Connect button */}
          <div
            className="no-signal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="no-signal-text" aria-label="NO SIGNAL">
              <span className="base-text" aria-hidden="true">
                {" NO SIGNAL "}
              </span>
              <span className="glitch-layer" aria-hidden="true">
                {" NO SIGNAL "}
              </span>
              <span className="glitch-layer" aria-hidden="true">
                {" NO SIGNAL "}
              </span>
              <span className="glitch-layer" aria-hidden="true">
                {" NO SIGNAL "}
              </span>
              <span className="glitch-layer" aria-hidden="true">
                {" NO SIGNAL "}
              </span>
              <span className="glitch-layer" aria-hidden="true">
                {" NO SIGNAL "}
              </span>
            </div>

            <button
              type="button"
              className="connect-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleExit();
              }}
              title="Connect to site"
            >
              Connect
            </button>
          </div>
        </div>

        {/* Click anywhere or skip bar */}
        <div
          className="hint-bar"
          onClick={(e) => {
            e.stopPropagation();
            handleExit();
          }}
          title="Click to enter"
        >
          [ Click Connect or press Enter ]
        </div>
      </div>
    </main>
  );
}
