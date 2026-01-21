import React, { createContext, useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import { authService } from '../services/authService'; // เรียก service
import { 
  setToken, getToken, removeToken, 
  setUserData as setStorageUser, getUserData, removeUserData 
} from '../utils/storage'; // เรียก MMKV storage

export type UserRole = 'visitor' | 'user' | 'admin' | null;

interface AuthContextType {
  userRole: UserRole;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  loginAsVisitor: () => void;
  logout: () => void;
  userData: any | null;
  updateProfile: (newData: any) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userData, setUserData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 1. ตรวจสอบ Session เก่าตอนเปิดแอป (Auto Login)
  useEffect(() => {
    const checkLogin = () => {
      const token = getToken();
      const savedUser = getUserData();
      if (token && savedUser) {
        setUserData(savedUser);
        // เช็คว่า backend ส่ง role มาไหม ถ้าไม่มีให้ default เป็น user
        setUserRole(savedUser.role || 'user'); 
      }
    };
    checkLogin();
  }, []);

  // 2. ฟังก์ชัน Login จริง
  const login = async (emailOrUser: string, pass: string) => {
    setIsLoading(true);
    try {
      // เรียก API ผ่าน Service
      const response = await authService.login(emailOrUser, pass);
      
      // สมมติโครงสร้างตามที่คุยกัน { access_token, user }
      const { access_token, user } = response.data;

      if (access_token) {
        // บันทึกลงเครื่อง
        setToken(access_token);
        setStorageUser(user);

        // อัปเดต State
        setUserData(user);
        setUserRole(user.role || 'user'); // ถ้า admin จะได้ role: 'admin'
      } else {
        throw new Error('No access token received');
      }

    } catch (error: any) {
      console.error('Login Error:', error);
      const msg = error.response?.data?.message || 'Invalid email or password';
      Alert.alert('Login Failed', msg);
    } finally {
      setIsLoading(false);
    }
  };

  const loginAsVisitor = () => {
    setIsLoading(true);
    setTimeout(() => {
        setUserRole('visitor');
        setUserData(null);
        setIsLoading(false);
    }, 500);
  };

  const logout = () => {
    // ลบข้อมูลออกจากเครื่องและ State
    removeToken();
    removeUserData();
    setUserRole(null);
    setUserData(null);
  };

  const updateProfile = (newData: any) => {
    setUserData((prev: any) => {
      const updated = { ...prev, ...newData };
      setStorageUser(updated); // อัปเดตลงเครื่องด้วย
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ 
        userRole, 
        isLoading, 
        login, 
        loginAsVisitor, 
        logout, 
        userData, 
        updateProfile 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);