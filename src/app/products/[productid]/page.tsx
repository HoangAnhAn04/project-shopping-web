import base from '@/utils/airtable';
import isValidArray from '@/utils/isValidArray';
import { notFound } from 'next/navigation';
import { resolveRichText } from '@/utils/product_utils';
import { marked } from 'marked';
import ProductVariantSelection from '@/components/pages/products/product-variant-selection';
import ProductImageGallery from '@/components/pages/products/product-image-gallery';

// Configure marked
marked.setOptions({
  breaks: true,
  gfm: true,
});

export default async function SingleProduct({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;

  const data = await base('products')
    .select({
      filterByFormula: `RECORD_ID() = '${productId}'`,
    })
    .all();

  if (!isValidArray(data)) {
    return notFound();
  }

  const product = data[0];

  // Extract only the plain data for client components
  const productData = {
    name: product.fields.name,
    images: Array.isArray(product.fields.images) ? product.fields.images : [],
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <div className="container px-4 mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Image Gallery */}
          <div className="lg:col-span-7">
            <ProductImageGallery productData={productData} />
          </div>

          {/* Product Info */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                {String(product.fields.name)}
              </h1>
              <ProductVariantSelection product={JSON.stringify(product)} />

              {/* Description */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Mô tả sản phẩm</h2>
                <div className="text-gray-600 whitespace-pre-wrap leading-relaxed">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: marked.parse(resolveRichText(product.fields.description)) as string,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
