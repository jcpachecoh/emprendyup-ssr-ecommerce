'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Eye, ShoppingCart } from 'lucide-react';
import { Order } from '@/lib/schemas/dashboard';
import { useDashboardUIStore } from '@/lib/store/dashboard';
import { gql, useQuery } from '@apollo/client';
import { useSessionStore } from '@/lib/store/dashboard';
import { useParams } from 'next/navigation';

const GET_ORDERS_BY_STORE = gql`
  query OrdersByStore($storeId: String!) {
    ordersByStore(storeId: $storeId) {
      id
      status
      total
      subtotal
      tax
      shipping
      createdAt
      userName
      items {
        id
        productName
        quantity
        price
        product {
          name
          images {
            url
          }
        }
      }
      address {
        name
        street
      }
      store {
        id
        name
        logoUrl
      }
    }
  }
`;

export default function PaginaPedidos() {
  const [pedidos, setPedidos] = useState<Order[]>([]);
  const [pedidosFiltrados, setPedidosFiltrados] = useState<Order[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('all');
  const [cargando, setCargando] = useState(true);
  const params = useParams();
  const urlStoreId = params?.slug as string;

  const { setSelectedOrderId, setOrderDrawerOpen } = useDashboardUIStore();
  const { currentStore } = useSessionStore();

  const storeId = currentStore?.id || '';
  const { data, loading, error } = useQuery(GET_ORDERS_BY_STORE, {
    variables: { storeId: urlStoreId || '' },
    skip: !urlStoreId,
  });

  useEffect(() => {
    if (loading) {
      setCargando(true);
      return;
    }

    if (error) {
      console.error('Error fetching orders:', error);
      setCargando(false);
      return;
    }

    if (data?.ordersByStore) {
      // Map GraphQL response to local Order[] shape
      const mapped: Order[] = data.ordersByStore.map((o: any) => ({
        id: o.id,
        storeId: o.store?.id || storeId,
        customerId: '',
        customerName: o.userName || (o.address?.name ?? 'Cliente'),
        customerEmail: '',
        items: (o.items || []).map((it: any) => ({
          id: it.id,
          name: it.productName || it.product?.name || '',
          quantity: it.quantity,
          price: it.price,
        })),
        total: o.total || 0,
        status: o.status || 'pending',
        createdAt: o.createdAt,
        updatedAt: o.updatedAt || o.createdAt,
      }));

      setPedidos(mapped);
      setPedidosFiltrados(mapped);
      setCargando(false);
    }
  }, [data, loading, error, storeId]);

  useEffect(() => {
    let filtrados = pedidos;

    // Filtrar por búsqueda
    if (busqueda) {
      filtrados = filtrados.filter(
        (order) =>
          order.customerName.toLowerCase().includes(busqueda.toLowerCase()) ||
          order.customerEmail.toLowerCase().includes(busqueda.toLowerCase()) ||
          order.id.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    // Filtrar por estado
    if (filtroEstado !== 'all') {
      filtrados = filtrados.filter((order) => order.status === filtroEstado);
    }

    setPedidosFiltrados(filtrados);
  }, [pedidos, busqueda, filtroEstado]);

  const obtenerBadgeEstado = (estado: string) => {
    const estilos = {
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      shipped: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      delivered: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          estilos[estado as keyof typeof estilos]
        }`}
      >
        {estado.charAt(0).toUpperCase() + estado.slice(1)}
      </span>
    );
  };

  const verPedido = (idPedido: string) => {
    setSelectedOrderId(idPedido);
    setOrderDrawerOpen(true);
  };

  const exportarCSV = () => {
    const csvContent = [
      ['ID Pedido', 'Cliente', 'Correo', 'Total', 'Estado', 'Fecha'].join(','),
      ...pedidosFiltrados.map((order) =>
        [
          order.id,
          order.customerName,
          order.customerEmail,
          order.total,
          order.status,
          new Date(order.createdAt).toLocaleDateString(),
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pedidos.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pedidos</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Administra y rastrea los pedidos de tu tienda
          </p>
        </div>

        <button
          onClick={exportarCSV}
          className="inline-flex items-center px-4 py-2 bg-fourth-base text-black rounded-lg hover:bg-fourth-base/90 transition-colors"
        >
          <Download className="h-4 w-4 mr-2" />
          Exportar CSV
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Búsqueda */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar pedidos por nombre, correo o ID..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-fourth-base focus:border-transparent"
            />
          </div>

          {/* Filtro por estado */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-fourth-base focus:border-transparent"
            >
              <option value="all">Todos</option>
              <option value="pending">Pendiente</option>
              <option value="processing">Procesando</option>
              <option value="shipped">Enviado</option>
              <option value="delivered">Entregado</option>
              <option value="cancelled">Cancelado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabla de Pedidos */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {cargando ? (
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
            {/* Tabla escritorio */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      ID Pedido
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Cliente
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {pedidosFiltrados.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        #{order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {order.customerName}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {order.customerEmail}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {obtenerBadgeEstado(order.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => verPedido(order.id)}
                          className="text-fourth-base hover:text-fourth-base/80 flex items-center gap-1"
                        >
                          <Eye className="h-4 w-4" />
                          Ver
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Tarjetas móvil */}
            <div className="md:hidden space-y-4 p-4">
              {pedidosFiltrados.map((order) => (
                <div
                  key={order.id}
                  className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">#{order.id}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {order.customerName}
                      </p>
                    </div>
                    {obtenerBadgeEstado(order.status)}
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        ${order.total.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <button
                      onClick={() => verPedido(order.id)}
                      className="px-3 py-2 bg-fourth-base text-black rounded-lg text-sm hover:bg-fourth-base/90 transition-colors"
                    >
                      Ver Detalles
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {!cargando && pedidosFiltrados.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <ShoppingCart className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No se encontraron pedidos
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {busqueda || filtroEstado !== 'all'
                ? 'Prueba ajustando tus filtros para ver más resultados.'
                : 'Tus pedidos aparecerán aquí cuando los clientes comiencen a realizar compras.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
