import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { MOCK_USERS } from '../../data/mockAdminData';

const ManageUsersScreen = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [users, setUsers] = useState(MOCK_USERS);

  const handleDelete = (id: string) => {
    Alert.alert(t.action_delete, t.confirm_delete, [
      { text: t.cancel, style: 'cancel' },
      { text: t.action_delete, style: 'destructive', onPress: () => setUsers(prev => prev.filter(u => u.id !== id)) }
    ]);
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
      <View style={styles.userInfo}>
        <View style={styles.avatar}>
           <Text style={styles.avatarText}>{item.avatar}</Text>
        </View>
        <View>
          <Text style={[styles.name, { color: theme.text }]}>{item.name}</Text>
          <Text style={[styles.subText, { color: theme.subText }]}>{item.email}</Text>
          <Text style={[styles.roleBadge, { color: item.role === 'Admin' ? '#EF4444' : '#2563EB' }]}>
            {item.role}
          </Text>
        </View>
      </View>
      
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => Alert.alert('Edit', item.name)} style={styles.actionBtn}>
           <Icon name="pencil-outline" size={24} color="#F59E0B" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.actionBtn}>
           <Icon name="trash-can-outline" size={24} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList 
        data={users}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
      />
      
      {/* Footer Button (Add New) */}
      <View style={[styles.footerContainer, { backgroundColor: theme.card, borderTopColor: theme.border }]}>
        <TouchableOpacity style={styles.addButton} onPress={() => Alert.alert('Add New', 'Open Form')}>
          <Icon name="plus" size={24} color="#fff" />
          <Text style={styles.addButtonText}>{t.add_new} User</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 16, marginBottom: 12, borderRadius: 16,
    shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, elevation: 2
  },
  userInfo: { flexDirection: 'row', alignItems: 'center' },
  avatar: {
    width: 48, height: 48, borderRadius: 24, backgroundColor: '#EFF6FF',
    justifyContent: 'center', alignItems: 'center', marginRight: 12
  },
  avatarText: { fontSize: 18, fontWeight: 'bold', color: '#2563EB' },
  name: { fontSize: 16, fontWeight: '600' },
  subText: { fontSize: 12, marginBottom: 2 },
  roleBadge: { fontSize: 12, fontWeight: 'bold' },
  actions: { flexDirection: 'row' },
  actionBtn: { padding: 8, marginLeft: 4 },
  footerContainer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: 20, paddingBottom: 40, borderTopWidth: 1,
    shadowColor: "#000", shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.05, elevation: 10
  },
  addButton: {
    backgroundColor: '#2563EB', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    paddingVertical: 16, borderRadius: 12, shadowColor: "#2563EB", shadowOpacity: 0.3, elevation: 4
  },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 8 }
});

export default ManageUsersScreen;