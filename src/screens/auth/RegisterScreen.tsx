import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import CustomInput from '../../components/CustomInput';
import { COLORS } from '../../constants/colors';

const RegisterScreen = () => {
  const navigation = useNavigation<any>();
  const [showPassword, setShowPassword] = useState(false);
  const { control, handleSubmit, watch } = useForm();

  const onRegisterPressed = (data: any) => {
    console.log('Register Data:', data);
    // TODO: Send data to Backend (Register endpoint)
    // ข้อมูล: username, password, email, phone, dob 
    navigation.navigate('Login');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
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
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.linkText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, backgroundColor: COLORS.white },
  container: { flex: 1, padding: 24, paddingTop: 60 },
  title: { fontSize: 28, fontWeight: 'bold', color: COLORS.primary, textAlign: 'center', marginBottom: 30 },
  button: { backgroundColor: COLORS.primary, padding: 15, borderRadius: 30, alignItems: 'center', marginTop: 10, marginBottom: 20 },
  buttonText: { color: COLORS.white, fontWeight: 'bold', fontSize: 16 },
  footer: { flexDirection: 'row', justifyContent: 'center' },
  footerText: { color: '#888', fontSize: 12 },
  linkText: { color: COLORS.primary, fontWeight: 'bold', fontSize: 12 },
});

export default RegisterScreen;