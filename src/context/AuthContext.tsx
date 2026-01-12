import React, { createContext, useState, useContext } from 'react';
import { Alert } from 'react-native';

// 1. กำหนด Role ให้ครบ (รวม visitor) เพื่อไม่ให้ error type mismatch
export type UserRole = 'visitor' | 'user' | 'admin' | null;

// 2. กำหนด Type ให้ครบตามที่หน้า Profile/EditProfile ต้องการ
interface AuthContextType {
  userRole: UserRole;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  loginAsVisitor: () => void;
  logout: () => void;
  userData: any | null;             // จำเป็นสำหรับหน้า Profile
  updateProfile: (newData: any) => void; // จำเป็นสำหรับหน้า EditProfile
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userData, setUserData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // ฟังก์ชัน Login ที่รองรับ Admin
  const login = async (email: string, pass: string) => {
    setIsLoading(true);
    
    // Simulate API Call
    setTimeout(() => {
      // --- LOGIC การแยก USER / ADMIN ---
      if (email.toLowerCase() === 'admin@test.com' && pass === '123456') {
        setUserRole('admin');
        setUserData({ 
            name: 'Admin User', 
            email: 'admin@test.com',
            role: 'Administrator'
        });
      } else if (email.toLowerCase() === 'user@test.com' && pass === '123456') {
        setUserRole('user');
        setUserData({ 
          name: 'Alex Sander', 
          email: 'user@test.com', 
          phone: '+66 81 234 5678',
          avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop' 
        });
      } else {
        Alert.alert('Login Failed', 'Invalid email or password');
      }
      setIsLoading(false);
    }, 1000);
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
    setUserRole(null);
    setUserData(null);
  };

  // ฟังก์ชันอัปเดตข้อมูล (เพื่อให้หน้า EditProfile ไม่ error)
  const updateProfile = (newData: any) => {
    setUserData((prev: any) => ({ ...prev, ...newData }));
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