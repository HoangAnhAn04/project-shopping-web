# 🛒 Shopping Web

## 1. Mở đầu

Đây là dự án website thương mại điện tử mini cho phép xem, tìm kiếm, đặt hàng sản phẩm và nhận email xác nhận.

## 👥 Thông tin chung

**Nhóm thực hiện:**

- An Hoàng Anh
- Nguyễn Công Thành
- Lê Đỗ Gia Vũ

**Giảng viên hướng dẫn:** Đào Thị Lệ Thủy
**Thời gian thực hiện:** Học kỳ 1 - Năm 2025/2026

## 2. Mô tả ngắn gọn

Website xây dựng bằng Next.js, React, TypeScript, sử dụng Airtable làm cơ sở dữ liệu và Resend để gửi email xác nhận đơn hàng. Giao diện hiện đại, tối ưu cho mọi thiết bị.

## 3. Tính năng chính

- Xem danh sách, chi tiết sản phẩm, phân trang, duyệt theo danh mục, sắp xếp
- Tìm kiếm sản phẩm tiếng Việt (có/không dấu, synonym, fuzzy)
- Thêm/xóa/cập nhật giỏ hàng, đặt hàng, nhận email xác nhận
- Validate dữ liệu, xử lý lỗi, tối ưu tốc độ tải trang

## 4. Công nghệ sử dụng

### Frontend

- **Next.js 16** (App Router, API routes, SSR, caching)
- **React 19**
- **TypeScript**
- **Tailwind CSS** (qua @tailwindcss/postcss, tw-animate-css, tailwind-merge)
- **shadcn/ui** (UI components)
- **Radix UI** (`@radix-ui/react-*`)
- **Zustand** (quản lý state giỏ hàng, dùng middleware `immer`, `persist`)
- **immer** (bất biến hóa state)
- **react-hook-form** + **zod** (form validation)
- **lucide-react**, **react-icons** (icons)
- **sonner** (toast notification)
- **next-themes** (theme switcher)
- **class-variance-authority**, **clsx** (quản lý className động)
- **tailwind-merge** (gộp class Tailwind)

### Backend & Database

- **Airtable** (NoSQL cloud database)
- **Resend** (dịch vụ gửi email)
- **Next.js API Routes** (backend endpoints)

### Tooling & Khác

- **ESLint** (cấu hình với `eslint-config-next`)
- **PostCSS** (qua file `postcss.config.mjs`)
- **Google Fonts (Geist, Geist_Mono)**
- **Node.js 18+**
- **npm/yarn/pnpm**

## 5. Hướng dẫn chi tiết cài đặt và chạy dự án

### Bước 1: Chuẩn bị môi trường

- Cài đặt **Node.js** (>= 18)
- Đăng ký tài khoản **Airtable** (tạo base, bảng products, products-variants, orders, orders-products, categories)
- Đăng ký tài khoản **Resend** (lấy API key)
- (Khuyến nghị) Đăng ký tài khoản **Vercel** để deploy nhanh

### Bước 2: Clone mã nguồn

Mở terminal trong thư mục bạn muốn lưu project, chạy lệnh:

```sh
git clone https://github.com/HoangAnhAn04/project-shopping-web.git
cd project-shopping-web
```

### Bước 3: Cài đặt dependencies

Chạy một trong các lệnh sau để cài đặt toàn bộ dependencies đã được khai báo trong file `package.json`:

```sh
npm install
# hoặc
yarn install
# hoặc
pnpm install
```

**Lưu ý:**

- Không cần cài từng thư viện riêng lẻ, chỉ cần chạy `npm install` là đủ.
- Nếu gặp lỗi thiếu package, kiểm tra lại file `package.json` hoặc chạy lại lệnh cài đặt.

### Bước 4: Tạo file cấu hình môi trường

Tạo file `.env.local` ở thư mục gốc với nội dung mẫu:

```env
AIRTABLE_API_KEY=pat_xxx
AIRTABLE_BASE_ID=app_xxx
AIRTABLE_ORDERS_TABLE_NAME=orders
RESEND_API_KEY=re_xxx
```

> Thay các giá trị bằng thông tin thực tế của bạn (lấy từ Airtable và Resend).

### Bước 5: Chạy chương trình ở chế độ phát triển

```sh
npm run dev
```

Truy cập [http://localhost:3000](http://localhost:3000) để xem website.

### Bước 6: Build và chạy production (tùy chọn)

```sh
npm run build
npm start
```

### Bước 7: Triển khai lên Vercel (khuyến nghị)

- Đăng nhập [vercel.com](https://vercel.com), kết nối repo GitHub, thiết lập biến môi trường trên dashboard Vercel, deploy tự động.
- Có thể cấu hình tên miền riêng nếu muốn.

---
