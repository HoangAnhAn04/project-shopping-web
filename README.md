# XÂY DỰNG WEBSITE BÁN HÀNG TRỰC TUYẾN (SHOPPING WEB)

> **Bài tập lớn môn:** Phát triển Phần mềm Mã nguồn mở  
> **Học kỳ:** 1 - Năm học: 2025-2026

---

## 1. THÔNG TIN CHUNG

| Mục                      | Thông tin                         |
| :----------------------- | :-------------------------------- |
| **Giảng viên hướng dẫn** | TS. Đào Thị Lệ Thủy               |
| **Nhóm thực hiện**       | Nhóm [Số nhóm]                    |
| **Thành viên 1**         | An Hoàng Anh ([Mã SV])            |
| **Thành viên 2**         | Nguyễn Công Thành ([Mã SV])       |
| **Thành viên 3**         | Lê Đỗ Gia Vũ ([Mã SV])            |
| **Link Demo**            | [Dán link Vercel của bạn vào đây] |

---

## 2. GIỚI THIỆU ĐỀ TÀI

### 2.1. Tổng quan

Đây là dự án website thương mại điện tử (E-commerce) tập trung vào trải nghiệm mua sắm nhanh chóng và hiện đại. Dự án áp dụng mô hình **Headless CMS** với Airtable làm cơ sở dữ liệu và Next.js làm nền tảng Frontend/Backend.

### 2.2. Tính năng chính

- **Duyệt sản phẩm:** Xem danh sách, lọc theo danh mục, xem chi tiết, ảnh zoom.
- **Tìm kiếm thông minh (Instant Search):** Tìm kiếm tức thì không cần tải lại trang, hỗ trợ tiếng Việt có dấu/không dấu.
- **Giỏ hàng (Cart):** Thêm/sửa/xóa sản phẩm, tự động tính tổng tiền, lưu trạng thái (persist) để không mất hàng khi tải lại trang.
- **Đặt hàng (Checkout):** Form điền thông tin có validate chặt chẽ, gửi đơn hàng về Database.
- **Thông báo tự động:** Tích hợp API gửi email xác nhận đơn hàng tự động cho khách.

---

## 3. CÔNG NGHỆ SỬ DỤNG

Dự án sử dụng các công nghệ mã nguồn mở mới nhất (Cutting-edge Tech Stack) để đảm bảo hiệu năng và tính mở rộng.

### 3.1. Frontend

- **Next.js 16 (App Router):** Framework React mạnh mẽ nhất hiện nay, hỗ trợ Server-Side Rendering (SSR) và API Routes.
- **React 19:** Thư viện UI cốt lõi với các cải tiến mới nhất về hiệu năng.
- **TypeScript:** Ngôn ngữ lập trình định kiểu tĩnh, giúp code an toàn và dễ bảo trì.
- **Tailwind CSS:** Framework CSS ưu tiên tiện ích (utility-first) giúp thiết kế giao diện nhanh chóng.
- **shadcn/ui & Radix UI:** Hệ thống component giao diện hiện đại, dễ tiếp cận (Accessible) và tùy biến cao.
- **Zustand & Immer:** Quản lý trạng thái giỏ hàng (State Management) hiệu quả và đơn giản.

### 3.2. Backend & Database

- **Airtable:** Sử dụng làm cơ sở dữ liệu đám mây (NoSQL Cloud Database), giúp quản lý sản phẩm/đơn hàng trực quan như Excel.
- **Next.js API Routes:** Đóng vai trò là Backend Endpoints để xử lý logic tìm kiếm và đặt hàng bảo mật.
- **Resend:** Dịch vụ gửi email transaction (xác nhận đơn hàng) chuyên nghiệp.

### 3.3. Thư viện hỗ trợ (Libraries)

- **Form & Validation:** `react-hook-form`, `zod`, `validator`.
- **Tiện ích:** `clsx`, `tailwind-merge`, `class-variance-authority` (xử lý CSS), `sonner` (thông báo Toast).
- **Nội dung:** `marked` (Xử lý mô tả sản phẩm dạng Markdown).
- **Icons:** `lucide-react`, `react-icons`.

---

## 4. HƯỚNG DẪN CÀI ĐẶT VÀ TRIỂN KHAI

### Bước 1: Chuẩn bị môi trường

- Cài đặt **Node.js** (Phiên bản 18 trở lên).
- Tài khoản **Airtable** (đã setup các bảng: `products`, `categories`, `orders`...).
- Tài khoản **Resend** (để lấy API Key gửi mail).

### Bước 2: Clone mã nguồn

```bash
git clone [https://github.com/HoangAnhAn04/project-shopping-web.git](https://github.com/HoangAnhAn04/project-shopping-web.git)
cd project-shopping-web
```
