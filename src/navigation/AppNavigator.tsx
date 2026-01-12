import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Import Providers
import { ThemeProvider, useTheme } from '../context/ThemeContext'; // [UPDATED] import useTheme
import { AuthProvider, useAuth } from '../context/AuthContext';
import { LanguageProvider, useLanguage } from '../context/LanguageContext'; // [NEW]

// Imports Screens
import SplashScreen from '../screens/common/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen'; 
import RegisterScreen from '../screens/auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import HomeScreen from '../screens/user/HomeScreen'; 
import ProductDetailScreen from '../screens/user/ProductDetailScreen';
import ArScreen from '../screens/user/ArScreen'; 
import ProfileScreen from '../screens/user/ProfileScreen'; 
import FavoritesScreen from '../screens/user/FavoritesScreen';
import EditProfileScreen from '../screens/user/EditProfileScreen';
import ChangePasswordScreen from '../screens/user/ChangePasswordScreen';
import LanguageScreen from '../screens/user/LanguageScreen'; // [NEW]

// Placeholder
const PlaceholderScreen = ({ route }: any) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>{route.name}</Text>
  </View>
);

export type RootStackParamList = {
  Splash: undefined;
  SignIn: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  MainApp: undefined;
  ProductDetail: { item: any };
  Favorites: undefined;       
  EditProfile: undefined;
  ChangePassword: undefined; 
  Language: undefined;       
  ARPreferences: undefined;  
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

// [UPDATED] MainTabNavigator ต้องใช้ Hooks (useTheme, useLanguage) เพื่อเปลี่ยนสีและภาษา
function MainTabNavigator() {
  const { theme } = useTheme(); // ดึง Theme ปัจจุบัน
  const { t } = useLanguage();  // ดึงคำแปลปัจจุบัน

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        // ปรับสีพื้นหลัง Tab Bar ตาม Theme
        tabBarStyle: [styles.tabBarContainer, { backgroundColor: theme.card, shadowColor: theme.text }], 
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Icon name={focused ? "home" : "home-outline"} size={28} color={focused ? theme.icon : theme.subText} />
              <Text style={[styles.label, { color: focused ? theme.icon : theme.subText }]}>{t.tab_home}</Text>
            </View>
          ),
        }} 
      />
      
      <Tab.Screen 
        name="AR" 
        component={ArScreen} 
        options={{
          tabBarStyle: { display: 'none' },
          tabBarIcon: ({ focused }) => (
            <View style={styles.arButtonWrapper}>
               <View style={styles.diamondShape}>
                   <View style={{ transform: [{ rotate: '-45deg' }] }}>
                      <Icon name="cube-scan" size={30} color="white" />
                   </View>
               </View>
               <Text style={styles.arLabel}>{t.tab_ar}</Text>
            </View>
          ),
        }} 
      />
      
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
             <View style={styles.iconContainer}>
                <Icon name={focused ? "account" : "account-outline"} size={28} color={focused ? theme.icon : theme.subText} />
                <Text style={[styles.label, { color: focused ? theme.icon : theme.subText }]}>{t.tab_profile}</Text>
              </View>
            ),
        }} 
      />
    </Tab.Navigator>
  );
}

// Navigation Wrapper
const AppNavigationWrapper = () => {
  const { userRole } = useAuth();
  const { t } = useLanguage(); // ดึงคำแปลมาใช้กับ Header Title

  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      {userRole === null ? (
        <>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="SignIn" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="MainApp" component={MainTabNavigator} />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
          
          {/* อัปเดต Title ให้เปลี่ยนภาษาได้ */}
          <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ headerShown: true, title: t.menu_favorites, headerBackTitle: '' }} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: true, title: 'Edit Profile', headerBackTitle: '' }} />
          <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ headerShown: true, title: '', headerBackTitle: '', headerShadowVisible: false, headerStyle: { backgroundColor: 'transparent' } }} />
          
          <Stack.Screen name="Language" component={LanguageScreen} options={{ headerShown: true, title: t.menu_language, headerBackTitle: '' }} />
          <Stack.Screen name="ARPreferences" component={PlaceholderScreen} options={{ headerShown: true, title: t.menu_ar_pref, headerBackTitle: '' }} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default function AppNavigator() {
  return (
    <AuthProvider>
      <ThemeProvider>
        {/* [NEW] เพิ่ม LanguageProvider เข้าไปตรงกลาง */}
        <LanguageProvider>
          <NavigationContainer>
             <AppNavigationWrapper />
          </NavigationContainer>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute', bottom: 20, left: 20, right: 20, height: 70, 
    borderRadius: 35, borderTopWidth: 0,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1, shadowRadius: 10, elevation: 5,
  },
  iconContainer: { alignItems: 'center', justifyContent: 'center', top: 0 },
  label: { fontSize: 10, fontWeight: '600', marginTop: 4 },
  arButtonWrapper: { alignItems: 'center', justifyContent: 'center', top: -20 },
  diamondShape: {
    width: 56, height: 56, backgroundColor: '#2563EB', borderRadius: 14,
    justifyContent: 'center', alignItems: 'center', transform: [{ rotate: '45deg' }],
    shadowColor: '#2563EB', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4, shadowRadius: 5, elevation: 8, borderWidth: 3, borderColor: '#FFFFFF', 
  },
  arLabel: { color: '#2563EB', marginTop: 10, fontWeight: 'bold', fontSize: 11 }
});