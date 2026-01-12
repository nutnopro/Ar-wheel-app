import React, { createContext, useState, useContext } from 'react';
import { Alert } from 'react-native';

export type UserRole = 'visitor' | 'user' | 'admin' | null;

interface AuthContextType {
  userRole: UserRole;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  loginAsVisitor: () => Promise<void>; // [UPDATED] เปลี่ยนเป็น Promise
  logout: () => void;
  userData: any | null;
  updateProfile: (newData: any) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userData, setUserData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // ฟังก์ชัน Login ปกติ (สำหรับ User/Admin)
  const login = async (email: string, pass: string) => {
    setIsLoading(true);
    setTimeout(() => {
      // Mock Login Validation
      if (email === 'user@test.com' && pass === '123456') {
        setUserRole('user');
        setUserData({ 
          name: 'Alex Sander', 
          email: 'user@test.com', 
          phone: '+66 81 234 5678',
          avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop' 
        });
      } else if (email === 'admin@test.com' && pass === '123456') {
        setUserRole('admin'); 
        setUserData({ name: 'Admin User', email: 'admin@test.com' });
      } else {
        Alert.alert('Login Failed', 'Invalid email or password');
      }
      setIsLoading(false);
    }, 1000);
  };

  // [UPDATED] ฟังก์ชันสำหรับ Visitor (แยกออกมาและทำเป็น Async)
  const loginAsVisitor = async () => {
    setIsLoading(true);
    // จำลองการโหลดเล็กน้อยเพื่อให้ UX ดูลื่นไหล
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setUserRole('visitor');
        setUserData(null); // Visitor ไม่มีข้อมูลส่วนตัว
        setIsLoading(false);
        resolve();
      }, 500); 
    });
  };

  const logout = () => {
    setUserRole(null);
    setUserData(null);
  };

  // ฟังก์ชันอัปเดตข้อมูล User
  const updateProfile = (newData: any) => {
    setUserData((prev: any) => ({ ...prev, ...newData }));
  };

  return (
    <AuthContext.Provider value={{ userRole, isLoading, login, loginAsVisitor, logout, userData, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);