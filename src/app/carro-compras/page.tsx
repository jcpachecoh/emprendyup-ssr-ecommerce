'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, Eye, X } from 'lucide-react';
import { signIn, useSession } from 'next-auth/react';
import { cartService, Cart as CartType, CartItem } from '@/lib/Cart';

export default function Cart() {
  const [cart, setCart] = useState<CartType>({
    items: [],
    total: 0,
    subtotal: 0,
    tax: 0,
    shipping: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Inicializar carrito
  useEffect(() => {
    setCart(cartService.getCart());

    // Escuchar cambios globales de carrito (storage event)
    const handleStorageChange = () => {
      setCart(cartService.getCart());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const updateQuantity = async (productId: string, quantity: number, variant?: string) => {
    setIsLoading(true);
    const updatedCart = cartService.updateQuantity(productId, quantity, variant);
    setCart(updatedCart);
    window.dispatchEvent(new Event('storage'));
    setIsLoading(false);
  };

  const removeItem = async (productId: string, variant?: string) => {
    setIsLoading(true);
    const updatedCart = cartService.removeItem(productId, variant);
    setCart(updatedCart);
    window.dispatchEvent(new Event('storage'));
    setIsLoading(false);
  };

  const clearCart = async () => {
    setIsLoading(true);
    const updatedCart = cartService.clearCart();
    setCart(updatedCart);
    window.dispatchEvent(new Event('storage'));
    setIsLoading(false);
  };

  if (cart.items.length === 0) {
    return (
      <div className={`text-center py-8 mt-24 `}>
        <ShoppingBag className="mx-auto h-12 w-12 text-gray-500 mb-3" />
        <h3 className="text-lg font-medium text-white mb-2">Tu carrito está vacío</h3>
        <p className="text-gray-400 mb-4">Agrega algunos productos para comenzar a comprar</p>
        <Link
          href="/marketplace"
          className="inline-flex items-center px-4 py-2 border border-transparent bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors text-sm"
        >
          Continuar Comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-24">
      <div className={`space-y-4 `}>
        {/* Cart Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">
            Carrito ({cart.items.reduce((sum: any, item: any) => sum + item.quantity, 0)})
          </h2>
          <button
            onClick={clearCart}
            disabled={isLoading}
            className="text-red-400 hover:text-red-300 font-medium disabled:opacity-50 text-sm"
          >
            Vaciar Carrito
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3">
            {cart.items.map((item: any) => (
              <CartItemCard
                key={`${item.productId}-${item.variant || 'default'}`}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
                isLoading={isLoading}
              />
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary cart={cart} />
          </div>
        </div>
      </div>
    </div>
  );
}

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (productId: string, quantity: number, variant?: string) => void;
  onRemove: (productId: string, variant?: string) => void;
  isLoading: boolean;
}

function CartItemCard({ item, onUpdateQuantity, onRemove, isLoading }: CartItemCardProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { data: session } = useSession();

  const handleCheckout = () => {
    if (!session) {
      signIn();
      return;
    }
    window.location.href = '/orden';
  };

  return (
    <>
      <div
        className="bg-gray-800 border border-gray-700 rounded-lg p-4 shadow-sm hover:shadow-lg hover:bg-gray-750 transition-all"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-start space-x-3">
          {/* Product Image with Preview */}
          <div className="relative w-16 h-16 bg-gray-700 rounded-md overflow-hidden flex-shrink-0 group">
            <Image
              src={
                item.image?.startsWith('http')
                  ? item.image
                  : `https://emprendyup-images.s3.us-east-1.amazonaws.com/${item.image}`
              }
              alt={item.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />

            {/* Hover Overlay */}
            <div
              className={`absolute inset-0 bg-black bg-opacity-0 transition-all duration-200 flex items-center justify-center ${
                isHovered ? 'bg-opacity-60' : ''
              }`}
            >
              <div
                className={`opacity-0 transition-opacity duration-200 flex space-x-1 items-center ${
                  isHovered ? 'opacity-100' : ''
                }`}
              >
                <button
                  onClick={() => setShowPreview(true)}
                  className="p-1 bg-gray-800 text-gray-300 rounded-full hover:bg-gray-700 shadow-md"
                  title="Vista previa"
                >
                  <Eye className="w-3 h-3" />
                </button>
                <button
                  onClick={() => onRemove(item.productId, item.variant)}
                  disabled={isLoading}
                  className="p-1 bg-red-600 text-white rounded-full hover:bg-red-500 shadow-md disabled:opacity-50"
                  title="Eliminar"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-white mb-1 text-sm">{item.name}</h3>
            {item.variant && <p className="text-xs text-gray-400 mb-1">Variante: {item.variant}</p>}
            <p className="text-base font-semibold text-white">
              ${item.price.toLocaleString('es-CO')}
            </p>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center space-x-1">
            <button
              onClick={() => onUpdateQuantity(item.productId, item.quantity - 1, item.variant)}
              disabled={isLoading || item.quantity <= 1}
              className="p-1 rounded-md border border-gray-600 bg-gray-700 hover:bg-gray-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-8 text-center font-medium text-white text-sm">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.productId, item.quantity + 1, item.variant)}
              disabled={isLoading}
              className="p-1 rounded-md border border-gray-600 bg-gray-700 hover:bg-gray-600 text-white disabled:opacity-50"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          {/* Remove Button */}
          <button
            onClick={() => onRemove(item.productId, item.variant)}
            disabled={isLoading}
            className={`p-1.5 rounded-md disabled:opacity-50 transition-colors ${
              isHovered
                ? 'text-red-400 hover:text-red-300 hover:bg-red-900/20'
                : 'text-gray-500 hover:text-red-400'
            }`}
            title="Eliminar del carrito"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Item Total */}
        <div className="mt-3 flex justify-between items-center">
          <span className="text-xs text-gray-400">Subtotal:</span>
          <span className="font-semibold text-white text-sm">
            ${(item.price * item.quantity).toLocaleString('es-CO')}
          </span>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-xl max-h-full bg-gray-800 rounded-lg overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <div>
                <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                {item.variant && <p className="text-sm text-gray-400">Variante: {item.variant}</p>}
              </div>
              <button
                onClick={() => setShowPreview(false)}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4">
              <div className="relative w-full h-60 mb-4">
                <Image
                  src={
                    item.image?.startsWith('http')
                      ? item.image
                      : `https://emprendyup-images.s3.us-east-1.amazonaws.com/${item.image}`
                  }
                  alt={item.name}
                  fill
                  className="object-contain rounded-lg"
                />
              </div>

              {/* Product Info */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-300">Precio:</span>
                  <span className="text-lg font-bold text-white">
                    ${item.price.toLocaleString('es-CO')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-300">Cantidad:</span>
                  <span className="text-lg font-bold text-white">{item.quantity}</span>
                </div>
                <div className="flex justify-between items-center border-t border-gray-700 pt-2">
                  <span className="text-sm font-semibold text-gray-300">Subtotal:</span>
                  <span className="text-xl font-bold text-white">
                    ${(item.price * item.quantity).toLocaleString('es-CO')}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-center space-x-3 mt-4">
                <button
                  onClick={() => {
                    onRemove(item.productId, item.variant);
                    setShowPreview(false);
                  }}
                  disabled={isLoading}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 disabled:opacity-50 transition-colors text-sm"
                >
                  Eliminar del carrito
                </button>
                <button
                  onClick={() => setShowPreview(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors text-sm"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

interface OrderSummaryProps {
  cart: CartType;
}

function OrderSummary({ cart }: OrderSummaryProps) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 space-y-3">
      <h3 className="text-lg font-semibold text-white">Resumen del Pedido</h3>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">Subtotal:</span>
          <span className="font-medium text-white text-sm">
            ${cart.subtotal.toLocaleString('es-CO')}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">IVA (19%):</span>
          <span className="font-medium text-white text-sm">
            ${cart.tax.toLocaleString('es-CO')}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">Envío:</span>
          <span className="font-medium text-white text-sm">
            {cart.shipping === 0 ? 'Gratis' : `$${cart.shipping.toLocaleString('es-CO')}`}
          </span>
        </div>
        {cart.shipping === 0 && cart.subtotal >= 150000 && (
          <p className="text-xs text-green-400">¡Envío gratis por compras superiores a $150.000!</p>
        )}
      </div>

      <div className="border-t border-gray-700 pt-3">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-white">Total:</span>
          <span className="text-xl font-bold text-white">
            ${cart.total.toLocaleString('es-CO')}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Link
          href="/orden"
          className="block text-center bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-md font-medium transition-colors text-sm"
        >
          Proceder al Pago
        </Link>
        <Link
          href="/products"
          className="block text-center border border-gray-600 bg-gray-700 hover:bg-gray-600 py-2.5 px-4 rounded-md font-medium text-gray-200 transition-colors text-sm"
        >
          Continuar Comprando
        </Link>
      </div>

      {/* Payment Methods */}
      <div className="mt-4 pt-4 border-t border-gray-700">
        <h4 className="text-sm font-medium text-white mb-2">Métodos de Pago:</h4>
        <div className="grid grid-cols-3 gap-1">
          <div className="bg-gray-700 border border-gray-600 p-1.5 rounded text-center text-xs font-medium text-gray-200">
            MercadoPago
          </div>
          <div className="bg-gray-700 border border-gray-600 p-1.5 rounded text-center text-xs font-medium text-gray-200">
            Wompi
          </div>
          <div className="bg-gray-700 border border-gray-600 p-1.5 rounded text-center text-xs font-medium text-gray-200">
            ePayco
          </div>
        </div>
      </div>
    </div>
  );
}
