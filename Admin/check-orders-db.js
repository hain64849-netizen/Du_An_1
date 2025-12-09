// Script để kiểm tra đơn hàng trong MongoDB
// Chạy: node check-orders-db.js

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

// Kiểm tra đơn hàng
async function checkOrders() {
    try {
        const Order = require('../BanGiay_Api/models/Order');
        const User = require('../BanGiay_Api/models/User');
        
        // Đếm tổng số đơn hàng
        const totalOrders = await Order.countDocuments();
        console.log(`\n📊 Tổng số đơn hàng trong database: ${totalOrders}`);
        
        if (totalOrders === 0) {
            console.log('\n⚠️  Không có đơn hàng nào trong database!');
            console.log('\n💡 Bạn có muốn tạo đơn hàng mẫu không?');
            console.log('   Chạy: node create-sample-orders.js');
        } else {
            // Lấy một vài đơn hàng mẫu
            const sampleOrders = await Order.find().limit(3).populate('user_id', 'ho_ten email');
            console.log('\n📦 Mẫu đơn hàng:');
            sampleOrders.forEach((order, index) => {
                console.log(`\n${index + 1}. Order ID: ${order._id}`);
                console.log(`   User: ${order.user_id?.ho_ten || order.user_id || 'N/A'}`);
                console.log(`   Tổng tiền: ${order.tong_tien?.toLocaleString('vi-VN')} VND`);
                console.log(`   Trạng thái: ${order.trang_thai}`);
                console.log(`   Số items: ${order.items?.length || 0}`);
                console.log(`   Ngày tạo: ${order.createdAt}`);
            });
        }
        
        // Kiểm tra users
        const totalUsers = await User.countDocuments();
        console.log(`\n👥 Tổng số users: ${totalUsers}`);
        
        if (totalUsers === 0) {
            console.log('⚠️  Không có user nào! Cần có user để tạo đơn hàng.');
        }
        
    } catch (error) {
        console.error('❌ Lỗi:', error);
    } finally {
        mongoose.connection.close();
    }
}

// Chạy
(async () => {
    await connectDB();
    await checkOrders();
})();

