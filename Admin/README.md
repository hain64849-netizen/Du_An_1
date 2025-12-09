# Admin Panel - Hệ thống quản lý Admin

Hệ thống quản lý admin với đầy đủ các chức năng quản lý khách hàng, đơn hàng và người bán.

## 📋 Tính năng

- ✅ Đăng nhập/Đăng xuất admin
- ✅ Dashboard tổng quan hệ thống
- ✅ Quản lý khách hàng
- ✅ Quản lý đơn hàng
- ✅ Quản lý người bán
- ✅ Kết nối với API BanGiay để load dữ liệu từ server
- ✅ Giao diện đẹp, responsive

## 🚀 Cách sử dụng

### 1. Khởi động API Server
Trước tiên, đảm bảo API server BanGiay đang chạy:

```bash
cd ../BanGiay_Api
npm start
```

### 2. Cấu hình API URL (nếu cần)
Mở file `admin.js` và kiểm tra `API_CONFIG.BASE_URL`. Mặc định là `http://localhost:3000/api`.

Nếu API chạy trên máy khác hoặc port khác, thay đổi URL trong `admin.js`.

Xem chi tiết trong file `API_SETUP.md`.

### 3. Mở trang đăng nhập
Mở file `index.html` trong trình duyệt.

### 4. Đăng nhập
Sử dụng thông tin đăng nhập mặc định:
- **Tên đăng nhập:** `admin`
- **Mật khẩu:** `admin123`

### 5. Sử dụng các chức năng
Sau khi đăng nhập, bạn có thể:
- Xem dashboard tổng quan với dữ liệu từ server
- Quản lý khách hàng (load từ API)
- Quản lý đơn hàng (load từ API)
- Quản lý người bán (tính từ sản phẩm)

## 📁 Cấu trúc file

```
Admin/
├── index.html              # Trang đăng nhập
├── dashboard.html          # Trang dashboard
├── manage-customers.html   # Quản lý khách hàng
├── manage-orders.html      # Quản lý đơn hàng
├── manage-sellers.html     # Quản lý người bán
├── admin.js               # Logic xử lý và kết nối API
├── api-config.js          # File cấu hình API (tùy chọn)
├── styles.css             # File CSS
├── LOGIN_INFO.txt         # Thông tin đăng nhập
├── API_SETUP.md           # Hướng dẫn cấu hình API
└── README.md              # File hướng dẫn này
```

## 🔐 Thông tin đăng nhập

Xem file `LOGIN_INFO.txt` để biết thông tin đăng nhập chi tiết.

## ⚙️ Tùy chỉnh

### Thêm tài khoản admin mới
Mở file `admin.js` và thêm vào mảng `ADMIN_ACCOUNTS`:

```javascript
{
    username: 'username',
    password: 'password',
    name: 'Tên hiển thị',
    role: 'admin'
}
```

### Thay đổi dữ liệu mẫu
Chỉnh sửa object `sampleData` trong file `admin.js` để thay đổi dữ liệu hiển thị.

## 🎨 Tùy chỉnh giao diện

Chỉnh sửa file `styles.css` để thay đổi màu sắc, font chữ và layout.

## 📝 Lưu ý

- **Dữ liệu được load từ API server** mỗi khi mở trang
- Đảm bảo API server BanGiay đang chạy để có dữ liệu hiển thị
- Nếu API không khả dụng, trang sẽ hiển thị thông báo lỗi
- Xem file `API_SETUP.md` để biết cách cấu hình kết nối API

## 🔒 Bảo mật

- Mật khẩu hiện tại được lưu dạng plain text (chỉ dùng cho demo)
- Trong môi trường production, cần mã hóa mật khẩu và sử dụng backend server

