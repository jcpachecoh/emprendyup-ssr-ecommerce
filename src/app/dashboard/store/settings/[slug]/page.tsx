'use client';
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useParams } from 'next/navigation';
import {
  Settings,
  Palette,
  Building,
  FileText,
  Truck,
  Search,
  Save,
  AlertCircle,
  CheckCircle,
  CreditCard,
  Upload,
  Info,
} from 'lucide-react';
import Image from 'next/image';
import DetailsStore from '@/app/components/Detalles';

const GET_STORE_CONFIG = gql`
  query GetStore($storeId: String!) {
    store(storeId: $storeId) {
      id
      storeId
      name
      businessName
      primaryColor
      secondaryColor
      accentColor
      backgroundColor
      textColor
      description
      email
      phone
      address
      city
      department
      country
      businessType
      taxId
      currency
      language
      timezone
      metaTitle
      metaDescription
      metaKeywords
      logoUrl
      faviconUrl
      bannerUrl
      whatsappNumber
      facebookUrl
      instagramUrl
      twitterUrl
      youtubeUrl
      tiktokUrl
      freeShippingThreshold
      standardShippingCost
      expressShippingCost
      taxRate
      includeTaxInPrice
      mercadoPagoEnabled
      mercadoPagoPublicKey
      wompiEnabled
      wompiPublicKey
      ePaycoEnabled
      ePaycoPublicKey
    }
  }
`;

const UPDATE_STORE_CONFIG = gql`
  mutation UpdateStore($storeId: String!, $input: UpdateStoreInput!) {
    updateStore(storeId: $storeId, input: $input) {
      id
      storeId
      name
      businessName
      textColor
      accentColor
      address
      language
      country
      mercadoPagoEnabled
      department
      description
      primaryColor
      secondaryColor
      metaTitle
      metaDescription
      metaKeywords
      updatedAt
      __typename
    }
  }
`;

