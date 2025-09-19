'use client';

import React, { useState, useMemo } from 'react';
import {
  Gift,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Users,
  DollarSign,
  Calendar,
  TrendingUp,
  Eye,
  Copy,
  Check,
  X,
} from 'lucide-react';
import KPICard from '../components/KPICard';

// Types
interface Bonus {
  id: string;
  title: string;
  description: string;
  type: 'percentage' | 'fixed' | 'tiered';
  value: number;
  minPurchase?: number;
  maxDiscount?: number;
  code: string;
  startDate: string;
  endDate: string;
  usageLimit: number;
  usedCount: number;
  status: 'active' | 'inactive' | 'expired' | 'scheduled';
  targetUsers: 'all' | 'new' | 'returning' | 'vip';
  categories?: string[];
}

interface BonusFormData {
  title: string;
  description: string;
  type: 'percentage' | 'fixed' | 'tiered';
  value: number;
  minPurchase: number;
  maxDiscount: number;
  code: string;
  startDate: string;
  endDate: string;
  usageLimit: number;
  targetUsers: 'all' | 'new' | 'returning' | 'vip';
  categories: string[];
}

// Mock data
const mockBonuses: Bonus[] = [
  {
    id: '1',
    title: 'New Customer Welcome',
    description: '20% off for first-time customers',
    type: 'percentage',
    value: 20,
    minPurchase: 50,
    maxDiscount: 100,
    code: 'WELCOME20',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    usageLimit: 1000,
    usedCount: 245,
    status: 'active',
    targetUsers: 'new',
    categories: ['Fashion', 'Electronics'],
  },
  {
    id: '2',
    title: 'VIP Member Special',
    description: '$50 off on orders over $200',
    type: 'fixed',
    value: 50,
    minPurchase: 200,
    code: 'VIP50',
    startDate: '2025-09-01',
    endDate: '2025-09-30',
    usageLimit: 500,
    usedCount: 123,
    status: 'active',
    targetUsers: 'vip',
    categories: ['Fashion'],
  },
  {
    id: '3',
    title: 'Black Friday Sale',
    description: 'Up to 40% off everything',
    type: 'percentage',
    value: 40,
    minPurchase: 0,
    maxDiscount: 200,
    code: 'BLACKFRIDAY',
    startDate: '2025-11-29',
    endDate: '2025-11-29',
    usageLimit: 10000,
    usedCount: 0,
    status: 'scheduled',
    targetUsers: 'all',
  },
  {
    id: '4',
    title: 'Summer Sale',
    description: '15% off summer collection',
    type: 'percentage',
    value: 15,
    minPurchase: 30,
    maxDiscount: 75,
    code: 'SUMMER15',
    startDate: '2025-06-01',
    endDate: '2025-08-31',
    usageLimit: 2000,
    usedCount: 1890,
    status: 'expired',
    targetUsers: 'all',
    categories: ['Fashion'],
  },
];

const categories = ['Fashion', 'Electronics', 'Home & Garden', 'Sports', 'Beauty', 'Books'];

