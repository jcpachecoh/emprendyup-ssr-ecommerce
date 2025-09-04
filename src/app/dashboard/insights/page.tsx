'use client';

import React, { useEffect, useState } from 'react';
import { Users, ShoppingCart, DollarSign, TrendingUp, Eye, Clock } from 'lucide-react';
import KPICard from '../components/KPICard';
import LineChart from '../components/LineChart';
import BarChart from '../components/BarChart';
import { KPI, ChartData, Customer } from '@/lib/schemas/dashboard';

// Mock data
const mockKPIs: KPI = {
  totalCustomers: 1234,
  totalOrders: 892,
  monthlyRevenue: 45600,
  conversionRate: 3.2,
  averageOrderValue: 78.5,
};

const mockChartData: ChartData = {
  customersGrowth: [
    { date: '2024-01', customers: 100 },
    { date: '2024-02', customers: 150 },
    { date: '2024-03', customers: 200 },
    { date: '2024-04', customers: 280 },
    { date: '2024-05', customers: 350 },
    { date: '2024-06', customers: 420 },
  ],
  topSources: [
    { source: 'Instagram', customers: 450, percentage: 35 },
    { source: 'WhatsApp', customers: 380, percentage: 30 },
    { source: 'Facebook', customers: 250, percentage: 20 },
    { source: 'Direct', customers: 154, percentage: 15 },
  ],
  salesFunnel: [
    { stage: 'Visitors', count: 10000, percentage: 100 },
    { stage: 'Leads', count: 1500, percentage: 15 },
    { stage: 'Prospects', count: 500, percentage: 5 },
    { stage: 'Customers', count: 150, percentage: 1.5 },
  ],
};

const mockLeads: Customer[] = [
  {
    id: '1',
    name: 'María González',
    email: 'maria@example.com',
    phone: '+57 300 123 4567',
    status: 'lead',
    lastContactAt: '2024-09-03',
    totalSpent: 0,
    ordersCount: 0,
    createdAt: '2024-09-01',
  },
  {
    id: '2',
    name: 'Carlos López',
    email: 'carlos@example.com',
    phone: '+57 310 987 6543',
    status: 'customer',
    lastContactAt: '2024-09-02',
    totalSpent: 250,
    ordersCount: 3,
    createdAt: '2024-08-15',
  },
  {
    id: '3',
    name: 'Ana Rodríguez',
    email: 'ana@example.com',
    phone: '+57 320 456 7890',
    status: 'vip',
    lastContactAt: '2024-09-04',
    totalSpent: 890,
    ordersCount: 12,
    createdAt: '2024-07-10',
  },
];

export default function InsightsPage() {
  const [kpis, setKpis] = useState<KPI | null>(null);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [leads, setLeads] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setKpis(mockKPIs);
      setChartData(mockChartData);
      setLeads(mockLeads);
      setLoading(false);
    };

    fetchData();
  }, []);

  const getStatusBadge = (status: string) => {
    const styles = {
      lead: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      customer: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      vip: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}
      >
        {status.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Insights Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Overview of your store performance and customer insights
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <KPICard
          title="Total Customers"
          value={kpis?.totalCustomers || 0}
          icon={Users}
          trend={{ value: 12.5, isPositive: true }}
          loading={loading}
        />
        <KPICard
          title="Total Orders"
          value={kpis?.totalOrders || 0}
          icon={ShoppingCart}
          trend={{ value: 8.2, isPositive: true }}
          loading={loading}
        />
        <KPICard
          title="Monthly Revenue"
          value={kpis ? `$${kpis.monthlyRevenue.toLocaleString()}` : '$0'}
          icon={DollarSign}
          trend={{ value: 15.3, isPositive: true }}
          loading={loading}
        />
        <KPICard
          title="Conversion Rate"
          value={kpis ? `${kpis.conversionRate}%` : '0%'}
          icon={TrendingUp}
          trend={{ value: -2.1, isPositive: false }}
          loading={loading}
        />
        <KPICard
          title="Avg Order Value"
          value={kpis ? `$${kpis.averageOrderValue}` : '$0'}
          icon={DollarSign}
          trend={{ value: 5.7, isPositive: true }}
          loading={loading}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {chartData ? (
          <>
            <LineChart
              data={chartData.customersGrowth}
              xKey="date"
              yKey="customers"
              title="Customer Growth"
              color="#22c55e"
            />
            <BarChart
              data={chartData.topSources}
              xKey="source"
              yKey="customers"
              title="Top Traffic Sources"
              color="#3b82f6"
            />
          </>
        ) : (
          <>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="animate-pulse h-64 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="animate-pulse h-64 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
          </>
        )}
      </div>

      {/* Recent Leads Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Leads</h3>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-6">
              <div className="animate-pulse space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex space-x-4">
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/6"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/6"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Total Spent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Last Contact
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {lead.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{lead.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(lead.status)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      ${lead.totalSpent.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(lead.lastContactAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
