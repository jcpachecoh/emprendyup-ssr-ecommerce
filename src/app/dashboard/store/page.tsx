'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Store,
  Plus,
  Settings,
  Eye,
  Edit,
  Trash2,
  ExternalLink,
  Users,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Package,
  Globe,
  Palette,
  CreditCard,
  BarChart3,
  Calendar,
  Star,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
} from 'lucide-react';
import KPICard from '../components/KPICard';
import { useSessionStore } from '@/lib/store/dashboard';

// Types
interface StoreData {
  id: string;
  name: string;
  description: string;
  subdomain: string;
  customDomain?: string;
  logo?: string;
  favicon?: string;
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  plan: 'starter' | 'professional' | 'enterprise';
  createdAt: string;
  updatedAt: string;
  ownerId: string;
  settings: {
    currency: string;
    timezone: string;
    language: string;
    theme: string;
    allowGuestCheckout: boolean;
    requireEmailVerification: boolean;
    enableReviews: boolean;
    enableWishlist: boolean;
  };
  stats: {
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
    monthlyRevenue: number;
    totalCustomers: number;
    averageOrderValue: number;
    conversionRate: number;
  };
  features: string[];
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

// Mock store data
const mockStore: StoreData = {
  id: 'store-1',
  name: 'EmprendyUp Fashion',
  description: 'Premium fashion and lifestyle products for modern entrepreneurs',
  subdomain: 'emprendyup-fashion',
  customDomain: 'fashion.emprendyup.com',
  logo: '/images/logo-dark.png',
  status: 'active',
  plan: 'professional',
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2025-09-04T10:00:00Z',
  ownerId: 'user-1',
  settings: {
    currency: 'USD',
    timezone: 'America/New_York',
    language: 'en',
    theme: 'modern',
    allowGuestCheckout: true,
    requireEmailVerification: true,
    enableReviews: true,
    enableWishlist: true,
  },
  stats: {
    totalProducts: 248,
    totalOrders: 1456,
    totalRevenue: 89750.5,
    monthlyRevenue: 12450.75,
    totalCustomers: 892,
    averageOrderValue: 61.67,
    conversionRate: 3.2,
  },
  features: [
    'Custom Domain',
    'SSL Certificate',
    'Payment Processing',
    'Inventory Management',
    'Analytics Dashboard',
    'Email Marketing',
    'SEO Tools',
    'Mobile Responsive',
    'Multi-language Support',
    'Social Media Integration',
  ],
  address: {
    street: '123 Business Ave',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States',
  },
};

const quickActions = [
  {
    title: 'Add Product',
    description: 'Add new products to your store',
    href: '/dashboard/store/products/new',
    icon: Package,
    color: 'bg-blue-500',
  },
  {
    title: 'View Store',
    description: 'Preview your live store',
    href: '#',
    icon: Eye,
    color: 'bg-green-500',
    external: true,
  },
  {
    title: 'Store Settings',
    description: 'Configure your store',
    href: '/dashboard/store/list',
    icon: Settings,
    color: 'bg-purple-500',
  },
  {
    title: 'Analytics',
    description: 'View detailed analytics',
    href: '/dashboard/insights',
    icon: BarChart3,
    color: 'bg-orange-500',
  },
];

const recentActivity = [
  {
    id: '1',
    type: 'order',
    description: 'New order #1234 received',
    timestamp: '2 minutes ago',
    icon: ShoppingCart,
    color: 'text-green-600',
  },
  {
    id: '2',
    type: 'product',
    description: 'Product "Summer Dress" updated',
    timestamp: '15 minutes ago',
    icon: Package,
    color: 'text-blue-600',
  },
  {
    id: '3',
    type: 'customer',
    description: 'New customer registration',
    timestamp: '1 hour ago',
    icon: Users,
    color: 'text-purple-600',
  },
  {
    id: '4',
    type: 'payment',
    description: 'Payment of $125.50 received',
    timestamp: '2 hours ago',
    icon: DollarSign,
    color: 'text-green-600',
  },
];

export default function StorePage() {
  const { currentStore, stores } = useSessionStore();
  const [store] = useState<StoreData>(mockStore);
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'settings'>(
    'overview'
  );

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'suspended':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  // Get plan color
  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'starter':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'professional':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'enterprise':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-lg bg-fourth-base/10 flex items-center justify-center">
            {store.logo ? (
              <img src={store.logo} alt={store.name} className="h-12 w-12 object-contain" />
            ) : (
              <Store className="h-8 w-8 text-fourth-base" />
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{store.name}</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">{store.description}</p>
            <div className="flex items-center gap-2 mt-2">
              <span
                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(store.status)}`}
              >
                {store.status}
              </span>
              <span
                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPlanColor(store.plan)}`}
              >
                {store.plan}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={`https://${store.customDomain || `${store.subdomain}.emprendyup.com`}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View Store
          </a>
          <Link
            href="/dashboard/store/settings"
            className="inline-flex items-center px-4 py-2 bg-fourth-base text-white rounded-lg hover:bg-fourth-base/90 transition-colors"
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Link>
        </div>
      </div>

      {/* Store Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Domain</h3>
            <Globe className="h-5 w-5 text-fourth-base" />
          </div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {store.customDomain || `${store.subdomain}.emprendyup.com`}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {store.customDomain ? 'Custom Domain' : 'Subdomain'}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Created</h3>
            <Calendar className="h-5 w-5 text-fourth-base" />
          </div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {new Date(store.createdAt).toLocaleDateString()}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {Math.floor((Date.now() - new Date(store.createdAt).getTime()) / (1000 * 60 * 60 * 24))}{' '}
            days ago
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Currency</h3>
            <DollarSign className="h-5 w-5 text-fourth-base" />
          </div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {store.settings.currency}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{store.settings.timezone}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Features</h3>
            <Star className="h-5 w-5 text-fourth-base" />
          </div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {store.features.length} active
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Premium features enabled</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Products"
          value={store.stats.totalProducts}
          icon={Package}
          description="Products in your store"
        />
        <KPICard
          title="Total Orders"
          value={store.stats.totalOrders}
          icon={ShoppingCart}
          description="Lifetime orders"
        />
        <KPICard
          title="Total Revenue"
          value={`$${store.stats.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          description="Lifetime revenue"
        />
        <KPICard
          title="Customers"
          value={store.stats.totalCustomers}
          icon={Users}
          description="Registered customers"
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              href={action.href}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow group"
              {...(action.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <div className="flex items-center gap-4">
                <div className={`${action.color} p-3 rounded-lg text-white`}>
                  <action.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-fourth-base transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {action.description}
                  </p>
                </div>
                {action.external && (
                  <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-fourth-base transition-colors" />
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity and Store Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-700`}>
                    <activity.icon className={`h-4 w-4 ${activity.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white">{activity.description}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Link
                href="/dashboard/insights"
                className="text-sm text-fourth-base hover:text-fourth-base/80 font-medium"
              >
                View all activity →
              </Link>
            </div>
          </div>
        </div>

        {/* Store Features */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Enabled Features
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 gap-3">
              {store.features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-900 dark:text-white">{feature}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Link
                href="/dashboard/store/settings"
                className="text-sm text-fourth-base hover:text-fourth-base/80 font-medium"
              >
                Manage features →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Performance Metrics
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                ${store.stats.averageOrderValue}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Average Order Value</div>
              <div className="mt-2">
                <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +12% from last month
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {store.stats.conversionRate}%
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Conversion Rate</div>
              <div className="mt-2">
                <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +0.5% from last month
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                ${store.stats.monthlyRevenue.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Monthly Revenue</div>
              <div className="mt-2">
                <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +8% from last month
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Store Address */}
      {store.address && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Store Address</h3>
          </div>
          <div className="p-6">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-fourth-base mt-1" />
              <div>
                <p className="text-sm text-gray-900 dark:text-white">{store.address.street}</p>
                <p className="text-sm text-gray-900 dark:text-white">
                  {store.address.city}, {store.address.state} {store.address.zipCode}
                </p>
                <p className="text-sm text-gray-900 dark:text-white">{store.address.country}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
