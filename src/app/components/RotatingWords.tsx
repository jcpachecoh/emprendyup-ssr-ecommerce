'use client';
import React, { useEffect, useState } from 'react';

const words = ['Networking', 'Ecommerce', 'Coaching', 'Eventos', 'AI'];

export default function RotatingWords() {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => setShow(false), 1200);
    return () => clearTimeout(timeout);
  }, [index]);

  useEffect(() => {
    if (!show) {
      const timeout = setTimeout(() => {
        setIndex((i) => (i + 1) % words.length);
        setShow(true);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [show]);

  return (
    <span
      className="text-slate-900 font-bold"
      style={{ minWidth: 120, display: 'inline-block', position: 'relative' }}
    >
      <span
        key={index}
        className={`inline-block transition-all duration-500 ease-in-out ${show ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-2 scale-90'}`}
        style={{
          minWidth: 100,
          textAlign: 'left',
          position: 'relative',
        }}
      >
        {words[index]}
      </span>
    </span>
  );
}
