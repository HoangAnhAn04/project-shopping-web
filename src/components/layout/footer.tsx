import { Pi } from 'lucide-react';
import Link from 'next/link';
import { IoMail, IoMailOutline } from 'react-icons/io5';
import { PiFacebookLogo, PiInstagramLogo, PiPhone, PiYoutubeLogo } from 'react-icons/pi';

export default function Footer() {
  return (
    <footer className={"bg-[#f9f9f9] pt-14 pb-32 bg-[url('/images/footer.png')] bg-bottom-left bg-repeat-x"}>
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 px-4 lg:px-8">
        <div className={'flex flex-col gap-6'}>
          <h4 className={'font-bold text-2xl'}>Thông tin cửa hàng</h4>
          <div className={'flex flex-col gap-4'}>
            <Link href={'#youtube'} className={'flex items-center text-gray-700 gap-3'}>
              <PiYoutubeLogo className={'w-6 h-6'} />
              <span>Kênh Youtube</span>
            </Link>
            <Link href={'#youtube'} className={'flex items-center text-gray-700 gap-3'}>
              <PiPhone className={'w-6 h-6'} />
              <span> 0962920948 </span>
            </Link>
            <Link href={'#youtube'} className={'flex items-center text-gray-700 gap-3'}>
              <IoMailOutline className={'w-6 h-6'} />
              <span>hoanganhan04@gmail.com</span>
            </Link>
          </div>
        </div>
        <div className={'flex flex-col gap-6 lg:items-center'}>
          <h4 className={'font-bold text-2xl'}>Mạng xã hội</h4>
          <div className={'flex items-center gap-3'}>
            <Link href={'https://www.youtube.com/@tructiepgame-official'}>
              <PiYoutubeLogo className={'w-10 h-10'} />
            </Link>
            <Link href={'https://www.facebook.com/anhoanganh1872004'}>
              <PiFacebookLogo className={'w-10 h-10'} />
            </Link>
            <Link href={'https://www.instagram.com/cter_bob_145/'}>
              <PiInstagramLogo className={'w-10 h-10'} />
            </Link>
          </div>
        </div>
        <div className={'flex flex-col gap-6 lg:items-end'}>
          <h4 className={'font-bold text-2xl'}>Hỗ trợ khách hàng</h4>
          <div className={'flex flex-col gap-3 lg:items-end'}>
            <Link href={'/chinh-sach-doi-tra'} className={'text-gray-700 hover:text-gray-900'}>
              Chính sách đổi trả
            </Link>
            <Link href={'/chinh-sach-bao-mat'} className={'text-gray-700 hover:text-gray-900'}>
              Chính sách bảo mật
            </Link>
            <Link href={'/huong-dan-thanh-toan'} className={'text-gray-700 hover:text-gray-900'}>
              Hướng dẫn thanh toán
            </Link>
            <Link href={'/huong-dan-mua-hang'} className={'text-gray-700 hover:text-gray-900'}>
              Hướng dẫn mua hàng
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
