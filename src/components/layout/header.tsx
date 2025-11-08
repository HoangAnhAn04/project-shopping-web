import Link from 'next/link';
import HeaderDropdownMenu from './header-dropdown-menu';
import HeaderShoppingCart from './header-shopping-cart';

export default function Header() {
  return (
    <header className={'fixed w-full top-0 z-50 bg-white shadow-md'}>
      <div className="container flex items-center justify-between h-20 px-4 mx-auto">
        <Link href={'/'} className={'text-red-800 text-4xl italic font-bold'}>
          Shopping Web
        </Link>
        <div className={'flex gap-24'}>
          <Link href={'/'}>Trang chủ</Link>
          <Link href={'/products'} className={'ml-auto'}>
            Sản phẩm
          </Link>
          <Link href={'/about'} className={'ml-auto'}>
            Giới thiệu
          </Link>
        </div>
        <div className={'flex items-center gap-5'}>
          <HeaderDropdownMenu />
          <HeaderShoppingCart />
        </div>
      </div>
    </header>
  );
}
