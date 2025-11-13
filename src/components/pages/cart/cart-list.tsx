'use client';

import { TCartItem, useCartStore } from '@/state/cart-store';
import isValidArray from '@/utils/isValidArray';
import Link from 'next/link';
import Image from 'next/image';
import { PiMinus, PiPlus, PiTrash } from 'react-icons/pi';
import DialogCheckout from '@/components/pages/cart/dialog-checkout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function CartList() {
  const [checkoutDialog, setCheckoutDialog] = React.useState(false);
  const cartStore = useCartStore();

  if (!isValidArray(cartStore.list))
    return (
      <>
        <p>Giỏ hàng trống</p>
        <p>
          Hãy tham khảo các{' '}
          <Link className="text-blue-600 underline" href={'/products'}>
            sản phẩm
          </Link>{' '}
          của chúng tôi
        </p>
      </>
    );
  return (
    <>
      <div className="grid gap-10 grid-cols-4">
        <div className="col-span-3">
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Sản phẩm</TableHead>
                <TableHead className="w-[250px]">Số lượng</TableHead>
                <TableHead className="text-right">Giá</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartStore.list.map((item, index) => (
                <TableRow key={item.variant_id}>
                  <TableCell className="font-medium">
                    <CartItemInfo cartItem={item} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        onClick={() => {
                          if (item.quantity > 1) {
                            cartStore.increaseQuantity({
                              variant_id: item.variant_id,
                              quantity: -1,
                            });
                          }
                        }}
                        size={'icon'}
                        variant={'secondary'}
                        disabled={item.quantity <= 1}
                      >
                        <PiMinus />
                      </Button>
                      <Input
                        className="w-16"
                        type="number"
                        value={item.quantity}
                        onChange={(e) => {
                          const newQuantity = Number(e.target.value);
                          if (newQuantity > 0) {
                            cartStore.updateQuantity({
                              variant_id: item.variant_id,
                              quantity: newQuantity,
                            });
                          }
                        }}
                        min={1}
                      />
                      <Button
                        onClick={() => {
                          cartStore.increaseQuantity({
                            variant_id: item.variant_id,
                            quantity: 1,
                          });
                        }}
                        size={'icon'}
                        variant={'secondary'}
                      >
                        <PiPlus />
                      </Button>
                      <Button
                        onClick={() => {
                          cartStore.deleteCartItem({
                            variant_id: item.variant_id,
                          });
                        }}
                        size={'icon'}
                        variant={'secondary'}
                      >
                        <PiTrash />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {(item.product_variant.variant_price * item.quantity).toLocaleString('vi-VN')}₫
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex flex-col gap-3 my-5 w-full items-end sticky top-28">
          <p>
            Tổng giá trị:{' '}
            {cartStore.list
              .reduce((acc, item) => acc + item.product_variant.variant_price * item.quantity, 0)
              .toLocaleString('vi-VN')}
            ₫
          </p>
          <Button size={'lg'} onClick={() => setCheckoutDialog(true)}>
            Thanh toán
          </Button>
        </div>
      </div>
      <DialogCheckout open={checkoutDialog} onOpenChange={(open) => setCheckoutDialog(open)} />
    </>
  );
}

export const CartItemInfo = ({ cartItem }: { cartItem: TCartItem }) => {
  const { product_variant } = cartItem;
  return (
    <>
      <div className="flex gap-5">
        {product_variant.variant_image?.url ? (
          <Image
            className="w-20 aspect-square bg-gray-200 "
            src={product_variant.variant_image.url}
            alt={product_variant.variant_name}
            width={100}
            height={100}
          />
        ) : (
          <div className="w-full aspect-square bg-gray-200" />
        )}
        <div>
          <Link
            href={'/products/${product.record_id}'}
            className="text-indigo-600 line-clamp-2 mb-2"
          >
            {product_variant.name}
          </Link>
          <p>{product_variant.variant_name}</p>
          <p>{product_variant.variant_price.toLocaleString('vi-VN')}</p>
        </div>
      </div>
    </>
  );
};
