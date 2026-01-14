import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../context/ThemeContext';

const ManageModelsScreen = () => {
  const { theme } = useTheme();
  const [models, setModels] = useState([
    { id: '1', name: 'Vossen HF-5', price: '$500', status: 'Active' },
    { id: '2', name: 'BBS RI-D', price: '$1200', status: 'Active' },
  ]);

  const handleDelete = (id: string) => {
    Alert.alert("Confirm", "Delete model?", [{ text: "Cancel" }, { text: "Delete", style: 'destructive', onPress: () => setModels(prev => prev.map(m => m.id === id ? { ...m, status: 'Deleted' } : m)) }]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <FlatList 
        data={models} 
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        renderItem={({ item }) => {
           const isDeleted = item.status === 'Deleted';
           return (
             <View style={[styles.card, { backgroundColor: theme.card, opacity: isDeleted ? 0.6 : 1 }]}>
               <View style={[styles.iconBox, { backgroundColor: '#FFFBEB' }]}><Icon name="car-wheel" size={24} color="#F59E0B" /></View>
               <View style={{ flex: 1 }}>
                   <Text style={[styles.title, { color: theme.text, textDecorationLine: isDeleted ? 'line-through' : 'none' }]}>{item.name}</Text>
                   <Text style={{ color: theme.subText }}>{item.price}</Text>
               </View>
               <View style={styles.actions}>
                  <TouchableOpacity onPress={() => Alert.alert('Edit', item.name)} disabled={isDeleted} style={styles.actionBtn}><Icon name="pencil-outline" size={24} color={isDeleted ? theme.subText : "#3B82F6"} /></TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(item.id)} disabled={isDeleted} style={styles.actionBtn}><Icon name="trash-can-outline" size={24} color={isDeleted ? theme.subText : "#EF4444"} /></TouchableOpacity>
               </View>
             </View>
           );
        }}
      />
      <View style={[styles.footer, { backgroundColor: theme.card, borderTopColor: theme.border }]}>
        <TouchableOpacity style={[styles.addButton, { backgroundColor: '#F59E0B' }]} onPress={() => Alert.alert('Add', 'Model')}><Icon name="plus" size={24} color="#fff" /><Text style={styles.addText}>Add Model</Text></TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', padding: 16, marginBottom: 12, borderRadius: 12, elevation: 2 },
  iconBox: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  title: { fontSize: 16, fontWeight: '600' },
  actions: { flexDirection: 'row' },
  actionBtn: { padding: 8 },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, paddingBottom: 40, borderTopWidth: 1 },
  addButton: { backgroundColor: '#2563EB', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 16, borderRadius: 12 },
  addText: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 8 }
});
export default ManageModelsScreen;