# Hướng dẫn Debug - Không load được đơn hàng

## Bước 1: Kiểm tra API Server

1. Mở terminal và chạy:
```bash
cd ../BanGiay_Api
npm start
```

2. Kiểm tra server có chạy không:
- Mở trình duyệt: `http://localhost:3000/health`
- Nếu thấy JSON response với `status: "ok"` → API đang chạy ✅
- Nếu không → API chưa chạy ❌

## Bước 2: Kiểm tra API Endpoint

Mở trình duyệt và truy cập:
```
http://localhost:3000/api/order
```

**Kết quả mong đợi:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "user_id": {...},
      "items": [...],
      "tong_tien": 1500000,
      "trang_thai": "pending",
      ...
    }
  ]
}
```

**Nếu thấy lỗi:**
- `Cannot GET /api/order` → Kiểm tra routes
- `404` → Endpoint không tồn tại
- `500` → Lỗi server, xem console của API server

## Bước 3: Kiểm tra trong Admin Panel

1. Mở `manage-orders.html` trong trình duyệt
2. Mở Developer Tools (F12) → Tab Console
3. Xem logs:
   - `=== BẮT ĐẦU LOAD ORDERS ===`
   - `API Base URL: ...`
   - `Health check result: ...`
   - `Raw API Response: ...`
   - `Found orders: ...`

## Bước 4: Các lỗi thường gặp

### Lỗi: "Không thể kết nối API server"
**Nguyên nhân:** API server chưa chạy hoặc URL sai
**Giải pháp:**
- Kiểm tra API server có chạy không
- Kiểm tra `API_CONFIG.BASE_URL` trong `admin.js`
- Thử truy cập `http://localhost:3000/health` trực tiếp

### Lỗi: "CORS policy"
**Nguyên nhân:** CORS chưa được cấu hình
**Giải pháp:**
- Kiểm tra file `server.js` trong BanGiay_Api
- Đảm bảo có: `app.use(cors({ origin: "*" }))`

### Lỗi: "Response không phải JSON"
**Nguyên nhân:** API trả về format khác
**Giải pháp:**
- Xem response trong Network tab (F12)
- Kiểm tra Content-Type header

### Không có lỗi nhưng không hiển thị dữ liệu
**Nguyên nhân:** Database không có dữ liệu hoặc response format khác
**Giải pháp:**
1. Kiểm tra MongoDB có dữ liệu:
   - Mở MongoDB Compass hoặc mongo shell
   - Kiểm tra collection `orders` có documents không
2. Xem response trong Console:
   - Tìm `Raw API Response:`
   - Kiểm tra format có đúng `{ success: true, data: [...] }` không

## Bước 5: Test trực tiếp

Mở file `test-orders-api.html` trong trình duyệt để test tự động.

## Kiểm tra nhanh

1. ✅ API server đang chạy? → `http://localhost:3000/health`
2. ✅ API endpoint hoạt động? → `http://localhost:3000/api/order`
3. ✅ Có dữ liệu trong MongoDB? → Kiểm tra database
4. ✅ Console có lỗi? → Mở F12 → Console
5. ✅ Network request thành công? → F12 → Network → Xem request `/api/order`

## Liên hệ

Nếu vẫn không được, cung cấp:
1. Screenshot Console (F12)
2. Screenshot Network tab
3. Response từ `http://localhost:3000/api/order`

