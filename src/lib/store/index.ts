import { Store } from '../schemas/dashboard';

export async function getUserStores(): Promise<Store[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/stores`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store', // 👈 para evitar cache en SSR
    });

    if (!res.ok) throw new Error('Error al cargar tiendas');

    return res.json();
  } catch (error) {
    console.error('❌ Error en getUserStores:', error);
    return [];
  }
}
