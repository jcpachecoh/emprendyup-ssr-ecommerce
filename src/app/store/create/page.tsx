import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/utils/rbac';
import ChatTienda from '@/app/components/chatTienda';
import { getUserStores } from '@/lib/store';

export default async function CreateStorePage() {
  // 1. Autenticación
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login?redirect=/stores/create');
  }

  // 2. Traer tiendas del usuario
  const stores = await getUserStores();

  // 3. Escenario 2 → Usuario ya tiene tienda
  if (stores.length > 0) {
    console.log('📊 Event: store_create_redirected_existing', {
      userId: user.id,
      storeId: stores[0].id,
    });
    redirect(`/dashboard`);
  }

  // 4. Escenario 1 → No tiene tienda
  return (
    <div className="h-screen w-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
      <div className="w-full max-w-3xl h-full">
        <ChatTienda />
      </div>
    </div>
  );
}
