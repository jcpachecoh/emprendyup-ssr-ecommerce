export interface Product {
  id: string;

  storeId: string;

  title: string;

  description?: string;

  price: number;

  currency: string;

  imageUrl?: string;

  available: boolean;

  externalId: string;

  createdAt: Date;

  updatedAt: Date;
}
