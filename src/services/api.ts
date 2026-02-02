import axios from 'axios';
// ตรวจสอบ path ของ storage ให้ถูกต้อง (ถ้าแดงให้แก้ path ให้ถูก)
import { getToken } from '../utils/storage'; 

const api = axios.create({
  // ✅ ใช้ IP Address ของคุณตรงนี้ครับ
  baseURL: 'http://192.168.0.8:3000', 
  
  timeout: 60000, // 60 วินาที
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: แอบใส่ Token ไปใน Header ทุกครั้ง (ถ้ามี)
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await getToken(); // ใส่ await เผื่อ getToken เป็น async
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error getting token:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;