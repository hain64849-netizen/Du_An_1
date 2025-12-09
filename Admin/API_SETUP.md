# Hướng dẫn kết nối với API BanGiay

## Cấu hình API Base URL

Hệ thống admin đã được kết nối với API BanGiay. Để sử dụng, bạn cần cấu hình địa chỉ API server.

### Cách 1: Sửa trong file `admin.js`

Mở file `admin.js` và tìm dòng:

```javascript
const API_CONFIG = {
    BASE_URL: 'http://localhost:3000/api',
    // Hoặc nếu chạy trên mạng local, thay bằng IP của máy chạy server:
    // BASE_URL: 'http://192.168.0.100:3000/api',
};
```

Thay đổi `BASE_URL` theo địa chỉ server của bạn:

- **Nếu API chạy trên cùng máy:** `http://localhost:3000/api`
- **Nếu API chạy trên mạng local:** `http://[IP_ADDRESS]:3000/api`
  - Ví dụ: `http://192.168.0.100:3000/api`
  - Để tìm IP của máy chạy server, chạy lệnh `ipconfig` (Windows) hoặc `ifconfig` (Linux/Mac)

### Cách 2: Sử dụng file `api-config.js` (nếu muốn tách riêng)

File `api-config.js` đã được tạo sẵn nhưng chưa được sử dụng. Bạn có thể import nó vào `admin.js` nếu muốn.

## Khởi động API Server

Trước khi sử dụng admin panel, đảm bảo API server đang chạy:

```bash
cd ../BanGiay_Api
npm start
```

Server sẽ chạy tại `http://localhost:3000` (hoặc port khác nếu đã cấu hình).

## Kiểm tra kết nối

1. Mở trình duyệt và truy cập: `http://localhost:3000/health`
2. Nếu thấy response JSON với `status: "ok"`, API đang chạy tốt
3. Nếu không kết nối được, kiểm tra:
   - API server có đang chạy không
   - Port có đúng không (mặc định là 3000)
   - Firewall có chặn không
   - Địa chỉ IP có đúng không (nếu dùng mạng local)

## Các API Endpoints được sử dụng

- `GET /api/user` - Lấy danh sách khách hàng
- `GET /api/order` - Lấy danh sách đơn hàng (tất cả, không cần user_id)
- `GET /api/product` - Lấy danh sách sản phẩm (để tính sellers)

## Xử lý lỗi

Nếu gặp lỗi khi tải dữ liệu:

1. **Lỗi CORS:** API đã được cấu hình CORS để cho phép tất cả origins
2. **Lỗi kết nối:** Kiểm tra API server có đang chạy không
3. **Lỗi 404:** Kiểm tra BASE_URL có đúng không
4. **Dữ liệu trống:** Kiểm tra database có dữ liệu không

## Ghi chú

- Dữ liệu được load từ server mỗi khi mở trang
- Nếu API không khả dụng, trang sẽ hiển thị thông báo lỗi
- Đảm bảo API server và database đang hoạt động để có dữ liệu hiển thị


