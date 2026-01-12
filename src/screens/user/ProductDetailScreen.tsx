import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';

const ProductDetailScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { item } = route.params; // รับข้อมูลสินค้า

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Icon name="chevron-left" size={32} color="#2563EB" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>{item.price.toLocaleString()}</Text>
          
          <Text style={styles.description}>
            The legendary {item.name}. High performance forged wheel designed for racing and street use. 
            Lightweight, durable, and stylish.
          </Text>
        </View>
      </ScrollView>

      {/* --- Footer Buttons --- */}
      <View style={styles.footer}>
        {/* ปุ่ม Try on AR: แก้ไข Navigation ตรงนี้ */}
        <TouchableOpacity 
          style={styles.arButton} 
          activeOpacity={0.8}
          onPress={() => {
            // สั่งให้ไปที่ Navigator หลัก (MainApp) -> แล้วไปที่ Tab ชื่อ 'AR' -> พร้อมส่ง params
            navigation.navigate('MainApp', { 
              screen: 'AR', 
              params: { item: item } 
            });
          }}
        >
          <Icon name="cube-scan" size={24} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.arButtonText}>Try on AR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.favButton}>
          <Icon name="heart-outline" size={28} color="#2563EB" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { padding: 16 },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  scrollContent: { paddingBottom: 100 },
  imageWrapper: { 
    height: 300, justifyContent: 'center', alignItems: 'center', 
    backgroundColor: '#E2E8F0', borderRadius: 20, margin: 20 
  },
  image: { width: '80%', height: '80%' },
  detailsContainer: { paddingHorizontal: 24 },
  name: { fontSize: 24, fontWeight: 'bold', color: '#1E293B', marginBottom: 8 },
  price: { fontSize: 20, fontWeight: '600', color: '#2563EB', marginBottom: 16 },
  description: { fontSize: 14, color: '#64748B', lineHeight: 22 },
  
  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    flexDirection: 'row', padding: 20, backgroundColor: '#fff',
    borderTopWidth: 1, borderTopColor: '#E2E8F0', alignItems: 'center'
  },
  arButton: {
    flex: 1, backgroundColor: '#2563EB', flexDirection: 'row',
    height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center',
    marginRight: 16, elevation: 4
  },
  arButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  favButton: {
    width: 56, height: 56, borderRadius: 28, borderWidth: 1,
    borderColor: '#2563EB', justifyContent: 'center', alignItems: 'center'
  }
});

export default ProductDetailScreen;