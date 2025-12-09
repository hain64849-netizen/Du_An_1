# Hướng dẫn Fix - Không hiển thị đơn hàng

## Vấn đề
API hoạt động tốt (200 OK) nhưng không có dữ liệu hiển thị vì database trống.

## Giải pháp

### Bước 1: Kiểm tra dữ liệu trong MongoDB

**Cách 1: Dùng script (Khuyến nghị)**
```bash
cd ../BanGiay_Api
node ../Admin/check-orders-db.js
```

**Cách 2: Dùng MongoDB Compass hoặc mongo shell**
1. Mở MongoDB Compass
2. Kết nối database
3. Tìm collection `orders`
4. Xem có documents không

### Bước 2: Tạo dữ liệu mẫu (Nếu database trống)

**Yêu cầu:**
- Phải có ít nhất 1 user trong database
- Phải có ít nhất 1 sản phẩm trong database

**Chạy script:**
```bash
cd ../BanGiay_Api
node ../Admin/create-sample-orders.js
```

### Bước 3: Kiểm tra lại

1. Refresh trang `manage-orders.html`
2. Mở Console (F12) và xem:
   - `Found orders in data array: X` (X > 0)
3. Đơn hàng sẽ hiển thị trong bảng

## Kiểm tra nhanh

### 1. Kiểm tra API trực tiếp
Mở trình duyệt: `http://localhost:3000/api/order`

**Nếu thấy:**
```json
{
  "success": true,
  "data": []
}
```
→ Database trống, cần tạo dữ liệu

**Nếu thấy:**
```json
{
  "success": true,
  "data": [
    { "_id": "...", "user_id": "...", ... }
  ]
}
```
→ Có dữ liệu, kiểm tra code frontend

### 2. Kiểm tra trong Console
Khi mở `manage-orders.html`, xem Console:
- `Found orders in data array: 0` → Database trống
- `Found orders in data array: X` (X > 0) → Có dữ liệu, nhưng không hiển thị → Lỗi code

## Tạo dữ liệu thủ công

Nếu muốn tạo đơn hàng thủ công qua API:

**POST** `http://localhost:3000/api/order`
```json
{
  "user_id": "USER_ID_HERE",
  "items": [
    {
      "san_pham_id": "PRODUCT_ID_HERE",
      "ten_san_pham": "Tên sản phẩm",
      "so_luong": 1,
      "kich_thuoc": "40",
      "gia": 1500000
    }
  ],
  "tong_tien": 1500000,
  "trang_thai": "pending",
  "dia_chi_giao_hang": "123 Đường ABC",
  "so_dien_thoai": "0123456789"
}
```

## Lưu ý

1. **Đảm bảo có user và product trước khi tạo order**
2. **user_id và san_pham_id phải là ObjectId hợp lệ**
3. **Sau khi tạo, refresh trang để xem**

## Debug

Nếu vẫn không hiển thị sau khi có dữ liệu:

1. Mở Console (F12)
2. Xem `Raw API Response:` 
3. Kiểm tra structure có đúng không
4. Xem `Transformed orders:` có dữ liệu không


