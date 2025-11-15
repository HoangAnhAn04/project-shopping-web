// src/app/category/[slug]/page.tsx

import base from '@/utils/airtable';
import { notFound } from 'next/navigation';
import isValidArray from '@/utils/isValidArray';
import ProductsList from '@/components/pages/products/products-list';
import Pagination from '@/components/ui/pagination';
import ProductSort, { SortOption } from '@/components/ui/product-sort';
import { sortProducts } from '@/utils/sort_utils';

const ITEMS_PER_PAGE = 12;

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string; sort?: string }>;
}) {
  const { slug } = await params;
  const urlParams = await searchParams;
  const currentPage = parseInt(urlParams.page || '1', 10);
  const sortBy = (urlParams.sort as SortOption) || 'default';

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

  // Sắp xếp sản phẩm
  const sortedProducts = sortProducts([...products], sortBy);

  // Tính toán pagination
  const totalItems = sortedProducts.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <div className="container px-4 mx-auto py-8 md:py-12 mt-16">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{categoryName}</h1>
              <p className="text-gray-600 mt-2">
                Danh mục: <span className="font-medium">{slug}</span> ({totalItems} sản phẩm)
              </p>
            </div>
            <ProductSort />
          </div>
        </div>

        {!isValidArray(products) ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Chưa có sản phẩm nào trong danh mục này</p>
          </div>
        ) : (
          <>
            <ProductsList data={JSON.stringify(paginatedProducts)} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              baseUrl={`/category/${slug}`}
            />
          </>
        )}
      </div>
    </div>
  );
}
