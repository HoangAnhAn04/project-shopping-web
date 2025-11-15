// src/app/category/[slug]/page.tsx

import base from '@/utils/airtable';
import { notFound } from 'next/navigation';
import isValidArray from '@/utils/isValidArray';
import ProductsList from '@/components/pages/products/products-list';

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const categories = await base('categories')
    .select({
      filterByFormula: `{slug} = "${slug}"`,
    })
    .all();

  if (!isValidArray(categories)) {
    return notFound();
  }

  const category = categories[0];
  const categoryId = category.id;
  const categoryName = category.fields.name as string;

  const allProducts = await base('products').select({}).all();

  const products = allProducts.filter((product: any) => {
    const productCategories = product.fields.category;
    return Array.isArray(productCategories) && productCategories.includes(categoryId);
  });

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <div className="container px-4 mx-auto py-8 md:py-12 mt-16">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{categoryName}</h1>
          <p className="text-gray-600 mt-2">
            Danh mục: <span className="font-medium">{slug}</span>
          </p>
        </div>

        {!isValidArray(products) ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Chưa có sản phẩm nào trong danh mục này</p>
          </div>
        ) : (
          <ProductsList data={JSON.stringify(products)} />
        )}
      </div>
    </div>
  );
}
