'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Edit, Store, Globe, Phone, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Store interface based on your GraphQL query
interface Store {
  id: string;
  storeId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  department: string;
  country: string;
  businessType: string;
  platform: string;
  shopUrl: string;
  status: 'active' | 'inactive' | 'maintenance';
  currency: string;
  language: string;
  isActive: boolean;
  maintenanceMode: boolean;
  logoUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// Mock stores data
const mockStores: Store[] = [
  {
    id: '37f1720d-773c-40be-aa30-d3cf29ecfd4b',
    storeId: 'store1',
    name: 'Tienda García',
    email: 'info@tiendagarcia.com',
    phone: '+57 300 123 4567',
    address: 'Calle 72 #10-15',
    city: 'Bogotá',
    department: 'Cundinamarca',
    country: 'Colombia',
    businessType: 'retail',
    platform: 'web',
    shopUrl: 'https://tiendagarcia.com',
    status: 'active',
    currency: 'COP',
    language: 'es',
    isActive: true,
    maintenanceMode: false,
    logoUrl: 'https://via.placeholder.com/40',
    createdAt: '2024-08-01T10:00:00Z',
    updatedAt: '2024-09-15T14:30:00Z',
  },
  {
    id: 'bafe7ca9-a71b-43ac-8c0e-7c3fce70e522',
    storeId: 'pawis',
    name: 'Boutique Luna',
    email: 'contacto@boutiqueluna.co',
    phone: '+57 301 987 6543',
    address: 'Carrera 15 #85-20',
    city: 'Medellín',
    department: 'Antioquia',
    country: 'Colombia',
    businessType: 'fashion',
    platform: 'shopify',
    shopUrl: 'https://boutiqueluna.shopify.com',
    status: 'active',
    currency: 'COP',
    language: 'es',
    isActive: true,
    maintenanceMode: false,
    logoUrl: 'https://via.placeholder.com/40',
    createdAt: '2024-07-15T08:20:00Z',
    updatedAt: '2024-09-10T16:45:00Z',
  },
  {
    id: '3',
    storeId: 'tym_moda',
    name: 'Tech Solutions',
    email: 'admin@techsolutions.com.co',
    phone: '+57 320 456 7890',
    address: 'Avenida 19 #104-65',
    city: 'Cali',
    department: 'Valle del Cauca',
    country: 'Colombia',
    businessType: 'technology',
    platform: 'custom',
    shopUrl: 'https://techsolutions.com.co',
    status: 'maintenance',
    currency: 'COP',
    language: 'es',
    isActive: false,
    maintenanceMode: true,
    logoUrl: 'https://via.placeholder.com/40',
    createdAt: '2024-06-10T12:00:00Z',
    updatedAt: '2024-09-16T09:15:00Z',
  },
  {
    id: '4',
    storeId: 'tomas',
    name: 'Café del Valle',
    email: 'ventas@cafedelvalle.co',
    phone: '+57 315 234 5678',
    address: 'Calle 53 #23-45',
    city: 'Manizales',
    department: 'Caldas',
    country: 'Colombia',
    businessType: 'food',
    platform: 'woocommerce',
    shopUrl: 'https://cafedelvalle.co',
    status: 'inactive',
    currency: 'COP',
    language: 'es',
    isActive: false,
    maintenanceMode: false,
    logoUrl: 'https://via.placeholder.com/40',
    createdAt: '2024-05-20T15:30:00Z',
    updatedAt: '2024-08-25T11:20:00Z',
  },
];

export default function StoresPage() {
  const [stores, setStores] = useState<Store[]>([]);
  const [filteredStores, setFilteredStores] = useState<Store[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    // Simulate API call
    const fetchStores = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStores(mockStores);
      setFilteredStores(mockStores);
      setLoading(false);
    };

    fetchStores();
  }, []);

  useEffect(() => {
    let filtered = stores;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (store) =>
          store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          store.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          store.storeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          store.city.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter((store) => store.status === statusFilter);
    }

    // Filter by platform
    if (platformFilter !== 'all') {
      filtered = filtered.filter((store) => store.platform === platformFilter);
    }

    setFilteredStores(filtered);
  }, [stores, searchQuery, statusFilter, platformFilter]);

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      inactive: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      maintenance: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getPlatformBadge = (platform: string) => {
    const styles = {
      web: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      shopify: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      woocommerce: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
      custom: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
    };

    return (
      <span
        className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${styles[platform as keyof typeof styles] || styles.custom}`}
      >
        {platform.charAt(0).toUpperCase() + platform.slice(1)}
      </span>
    );
  };

  const handleEditStore = (storeId: string) => {
    router.push(`/dashboard/store/settings/${storeId}`);
  };

  const exportToCsv = () => {
    const csvContent = [
      ['Store ID', 'Name', 'Email', 'Phone', 'City', 'Platform', 'Status', 'Created'].join(','),
      ...filteredStores.map((store) =>
        [
          store.storeId,
          store.name,
          store.email,
          store.phone,
          store.city,
          store.platform,
          store.status,
          new Date(store.createdAt).toLocaleDateString(),
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'stores.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Stores</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage and monitor your stores</p>
        </div>

        <button
          onClick={exportToCsv}
          className="inline-flex items-center px-4 py-2 bg-fourth-base text-black rounded-lg hover:bg-fourth-base/90 transition-colors"
        >
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search stores by name, email, city, or store ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-fourth-base focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-fourth-base focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>

          {/* Platform Filter */}
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-gray-400" />
            <select
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-fourth-base focus:border-transparent"
            >
              <option value="all">All Platforms</option>
              <option value="web">Web</option>
              <option value="shopify">Shopify</option>
              <option value="woocommerce">WooCommerce</option>
              <option value="custom">Custom</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stores Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {loading ? (
          <div className="p-6">
            <div className="animate-pulse space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex space-x-4">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/6"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/6"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/6"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/6"></div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Store
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Platform
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredStores.map((store) => (
                    <tr key={store.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {store.logoUrl && (
                            <img
                              className="h-10 w-10 rounded-full mr-3"
                              src={store.logoUrl}
                              alt={`${store.name} logo`}
                            />
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {store.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              ID: {store.storeId}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          <div className="flex items-center mb-1">
                            <Mail className="h-3 w-3 mr-1 text-gray-400" />
                            {store.email}
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-3 w-3 mr-1 text-gray-400" />
                            {store.phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">{store.city}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {store.department}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getPlatformBadge(store.platform)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(store.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleEditStore(store.id)}
                          className="text-fourth-base hover:text-fourth-base/80 flex items-center gap-1"
                        >
                          <Edit className="h-4 w-4" />
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-4 p-4">
              {filteredStores.map((store) => (
                <div
                  key={store.id}
                  className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      {store.logoUrl && (
                        <img
                          className="h-12 w-12 rounded-full mr-3"
                          src={store.logoUrl}
                          alt={`${store.name} logo`}
                        />
                      )}
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">{store.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          ID: {store.storeId}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      {getStatusBadge(store.status)}
                      {getPlatformBadge(store.platform)}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      {store.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      {store.phone}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <Globe className="h-4 w-4 mr-2 text-gray-400" />
                      {store.city}, {store.department}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => handleEditStore(store.id)}
                      className="px-3 py-2 bg-fourth-base text-black rounded-lg text-sm hover:bg-fourth-base/90 transition-colors flex items-center gap-1"
                    >
                      <Edit className="h-4 w-4" />
                      Edit Store
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {!loading && filteredStores.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Store className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No stores found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchQuery || statusFilter !== 'all' || platformFilter !== 'all'
                ? 'Try adjusting your filters to see more results.'
                : 'Your stores will appear here once you create them.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
