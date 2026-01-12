import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../context/ThemeContext';
import { MOCK_LOGS } from '../../data/mockAdminData';

const SystemLogsScreen = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={MOCK_LOGS}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => (
          <View style={[styles.logItem, { backgroundColor: theme.card, borderColor: theme.border }]}>
             <View style={styles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name="clock-outline" size={16} color={theme.subText} style={{marginRight: 4}}/>
                    <Text style={{color: theme.subText, fontSize: 12}}>{item.time}</Text>
                </View>
                <Text style={[styles.action, {color: theme.primary}]}>{item.action}</Text>
             </View>
             <Text style={[styles.detail, {color: theme.text}]}>{item.detail}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    logItem: {
        padding: 16, marginBottom: 12, borderRadius: 12,
        borderLeftWidth: 4, borderLeftColor: '#3B82F6',
        shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, elevation: 1
    },
    header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    action: { fontWeight: 'bold', fontSize: 14 },
    detail: { fontSize: 15 }
});

export default SystemLogsScreen;