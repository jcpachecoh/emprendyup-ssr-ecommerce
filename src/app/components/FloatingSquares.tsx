'use client';
import React, { useEffect, useRef } from 'react';

const COLORS = ['#f87171', '#60a5fa', '#34d399', '#facc15', '#f472b6'];
const SQUARES = 40;

function getRandomPosition() {
  return {
    top: Math.random() * 90,
    left: Math.random() * 90,
  };
}

export default function FloatingSquares() {
  const squaresRef = useRef<(HTMLDivElement | null)[]>([]);
  const positions = useRef<{ top: number; left: number }[]>(
    Array.from({ length: SQUARES }, () => getRandomPosition())
  );
  const targets = useRef<{ top: number; left: number }[]>(
    Array.from({ length: SQUARES }, () => getRandomPosition())
  );

  useEffect(() => {
    let animationId: number;
    const speed = 0.01; // Adjust for smoothness

    function animate() {
      for (let i = 0; i < SQUARES; i++) {
        const pos = positions.current[i];
        const target = targets.current[i];
        // Move a fraction toward the target
        pos.top += (target.top - pos.top) * speed;
        pos.left += (target.left - pos.left) * speed;
        const el = squaresRef.current[i];
        if (el) {
          el.style.top = `${pos.top}%`;
          el.style.left = `${pos.left}%`;
        }
        // If close to target, pick a new one
        if (Math.abs(pos.top - target.top) < 1 && Math.abs(pos.left - target.left) < 1) {
          targets.current[i] = getRandomPosition();
        }
      }
      animationId = requestAnimationFrame(animate);
    }
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <>
      {Array.from({ length: SQUARES }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            squaresRef.current[i] = el;
          }}
          className="absolute w-6 h-6 rounded-md transition-all duration-1000"
          style={{
            top: `${positions.current[i].top}%`,
            left: `${positions.current[i].left}%`,
            backgroundColor: COLORS[i % COLORS.length],
            opacity: 0.2,
          }}
        ></div>
      ))}
    </>
  );
}
