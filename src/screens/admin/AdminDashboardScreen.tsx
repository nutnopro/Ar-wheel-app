import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

const AdminDashboardScreen = () => {
  const navigation = useNavigation<any>();
  const { theme, isDarkMode } = useTheme();
  const { t } = useLanguage();
  const { logout } = useAuth();

  const menuItems = [
    { title: t.manage_users, icon: 'account-group', route: 'ManageUsers', color: '#3B82F6' },
    { title: t.manage_stores, icon: 'store', route: 'ManageStores', color: '#10B981' },
    { title: t.manage_models, icon: 'car-wheel', route: 'ManageModels', color: '#F59E0B' },
    { title: t.manage_categories, icon: 'shape', route: 'ManageCategories', color: '#8B5CF6' },
    { title: t.system_logs, icon: 'file-document-outline', route: 'SystemLogs', color: '#64748B' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.card }]}>
        <View>
          <Text style={[styles.headerTitle, { color: theme.text }]}>{t.admin_dashboard}</Text>
          <Text style={{ color: theme.subText }}>Welcome back, Admin</Text>
        </View>
        <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
           <Icon name="logout" size={24} color="#EF4444" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.grid}>
        {menuItems.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={[styles.card, { backgroundColor: theme.card }]}
            onPress={() => item.route ? navigation.navigate(item.route) : Alert.alert('Coming Soon')}
          >
            <View style={[styles.iconBox, { backgroundColor: item.color + '20' }]}>
               <Icon name={item.icon} size={32} color={item.color} />
            </View>
            <Text style={[styles.cardTitle, { color: theme.text }]}>{item.title}</Text>
            <Icon name="chevron-right" size={20} color={theme.subText} style={styles.arrow} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 24, paddingTop: 60, borderBottomLeftRadius: 24, borderBottomRightRadius: 24,
    shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, elevation: 5
  },
  headerTitle: { fontSize: 24, fontWeight: 'bold' },
  logoutBtn: { padding: 8, backgroundColor: '#FEF2F2', borderRadius: 10 },
  grid: { padding: 20 },
  card: {
    flexDirection: 'row', alignItems: 'center', padding: 16, marginBottom: 16,
    borderRadius: 16, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, elevation: 2
  },
  iconBox: { width: 56, height: 56, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  cardTitle: { fontSize: 16, fontWeight: '600', flex: 1 },
  arrow: { opacity: 0.5 }
});

export default AdminDashboardScreen;