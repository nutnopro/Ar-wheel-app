import axios from 'axios';
// ⚠️ ตรวจสอบว่าไฟล์ storage.ts ของคุณอยู่ที่ path นี้จริงหรือไม่
// ถ้าไม่มี ให้สร้างไฟล์นี้เพื่อดึง token จาก MMKV หรือ AsyncStorage
import { getToken } from '../utils/storage'; 

const api = axios.create({
  // ✅ Base URL หลัก (ไม่ต้องมี /api หรือ /Auth ต่อท้ายตรงนี้)
  baseURL: 'https://ar-alloy-api.onrender.com', 
  timeout: 60000, // รอสูงสุด 60 วินาที (เผื่อเน็ตช้า)
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Interceptor: แอบยัด Token ใส่กระเป๋า (Header) ไปทุกครั้งก่อนส่ง
api.interceptors.request.use(
  async (config) => {
    try {
      const token = getToken(); // ดึง Token จากเครื่อง
      if (token) {
        // ถ้ามี Token ให้แนบไปใน Header ชื่อ Authorization
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