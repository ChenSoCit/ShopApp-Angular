# 🚀 Hướng Dẫn Chạy Ứng Dụng Angular - Shop App

## 📋 Mục Lục
1. [Yêu Cầu Hệ Thống](#yêu-cầu-hệ-thống)
2. [Cài Đặt](#cài-đặt)
3. [Chạy Ứng Dụng](#chạy-ứng-dụng)
4. [Sử Dụng Màn Hình Đăng Nhập](#sử-dụng-màn-hình-đăng-nhập)
5. [Cấu Trúc Dự Án](#cấu-trúc-dự-án)

---

## 📌 Yêu Cầu Hệ Thống

Trước khi bắt đầu, đảm bảo bạn đã cài đặt:

- **Node.js**: phiên bản 18.x trở lên
  - Kiểm tra: `node --version`
  - Tải về: https://nodejs.org/

- **npm**: phiên bản 9.x trở lên
  - Kiểm tra: `npm --version`
  - (npm được cài đặt cùng với Node.js)

- **Angular CLI**: (tùy chọn, nhưng được khuyến nghị)
  - Cài đặt global: `npm install -g @angular/cli`
  - Kiểm tra: `ng version`

---

## 🔧 Cài Đặt

### Bước 1: Mở Terminal/PowerShell

Mở terminal hoặc PowerShell tại thư mục dự án:
```bash
cd d:\Prject_JAVA_Spring\shopapp-angular
```

### Bước 2: Cài Đặt Dependencies

Chạy lệnh sau để cài đặt tất cả các package cần thiết:

```bash
npm install
```

**Lưu ý**: Quá trình này có thể mất vài phút tùy thuộc vào tốc độ internet của bạn.

---

## ▶️ Chạy Ứng Dụng

### Cách 1: Sử Dụng npm script (Khuyến nghị)

```bash
npm start
```

### Cách 2: Sử Dụng Angular CLI

```bash
ng serve
```

### Cách 3: Chạy với cổng tùy chỉnh

```bash
ng serve --port 4300
```

### Cách 4: Chạy và tự động mở trình duyệt

```bash
ng serve --open
```

hoặc

```bash
npm start -- --open
```

---

## 🌐 Truy Cập Ứng Dụng

Sau khi chạy thành công, bạn sẽ thấy thông báo:

```
** Angular Live Development Server is listening on localhost:4200 **
```

**Mở trình duyệt** và truy cập:
- **URL**: http://localhost:4200

Ứng dụng sẽ tự động chuyển hướng đến trang đăng nhập.

---

## 🔐 Sử Dụng Màn Hình Đăng Nhập

### Thông Tin Đăng Nhập Demo

Sử dụng thông tin sau để đăng nhập:

```
Email: admin@example.com
Mật khẩu: admin123
```

### Các Tính Năng

1. **Đăng Nhập**
   - Nhập email và mật khẩu
   - Click nút "Đăng nhập"
   - Hệ thống sẽ xác thực thông tin
   - Nếu đúng, chuyển hướng đến trang Home

2. **Validation**
   - Kiểm tra email và mật khẩu không được để trống
   - Hiển thị thông báo lỗi nếu thông tin không hợp lệ
   - Loading spinner khi đang xử lý

3. **Trang Home**
   - Hiển thị thông tin người dùng đã đăng nhập
   - Có nút "Đăng xuất" để thoát khỏi phiên làm việc

4. **Lưu Trạng Thái**
   - Thông tin đăng nhập được lưu trong localStorage
   - Người dùng không cần đăng nhập lại khi refresh trang

---

## 📁 Cấu Trúc Dự Án

```
shopapp-angular/
├── src/
│   ├── app/
│   │   ├── login/                    # Component đăng nhập
│   │   │   ├── login.component.ts
│   │   │   ├── login.component.html
│   │   │   └── login.component.scss
│   │   ├── home/                     # Component trang chủ
│   │   │   ├── home.component.ts
│   │   │   ├── home.component.html
│   │   │   └── home.component.scss
│   │   ├── services/                 # Services
│   │   │   └── auth.service.ts      # Service xác thực
│   │   ├── app.routes.ts            # Cấu hình routing
│   │   ├── app.ts                   # Root component
│   │   ├── app.html
│   │   └── app.scss
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
├── package.json
├── angular.json
└── tsconfig.json
```

---

## 🛠️ Các Lệnh Hữu Ích

### Build ứng dụng cho production
```bash
npm run build
```

### Chạy tests
```bash
npm test
```

### Build và watch (development)
```bash
npm run watch
```

### Kiểm tra lỗi TypeScript
```bash
ng lint
```

---

## 🐛 Xử Lý Lỗi Thường Gặp

### Lỗi: "localStorage is not defined" (SSR Error)

**Nguyên nhân**: Lỗi này xảy ra khi sử dụng `localStorage` trong môi trường Server-Side Rendering (SSR), vì `localStorage` chỉ tồn tại trên trình duyệt.

**Giải pháp**: Đã được fix trong `auth.service.ts` bằng cách:
```typescript
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';

// Trong service:
private platformId = inject(PLATFORM_ID);
private isBrowser = isPlatformBrowser(this.platformId);

// Kiểm tra trước khi sử dụng localStorage:
if (this.isBrowser) {
  localStorage.setItem('key', 'value');
}
```

### Lỗi: "Port 4200 is already in use"

**Giải pháp**:
```bash
# Dừng process đang chạy trên port 4200
# Hoặc chạy trên port khác:
ng serve --port 4300
```

### Lỗi: "Cannot find module"

**Giải pháp**:
```bash
# Xóa node_modules và cài đặt lại
rm -rf node_modules
npm install
```

### Lỗi: "ng: command not found"

**Giải pháp**:
```bash
# Cài đặt Angular CLI global
npm install -g @angular/cli
```

Hoặc sử dụng npm scripts thay vì `ng`:
```bash
npm start   # thay vì ng serve
npm run build  # thay vì ng build
```

---

## 📚 Tài Liệu Tham Khảo

- [Angular Documentation](https://angular.dev/)
- [Angular Router](https://angular.dev/guide/routing)
- [Angular Forms](https://angular.dev/guide/forms)

---

## 🎉 Hoàn Thành!

Bây giờ bạn đã có một ứng dụng Angular với màn hình đăng nhập hoàn chỉnh!

**Các bước tiếp theo có thể làm:**
1. ✅ Kết nối với API backend thực
2. ✅ Thêm chức năng đăng ký
3. ✅ Thêm chức năng quên mật khẩu
4. ✅ Thêm Guard để bảo vệ routes
5. ✅ Thêm interceptor để xử lý token
6. ✅ Thêm các trang quản lý sản phẩm

---

## 💡 Tips

- Sử dụng **Chrome DevTools** để debug (F12)
- Kiểm tra **Console** để xem lỗi JavaScript
- Kiểm tra **Network tab** để xem API calls
- Sử dụng **Angular DevTools** extension để debug Angular app

---

**Chúc bạn code vui vẻ! 🚀**
