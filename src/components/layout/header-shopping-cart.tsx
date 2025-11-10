'use client';

import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useCartStore } from '@/state/cart-store';
import Link from 'next/link';

export default function HeaderShoppingCart() {
  const CartStore = useCartStore();
  return (
    <Link href={'/cart'} className="relative">
      <AiOutlineShoppingCart className={'w-8 h-8'} />
      <div className="absolute h-full w-full flex items-center top-0 left-0">
        <span className="text-xs leading-none">{CartStore.list.length}</span>
      </div>
    </Link>
  );
}
