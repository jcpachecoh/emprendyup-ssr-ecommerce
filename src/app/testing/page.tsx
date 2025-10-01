'use client';

import { useState } from 'react';
import { generateTestUrls, campaignUrls } from '@/lib/utils/utm';

export default function TestingDashboard() {
  const [testResult, setTestResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const testSlackNotification = async () => {
    setIsLoading(true);
    setTestResult('');

    try {
      const response = await fetch('/api/test-slack?key=development', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: 'test' }),
      });

      const result = await response.json();

      if (response.ok) {
        setTestResult('✅ Notificación de prueba enviada correctamente a Slack');
      } else {
        setTestResult(`❌ Error: ${result.error || result.message}`);
      }
    } catch (error) {
      setTestResult(
        `❌ Error de conexión: ${error instanceof Error ? error.message : 'Error desconocido'}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const testUrls = generateTestUrls();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">🛠️ Panel de Testing - EmprendyUp</h1>

        {/* Test de Slack */}
        <div className="border-b pb-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Test de Notificaciones Slack</h2>
          <button
            onClick={testSlackNotification}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            {isLoading ? 'Enviando...' : 'Enviar Notificación de Prueba'}
          </button>
          {testResult && (
            <div
              className={`mt-4 p-3 rounded-lg ${
                testResult.startsWith('✅')
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              {testResult}
            </div>
          )}
        </div>

        {/* URLs de Campaña */}
        <div className="border-b pb-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">URLs de Campaña con UTM</h2>
          <div className="space-y-3">
            {Object.entries(testUrls).map(([campaign, url]) => (
              <div key={campaign} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900 capitalize">
                    {campaign.replace('_', ' ')}
                  </h3>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm transition-colors"
                  >
                    Probar URL
                  </a>
                </div>
                <code className="text-xs text-gray-600 break-all">{url}</code>
              </div>
            ))}
          </div>
        </div>

        {/* Variables de Entorno */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Estado de la Configuración</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Slack Webhook</h3>
              <div className="text-sm text-blue-600">🔍 Verificar en /api/test-slack</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Google Analytics</h3>
              <div
                className={`text-sm ${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ? 'text-green-600' : 'text-red-600'}`}
              >
                {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ? '✅ Configurado' : '❌ No configurado'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Información de Desarrollo */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-medium text-yellow-800 mb-2">⚠️ Importante - Solo para Desarrollo</h3>
        <p className="text-yellow-700 text-sm">
          Este panel de testing solo debe estar disponible en entornos de desarrollo. Asegúrate de
          restringir el acceso en producción.
        </p>
      </div>
    </div>
  );
}
