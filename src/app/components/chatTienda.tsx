'use client';
import { useState } from 'react';
import DropzoneLogo from './DropzoneLogo';
import Image from 'next/image';

interface Message {
  from: 'bot' | 'user';
  text: string;
}

const questions = [
  '¿Cuál es el nombre de tu emprendimiento?',
  'Por favor sube tu logo o describe cómo es.',
  '¿Cuáles son los colores principales de tu marca?',
  '¿Qué categorías de productos tendrás?',
  '¿Cuál es la visión de tu emprendimiento?',
];

export default function ChatTienda() {
  const [messages, setMessages] = useState<Message[]>([
    { from: 'bot', text: '👋 Hola, te ayudaré a crear tu tienda. Vamos paso a paso.' },
    { from: 'bot', text: questions[0] },
  ]);
  const [step, setStep] = useState(0);
  const [input, setInput] = useState('');
  const [storeData, setStoreData] = useState<any>({});
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  const handleSend = () => {
    if (!input.trim()) return;

    // Mostrar mensaje del usuario
    setMessages([...messages, { from: 'user', text: input }]);

    // Guardar respuesta en storeData
    const currentQuestion = questions[step];
    setStoreData({
      ...storeData,
      [currentQuestion]: input,
    });

    setInput('');

    // Siguiente paso
    const nextStep = step + 1;
    if (nextStep < questions.length) {
      setTimeout(() => {
        setMessages((prev) => [...prev, { from: 'bot', text: questions[nextStep] }]);
      }, 500);
      setStep(nextStep);
    } else {
      setMessages((prev) => [
        ...prev,
        { from: 'bot', text: '✅ ¡Perfecto! Ya tengo toda la información de tu tienda 🎉' },
      ]);
      console.log('📦 Datos finales de la tienda:', storeData);
    }
  };

  // Nueva función para avanzar al siguiente paso tras subir el logo
  const handleLogoUpload = (url: string) => {
    setLogoUrl(url);
    setStoreData({
      ...storeData,
      [questions[step]]: url,
    });
    setMessages((prev) => [
      ...prev,
      { from: 'user', text: '[logo]' }, // Marca el mensaje como logo subido
    ]);
    setTimeout(() => {
      const nextStep = step + 1;
      if (nextStep < questions.length) {
        setMessages((prev) => [...prev, { from: 'bot', text: questions[nextStep] }]);
        setStep(nextStep);
      } else {
        setMessages((prev) => [
          ...prev,
          { from: 'bot', text: '✅ ¡Perfecto! Ya tengo toda la información de tu tienda 🎉' },
        ]);
        console.log('📦 Datos finales de la tienda:', storeData);
      }
    }, 800);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-lg">
      {/* Chat window */}
      <div className="h-96 overflow-y-auto space-y-3 mb-4 p-4 border rounded-lg bg-slate-50 dark:bg-slate-800">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-xl max-w-xs ${
              msg.from === 'bot'
                ? 'bg-blue-100 text-slate-800 self-start'
                : 'bg-green-500 text-white ml-auto'
            }`}
          >
            {msg.text === '[logo]' && logoUrl ? (
              <div className="w-24 h-24 relative">
                <Image src={logoUrl} alt="Logo subido" fill className="object-contain rounded-lg" />
                <p className="text-xs text-green-600 mt-2">Logo subido correctamente</p>
              </div>
            ) : (
              msg.text
            )}
          </div>
        ))}
        {/* Mostrar Dropzone solo en el paso del logo */}
        {questions[step] === 'Por favor sube tu logo o describe cómo es.' && !logoUrl && (
          <div className="mt-4">
            <DropzoneLogo onFile={handleLogoUpload} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu respuesta..."
          className="flex-1 p-3 border rounded-lg text-black"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-fourth-base text-white rounded-lg hover:bg-blue-700"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
