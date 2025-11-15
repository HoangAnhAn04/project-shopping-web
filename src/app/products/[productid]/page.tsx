import base from '@/utils/airtable';
import isValidArray from '@/utils/isValidArray';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Fragment } from 'react/jsx-runtime';
import { resolveRichText } from '@/utils/product_utils';
import { marked } from 'marked';
import ProductVariantSelection from '@/components/pages/products/product-variant-selection';

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

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <div className="container px-4 mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Thumbnails */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <ProductImageThumbnail product={product} />
            </div>
          </div>

          {/* Main Image */}
          <div className="lg:col-span-6">
            <ProductImages product={product} />
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

const ProductImageThumbnail = ({ product }: { product: any }) => {
  if (!isValidArray(product.fields.images)) return null;
  return (
    <div className="flex flex-col gap-3">
      {product.fields.images.map((image: any, index: number) => (
        <Link
          href={`#${image.id}`}
          key={image.id}
          className="block rounded-lg overflow-hidden border-2 border-gray-200 hover:border-gray-400 transition-colors"
        >
          <Image
            src={image.url}
            alt={product.fields.name}
            width={80}
            height={80}
            className="w-full aspect-square object-cover"
          />
        </Link>
      ))}
    </div>
  );
};

const ProductImages = ({ product }: { product: any }) => {
  if (!isValidArray(product.fields.images)) {
    return (
      <div className="bg-gray-100 rounded-xl aspect-square flex items-center justify-center">
        <span className="text-gray-400">Không có hình ảnh</span>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      {product.fields.images.map((image: any, index: number) => (
        <div
          key={image.id}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <Image
            className="w-full"
            src={image.url}
            alt={product.fields.name}
            width={image.width}
            height={image.height}
            id={image.id}
          />
        </div>
      ))}
    </div>
  );
};
