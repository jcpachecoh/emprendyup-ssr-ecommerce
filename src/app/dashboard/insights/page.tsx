'use client';

import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Users, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react';
import KPICard from '../components/KPICard';
import LineChart from '../components/LineChart';
import BarChart from '../components/BarChart';
import { KPI, ChartData, Customer } from '@/lib/schemas/dashboard';
import { useSessionStore } from '@/lib/store/dashboard';

// Query GraphQL
const CONTACT_LEADS_BY_STORE = gql`
  query ContactLeadsByStore($storeId: ID!) {
    contactLeadsByStore(storeId: $storeId) {
      id
      firstName
      lastName
      email
      phoneNumber
      createdAt
      updatedAt
      store {
        id
        name
      }
    }
  }
`;

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
    { source: 'Directo', customers: 154, percentage: 15 },
  ],
  salesFunnel: [
    { stage: 'Visitantes', count: 10000, percentage: 100 },
    { stage: 'Leads', count: 1500, percentage: 15 },
    { stage: 'Prospectos', count: 500, percentage: 5 },
    { stage: 'Clientes', count: 150, percentage: 1.5 },
  ],
};

export default function InsightsPage() {
  const [kpis, setKpis] = useState<KPI | null>(null);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const currentStore = useSessionStore((s: any) => s.currentStore);
  const storeId = currentStore?.storeId;

  const { data, loading } = useQuery(CONTACT_LEADS_BY_STORE, {
    variables: { storeId },
    skip: !storeId,
  });

  const leads: Customer[] =
    data?.contactLeadsByStore?.map((lead: any) => ({
      id: lead.id,
      name: `${lead.firstName} ${lead.lastName}`,
      email: lead.email,
      phone: lead.phoneNumber,
      status: 'lead',
      lastContactAt: lead.updatedAt || lead.createdAt,
      totalSpent: 0,
      ordersCount: 0,
      createdAt: lead.createdAt,
    })) || [];

  useEffect(() => {
    setKpis(mockKPIs);
    setChartData(mockChartData);
  }, []);

  const getStatusBadge = (status: string) => {
    const styles = {
      lead: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      customer: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      vip: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    };

    const etiquetas: Record<string, string> = {
      lead: 'LEAD',
      customer: 'CLIENTE',
      vip: 'VIP',
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}
      >
        {etiquetas[status] || status.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Panel de Insights</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Vista general del rendimiento de tu tienda y análisis de clientes
        </p>
      </div>

      {/* Tarjetas KPI */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <KPICard
          title="Clientes Totales"
          value={kpis?.totalCustomers || 0}
          icon={Users}
          trend={{ value: 12.5, isPositive: true }}
          loading={loading}
        />
        <KPICard
          title="Órdenes Totales"
          value={kpis?.totalOrders || 0}
          icon={ShoppingCart}
          trend={{ value: 8.2, isPositive: true }}
          loading={loading}
        />
        <KPICard
          title="Ingresos Mensuales"
          value={kpis ? `$${kpis.monthlyRevenue.toLocaleString()}` : '$0'}
          icon={DollarSign}
          trend={{ value: 15.3, isPositive: true }}
          loading={loading}
        />
        <KPICard
          title="Tasa de Conversión"
          value={kpis ? `${kpis.conversionRate}%` : '0%'}
          icon={TrendingUp}
          trend={{ value: -2.1, isPositive: false }}
          loading={loading}
        />
        <KPICard
          title="Valor Promedio de Orden"
          value={kpis ? `$${kpis.averageOrderValue}` : '$0'}
          icon={DollarSign}
          trend={{ value: 5.7, isPositive: true }}
          loading={loading}
        />
      </div>

      {/* Gráficas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {chartData ? (
          <>
            <LineChart
              data={chartData.customersGrowth}
              xKey="date"
              yKey="customers"
              title="Crecimiento de Clientes"
              color="#22c55e"
            />
            <BarChart
              data={chartData.topSources}
              xKey="source"
              yKey="customers"
              title="Principales Fuentes de Tráfico"
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

      {/* Tabla Leads estilo pro */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Leads Recientes</h3>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-6 text-center text-gray-500">Cargando leads...</div>
          ) : leads.length === 0 ? (
            <div className="p-6 text-center text-gray-500">No hay leads disponibles.</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Teléfono
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Último Contacto
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {lead.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(lead.status)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {lead.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {lead.phone}
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
