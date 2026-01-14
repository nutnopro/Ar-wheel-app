import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../context/ThemeContext';

const SystemLogsScreen = () => {
  const { theme } = useTheme();
  const [logs, setLogs] = useState([
    { id: '1', action: 'User Login', time: '10:00 AM' },
    { id: '2', action: 'Update Stock', time: '09:45 AM' },
  ]);

  const handleDelete = (id: string) => {
    Alert.alert("Delete", "Remove log?", [{ text: "Cancel" }, { text: "Delete", style: 'destructive', onPress: () => setLogs(prev => prev.filter(l => l.id !== id)) }]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <FlatList 
        data={logs} 
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => (
           <View style={[styles.card, { backgroundColor: theme.card }]}>
             <View style={{ flex: 1 }}>
                 <Text style={{ fontWeight: 'bold', color: theme.text }}>{item.action}</Text>
                 <Text style={{ color: theme.subText, fontSize: 12 }}>{item.time}</Text>
             </View>
             <TouchableOpacity onPress={() => handleDelete(item.id)}><Icon name="close" size={20} color={theme.subText} /></TouchableOpacity>
           </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', padding: 16, marginBottom: 12, borderRadius: 12, elevation: 2, borderLeftWidth: 4, borderLeftColor: '#3B82F6' }
});
export default SystemLogsScreen;