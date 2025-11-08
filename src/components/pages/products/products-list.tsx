'use client';
import { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import isValidArray from '@/utils/isValidArray';

export default function ProductsList(props: { data: any }) {
  const data = JSON.parse(props.data);
  return (
    <div className={'grid grid-cols-4 gap-5'}>
      {data.map((product: any, index: number) => (
        <Fragment key={index}>
          <Link href={`/products/${product.id}`}>
            <ProductImage product={product} />
            <p>{product.fields.name}</p>
          </Link>
        </Fragment>
      ))}
    </div>
  );
}

const ProductImage = ({ product }: { product: any }) => {
  if (!isValidArray(product.fields?.image)) {
    return <>No image available</>;
  }

  return (
    <>
      <Image
        src={product.fields.image[0].url}
        alt={product.fields.name}
        width={product.fields.image[0].width}
        height={product.fields.image[0].height}
      />
    </>
  );
};
