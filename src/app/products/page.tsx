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
    <div className={'container mx-auto px-6 lg:px-8 mt-24 mb-14'}>
      <h1 className={'text-3xl lg:text-4xl font-bold mb-10'}>Tất cả sản phẩm</h1>
      <ProductsList data={JSON.stringify(data)} />
    </div>
  );
}
