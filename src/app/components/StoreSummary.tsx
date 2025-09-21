'use client';
import React, { useState } from 'react';
import { Edit3, Save, X, Check } from 'lucide-react';

interface StoreData {
  name: string;
  userId: string;
  storeId: string;
  description: string;
  logoUrl: string;
  faviconUrl: string;
  bannerUrl: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  department: string;
  country: string;
  businessType: string;
  taxId: string;
  businessName: string;
  facebookUrl: string;
  instagramUrl: string;
  twitterUrl: string;
  youtubeUrl: string;
  tiktokUrl: string;
  whatsappNumber: string;
  status: string;
}

interface StoreSummaryProps {
  data: StoreData;
  onUpdate: (field: keyof StoreData, value: string) => void;
  onCreate: () => void;
}

const fieldLabels: Record<keyof StoreData, string> = {
  name: 'Nombre de la tienda',
  userId: 'ID de usuario',
  storeId: 'ID de tienda',
  description: 'Descripción',
  logoUrl: 'URL del logo',
  faviconUrl: 'URL del favicon',
  bannerUrl: 'URL del banner',
  primaryColor: 'Color primario',
  secondaryColor: 'Color secundario',
  accentColor: 'Color de acento',
  backgroundColor: 'Color de fondo',
  textColor: 'Color de texto',
  email: 'Correo electrónico',
  phone: 'Teléfono',
  address: 'Dirección',
  city: 'Ciudad',
  department: 'Departamento',
  country: 'País',
  businessType: 'Tipo de negocio',
  taxId: 'NIT/RUT',
  businessName: 'Razón social',
  facebookUrl: 'Facebook',
  instagramUrl: 'Instagram',
  twitterUrl: 'Twitter',
  youtubeUrl: 'YouTube',
  tiktokUrl: 'TikTok',
  whatsappNumber: 'WhatsApp',
  status: 'Estado',
};

const fieldCategories = {
  'Información básica': ['name', 'description', 'businessName', 'businessType'],
  Contacto: ['email', 'phone', 'whatsappNumber', 'address', 'city', 'department', 'country'],
  'Identidad visual': [
    'logoUrl',
    'faviconUrl',
    'bannerUrl',
    'primaryColor',
    'secondaryColor',
    'accentColor',
  ],
  'Redes sociales': ['facebookUrl', 'instagramUrl', 'twitterUrl', 'youtubeUrl', 'tiktokUrl'],
  'Datos técnicos': ['userId', 'storeId', 'taxId', 'backgroundColor', 'textColor', 'status'],
};

export default function StoreSummary({ data, onUpdate, onCreate }: StoreSummaryProps) {
  const [editingField, setEditingField] = useState<keyof StoreData | null>(null);
  const [tempValue, setTempValue] = useState<string>('');

  const startEdit = (field: keyof StoreData) => {
    setEditingField(field);
    setTempValue(String(data[field] ?? ''));
  };

  const saveEdit = () => {
    if (editingField) {
      onUpdate(editingField, tempValue);
      setEditingField(null);
      setTempValue('');
    }
  };

  const cancelEdit = () => {
    setEditingField(null);
    setTempValue('');
  };

  const isColorField = (field: string) => field.includes('Color');

  const renderFieldValue = (key: keyof StoreData, value: string) => {
    if (isColorField(key) && value) {
      return (
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded border border-gray-400"
            style={{ backgroundColor: value }}
          />
          <span className="text-gray-300">{value}</span>
        </div>
      );
    }

    if (key.includes('Url') && value) {
      return <span className="text-blue-400 break-all text-sm">{value}</span>;
    }

    return (
      <span className={value ? 'text-gray-300' : 'text-gray-500 italic'}>
        {value || 'No definido'}
      </span>
    );
  };

  return (
    <div className="w-full max-w-2xl bg-slate-700 rounded-xl border border-slate-600 p-6 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 rounded-lg p-2">🏪</div>
          <div>
            <h2 className="text-xl font-semibold text-white">Resumen de tu tienda</h2>
            <p className="text-blue-100 text-sm">
              Revisa y ajusta los detalles antes de crear tu tienda
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {Object.entries(fieldCategories).map(([category, fields]) => (
          <div key={category}>
            <h3 className="text-lg font-medium text-white mb-4">{category}</h3>
            <div className="grid grid-cols-1 gap-3">
              {fields.map((field) => {
                const k = field as keyof StoreData;
                const value = data[k];
                const isEditing = editingField === k;

                return (
                  <div key={field} className="bg-slate-600 rounded-lg p-3 border border-slate-500">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <label className="block text-xs font-medium text-gray-300 mb-1">
                          {fieldLabels[k]}
                        </label>

                        {isEditing ? (
                          <div className="space-y-2">
                            {isColorField(k) ? (
                              <div className="flex gap-1">
                                <input
                                  type="color"
                                  value={tempValue}
                                  onChange={(e) => setTempValue(e.target.value)}
                                  className="w-8 h-8 rounded border border-slate-400 bg-transparent"
                                />
                                <input
                                  type="text"
                                  value={tempValue}
                                  onChange={(e) => setTempValue(e.target.value)}
                                  className="flex-1 px-2 py-1 bg-slate-700 border border-slate-400 rounded text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none text-sm"
                                  placeholder="#000000"
                                />
                              </div>
                            ) : (
                              <textarea
                                value={tempValue}
                                onChange={(e) => setTempValue(e.target.value)}
                                className="w-full px-2 py-1 bg-slate-700 border border-slate-400 rounded text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none resize-none text-sm"
                                rows={k === 'description' ? 3 : 1}
                                placeholder={`Ingresa ${fieldLabels[k].toLowerCase()}`}
                              />
                            )}
                            <div className="flex gap-1">
                              <button
                                onClick={saveEdit}
                                className="flex items-center gap-1 px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-xs font-medium transition-colors"
                              >
                                <Save className="w-3 h-3" />
                                Guardar
                              </button>
                              <button
                                onClick={cancelEdit}
                                className="flex items-center gap-1 px-2 py-1 bg-slate-500 hover:bg-slate-600 text-white rounded text-xs font-medium transition-colors"
                              >
                                <X className="w-3 h-3" />
                                Cancelar
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="break-words">
                            {renderFieldValue(k, String(value ?? ''))}
                          </div>
                        )}
                      </div>

                      {!isEditing && (
                        <button
                          onClick={() => startEdit(k)}
                          className="flex items-center gap-1 px-2 py-1 text-blue-400 hover:text-blue-300 hover:bg-slate-500 rounded text-xs transition-colors"
                        >
                          <Edit3 className="w-3 h-3" />
                          Editar
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Success message and create button */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
          <Check className="w-8 h-8 text-white" />
        </div>

        <h3 className="text-xl font-semibold text-white mb-2">
          ¡Tu tienda está lista para ser creada!
        </h3>
        <button
          onClick={onCreate}
          className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
        >
          Crear tienda
        </button>
      </div>
    </div>
  );
}
