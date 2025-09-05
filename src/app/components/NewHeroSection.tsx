'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ChatWidget from './ChatWidget/ChatWidget';

const NewHeroSection = () => {
  const [chatOpen, setChatOpen] = useState(false);
  return (
    <div className="relative flex items-center justify-center h-screen px-6 sm:px-12 lg:px-40 w-full overflow-hidden">
      <Image
        src="/images/hero-banner-women.webp"
        alt="Hero banner"
        fill
        priority
        className="object-cover object-center -z-20"
      />
      {/* radial spotlight overlay to darken image and highlight text */}
      <div
        className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0)_60%)]"
        aria-hidden
      />
      {/* Centered Content */}
      <div className="relative z-20 text-center items-center flex flex-col md:flex-row md:justify-between justify-center w-full">
        {/* Animated typing headline */}
        <div className="flex flex-col w-full max-w-[700px] mx-auto">
          <motion.h1
            className="flex flex-col text-3xl max-w-lg text-center md:text-left md:text-2xl lg:text-5xl font-extrabold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <AnimatedHeadline />
          </motion.h1>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center justify-center mt-4">
            <button
              onClick={() => {
                const target = document.getElementById('next-section');
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                  window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
                }
              }}
              aria-label="Saber más"
              className="inline-flex text-xl w-[200px] items-center gap-3 px-5 py-3 bg-white text-indigo-700 rounded-full font-semibold shadow-lg"
            >
              Saber más
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M5 12h14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={() => {
                const target = document.getElementById('lead-capture');
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                  window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
                }
              }}
              aria-label="Saber más"
              className="inline-flex text-center text-xl w-[200px] items-center gap-3 px-5 py-3 bg-indigo-700 text-white rounded-full font-semibold shadow-lg"
            >
              Registrarme
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M5 12h14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Chat widget removed from hero; use floating button to open chat */}
        <div className="hidden md:block w-full md:w-[700px]" />
      </div>
      {/* Floating chat button */}
      <div>
        <button
          aria-label="Abrir chat"
          onClick={() => setChatOpen((s) => !s)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-indigo-600 text-white shadow-lg flex items-center justify-center"
        >
          {/* chat bubble icon */}
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Chat panel (render when open) */}
      {chatOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-[92%] max-w-md">
          <div className="bg-transparent">
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setChatOpen(false)}
                className="p-1 bg-white/10 rounded-full text-white"
                aria-label="Cerrar chat"
              >
                ✕
              </button>
            </div>
            <ChatWidget />
          </div>
        </div>
      )}
    </div>
  );
};

export default NewHeroSection;

function AnimatedHeadline() {
  const fullLeft = 'Herramientas digitales para';
  const highlighted = ' emprendedores que quieren escalar su negocio con IA, tecnología';
  const fullRight = ' y una comunidad que impulsa su crecimiento';

  const [displayLeft, setDisplayLeft] = useState('');
  const [displayHighlighted, setDisplayHighlighted] = useState('');
  const [displayRight, setDisplayRight] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const speed = 20;

    async function type() {
      for (let i = 0; i <= fullLeft.length; i++) {
        if (cancelled) return;
        setDisplayLeft(fullLeft.slice(0, i));
        // eslint-disable-next-line no-await-in-loop
        await new Promise((r) => setTimeout(r, speed));
      }

      for (let i = 0; i <= highlighted.length; i++) {
        if (cancelled) return;
        setDisplayHighlighted(highlighted.slice(0, i));
        // eslint-disable-next-line no-await-in-loop
        await new Promise((r) => setTimeout(r, speed));
      }

      for (let i = 0; i <= fullRight.length; i++) {
        if (cancelled) return;
        setDisplayRight(fullRight.slice(0, i));
        // eslint-disable-next-line no-await-in-loop
        await new Promise((r) => setTimeout(r, speed));
      }
    }

    type();

    const blink = setInterval(() => setCursorVisible((v) => !v), 500);
    return () => {
      cancelled = true;
      clearInterval(blink);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span>
      {displayLeft}
      <span className="text-fourth-base">{displayHighlighted}</span>
      {displayRight}
      <span className={`ml-1 inline-block ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}>|</span>
    </span>
  );
}
