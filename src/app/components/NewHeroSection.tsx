'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ChatWidget from './ChatWidget/ChatWidget';

const NewHeroSection = () => {
  return (
    <div className="relative flex items-center justify-center min-h-[60vh] px-40 w-full">
      {/* Centered Content */}
      <div className="text-center items-center flex flex-col md:flex-row justify-between w-full ">
        {/* Animated typing headline */}
        <div className="flex flex-col w-[390px] sm:w-[600px] xl:w-full">
          <motion.h1
            className="flex flex-col text-3xl max-w-lg text-left md:text-2xl lg:text-5xl font-extrabold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <AnimatedHeadline />
          </motion.h1>
          <div className="flex flex-row gap-8">
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
              className="inline-flex text-xl w-[200px] mt-8 items-center gap-3 px-5 py-3 bg-white text-indigo-700 rounded-full font-semibold shadow-lg hover:scale-105 transform transition-transform duration-150"
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
              className="inline-flex text-center text-xl w-[200px] mt-8 items-center gap-3 px-5 py-3 bg-indigo-700 text-white rounded-full font-semibold shadow-lg hover:scale-105 transform transition-transform duration-150"
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

        <motion.div className="w-full md:w-[700px]">
          <ChatWidget />
        </motion.div>
      </div>
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
