import React, { useState } from 'react';
import {
  View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Dimensions, TextInput, Platform, StatusBar, Modal, ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MOCK_WHEELS, Wheel } from '../../data/mockData';

// [NEW] Import Contexts
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = width / 2 - 24;

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  
  // เรียกใช้ Hooks
  const { theme, isDarkMode } = useTheme();
  const { t } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSize, setSelectedSize] = useState('All');

  const categories = [t.all_category, 'Sport', 'Luxury', 'Minimal', 'Classic', 'Off-road']; // ใช้คำแปล 'All'
  const sizes = [t.all_category, '17"', '18"', '19"', '20"', '21"', '22"'];

  const handleApplyFilter = () => { setFilterVisible(false); };
  const handleResetFilter = () => { setSelectedCategory(t.all_category); setSelectedSize(t.all_category); };

  const renderItem = ({ item }: { item: Wheel }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.card, { backgroundColor: theme.card }]} // ใช้สีจากการ์ด theme
      onPress={() => navigation.navigate('ProductDetail', { item })}
    >
      <View style={[styles.imageContainer, { backgroundColor: isDarkMode ? '#334155' : '#fff' }]}>
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.cardContent}>
        <Text style={[styles.cardTitle, { color: theme.text }]} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.cardPrice}>${item.price.toLocaleString()}</Text>
        <Text style={styles.cardCategory}>{item.brand}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />

      {/* Header */}
      <View style={[styles.headerWrapper, { backgroundColor: theme.card }]}>
        <View style={styles.headerTop}>
             <Text style={[styles.appName, { color: theme.text }]}>{t.app_name}</Text>
             <TouchableOpacity>
                <Icon name="bell-outline" size={24} color={theme.text} />
             </TouchableOpacity>
        </View>
        
        <View style={styles.searchRow}>
            <View style={[styles.searchBar, { backgroundColor: isDarkMode ? '#334155' : '#F1F5F9' }]}>
                <Icon name="magnify" size={24} color="#2563EB" style={{ marginRight: 8 }} />
                <TextInput 
                    placeholder={t.search_placeholder} 
                    placeholderTextColor={theme.subText}
                    style={[styles.searchInput, { color: theme.text }]}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>
            <TouchableOpacity style={[styles.filterBtn, { backgroundColor: theme.card, borderColor: theme.border }]} onPress={() => setFilterVisible(true)}>
                 <Icon name="tune-variant" size={24} color="#2563EB" />
            </TouchableOpacity>
        </View>

        <View style={styles.quickCategoryContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categories.slice(0, 5).map((cat) => (
                    <TouchableOpacity 
                        key={cat} 
                        onPress={() => setSelectedCategory(cat)}
                        style={[
                          styles.quickCatPill, 
                          { backgroundColor: isDarkMode ? '#334155' : '#F1F5F9' },
                          selectedCategory === cat && styles.quickCatPillActive
                        ]}
                    >
                        <Text style={[
                          styles.quickCatText, 
                          selectedCategory === cat && styles.quickCatTextActive
                        ]}>{cat}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
      </View>

      {/* Product List */}
      <FlatList
        data={MOCK_WHEELS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Filter Modal */}
      <Modal animationType="slide" transparent={true} visible={isFilterVisible} onRequestClose={() => setFilterVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { backgroundColor: theme.card }]}>
            <View style={[styles.modalHeader, { borderBottomColor: theme.border }]}>
                <Text style={[styles.modalTitle, { color: theme.text }]}>{t.filter}</Text>
                <TouchableOpacity onPress={() => setFilterVisible(false)}>
                    <Icon name="close" size={24} color={theme.subText} />
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={[styles.sectionTitle, { color: theme.text }]}>Category</Text>
                <View style={styles.chipContainer}>
                    {categories.map((cat) => (
                        <TouchableOpacity 
                          key={cat} 
                          style={[
                            styles.chip, 
                            { backgroundColor: isDarkMode ? '#334155' : '#F8F9FA', borderColor: theme.border },
                            selectedCategory === cat && styles.chipActive
                          ]} 
                          onPress={() => setSelectedCategory(cat)}
                        >
                            <Text style={[styles.chipText, selectedCategory === cat && styles.chipTextActive]}>{cat}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                {/* ... (ทำแบบเดียวกันกับ Size) ... */}
            </ScrollView>
            <View style={styles.modalFooter}>
                <TouchableOpacity style={[styles.resetButton, { borderColor: theme.border }]} onPress={handleResetFilter}>
                    <Text style={[styles.resetButtonText, { color: theme.subText }]}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.applyButton} onPress={handleApplyFilter}>
                    <Text style={styles.applyButtonText}>Apply</Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerWrapper: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 44,
    paddingBottom: 15,
    borderBottomLeftRadius: 24, borderBottomRightRadius: 24,
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 3, zIndex: 10,
  },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  appName: { fontSize: 24, fontWeight: '800' },
  searchRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  searchBar: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    borderRadius: 12, paddingHorizontal: 12, height: 48, marginRight: 10,
  },
  searchInput: { flex: 1, fontSize: 16 },
  filterBtn: { width: 48, height: 48, borderRadius: 12, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  quickCategoryContainer: { marginTop: 5 },
  quickCatPill: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 10 },
  quickCatPillActive: { backgroundColor: '#2563EB' },
  quickCatText: { fontSize: 14, color: '#94A3B8', fontWeight: '500' },
  quickCatTextActive: { color: '#fff' },
  listContent: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 100 },
  row: { justifyContent: 'space-between' },
  card: { width: COLUMN_WIDTH, borderRadius: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2, overflow: 'hidden' },
  imageContainer: { height: 130, justifyContent: 'center', alignItems: 'center' },
  image: { width: '80%', height: '80%' },
  cardContent: { padding: 12 },
  cardTitle: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  cardPrice: { fontSize: 15, fontWeight: 'bold', color: '#2563EB', marginBottom: 2 },
  cardCategory: { fontSize: 11, color: '#94A3B8' },
  
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContainer: { borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, maxHeight: '80%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, borderBottomWidth: 1, paddingBottom: 15 },
  modalTitle: { fontSize: 20, fontWeight: 'bold' },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginTop: 10, marginBottom: 12 },
  chipContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 },
  chip: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, borderWidth: 1, marginRight: 10, marginBottom: 10 },
  chipActive: { backgroundColor: '#EFF6FF', borderColor: '#2563EB' },
  chipText: { fontSize: 14, color: '#64748B' },
  chipTextActive: { color: '#2563EB', fontWeight: '600' },
  modalFooter: { flexDirection: 'row', marginTop: 20, paddingTop: 10 },
  resetButton: { flex: 1, paddingVertical: 15, marginRight: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 12, borderWidth: 1 },
  resetButtonText: { fontWeight: '600', fontSize: 16 },
  applyButton: { flex: 2, paddingVertical: 15, justifyContent: 'center', alignItems: 'center', borderRadius: 12, backgroundColor: '#2563EB' },
  applyButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

export default HomeScreen;