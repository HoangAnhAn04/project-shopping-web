import { RxHamburgerMenu } from 'react-icons/rx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
export default function HeaderDropdownMenu() {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <RxHamburgerMenu className={'w-8 h-8 cursor-pointer'} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className={'-translate-x-22'}>
          <div className={'lg:hidden'}>
            <DropdownMenuLabel>SẢN PHẨM</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </div>

          <DropdownMenuLabel>BỘ SƯU TẬP</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Áo chống đạn</DropdownMenuItem>
          <DropdownMenuItem>Giày chiến đấu</DropdownMenuItem>
          <DropdownMenuItem>Găng tay bảo hộ</DropdownMenuItem>
          <DropdownMenuItem>Thắt lưng chiến thuật</DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuLabel>PHỤ KIỆN</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>các sản phẩm khác</DropdownMenuItem>
          <DropdownMenuItem>mũ bảo hiểm</DropdownMenuItem>
          <DropdownMenuItem>kính bảo hộ</DropdownMenuItem>
          <DropdownMenuItem>tai nghe chống ồn</DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuLabel>PHỤ KIỆN CUSTOM LIMITED</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>custom phiên bản giới hạn</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
