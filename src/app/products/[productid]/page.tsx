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

export default async function SingleProduct({ params }: { params: Promise<{ productId: string }> }) {
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
    <div className="container mx-auto my-8 px-4">
      <div className="flex gap-8">
        <div className="w-32 shrink-0">
          <div className="sticky top-24">
            <ProductImageThumbnail product={product} />
          </div>
        </div>
        <div className="flex-1 max-w-xl">
          <ProductImages product={product} />
        </div>
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-6">{String(product.fields.name)}</h1>
          <ProductVariantSelection product={JSON.stringify(product)} />
          <div className="mt-8 whitespace-pre-wrap">
            <div
              dangerouslySetInnerHTML={{ __html: marked.parse(resolveRichText(product.fields.description)) as string }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ProductImageThumbnail = ({ product }: { product: any }) => {
  if (!isValidArray(product.fields.images)) return <>No Images Available</>;
  return (
    <div className="flex flex-col gap-2">
      {product.fields.images.map((image: any, index: number) => (
        <Link href={`#${image.id}`} key={image.id}>
          <Image src={image.url} alt={product.fields.name} width={150} height={150} />
        </Link>
      ))}
    </div>
  );
};

const ProductImages = ({ product }: { product: any }) => {
  if (!isValidArray(product.fields.images)) return <>No Images Available</>;
  return (
    <div className="flex flex-col gap-2">
      {product.fields.images.map((image: any, index: number) => (
        <Fragment key={image.id}>
          <Image
            className="w-full"
            src={image.url}
            alt={product.fields.name}
            width={image.width}
            height={image.height}
            id={image.id}
          />
        </Fragment>
      ))}
    </div>
  );
};
