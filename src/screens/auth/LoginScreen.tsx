import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import CustomInput from '../../components/CustomInput';
import { COLORS } from '../../constants/colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// Import Type ที่เราเพิ่งสร้าง
import { RootStackParamList } from '../../navigation/AppNavigator';

// แก้ Type ตรงนี้ให้เป็น 'SignIn' (ตามชื่อใน Stack)
type LoginScreenProp = NativeStackNavigationProp<RootStackParamList, 'SignIn'>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenProp>();
  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit } = useForm();

  const onSignInPressed = (data: any) => {
    console.log('Login Data:', data);
    
    if (data.username && data.password) {
      // ✅ แก้ไข: เปลี่ยนจาก 'Home' เป็น 'MainApp'
      navigation.replace('MainApp');
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Sign In</Text>

        <View style={styles.content}>
          <Text style={styles.welcomeText}>Welcome Back!</Text>

          <CustomInput
            name="username"
            label="Username or Email"
            placeholder="Username or Email"
            control={control}
            rules={{ required: 'Username or Email is required' }}
          />

          <CustomInput
            name="password"
            label="Password"
            placeholder="Password"
            control={control}
            secureTextEntry={!showPassword}
            rightIcon={showPassword ? 'eye-off' : 'eye'}
            onRightIconPress={() => setShowPassword(!showPassword)}
            rules={{ required: 'Password is required' }}
          />

          <TouchableOpacity 
            onPress={() => navigation.navigate('ForgotPassword')}
            style={styles.forgotPassContainer}
          >
            <Text style={styles.linkText}>Forget password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit(onSignInPressed)}>
            <Text style={styles.primaryButtonText}>Sign In</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>or</Text>

          <TouchableOpacity 
             style={styles.outlineButton}
             // ✅ แก้ไข: เปลี่ยนจาก 'Home' เป็น 'MainApp'
             onPress={() => navigation.replace('MainApp')} 
          >
            <Text style={styles.outlineButtonText}>Continue As Visitor</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.linkTextBold}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

// ... Styles เดิม ...
const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, backgroundColor: COLORS.white },
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: COLORS.primary, textAlign: 'center', marginBottom: 40 },
  content: { width: '100%' },
  welcomeText: { fontSize: 20, fontWeight: 'bold', color: COLORS.primary, marginBottom: 20 },
  forgotPassContainer: { alignSelf: 'flex-end', marginBottom: 20 },
  linkText: { color: COLORS.primary, fontSize: 12 },
  primaryButton: { backgroundColor: COLORS.primary, padding: 15, borderRadius: 30, alignItems: 'center', marginBottom: 15 },
  primaryButtonText: { color: COLORS.white, fontWeight: 'bold', fontSize: 16 },
  orText: { textAlign: 'center', color: '#888', marginBottom: 15 },
  outlineButton: { backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.primary, padding: 15, borderRadius: 30, alignItems: 'center', marginBottom: 20 },
  outlineButtonText: { color: COLORS.primary, fontWeight: 'bold', fontSize: 16 },
  footer: { flexDirection: 'row', justifyContent: 'center' },
  footerText: { color: '#888', fontSize: 12 },
  linkTextBold: { color: COLORS.primary, fontWeight: 'bold', fontSize: 12 },
});

export default LoginScreen;