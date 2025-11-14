'use client';

import { useCartStore } from '@/state/cart-store';
import isValidArray from '@/utils/isValidArray';
import { Link } from 'lucide-react';
import { CartItemInfo } from '@/components/pages/cart/cart-list';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function OrderSuccess() {
  const cartStore = useCartStore();

  if (!isValidArray(cartStore.orderSuccessList))
    return (
      <div className="container my-14">
        <h1 className="text-3xl mb-8">Đặt hàng chưa thành công</h1>
        <p>Vui lòng kiểm tra lại giỏ hàng</p>
        <p>
          Hãy tham khảo các{' '}
          <Link className="text-blue-600 underline" href={'/products'}>
            sản phẩm
          </Link>{' '}
          của chúng tôi
        </p>
      </div>
    );

  function setCheckoutDialog(arg0: boolean): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="container my-14">
      <h1 className="text-3xl mb-8">Cảm ơn bạn đã mua hàng</h1>
      <div className="grid grid-10 grid-cols-4">
        <div className="col-span-3">
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Sản phẩm</TableHead>
                <TableHead className="w-[250px]">Số lượng</TableHead>
                <TableHead className="text-right w-[150px]">Giá</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartStore.orderSuccessList.map((item, index) => (
                <TableRow key={item.variant_id}>
                  <TableCell className="font-medium">
                    <CartItemInfo cartItem={item} />
                  </TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell className="text-right whitespace-nowrap">
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
            {cartStore.orderSuccessList
              .reduce((acc, item) => acc + item.product_variant.variant_price * item.quantity, 0)
              .toLocaleString('vi-VN')}
            ₫
          </p>
        </div>
      </div>
    </div>
  );
}
