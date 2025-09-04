'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import StoreWizardStepOne from '../../components/StoreWizardStepOne';
import { CreateStore } from '@/lib/schemas/dashboard';
import { useStoreDraftStore, useSessionStore } from '@/lib/store/dashboard';

export default function NewStorePage() {
  const router = useRouter();
  const { clearDraft } = useStoreDraftStore();
  const { addStore, setCurrentStore } = useSessionStore();
  const [loading, setLoading] = useState(false);

  const handleStoreCreation = async (data: CreateStore) => {
    setLoading(true);

    try {
      // Simulate API call to create store
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock response
      const newStore = {
        id: `store-${Date.now()}`,
        ...data,
        ownerId: 'current-user-id',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        slug: data.subdomain,
      };

      // Add store to session
      addStore(newStore);
      setCurrentStore(newStore);

      // Clear draft
      clearDraft();

      // Redirect to store overview
      router.push(`/dashboard/store/${newStore.id}/overview`);
    } catch (error) {
      console.error('Error creating store:', error);
      // Handle error (show toast, etc.)
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fourth-base mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Creating your store...
          </h2>
          <p className="text-gray-600 dark:text-gray-400">This will just take a moment</p>
        </div>
      </div>
    );
  }

  return <StoreWizardStepOne onNext={handleStoreCreation} />;
}
