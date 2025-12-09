// Script để tạo đơn hàng mẫu
// Chạy: node create-sample-orders.js

const mongoose = require('mongoose');
require('dotenv').config();

// Kết nối MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/your-database-name');
        console.log('✅ Đã kết nối MongoDB');
    } catch (error) {
        console.error('❌ Lỗi kết nối MongoDB:', error.message);
        process.exit(1);
    }
};

// Tạo đơn hàng mẫu
async function createSampleOrders() {
    try {
        const Order = require('../BanGiay_Api/models/Order');
        const User = require('../BanGiay_Api/models/User');
        const Product = require('../BanGiay_Api/models/Product');
        
        // Kiểm tra có user không
        const users = await User.find().limit(1);
        if (users.length === 0) {
            console.log('❌ Không có user nào! Vui lòng tạo user trước.');
            return;
        }
        
        const user = users[0];
        console.log(`✅ Sử dụng user: ${user.ho_ten || user.email}`);
        
        // Kiểm tra có sản phẩm không
        const products = await Product.find().limit(2);
        if (products.length === 0) {
            console.log('❌ Không có sản phẩm nào! Vui lòng tạo sản phẩm trước.');
            return;
        }
        
        console.log(`✅ Tìm thấy ${products.length} sản phẩm`);
        
        // Tạo đơn hàng mẫu
        const sampleOrders = [
            {
                user_id: user._id,
                items: [
                    {
                        san_pham_id: products[0]._id,
                        ten_san_pham: products[0].ten_san_pham,
                        so_luong: 2,
                        kich_thuoc: '40',
                        gia: products[0].gia_khuyen_mai || products[0].gia_goc
                    }
                ],
                tong_tien: (products[0].gia_khuyen_mai || products[0].gia_goc) * 2,
                trang_thai: 'pending',
                dia_chi_giao_hang: '123 Đường ABC, Quận 1, TP.HCM',
                so_dien_thoai: '0123456789'
            },
            {
                user_id: user._id,
                items: [
                    {
                        san_pham_id: products[0]._id,
                        ten_san_pham: products[0].ten_san_pham,
                        so_luong: 1,
                        kich_thuoc: '39',
                        gia: products[0].gia_khuyen_mai || products[0].gia_goc
                    },
                    ...(products.length > 1 ? [{
                        san_pham_id: products[1]._id,
                        ten_san_pham: products[1].ten_san_pham,
                        so_luong: 1,
                        kich_thuoc: '41',
                        gia: products[1].gia_khuyen_mai || products[1].gia_goc
                    }] : [])
                ],
                tong_tien: (products[0].gia_khuyen_mai || products[0].gia_goc) + 
                          (products.length > 1 ? (products[1].gia_khuyen_mai || products[1].gia_goc) : 0),
                trang_thai: 'confirmed',
                dia_chi_giao_hang: '456 Đường XYZ, Quận 2, TP.HCM',
                so_dien_thoai: '0987654321'
            }
        ];
        
        // Xóa đơn hàng cũ nếu có (tùy chọn)
        // await Order.deleteMany({});
        
        // Tạo đơn hàng mới
        const createdOrders = await Order.insertMany(sampleOrders);
        console.log(`\n✅ Đã tạo ${createdOrders.length} đơn hàng mẫu:`);
        createdOrders.forEach((order, index) => {
            console.log(`   ${index + 1}. Order ID: ${order._id}`);
            console.log(`      Tổng tiền: ${order.tong_tien.toLocaleString('vi-VN')} VND`);
            console.log(`      Trạng thái: ${order.trang_thai}`);
        });
        
        console.log('\n🎉 Hoàn thành! Bây giờ refresh trang manage-orders.html để xem dữ liệu.');
        
    } catch (error) {
        console.error('❌ Lỗi:', error);
    } finally {
        mongoose.connection.close();
    }
}

// Chạy
(async () => {
    await connectDB();
    await createSampleOrders();
})();


