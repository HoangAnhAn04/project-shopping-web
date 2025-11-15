import base from '@/utils/airtable';
import { Fragment } from 'react/jsx-runtime';
import ProductsList from '@/components/pages/products/products-list';
import isValidArray from '@/utils/isValidArray';
import { notFound } from 'next/navigation';

export default async function ProductPage() {
  const data = await base('products').select({}).all();

  if (!isValidArray(data)) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <div className="container px-4 mx-auto py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Tất cả sản phẩm</h1>
          <p className="text-gray-600 mt-2">Khám phá bộ sưu tập sản phẩm của chúng tôi</p>
        </div>
        <ProductsList data={JSON.stringify(data)} />
      </div>
    </div>
  );
}
