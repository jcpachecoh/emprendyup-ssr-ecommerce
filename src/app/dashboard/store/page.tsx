'use client';

import React, { useEffect, useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import Image from 'next/image';
import { CheckCircle, AlertCircle } from 'lucide-react';
import FileUpload from '../../components/FileUpload';
import { useSessionStore } from '@/lib/store/dashboard';

const GET_STORE_CONFIG = gql`
  query GetStore($storeId: String!) {
    store(storeId: $storeId) {
      id
      storeId
      name
      businessName
      logoUrl
      faviconUrl
      bannerUrl
      email
      phone
      whatsappNumber
      address
      city
      department
      currency
      language
      timezone
      description
      primaryColor
      secondaryColor
      accentColor
      textColor
      backgroundColor
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
      logoUrl
      faviconUrl
      bannerUrl
      email
      phone
      whatsappNumber
      address
      city
      department
      currency
      language
      timezone
      description
      primaryColor
      secondaryColor
      accentColor
      textColor
      backgroundColor
      __typename
    }
  }
`;

export default function SingleStoreSettingsPage() {
  const currentStore = useSessionStore((s: any) => s.currentStore);
  const storeId = currentStore?.storeId;
  const userData = JSON.parse(localStorage.getItem('user') || '{}');
  const { data, loading, error } = useQuery(GET_STORE_CONFIG, {
    variables: { storeId: userData?.storeId || '' },
    skip: !userData?.storeId,
  });

  console.log('Store data:', data, userData?.storeId);

  const [updateStore] = useMutation(UPDATE_STORE_CONFIG);
  const [formData, setFormData] = useState<any>({});
  const [saveStatus, setSaveStatus] = useState('idle');

  useEffect(() => {
    if (data?.store) setFormData(data.store);
  }, [data]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const resolveImageUrl = (value?: string) => {
    if (!value) return '';
    if (
      value.startsWith('http') ||
      value.startsWith('https') ||
      value.startsWith('blob:') ||
      value.startsWith('data:')
    )
      return value;
    return `https://emprendyup-images.s3.us-east-1.amazonaws.com/${value}`;
  };

  const handleSave = async () => {
    setSaveStatus('saving');
    try {
      // remove internal fields that should not be sent in the input
      const inputData = { ...formData };
      delete inputData.id;
      delete inputData.storeId;
      delete inputData.__typename;

      await updateStore({ variables: { storeId: storeId, input: inputData } });
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 2500);
    } catch (err: any) {
      console.error(err);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 2500);
    }
  };

  if (!storeId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600">No store associated with current user</p>
        </div>
      </div>
    );
  }

  if (loading)
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">Error: {error.message}</div>
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mi Tienda</h1>
          <p className="text-gray-600">Edite la configuración de la tienda asociada a su cuenta</p>
        </div>
        <div>
          <button
            onClick={handleSave}
            disabled={saveStatus === 'saving'}
            className="inline-flex items-center px-4 py-2 bg-fourth-base text-black rounded-lg hover:bg-fourth-base/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saveStatus === 'success' ? <CheckCircle className="h-4 w-4 mr-2" /> : null}
            {saveStatus === 'saving' ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Nombre de la Tienda
          </label>
          <input
            name="name"
            value={formData.name || ''}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />

          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-4 mb-2">
            Descripción
          </label>
          <textarea
            name="description"
            value={formData.description || ''}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                name="email"
                value={formData.email || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                WhatsApp
              </label>
              <input
                name="whatsappNumber"
                value={formData.whatsappNumber || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Logo
          </label>
          {formData.logoUrl ? (
            <div className="relative inline-block mb-3">
              <Image
                src={resolveImageUrl(formData.logoUrl)}
                alt="Logo"
                width={300}
                height={100}
                className="object-cover rounded"
                unoptimized
              />
              <button
                onClick={() => setFormData((p: any) => ({ ...p, logoUrl: '' }))}
                className="mt-2 text-sm text-red-500"
              >
                Eliminar
              </button>
            </div>
          ) : (
            <FileUpload
              onFile={(url: string) => setFormData((p: any) => ({ ...p, logoUrl: url }))}
              storeId={storeId}
            />
          )}

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Favicon
            </label>
            {formData.faviconUrl ? (
              <div className="relative inline-block mb-3">
                <Image
                  src={resolveImageUrl(formData.faviconUrl)}
                  alt="Favicon"
                  width={64}
                  height={64}
                  className="object-cover rounded"
                  unoptimized
                />
                <button
                  onClick={() => setFormData((p: any) => ({ ...p, faviconUrl: '' }))}
                  className="mt-2 text-sm text-red-500"
                >
                  Eliminar
                </button>
              </div>
            ) : (
              <FileUpload
                onFile={(url: string) => setFormData((p: any) => ({ ...p, faviconUrl: url }))}
                storeId={storeId}
              />
            )}
          </div>
        </div>
      </div>

      {saveStatus === 'success' && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          Cambios guardados correctamente
        </div>
      )}
    </div>
  );
}
