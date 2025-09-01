'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, MessageSquare } from 'lucide-react';
import { sendChat } from '@/app/api/chatClient';

type ChatMessage = {
  role: 'user' | 'bot' | 'assistant' | string;
  parts: string[];
};

type QuickReply = {
  title: string;
  payload: string;
};

type SendChatResponse = {
  response?: string;
  quick_replies?: QuickReply[];
};

export default function ChatWidget(): React.ReactElement {
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>('');
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [contactMode, setContactMode] = useState<boolean>(false);
  const [contactProduct, setContactProduct] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const typingAbortRef = useRef<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  // helper: append a user message and send to backend
  async function handleSend(messageText: string) {
    const text = (messageText || '').trim();
    if (!text) return;
    setLoading(true);

    const newHistory: ChatMessage[] = [...history, { role: 'user', parts: [text] }];
    setHistory(newHistory);
    setInput('');

    try {
      const data: SendChatResponse = await sendChat({ history: newHistory, message: text });
      const assistantMsg = data.response || 'Lo siento, no hay respuesta.';
      setQuickReplies(data.quick_replies || []);
      await animateAssistantText(assistantMsg);
    } catch (err) {
      const updatedHistory: ChatMessage[] = [
        ...newHistory,
        { role: 'assistant', parts: ['Error: no se pudo contactar con el servicio.'] },
      ];
      setHistory(updatedHistory);
    } finally {
      setLoading(false);
    }
  }

  async function onQuickReplyClick(payload: string) {
    // delete old history and add the user's selected quick-reply as the new first message
    const newHistory: ChatMessage[] = [{ role: 'user', parts: [payload] }];
    setHistory(newHistory);

    const local = await handleLocalPayload(payload);
    if (!local) {
      handleSend(payload);
    }
  }

  async function animateAssistantText(text: string, speed = 15) {
    // abort any prior animation
    typingAbortRef.current += 1;
    const myId = typingAbortRef.current;
    setIsTyping(true);

    // push a placeholder assistant message
    setHistory((prev) => [...prev, { role: 'assistant', parts: [''] }]);

    let current = '';
    for (let i = 0; i < text.length; i++) {
      if (typingAbortRef.current !== myId) return;
      current += text[i];
      setHistory((prev) => {
        const copy = [...prev];
        const lastIdx = copy.map((m) => m.role).lastIndexOf('assistant');
        if (lastIdx >= 0) {
          copy[lastIdx] = { ...copy[lastIdx], parts: [current] };
        } else {
          copy.push({ role: 'assistant', parts: [current] });
        }
        return copy;
      });
      await new Promise((r) => setTimeout(r, speed));
    }

    setIsTyping(false);
  }

  function sendLocalAssistant(text: string, replies: QuickReply[] = []) {
    setQuickReplies(replies);
    animateAssistantText(text);
  }

  async function handleLocalPayload(payload: string): Promise<boolean> {
    switch (payload) {
      case 'start_new':
      case 'have_business':
        sendLocalAssistant('¡Excelente! ¿Qué es lo que más te cuesta hoy en día?', [
          { title: 'Vender más', payload: 'sell_more' },
          { title: 'Llegar a más clientes', payload: 'reach_more' },
          { title: 'Organizar mi catálogo', payload: 'organize_catalog' },
          { title: 'Mejorar la imagen de mis productos', payload: 'improve_images' },
        ]);
        return true;

      case 'exploring':
        sendLocalAssistant(
          'Perfecto — explora y cuando quieras te ayudo con ideas o una tienda. ¿Te interesa ver plantillas o inspiración?',
          [
            { title: 'Plantillas', payload: 'templates' },
            { title: 'Inspírame', payload: 'inspire_me' },
            { title: 'No, gracias', payload: 'no_thanks' },
          ]
        );
        return true;

      case 'reach_more':
        sendLocalAssistant(
          '¡Lo entiendo! Nuestro sistema de marketing con IA crea publicaciones y campañas. ¿Generamos una publicación de ejemplo para tu negocio?',
          [
            { title: '¡Sí, por favor!', payload: 'generate_post_yes' },
            { title: 'Cuéntame más', payload: 'learn_more' },
            { title: 'No, gracias', payload: 'no_thanks' },
          ]
        );
        return true;

      case 'generate_post_yes':
        sendLocalAssistant(
          '¡Genial! Para generar la publicación necesito el tipo de producto/servicio y tu email.',
          []
        );
        setContactMode(true);
        return true;

      case 'learn_more':
        sendLocalAssistant(
          'Nuestra IA analiza tu categoría y genera un copy y estructura visual sugerida. ¿Quieres que hagamos una prueba?',
          [
            { title: 'Hacer prueba', payload: 'generate_post_yes' },
            { title: 'Volver', payload: 'start_new' },
          ]
        );
        return true;

      case 'no_thanks':
        sendLocalAssistant(
          'Perfecto, dime si tienes otra pregunta o quieres navegar recursos.',
          []
        );
        return true;

      default:
        return false;
    }
  }

  // contact form submit
  async function handleContactSubmit() {
    const payload = `Generar publicación para: ${contactProduct} (email: ${contactEmail})`;
    setContactMode(false);
    await handleSend(payload);
    await animateAssistantText(
      'Gracias — revisaremos y te enviaremos la publicación al correo proporcionado.'
    );
    setContactProduct('');
    setContactEmail('');
  }

  // auto-scroll to bottom when history updates
  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  // responsive: detect mobile and set collapsed state
  useEffect(() => {
    const setSizes = () => {
      const mobile = typeof window !== 'undefined' && window.innerWidth < 768;
      setIsMobile(mobile);
      // expanded by default on mobile
      setIsCollapsed(false);
    };
    setSizes();
    window.addEventListener('resize', setSizes);
    return () => window.removeEventListener('resize', setSizes);
  }, []);

  // initial greeting and quick replies
  useEffect(() => {
    if (history.length === 0) {
      sendLocalAssistant(
        '¡Hola! Soy tu asistente de Emprendyup. ¿Listo para potenciar tu negocio? Cuéntame, ¿en qué etapa te encuentras?',
        [
          { title: 'Acabo de empezar', payload: 'start_new' },
          { title: 'Ya tengo un negocio físico/online', payload: 'have_business' },
          { title: 'Solo estoy explorando ideas', payload: 'exploring' },
        ]
      );
    }
  }, []);

  function toggleCollapsed() {
    setIsCollapsed((v) => !v);
    // abort typing when collapsing
    typingAbortRef.current += 1;
  }

  // Render message text converting markdown links [text](url) and raw URLs into clickable anchors
  function renderMessageWithLinks(text: string) {
    const nodes: React.ReactNode[] = [];

    // Helper: split plain text for raw URLs and return nodes
    const splitRawUrls = (plain: string) => {
      const urlRegex =
        /(https?:\/\/[\w\-\._~:\/?#\[\]@!$&'()*+,;=%]+|www\.[\w\-\._~:\/?#\[\]@!$&'()*+,;=%]+)/g;
      let last = 0;
      let match: RegExpExecArray | null;
      const parts: React.ReactNode[] = [];
      while ((match = urlRegex.exec(plain)) !== null) {
        const idx = match.index;
        if (idx > last) parts.push(plain.slice(last, idx));
        let href = match[0];
        if (href.startsWith('www.')) href = 'https://' + href;
        parts.push(
          <a
            key={`u-${idx}-${href}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:underline"
          >
            {match[0]}
          </a>
        );
        last = idx + match[0].length;
      }
      if (last < plain.length) parts.push(plain.slice(last));
      return parts;
    };

    // markdown link regex
    const mdLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
    let lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = mdLinkRegex.exec(text)) !== null) {
      if (m.index > lastIndex) {
        const before = text.slice(lastIndex, m.index);
        nodes.push(...splitRawUrls(before));
      }
      const label = m[1];
      const href = m[2];
      nodes.push(
        <a
          key={`md-${m.index}-${href}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:underline"
        >
          {label}
        </a>
      );
      lastIndex = mdLinkRegex.lastIndex;
    }
    if (lastIndex < text.length) {
      const rest = text.slice(lastIndex);
      nodes.push(...splitRawUrls(rest));
    }

    return nodes.length > 0 ? nodes : text;
  }

  const TypingIndicator = () => (
    <div className="flex items-center gap-2 px-4 py-3 bg-white/80 backdrop-blur-sm rounded-2xl rounded-bl-md shadow-sm border border-slate-200/50">
      <div className="flex gap-1">
        <div
          className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce"
          style={{ animationDelay: '0ms' }}
        ></div>
        <div
          className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce"
          style={{ animationDelay: '150ms' }}
        ></div>
        <div
          className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce"
          style={{ animationDelay: '300ms' }}
        ></div>
      </div>
      <span className="text-xs text-slate-600 font-medium">Escribiendo...</span>
    </div>
  );

  // If on mobile and collapsed, show small floating button only
  if (isMobile && isCollapsed) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsCollapsed(false)}
          aria-label="Abrir chat"
          className="w-12 h-12 rounded-full bg-indigo-600 text-white shadow-lg flex items-center justify-center"
        >
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
    );
  }

  return (
    <div
      className={`${isMobile ? 'fixed bottom-4 right-4 z-50 w-[92%] max-w-sm' : 'w-full max-w-md'} bg-black rounded-lg shadow-lg p-3 text-sm`}
    >
      {isMobile && (
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 via-orange-300 to-yellow-300 flex items-center justify-center text-white">
              A
            </div>
            <div className="text-sm font-semibold">Asistente Emprendyup</div>
          </div>
          <div>
            <button onClick={toggleCollapsed} aria-label="Minimizar chat" className="p-1">
              <svg
                className="w-5 h-5 text-slate-600"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12h12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
      <div className="w-full max-w-lg mx-auto bg-gradient-to-br from-slate-50 via-white to-slate-50 rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-4 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20 animate-pulse"></div>
          <div className="relative flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Emprendyup Assistant</h3>
              <p className="text-xs text-white/80">Tu asistente inteligente de negocios</p>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div
          ref={containerRef}
          className="h-96 overflow-y-auto space-y-4 p-4  scroll-smooth"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#e2e8f0 transparent' }}
        >
          {history.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-3 opacity-60">
              <MessageSquare className="w-12 h-12 text-slate-400" />
              <p className="text-sm text-slate-500">Iniciando conversación...</p>
            </div>
          )}

          {history.map((m, i) => {
            const isAssistant = m.role === 'assistant';
            const messageText = m.parts.join(' ');
            return (
              <div
                key={i}
                className={`flex items-end gap-3 animate-fade-in ${isAssistant ? 'justify-start' : 'justify-end'}`}
                style={{
                  animation: 'fadeInUp 0.4s ease-out forwards',
                  animationDelay: `${i * 100}ms`,
                }}
              >
                {isAssistant && (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center shadow-lg border-2 border-white">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md ${
                    isAssistant
                      ? 'bg-white/80 backdrop-blur-sm border border-slate-200/50 text-slate-800 rounded-bl-md'
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-md shadow-lg'
                  }`}
                >
                  <div className="text-sm leading-relaxed font-medium">{messageText}</div>
                </div>

                {!isAssistant && (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg border-2 border-white">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
            );
          })}

          {isTyping && (
            <div className="flex justify-start gap-3 animate-fade-in">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center shadow-lg border-2 border-white">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <TypingIndicator />
            </div>
          )}
        </div>

        {/* Quick Replies */}
        {quickReplies.length > 0 && (
          <div className="px-4 pb-2">
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => onQuickReplyClick(q.payload)}
                  className="group px-4 py-2 rounded-full bg-gradient-to-r from-slate-100 to-slate-50 hover:from-indigo-50 hover:to-purple-50 text-slate-700 hover:text-indigo-700 text-sm font-medium border border-slate-200 hover:border-indigo-200 transition-all duration-200 transform hover:scale-105 hover:shadow-md"
                >
                  <span className="flex items-center gap-2">
                    {q.title}
                    <Sparkles className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Contact Form */}
        {contactMode && (
          <div className="mx-4 mb-4 p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 animate-fade-in">
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <h4 className="font-semibold text-slate-800">Información de contacto</h4>
              </div>

              <div className="space-y-3">
                <input
                  value={contactProduct}
                  onChange={(e) => setContactProduct(e.target.value)}
                  placeholder="Tipo de producto/servicio"
                  className="w-full p-3 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 transition-all duration-200"
                />
                <input
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="Tu correo electrónico"
                  type="email"
                  className="w-full p-3 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 transition-all duration-200"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() =>
                    contactProduct.trim() && contactEmail.trim() && handleContactSubmit()
                  }
                  disabled={!contactProduct.trim() || !contactEmail.trim()}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-slate-300 disabled:to-slate-400 text-white rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-xl disabled:shadow-sm"
                >
                  Enviar y generar
                </button>
                <button
                  onClick={() => setContactMode(false)}
                  className="px-4 py-2.5 bg-white/80 backdrop-blur-sm hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 rounded-xl text-sm font-medium transition-all duration-200"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 bg-gradient-to-r from-slate-50 to-white border-t border-slate-100">
          <div className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu mensaje aquí..."
                className="w-full min-h-[48px] max-h-32 p-3 pr-12 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl resize-none text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 transition-all duration-200 placeholder-slate-400"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(input);
                  }
                }}
              />
              <div className="absolute bottom-2 right-2 text-xs text-slate-400">
                {input.length > 0 && <span>Enter para enviar</span>}
              </div>
            </div>

            <button
              onClick={() => handleSend(input)}
              disabled={!input.trim() || loading}
              className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-slate-300 disabled:to-slate-400 text-white rounded-2xl disabled:opacity-50 transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-xl disabled:shadow-sm flex items-center justify-center"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fade-in {
            animation: fadeInUp 0.4s ease-out forwards;
          }

          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 6px;
          }

          ::-webkit-scrollbar-track {
            background: transparent;
          }

          ::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 3px;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
          }
        `}</style>
      </div>
    </div>
  );
}
