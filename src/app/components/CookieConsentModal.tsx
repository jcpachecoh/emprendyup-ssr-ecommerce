'use client';
import React from 'react';
import Link from 'next/link';

export default function CookieConsentModal({ onAccept }: { onAccept: () => void }) {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white dark:bg-gray-800 p-4 md:p-5 rounded-xl shadow-lg w-80">
        <h2 className="text-base font-semibold mb-2">Cookies & Privacidad</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Usamos cookies para mejorar tu experiencia. Al continuar, aceptas nuestra{' '}
          <Link
            href="/politica-de-privacidad"
            className="text-blue-600 hover:underline font-medium"
          >
            política de privacidad
          </Link>
          .
        </p>
        <button
          onClick={onAccept}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}
