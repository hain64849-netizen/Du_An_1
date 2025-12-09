// API Configuration
const API_CONFIG = {
    // Base URL của API server
    // Thay đổi địa chỉ này theo địa chỉ server của bạn
    BASE_URL: 'http://localhost:3000/api',
    
    // Hoặc nếu chạy trên mạng local:
    // BASE_URL: 'http://192.168.0.100:3000/api',
    
    // Endpoints
    ENDPOINTS: {
        USERS: '/user',
        ORDERS: '/order',
        PRODUCTS: '/product',
        AUTH: '/auth',
        HEALTH: '/health'
    }
};

// Helper function để gọi API
async function apiCall(endpoint, options = {}) {
    const url = `${API_CONFIG.BASE_URL}${endpoint}`;
    
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    
    const config = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options.headers,
        },
    };
    
    try {
        const response = await fetch(url, config);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Export để sử dụng trong các file khác
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { API_CONFIG, apiCall };
}