export default function BonusesPage() {
  const [bonuses, setBonuses] = useState<Bonus[]>(mockBonuses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBonus, setEditingBonus] = useState<Bonus | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedBonuses, setSelectedBonuses] = useState<string[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState<BonusFormData>({
    title: '',
    description: '',
    type: 'percentage',
    value: 0,
    minPurchase: 0,
    maxDiscount: 0,
    code: '',
    startDate: '',
    endDate: '',
    usageLimit: 100,
    targetUsers: 'all',
    categories: [],
  });

  // Calculate KPIs
  const kpis = useMemo(() => {
    const activeBonuses = bonuses.filter((b) => b.status === 'active').length;
    const totalUsage = bonuses.reduce((sum, b) => sum + b.usedCount, 0);
    const avgUsageRate =
      bonuses.length > 0
        ? (bonuses.reduce((sum, b) => sum + b.usedCount / b.usageLimit, 0) / bonuses.length) * 100
        : 0;
    const expiringThisMonth = bonuses.filter((b) => {
      const endDate = new Date(b.endDate);
      const thisMonth = new Date();
      thisMonth.setMonth(thisMonth.getMonth() + 1);
      return endDate <= thisMonth && b.status === 'active';
    }).length;

    return {
      activeBonuses,
      totalUsage,
      avgUsageRate: Math.round(avgUsageRate),
      expiringThisMonth,
    };
  }, [bonuses]);

  // Filter bonuses
  const filteredBonuses = useMemo(() => {
    return bonuses.filter((bonus) => {
      const matchesSearch =
        bonus.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bonus.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bonus.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || bonus.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [bonuses, searchTerm, statusFilter]);

  // Generate random code
  const generateCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData((prev) => ({ ...prev, code: result }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingBonus) {
      // Update existing bonus
      setBonuses((prev) =>
        prev.map((bonus) =>
          bonus.id === editingBonus.id ? { ...bonus, ...formData, id: editingBonus.id } : bonus
        )
      );
    } else {
      // Create new bonus
      const newBonus: Bonus = {
        ...formData,
        id: Date.now().toString(),
        usedCount: 0,
        status: new Date(formData.startDate) > new Date() ? 'scheduled' : 'active',
      };
      setBonuses((prev) => [newBonus, ...prev]);
    }

    // Reset form
    setFormData({
      title: '',
      description: '',
      type: 'percentage',
      value: 0,
      minPurchase: 0,
      maxDiscount: 0,
      code: '',
      startDate: '',
      endDate: '',
      usageLimit: 100,
      targetUsers: 'all',
      categories: [],
    });
    setIsModalOpen(false);
    setEditingBonus(null);
  };

  // Handle edit
  const handleEdit = (bonus: Bonus) => {
    setEditingBonus(bonus);
    setFormData({
      title: bonus.title,
      description: bonus.description,
      type: bonus.type,
      value: bonus.value,
      minPurchase: bonus.minPurchase || 0,
      maxDiscount: bonus.maxDiscount || 0,
      code: bonus.code,
      startDate: bonus.startDate,
      endDate: bonus.endDate,
      usageLimit: bonus.usageLimit,
      targetUsers: bonus.targetUsers,
      categories: bonus.categories || [],
    });
    setIsModalOpen(true);
  };

  // Handle delete
  const handleDelete = (id: string) => {
    setBonuses((prev) => prev.filter((bonus) => bonus.id !== id));
  };

  // Copy code to clipboard
  const copyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      case 'expired':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const statusLabels: Record<string, string> = {
    active: 'Activo',
    inactive: 'Inactivo',
    expired: 'Expirado',
    scheduled: 'Programado',
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Bonos y Promociones</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Gestiona códigos promocionales y bonos para clientes
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 bg-fourth-base text-white rounded-lg hover:bg-fourth-base/90 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Crear bono
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Bonos activos"
          value={kpis.activeBonuses}
          icon={Gift}
          description="Promociones actualmente vigentes"
        />
        <KPICard
          title="Uso total"
          value={kpis.totalUsage}
          icon={Users}
          description="Veces que se han utilizado los bonos"
        />
        <KPICard
          title="Tasa promedio de uso"
          value={`${kpis.avgUsageRate}%`}
          icon={TrendingUp}
          description="Porcentaje del límite de bonos utilizado"
        />
        <KPICard
          title="Expiran pronto"
          value={kpis.expiringThisMonth}
          icon={Calendar}
          description="Bonos que expiran este mes"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar bonos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-fourth-base focus:border-transparent"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-fourth-base focus:border-transparent"
        >
          <option value="all">Todos</option>
          <option value="active">Activo</option>
          <option value="inactive">Inactivo</option>
          <option value="expired">Expirado</option>
          <option value="scheduled">Programado</option>
        </select>
      </div>

      {/* Bonuses Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Bono
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Código
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Tipo y Valor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Uso
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Período
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredBonuses.map((bonus) => (
                <tr key={bonus.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {bonus.title}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {bonus.description}
                      </div>
                      {bonus.targetUsers !== 'all' && (
                        <span className="inline-flex items-center px-2 py-1 mt-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full">
                          {bonus.targetUsers} users
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <code className="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded font-mono">
                        {bonus.code}
                      </code>
                      <button
                        onClick={() => copyCode(bonus.code)}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        title="Copiar código"
                      >
                        {copiedCode === bonus.code ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {bonus.type === 'percentage' ? `${bonus.value}%` : `$${bonus.value}`}
                      {bonus.type === 'percentage' && ' off'}
                    </div>
                    {bonus.minPurchase && bonus.minPurchase > 0 && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Mín: ${bonus.minPurchase}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-1">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {bonus.usedCount} / {bonus.usageLimit}
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                          <div
                            className="bg-fourth-base h-2 rounded-full"
                            style={{
                              width: `${Math.min((bonus.usedCount / bonus.usageLimit) * 100, 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {new Date(bonus.startDate).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      a {new Date(bonus.endDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(bonus.status)}`}
                    >
                      {statusLabels[bonus.status] || bonus.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(bonus)}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        title="Edit bonus"
                      >
                        <Edit className="h-4 w-4 text-gray-400" />
                      </button>
                      <button
                        onClick={() => handleDelete(bonus.id)}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        title="Delete bonus"
                      >
                        <Trash2 className="h-4 w-4 text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {editingBonus ? 'Editar bono' : 'Crear nuevo bono'}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingBonus(null);
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Título
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-fourth-base focus:border-transparent"
                    placeholder="p. ej., Bienvenida para nuevos clientes"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Descripción
                  </label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, description: e.target.value }))
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-fourth-base focus:border-transparent"
                    placeholder="Describe la oferta del bono..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tipo
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        type: e.target.value as 'percentage' | 'fixed' | 'tiered',
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-fourth-base focus:border-transparent"
                  >
                    <option value="percentage">Porcentaje</option>
                    <option value="fixed">Cantidad fija</option>
                    <option value="tiered">Por niveles</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Valor {formData.type === 'percentage' ? '(%)' : '($)'}
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.value}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, value: Number(e.target.value) }))
                    }
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-fourth-base focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Compra mínima ($)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.minPurchase}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, minPurchase: Number(e.target.value) }))
                    }
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-fourth-base focus:border-transparent"
                  />
                </div>

                {formData.type === 'percentage' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Descuento máximo ($)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.maxDiscount}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, maxDiscount: Number(e.target.value) }))
                      }
                      className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-fourth-base focus:border-transparent"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Código del bono
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={formData.code}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, code: e.target.value.toUpperCase() }))
                      }
                      className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-fourth-base focus:border-transparent font-mono"
                      placeholder="BONUS123"
                    />
                    <button
                      type="button"
                      onClick={generateCode}
                      className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      Generar
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Límite de uso
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.usageLimit}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, usageLimit: Number(e.target.value) }))
                    }
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-fourth-base focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Fecha de inicio
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, startDate: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-fourth-base focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Fecha de finalización
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.endDate}
                    onChange={(e) => setFormData((prev) => ({ ...prev, endDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-fourth-base focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Usuarios objetivo
                  </label>
                  <select
                    value={formData.targetUsers}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        targetUsers: e.target.value as 'all' | 'new' | 'returning' | 'vip',
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-fourth-base focus:border-transparent"
                  >
                    <option value="all">Todos</option>
                    <option value="new">Nuevos clientes</option>
                    <option value="returning">Clientes recurrentes</option>
                    <option value="vip">Miembros VIP</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Categorías (Opcional)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.categories.includes(category)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData((prev) => ({
                                ...prev,
                                categories: [...prev.categories, category],
                              }));
                            } else {
                              setFormData((prev) => ({
                                ...prev,
                                categories: prev.categories.filter((c) => c !== category),
                              }));
                            }
                          }}
                          className="sr-only"
                        />
                        <span
                          className={`px-3 py-1 rounded-full text-sm cursor-pointer transition-colors ${
                            formData.categories.includes(category)
                              ? 'bg-fourth-base text-white'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                          }`}
                        >
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingBonus(null);
                  }}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-fourth-base text-white rounded-lg hover:bg-fourth-base/90 transition-colors"
                >
                  {editingBonus ? 'Actualizar bono' : 'Crear bono'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
