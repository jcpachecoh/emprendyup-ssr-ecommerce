'use client';
import React, { useState, useEffect, useRef } from 'react';

const SharingEconomyNetwork = () => {
  const [connections, setConnections] = useState([]);
  const [pulseIndex, setPulseIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    return () => {};
  }, []);

  // Companies and services in the sharing economy
  const companies = [
    {
      name: 'Uber',
      icon: '🚗',
      color: 'bg-black',
      service: 'Rideshare',
      position: { x: 150, y: 100 },
    },
    {
      name: 'Airbnb',
      icon: '🏠',
      color: 'bg-red-500',
      service: 'Accommodation',
      position: { x: 350, y: 80 },
    },
    {
      name: 'DoorDash',
      icon: '🍔',
      color: 'bg-red-600',
      service: 'Food Delivery',
      position: { x: 550, y: 120 },
    },
    {
      name: 'TaskRabbit',
      icon: '🔧',
      color: 'bg-green-600',
      service: 'Services',
      position: { x: 650, y: 280 },
    },
    {
      name: 'Fiverr',
      icon: '💼',
      color: 'bg-green-500',
      service: 'Freelance',
      position: { x: 580, y: 450 },
    },
    {
      name: 'Turo',
      icon: '🚙',
      color: 'bg-blue-600',
      service: 'Car Sharing',
      position: { x: 400, y: 520 },
    },
    {
      name: 'Upwork',
      icon: '💻',
      color: 'bg-green-700',
      service: 'Remote Work',
      position: { x: 200, y: 480 },
    },
    {
      name: 'Lyft',
      icon: '🚕',
      color: 'bg-pink-500',
      service: 'Rideshare',
      position: { x: 50, y: 350 },
    },
    {
      name: 'Instacart',
      icon: '🛒',
      color: 'bg-green-400',
      service: 'Grocery',
      position: { x: 80, y: 220 },
    },
    {
      name: 'Rover',
      icon: '🐕',
      color: 'bg-blue-500',
      service: 'Pet Care',
      position: { x: 300, y: 180 },
    },
    {
      name: 'WeWork',
      icon: '🏢',
      color: 'bg-gray-700',
      service: 'Workspace',
      position: { x: 450, y: 350 },
    },
    {
      name: 'Lime',
      icon: '🛴',
      color: 'bg-lime-500',
      service: 'E-Scooter',
      position: { x: 120, y: 400 },
    },
  ];

  // Service icons for floating elements
  const serviceIcons = ['💰', '📱', '🌟', '⚡', '🎯', '💡', '📊', '🔔', '💬', '🎵'];

  // Animate data pulses
  useEffect(() => {
    const animatePulses = () => {
      setPulseIndex((prev) => (prev + 1) % companies.length);
    };

    intervalRef.current = setInterval(animatePulses, 1500);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 flex flex-col items-center justify-center p-4 overflow-hidden py-32">
      {/* Background stars */}
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        />
      ))}

      {/* Header */}
      <div className="text-center mb-8 z-10">
        <h1 className="text-5xl font-bold text-white mb-4">
          Unete a nuestra comunidad colaborativa!
        </h1>
        <p className="text-xl text-gray-300 mb-2">
          Plataformas conectadas que transforman la forma en que compartimos recursos
        </p>
        <div className="text-sm text-gray-400">
          Observa el flujo de datos entre plataformas de intercambio globales
        </div>
      </div>

      {/* Main network visualization */}
      <div className="relative w-full max-w-4xl h-96">
        {/* Central Globe */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            {/* Globe glow effect */}
            <div className="absolute inset-0 w-32 h-32 bg-blue-500/30 rounded-full blur-xl animate-pulse"></div>

            {/* Main globe */}
            <div className="relative w-32 h-32 bg-gradient-to-br from-blue-400 via-teal-500 to-green-400 rounded-full shadow-2xl">
              {/* Globe grid overlay */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  backgroundImage: `
                  radial-gradient(circle at 30% 30%, transparent 40%, rgba(255,255,255,0.1) 41%, rgba(255,255,255,0.1) 42%, transparent 43%),
                  radial-gradient(circle at 70% 60%, transparent 40%, rgba(255,255,255,0.1) 41%, rgba(255,255,255,0.1) 42%, transparent 43%)
                `,
                }}
              ></div>

              {/* Globe continents */}
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-green-500/30 to-blue-600/30"></div>

              {/* Globe shine */}
              <div className="absolute top-2 left-2 w-6 h-6 bg-white/40 rounded-full blur-sm"></div>

              {/* Rotating ring */}
              <div
                className="absolute inset-0 border-2 border-white/20 rounded-full animate-spin"
                style={{ animationDuration: '20s' }}
              ></div>
            </div>
          </div>
        </div>

        {/* Company nodes */}
        {companies.map((company, index) => (
          <div key={company.name}>
            {/* Connection line */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <line
                x1="50%"
                y1="50%"
                x2={`${(company.position.x / 700) * 100}%`}
                y2={`${(company.position.y / 600) * 100}%`}
                stroke="rgba(59, 130, 246, 0.4)"
                strokeWidth="2"
                strokeDasharray="5,5"
                className="animate-pulse"
              />

              {/* Animated data pulse */}
              {pulseIndex === index && (
                <circle r="4" fill="#3b82f6" className="animate-ping">
                  <animateMotion
                    dur="2s"
                    repeatCount="1"
                    path={`M ${window.innerWidth / 2} ${200} L ${(company.position.x / 700) * window.innerWidth} ${(company.position.y / 600) * 400}`}
                  />
                </circle>
              )}
            </svg>

            {/* Company node */}
            <div
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              style={{
                left: `${(company.position.x / 700) * 100}%`,
                top: `${(company.position.y / 600) * 100}%`,
              }}
            >
              {/* Node glow */}
              <div
                className={`absolute inset-0 w-16 h-16 ${company.color} opacity-30 rounded-full blur-lg group-hover:opacity-50 transition-opacity`}
              ></div>

              {/* Main node */}
              <div
                className={`relative w-16 h-16 ${company.color} rounded-full shadow-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}
              >
                <span className="text-2xl">{company.icon}</span>

                {/* Pulse ring */}
                {pulseIndex === index && (
                  <div className="absolute inset-0 border-2 border-white rounded-full animate-ping"></div>
                )}
              </div>

              {/* Company info tooltip */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-black/80 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap backdrop-blur-sm">
                <div className="font-semibold">{company.name}</div>
                <div className="text-gray-300 text-xs">{company.service}</div>
              </div>
            </div>
          </div>
        ))}

        {/* Floating service icons */}
        {serviceIcons.map((icon, index) => (
          <div
            key={index}
            className="absolute text-lg opacity-40 animate-bounce pointer-events-none"
            style={{
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 90 + 5}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            {icon}
          </div>
        ))}
      </div>

      {/* Stats dashboard */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {[
          { label: 'Emprendimientos Activos', value: '12+', icon: '🏢' },
          { label: 'Usuarios', value: '500M+', icon: '👥' },
          { label: 'Trasacciones Diarias', value: '1000K', icon: '💳' },
          //   { label: 'Countries', value: '150+', icon: '🌍' },
        ].map((stat, index) => (
          <div
            key={stat.label}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all duration-300"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-gray-300 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SharingEconomyNetwork;
