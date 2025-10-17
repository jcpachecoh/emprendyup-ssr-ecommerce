import React from 'react';
import { Metadata } from 'next';
import AutomatizacionWhatsAppClient from './components/AutomatizacionWhatsAppClient';

export const metadata: Metadata = {
  title: 'Automatización WhatsApp Business | EmprendyUp - Chatbots Inteligentes',
  description:
    'Automatiza tu WhatsApp Business con chatbots inteligentes. Respuestas automáticas, gestión de pedidos y atención 24/7. ¡Aumenta tus ventas!',
  keywords:
    'automatización whatsapp, chatbot whatsapp, whatsapp business, respuestas automáticas, bot para ventas',
  openGraph: {
    title: 'Automatización WhatsApp Business | EmprendyUp',
    description: 'Automatiza tu WhatsApp Business con chatbots inteligentes para aumentar ventas.',
    url: 'https://emprendyup.com/automatizacion-whatsapp',
  },
};

export default function AutomatizacionWhatsAppPage() {
  return <AutomatizacionWhatsAppClient />;
}
