import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // 1. Import Icon
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator'; // Import Type

import CustomInput from '../../components/CustomInput';
import { COLORS } from '../../constants/colors';

// กำหนด Type ให้ Navigation เพื่อความถูกต้อง
type RegisterScreenProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

const RegisterScreen = () => {
  const navigation = useNavigation<RegisterScreenProp>();
  const [showPassword, setShowPassword] = useState(false);
  const { control, handleSubmit } = useForm();

  const onRegisterPressed = (data: any) => {
    console.log('Register Data:', data);
    // TODO: Send data to Backend
    // ข้อมูล: username, password, email, phone, dob 
    
    // 2. แก้จาก 'Login' เป็น 'SignIn' ให้ตรงกับ AppNavigator
    navigation.navigate('SignIn');
  };

  const onSignInPressed = () => {
    // 3. แก้จาก 'Login' เป็น 'SignIn'
    navigation.navigate('SignIn');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        
        {/* --- ส่วนปุ่ม Back (เพิ่มใหม่) --- */}
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()} // สั่งให้ย้อนกลับไปหน้าก่อนหน้า
        >
          <Icon name="chevron-left" size={40} color={COLORS.primary} />
        </TouchableOpacity>
        {/* ----------------------------- */}

        <Text style={styles.title}>New Account</Text>

        <CustomInput
          name="username"
          label="Username"
          placeholder="Username"
          control={control}
          rules={{ required: 'Username is required' }}
        />

        <CustomInput
          name="password"
          label="Password"
          placeholder="Password"
          control={control}
          secureTextEntry={!showPassword}
          rightIcon={showPassword ? 'eye-off' : 'eye'}
          onRightIconPress={() => setShowPassword(!showPassword)}
          rules={{ 
            required: 'Password is required',
            minLength: { value: 6, message: 'Password must be at least 6 characters' }
          }}
        />

        <CustomInput
          name="email"
          label="Email"
          placeholder="Email"
          control={control}
          rules={{ 
            required: 'Email is required',
            pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email format' }
          }}
        />

        <CustomInput
          name="phoneNumber"
          label="Phone Number"
          placeholder="Phone Number"
          control={control}
          rules={{ required: 'Phone Number is required' }}
        />

        <CustomInput
          name="dob"
          label="Date Of Birth"
          placeholder="DD / MM / YYYY"
          control={control}
          rules={{ 
            required: 'Date of Birth is required',
            pattern: { value: /^\d{2}\/\d{2}\/\d{4}$/, message: 'Format: DD/MM/YYYY' }
          }}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit(onRegisterPressed)}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={onSignInPressed}>
            <Text style={styles.linkText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, backgroundColor: COLORS.white },
  container: { flex: 1, padding: 24, paddingTop: 20 }, // ปรับ paddingTop ลดลงนิดหน่อยเพราะมีปุ่ม Back แล้ว
  
  // Style สำหรับปุ่ม Back
  backButton: {
    alignSelf: 'flex-start', // ชิดซ้าย
    marginLeft: -10,         // ขยับซ้ายให้พอดีขอบ
    marginBottom: 10,        // เว้นระยะห่างจาก Title
  },
  
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: COLORS.primary, 
    textAlign: 'center', 
    marginBottom: 30 
  },
  button: { backgroundColor: COLORS.primary, padding: 15, borderRadius: 30, alignItems: 'center', marginTop: 10, marginBottom: 20 },
  buttonText: { color: COLORS.white, fontWeight: 'bold', fontSize: 16 },
  footer: { flexDirection: 'row', justifyContent: 'center' },
  footerText: { color: '#888', fontSize: 12 },
  linkText: { color: COLORS.primary, fontWeight: 'bold', fontSize: 12 },
});

export default RegisterScreen;