'use client'; // Component này có click (DropdownMenuTrigger) nên phải là 'use client'

import Link from 'next/link';
import { RxHamburgerMenu } from 'react-icons/rx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// 1. Định nghĩa kiểu 'Category' để TypeScript hiểu dữ liệu
interface Category {
  id: string;
  name: string;
  slug: string; // 'slug' mà bạn đã tạo trong Airtable
}

export default function HeaderDropdownMenu({ categories }: { categories: Category[] }) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="p-2 hover:bg-gray-100 rounded-lg transition-colors group outline-none">
        <RxHamburgerMenu className="w-6 h-6 md:w-7 md:h-7 text-gray-700 group-hover:text-gray-900 transition-colors" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="text-xs font-semibold text-gray-500">
          DANH MỤC
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {categories.map((category) => (
          <DropdownMenuItem key={category.id} asChild>
            <Link href={`/category/${category.slug}`} className="cursor-pointer">
              {category.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
