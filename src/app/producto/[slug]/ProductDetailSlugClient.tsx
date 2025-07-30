'use client';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';
import { useState } from 'react';

const GET_PRODUCT_QUERY = gql`
  query GetProduct($id: String!) {
    product(id: $id) {
      id
      title
      description
      price
      currency
      imageUrl
      available
      externalId
      createdAt
      updatedAt
      images {
        url
      }
      colors {
        color
      }
      sizes {
        size
      }
    }
  }
`;

export default function ProductDetailSlugClient() {
  const params = useParams();
  const id = params?.slug;
  const { data, loading, error } = useQuery(GET_PRODUCT_QUERY, { variables: { id } });

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (loading) return <div className="text-center py-10">Cargando producto...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error.message}</div>;
  if (!data?.product) return <div className="text-center py-10">Producto no encontrado</div>;

  const product = data.product;

  const handleAddToCart = () => {
    alert(
      `Producto agregado al carrito: ${product.title}, Cantidad: ${quantity}, Color: ${selectedColor}, Talla: ${selectedSize}`
    );
  };

  const handleBuyNow = () => {
    alert(
      `Compra realizada: ${product.title}, Cantidad: ${quantity}, Color: ${selectedColor}, Talla: ${selectedSize}`
    );
  };

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-8 gap-y-12 items-start shadow-lg rounded-xl p-6">
      {/* Imagen principal */}
      <div>
        <img
          src={product.imageUrl || product.images?.[0]?.url || ''}
          alt={product.title}
          className="w-full h-auto rounded-lg object-cover"
        />
        {/* Miniaturas */}
        {product.images?.length > 1 && (
          <div className="flex gap-3 mt-4 overflow-x-auto">
            {product.images.slice(1).map((img: any, idx: any) => (
              <img
                key={idx}
                src={img.url}
                alt={product.title}
                className="w-20 h-20 rounded-lg object-cover border border-slate-700"
              />
            ))}
          </div>
        )}
      </div>

      {/* Detalles */}
      <div className="flex flex-col justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-slate-400 mb-4">{product.description}</p>
          <p className="text-xl font-semibold mb-2">
            {product.price} {product.currency}
          </p>
          <p className="mb-4">
            <span className="font-semibold">Disponible:</span> {product.available ? 'Sí' : 'No'}
          </p>

          {/* Tallas, Cantidad, Colores */}
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 mt-6">
            {/* Tallas */}
            {product.sizes?.length > 0 && (
              <div className="flex items-center flex-wrap gap-2">
                <h5 className="text-lg font-semibold me-2">Talla:</h5>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s: any, idx: any) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedSize(s.size)}
                      className={`px-3 py-1 rounded-md border ${
                        selectedSize === s.size
                          ? 'bg-white text-black font-bold'
                          : 'bg-slate-700 text-white'
                      }`}
                    >
                      {s.size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Cantidad */}
            <div className="flex items-center gap-3">
              <h5 className="text-lg font-semibold">Cantidad:</h5>
              <div className="flex items-center gap-2">
                <button
                  onClick={decrement}
                  className="w-9 h-9 flex items-center justify-center rounded-md bg-slate-700 hover:bg-slate-600"
                >
                  -
                </button>
                <input
                  readOnly
                  value={quantity}
                  className="w-12 text-center bg-slate-700 rounded-md py-1"
                />
                <button
                  onClick={increment}
                  className="w-9 h-9 flex items-center justify-center rounded-md bg-slate-700 hover:bg-slate-600"
                >
                  +
                </button>
              </div>
            </div>

            {/* Colores */}
            {product.colors?.length > 0 && (
              <div className="flex items-center flex-wrap gap-2">
                <h5 className="text-lg font-semibold me-2">Colores:</h5>
                <div className="flex gap-2">
                  {product.colors.map((c: any, idx: any) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(c.color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColor === c.color ? 'ring-2 ring-white' : 'ring-1 ring-slate-600'
                      }`}
                      style={{ backgroundColor: c.color }}
                      title={c.color}
                    ></button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Acciones */}
        <div className="flex flex-wrap gap-4 mt-6">
          <button
            onClick={handleAddToCart}
            className="flex-1 min-w-[120px] px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Agregar al carrito
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 min-w-[120px] px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Comprar ahora
          </button>
        </div>
      </div>
    </div>
  );
}
