import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Imports
import LoginScreen from '../screens/auth/LoginScreen'; 
import RegisterScreen from '../screens/auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import { HomeScreen, ProfileScreen, ArScreen } from '../screens/user/MyTabs';

// --- 1. เพิ่มส่วนนี้: กำหนด Type ของ Route ให้ชัดเจน ---
export type RootStackParamList = {
  SignIn: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  MainApp: undefined; // เรียก MainApp แล้วมันจะไปโผล่หน้าแรกของ Tab (คือ Home) เอง
};

const Stack = createNativeStackNavigator<RootStackParamList>(); // ใส่ Type ตรงนี้
const Tab = createBottomTabNavigator();

const COLORS = { 
  primary: '#2563EB',
  white: '#FFFFFF', 
  gray: '#64748B',
  activeText: '#2563EB',
  tabBarBg: '#EFF6FF'
};

// ... (ส่วนของ MainTabNavigator และ styles เหมือนเดิม ไม่ต้องแก้) ...
// ผมขอละส่วน MainTabNavigator ไว้เพื่อความสั้นนะครับ ให้ใช้โค้ดเดิมที่คุณส่งมาได้เลย

function MainTabNavigator() {
  // ... ใช้โค้ดเดิมส่วน Tab ...
   return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBarContainer, 
        }}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.iconContainer}>
                <Icon name={focused ? "home" : "home-outline"} size={30} color={focused ? COLORS.primary : COLORS.gray} />
                <Text style={[styles.label, { color: focused ? COLORS.activeText : COLORS.gray }]}>Home</Text>
              </View>
            ),
          }} 
        />
        <Tab.Screen 
          name="AR" 
          component={ArScreen} 
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.arWrapper}>
                <View style={styles.diamondShape}>
                   <View style={{ transform: [{ rotate: '-45deg' }] }}>
                      <Icon name="cube-scan" size={32} color="white" />
                   </View>
                </View>
                <Text style={[styles.label, { color: COLORS.primary, marginTop: 45, fontWeight: 'bold' }]}>AR</Text>
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
                <Icon name={focused ? "account" : "account-outline"} size={30} color={focused ? COLORS.primary : COLORS.gray} />
                <Text style={[styles.label, { color: focused ? COLORS.activeText : COLORS.gray }]}>Profile</Text>
              </View>
            ),
          }} 
        />
      </Tab.Navigator>
    </View>
  );
}

// ... styles เหมือนเดิม ...
const styles = StyleSheet.create({
  // ... ก๊อปปี้ styles เดิมมาใส่ ...
  tabBarContainer: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    height: 80,
    backgroundColor: COLORS.tabBarBg, 
    borderRadius: 40,
    borderTopWidth: 0,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  iconContainer: { alignItems: 'center', justifyContent: 'center', height: '100%', top: 5 },
  label: { fontSize: 12, fontWeight: '600', marginTop: 4, textAlign: 'center' },
  arWrapper: { alignItems: 'center', justifyContent: 'center', top: -25, height: 100, width: 80 },
  diamondShape: {
    width: 60, height: 60, backgroundColor: COLORS.primary, borderRadius: 15,
    justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0,
    transform: [{ rotate: '45deg' }],
    shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4, shadowRadius: 6, elevation: 8, borderWidth: 4, borderColor: COLORS.white, 
  },
});

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* ตรงนี้ชื่อต้องตรงกับที่ export type */}
        <Stack.Screen name="SignIn" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="MainApp" component={MainTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}