export default function StoreSettingsPage() {
  const params = useParams();
  const urlStoreId = params?.slug as string;

  const { data, loading, error } = useQuery(GET_STORE_CONFIG, {
    variables: { storeId: urlStoreId || '' },
    skip: !urlStoreId,
  });

  const [updateStore] = useMutation(UPDATE_STORE_CONFIG);
  const [formData, setFormData] = useState<any>({});
  const [activeTab, setActiveTab] = useState('general');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (data?.store) {
      setFormData(data.store);
    }
  }, [data]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaveStatus('saving');
    try {
      // Sacamos los campos que NO deben ir en el input
      const { id, storeId: _sid, __typename, ...inputData } = formData;

      await updateStore({
        variables: {
          storeId: urlStoreId,
          input: inputData,
        },
      });

      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (err: any) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const tabs = [
    { id: 'detalles', label: 'Detalles', icon: Info },
    { id: 'general', label: 'General', icon: Settings },
    { id: 'brand', label: 'Marca', icon: Palette },
    { id: 'business', label: 'Negocio', icon: Building },
    { id: 'payments', label: 'Pagos', icon: CreditCard },
    { id: 'shipping', label: 'Envíos', icon: Truck },
    { id: 'seo', label: 'SEO', icon: Search },
  ];
  if (!urlStoreId) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">No se encontró el ID de la tienda</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-fourth-base"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 dark:text-red-400">Error: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Configuración de Tienda
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Personaliza la apariencia y configuración de tu tienda
              </p>
            </div>
            <button
              onClick={handleSave}
              disabled={saveStatus === 'saving'}
              className="inline-flex items-center px-4 py-2 bg-fourth-base text-black rounded-lg hover:bg-fourth-base/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saveStatus === 'saving' ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
              ) : saveStatus === 'success' ? (
                <CheckCircle className="h-4 w-4 mr-2" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {saveStatus === 'saving' ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar Navigation */}
        <div className="w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <nav className="container mx-auto px-6">
            <div className="flex gap-2 overflow-x-auto py-3">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                      isActive
                        ? 'bg-gray-800 text-white shadow'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>
          {/* Main Content */}
          <div className="flex-1 p-6 mt-6">
            <div className="w-full">
              {/* Detalles Tab */}
              {activeTab === 'detalles' && (
                <>
                  <DetailsStore />
                </>
              )}
              {/* General Tab */}
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                      Información General
                    </h2>

                    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Nombre de la Tienda
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-fourth-base focus:border-transparent"
                            placeholder="Fashion Store"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            ID de la Tienda (URL)
                          </label>
                          <input
                            type="text"
                            name="storeId"
                            value={formData.storeId || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-fourth-base focus:border-transparent"
                            placeholder="mi-tienda"
                          />
                        </div>
                      </div>

                      <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Descripción
                        </label>
                        <textarea
                          name="description"
                          value={formData.description || ''}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-fourth-base focus:border-transparent"
                          placeholder="Describe tu tienda..."
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Moneda
                          </label>
                          <select
                            name="currency"
                            value={formData.currency || 'COP'}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-fourth-base focus:border-transparent"
                          >
                            <option value="COP">Peso Colombiano (COP)</option>
                            <option value="USD">Dólar (USD)</option>
                            <option value="EUR">Euro (EUR)</option>
                            <option value="MXN">Peso Mexicano (MXN)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Idioma
                          </label>
                          <select
                            name="language"
                            value={formData.language || 'es'}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-fourth-base focus:border-transparent"
                          >
                            <option value="es">Español</option>
                            <option value="en">English</option>
                            <option value="pt">Português</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Zona Horaria
                          </label>
                          <select
                            name="timezone"
                            value={formData.timezone || 'America/Bogota'}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-fourth-base focus:border-transparent"
                          >
                            <option value="America/Bogota">Bogotá</option>
                            <option value="America/Mexico_City">Ciudad de México</option>
                            <option value="America/New_York">New York</option>
                            <option value="Europe/Madrid">Madrid</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Brand Tab */}
              {activeTab === 'brand' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                      Marca y Apariencia
                    </h2>

                    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                      {/* Logo, Favicon, Banner */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Logo
                          </label>
                          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center">
                            {formData.logoUrl ? (
                              <div className="space-y-2">
                                <Image
                                  src={
                                    formData.logoUrl?.startsWith('http')
                                      ? formData.logoUrl
                                      : `https://emprendyup-images.s3.us-east-1.amazonaws.com/${formData.logoUrl}`
                                  }
                                  alt="Logo"
                                  width={300}
                                  height={100}
                                  className="w-full h-16 mx-auto rounded object-cover"
                                />
                                <div className="flex gap-2">
                                  <input
                                    type="url"
                                    name="logoUrl"
                                    value={formData.logoUrl || ''}
                                    onChange={handleInputChange}
                                    className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    placeholder="URL del logo"
                                  />
                                </div>
                              </div>
                            ) : (
                              <div>
                                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                <input
                                  type="url"
                                  name="logoUrl"
                                  value={formData.logoUrl || ''}
                                  onChange={handleInputChange}
                                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                  placeholder="URL del logo"
                                />
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Sube el logo de tu tienda
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Favicon
                          </label>
                          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center">
                            {formData.faviconUrl ? (
                              <div className="space-y-2">
                                <Image
                                  src={
                                    formData.faviconUrl?.startsWith('http')
                                      ? formData.faviconUrl
                                      : `https://emprendyup-images.s3.us-east-1.amazonaws.com/${formData.faviconUrl}`
                                  }
                                  alt="Favicon"
                                  width={300}
                                  height={100}
                                  className="w-full h-16 mx-auto rounded object-cover"
                                />
                                <input
                                  type="url"
                                  name="faviconUrl"
                                  value={formData.faviconUrl || ''}
                                  onChange={handleInputChange}
                                  className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                  placeholder="URL del favicon"
                                />
                              </div>
                            ) : (
                              <div>
                                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                <input
                                  type="url"
                                  name="faviconUrl"
                                  value={formData.faviconUrl || ''}
                                  onChange={handleInputChange}
                                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                  placeholder="URL del favicon"
                                />
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Ícono de la pestaña del navegador
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Banner
                          </label>
                          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center">
                            {formData.bannerUrl ? (
                              <div className="space-y-2">
                                <Image
                                  src={
                                    formData.bannerUrl?.startsWith('http')
                                      ? formData.bannerUrl
                                      : `https://emprendyup-images.s3.us-east-1.amazonaws.com/${formData.bannerUrl}`
                                  }
                                  alt="Banner"
                                  width={400}
                                  height={100}
                                  className="w-full h-16 mx-auto rounded object-cover"
                                />
                                <input
                                  type="url"
                                  name="bannerUrl"
                                  value={formData.bannerUrl || ''}
                                  onChange={handleInputChange}
                                  className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                  placeholder="URL del banner"
                                />
                              </div>
                            ) : (
                              <div>
                                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                <input
                                  type="url"
                                  name="bannerUrl"
                                  value={formData.bannerUrl || ''}
                                  onChange={handleInputChange}
                                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                  placeholder="URL del banner"
                                />
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Imagen principal de tu tienda
                          </p>
                        </div>
                      </div>

                      {/* Colores del Tema */}
                      <div>
                        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
                          Colores del Tema
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                          {[
                            { key: 'primaryColor', label: 'Principal' },
                            { key: 'secondaryColor', label: 'Secundario' },
                            { key: 'accentColor', label: 'Acento' },
                            { key: 'backgroundColor', label: 'Fondo' },
                            { key: 'textColor', label: 'Texto' },
                          ].map(({ key, label }) => (
                            <div key={key}>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {label}
                              </label>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="color"
                                  name={key}
                                  value={(formData as any)[key] || '#000000'}
                                  onChange={handleInputChange}
                                  className="w-12 h-10 border border-gray-300 dark:border-gray-600 rounded cursor-pointer"
                                />
                                <input
                                  type="text"
                                  name={key}
                                  value={(formData as any)[key] || ''}
                                  onChange={handleInputChange}
                                  className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                  placeholder="#000000"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Business Tab */}
              {activeTab === 'business' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                      Información del Negocio
                    </h2>

                    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Nombre del Negocio
                          </label>
                          <input
                            type="text"
                            name="businessName"
                            value={formData.businessName || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-fourth-base focus:border-transparent"
                            placeholder="Mi Empresa SAS"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Tipo de Negocio
                          </label>
                          <select
                            name="businessType"
                            value={formData.businessType || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-fourth-base focus:border-transparent"
                          >
                            <option value="">Seleccionar...</option>
                            <option value="individual">Persona Natural</option>
                            <option value="sas">SAS</option>
                            <option value="ltda">Limitada</option>
                            <option value="sa">Sociedad Anónima</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            NIT/RUT
                          </label>
                          <input
                            type="text"
                            name="taxId"
                            value={formData.taxId || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-fourth-base focus:border-transparent"
                            placeholder="123456789-1"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Email de Contacto
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-fourth-base focus:border-transparent"
                            placeholder="contacto@mitienda.com"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Teléfono
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-fourth-base focus:border-transparent"
                            placeholder="+57 300 123 4567"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            WhatsApp
                          </label>
                          <input
                            type="tel"
                            name="whatsappNumber"
                            value={formData.whatsappNumber || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-fourth-base focus:border-transparent"
                            placeholder="+57 300 123 4567"
                          />
                        </div>
                      </div>

                      <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Dirección Completa
                        </label>
                        <textarea
                          name="address"
                          value={formData.address || ''}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-fourth-base focus:border-transparent"
                          placeholder="Calle 72 #10-15, Bogotá, Colombia"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Ciudad
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-fourth-base focus:border-transparent"
                            placeholder="Bogotá"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Departamento
                          </label>
                          <input
                            type="text"
                            name="department"
                            value={formData.department || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-fourth-base focus:border-transparent"
                            placeholder="Cundinamarca"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Payments Tab */}
              {activeTab === 'payments' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                      Métodos de Pago
                    </h2>

                    <div className="space-y-6">
                      {/* MercadoPago */}
                      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium text-gray-900 dark:text-white">MercadoPago</h4>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              name="mercadoPagoEnabled"
                              checked={formData.mercadoPagoEnabled || false}
                              onChange={(e) =>
                                setFormData((prev: any) => ({
                                  ...prev,
                                  mercadoPagoEnabled: e.target.checked,
                                }))
                              }
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        {formData.mercadoPagoEnabled && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Clave Pública
                            </label>
                            <input
                              type="text"
                              name="mercadoPagoPublicKey"
                              value={formData.mercadoPagoPublicKey || ''}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-fourth-base focus:border-transparent"
                              placeholder="TEST-..."
                            />
                          </div>
                        )}
                      </div>

                      {/* Wompi */}
                      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium text-gray-900 dark:text-white">Wompi</h4>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              name="wompiEnabled"
                              checked={formData.wompiEnabled || false}
                              onChange={(e) =>
                                setFormData((prev: any) => ({
                                  ...prev,
                                  wompiEnabled: e.target.checked,
                                }))
                              }
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        {formData.wompiEnabled && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Clave Pública
                            </label>
                            <input
                              type="text"
                              name="wompiPublicKey"
                              value={formData.wompiPublicKey || ''}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-fourth-base focus:border-transparent"
                              placeholder="pub_test_..."
                            />
                          </div>
                        )}
                      </div>

                      {/* ePayco */}
                      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium text-gray-900 dark:text-white">ePayco</h4>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              name="ePaycoEnabled"
                              checked={formData.ePaycoEnabled || false}
                              onChange={(e) =>
                                setFormData((prev: any) => ({
                                  ...prev,
                                  ePaycoEnabled: e.target.checked,
                                }))
                              }
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        {formData.ePaycoEnabled && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Clave Pública
                            </label>
                            <input
                              type="text"
                              name="ePaycoPublicKey"
                              value={formData.ePaycoPublicKey || ''}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-fourth-base focus:border-transparent"
                              placeholder="test_..."
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Shipping Tab */}
              {activeTab === 'shipping' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                      Configuración de Envíos
                    </h2>

                    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Envío Gratis Desde (COP)
                          </label>
                          <input
                            type="number"
                            name="freeShippingThreshold"
                            value={formData.freeShippingThreshold || 150000}
                            onChange={(e) =>
                              setFormData((prev: any) => ({
                                ...prev,
                                freeShippingThreshold: Number(e.target.value),
                              }))
                            }
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-fourth-base focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Costo Envío Estándar (COP)
                          </label>
                          <input
                            type="number"
                            name="standardShippingCost"
                            value={formData.standardShippingCost || 15000}
                            onChange={(e) =>
                              setFormData((prev: any) => ({
                                ...prev,
                                standardShippingCost: Number(e.target.value),
                              }))
                            }
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-fourth-base focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Costo Envío Express (COP)
                          </label>
                          <input
                            type="number"
                            name="expressShippingCost"
                            value={formData.expressShippingCost || ''}
                            onChange={(e) =>
                              setFormData((prev: any) => ({
                                ...prev,
                                expressShippingCost: e.target.value
                                  ? Number(e.target.value)
                                  : undefined,
                              }))
                            }
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-fourth-base focus:border-transparent"
                            placeholder="Opcional"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Tasa de Impuesto (%)
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            max="1"
                            name="taxRate"
                            value={formData.taxRate || 0.19}
                            onChange={(e) =>
                              setFormData((prev: any) => ({
                                ...prev,
                                taxRate: Number(e.target.value),
                              }))
                            }
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-fourth-base focus:border-transparent"
                          />
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            IVA Colombia: 0.19 (19%)
                          </p>
                        </div>

                        <div className="flex items-center">
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              name="includeTaxInPrice"
                              checked={formData.includeTaxInPrice || false}
                              onChange={(e) =>
                                setFormData((prev: any) => ({
                                  ...prev,
                                  includeTaxInPrice: e.target.checked,
                                }))
                              }
                              className="w-4 h-4 text-fourth-base focus:ring-fourth-base border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                            />
                            <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                              Incluir impuesto en el precio
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SEO Tab */}
              {activeTab === 'seo' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                      SEO y Metadatos
                    </h2>

                    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Título Meta
                          </label>
                          <input
                            type="text"
                            name="metaTitle"
                            value={formData.metaTitle || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-fourth-base focus:border-transparent"
                            placeholder="Título que aparece en Google"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Descripción Meta
                          </label>
                          <textarea
                            rows={4}
                            name="metaDescription"
                            value={formData.metaDescription || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-fourth-base focus:border-transparent"
                            placeholder="Descripción que aparece en los resultados de búsqueda"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Palabras Clave Meta
                          </label>
                          <input
                            type="text"
                            name="metaKeywords"
                            value={formData.metaKeywords || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-fourth-base focus:border-transparent"
                            placeholder="palabra1, palabra2, palabra3"
                          />
                        </div>

                        <div>
                          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
                            Redes Sociales
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                              { key: 'facebookUrl', label: 'Facebook' },
                              { key: 'instagramUrl', label: 'Instagram' },
                              { key: 'twitterUrl', label: 'Twitter' },
                              { key: 'youtubeUrl', label: 'YouTube' },
                              { key: 'tiktokUrl', label: 'TikTok' },
                            ].map(({ key, label }) => (
                              <div key={key}>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                  {label}
                                </label>
                                <input
                                  type="url"
                                  name={key}
                                  value={formData[key] || ''}
                                  onChange={handleInputChange}
                                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-fourth-base focus:border-transparent"
                                  placeholder={`https://${label.toLowerCase()}.com/...`}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Save Status Toast */}
      {saveStatus === 'success' && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          Cambios guardados correctamente
        </div>
      )}

      {saveStatus === 'error' && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          Error al guardar los cambios
        </div>
      )}
    </div>
  );
}
