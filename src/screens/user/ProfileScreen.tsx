import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  Switch, 
  SafeAreaView, 
  StatusBar, 
  Alert,
  Platform // [NEW] Import Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

const ProfileScreen = () => {
  const navigation = useNavigation<any>();
  const { isDarkMode, toggleTheme, theme } = useTheme();
  const { userRole, userData, logout } = useAuth();

  const isVisitor = userRole === 'visitor';

  const user = userData || {
    name: "Guest User",
    email: "Sign in to access all features",
    avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
  };

  const handleRestrictedAction = () => {
    Alert.alert(
        "Login Required",
        "Please login to use this feature.",
        [
            { text: "Cancel", style: "cancel" },
            { text: "Login", onPress: () => logout() }
        ]
    );
  };

  // Menu Item Component
  const MenuItem = ({ icon, title, onPress, isSwitch = false, value = false, onToggle, restricted = false }: any) => (
    <TouchableOpacity 
      style={[styles.menuItem, { borderBottomColor: theme.border }]} 
      onPress={isSwitch ? undefined : (restricted && isVisitor ? handleRestrictedAction : onPress)}
      activeOpacity={isSwitch ? 1 : 0.7}
    >
      <View style={styles.menuLeft}>
        <View style={[styles.iconBox, { backgroundColor: isDarkMode ? '#1E293B' : '#EFF6FF' }]}>
          <Icon name={icon} size={22} color={restricted && isVisitor ? '#CBD5E1' : theme.icon} />
        </View>
        <Text style={[styles.menuText, { color: restricted && isVisitor ? '#CBD5E1' : theme.text }]}>{title}</Text>
        {restricted && isVisitor && <Icon name="lock" size={14} color="#CBD5E1" style={{marginLeft: 8}} />}
      </View>
      
      {isSwitch ? (
        <Switch 
          value={value} 
          onValueChange={onToggle}
          trackColor={{ false: "#767577", true: "#2563EB" }}
          thumbColor={"#f4f3f4"}
        />
      ) : (
        <Icon name="chevron-right" size={24} color={restricted && isVisitor ? '#CBD5E1' : theme.subText} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      {/* Set StatusBar Color */}
      <StatusBar 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'} 
        backgroundColor={theme.background} 
      />

      {/* ใช้ SafeAreaView เพื่อกันขอบบน (iOS Notch) 
         และเพิ่ม paddingTop สำหรับ Android 
      */}
      <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* --- Header Profile --- */}
          <View style={styles.header}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <Text style={[styles.name, { color: theme.text }]}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
            
            {!isVisitor && (
                <TouchableOpacity 
                  style={styles.editBadge}
                  onPress={() => navigation.navigate('EditProfile')}
                >
                  <Icon name="pencil" size={14} color="#fff" />
                </TouchableOpacity>
            )}
          </View>

          {/* --- Visitor Call to Action --- */}
          {isVisitor && (
              <TouchableOpacity style={styles.visitorLoginBox} onPress={logout}>
                  <Text style={styles.visitorLoginText}>Sign In / Register</Text>
                  <Text style={styles.visitorLoginSub}>to save favorites and edit profile</Text>
              </TouchableOpacity>
          )}

          {/* --- Account Section --- */}
          <View style={[styles.section, { backgroundColor: theme.card }]}>
            <Text style={styles.sectionTitle}>Account</Text>
            
            <MenuItem 
              icon="heart-outline" 
              title="Favorites" 
              restricted={true} 
              onPress={() => navigation.navigate('Favorites')} 
            />
            <MenuItem 
              icon="lock-outline" 
              title="Change Password" 
              restricted={true}
              onPress={() => navigation.navigate('ChangePassword')} 
            />
            <MenuItem 
              icon="translate" 
              title="Language" 
              onPress={() => navigation.navigate('Language')} 
            />
          </View>

          {/* --- Preferences Section --- */}
          <View style={[styles.section, { backgroundColor: theme.card }]}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            
            <MenuItem 
              icon="theme-light-dark" 
              title="Dark Mode" 
              isSwitch={true}
              value={isDarkMode}
              onToggle={toggleTheme}
            />
            
            <MenuItem 
              icon="cube-scan" 
              title="AR Preferences" 
              onPress={() => navigation.navigate('ARPreferences')} 
            />
          </View>

          {/* --- Logout / Exit Button --- */}
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={() => logout()}
          >
            <Icon name="logout" size={20} color="#EF4444" style={{ marginRight: 8 }} />
            <Text style={styles.logoutText}>{isVisitor ? 'Exit Visitor Mode' : 'Log Out'}</Text>
          </TouchableOpacity>

          <Text style={styles.versionText}>Version 1.0.0</Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  // [IMPORTANT] แก้ไขส่วน Safe Area
  safeArea: {
    flex: 1,
    // ถ้าเป็น Android ให้ดันลงมาเท่ากับความสูง Status Bar + นิดหน่อย
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight! + 10 : 0,
  },
  scrollContent: { 
    padding: 20, 
    paddingBottom: 100 
  },
  header: { 
    alignItems: 'center', 
    marginBottom: 20, 
    marginTop: 10 
  },
  avatar: { 
    width: 100, 
    height: 100, 
    borderRadius: 50, 
    marginBottom: 15, 
    backgroundColor: '#ddd' 
  },
  editBadge: { 
    position: 'absolute', 
    bottom: 65, 
    right: '35%', 
    backgroundColor: '#2563EB', 
    padding: 6, 
    borderRadius: 15, 
    borderWidth: 2, 
    borderColor: '#fff' 
  },
  name: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 4 
  },
  email: { 
    fontSize: 14, 
    color: '#94A3B8' 
  },
  
  // Visitor Styles
  visitorLoginBox: { 
    backgroundColor: '#EFF6FF', 
    padding: 15, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginBottom: 20, 
    borderWidth: 1, 
    borderColor: '#DBEAFE' 
  },
  visitorLoginText: { color: '#2563EB', fontWeight: 'bold', fontSize: 16 },
  visitorLoginSub: { color: '#60A5FA', fontSize: 12, marginTop: 4 },

  // Menu Styles
  section: { 
    borderRadius: 16, 
    padding: 5, 
    marginBottom: 20, 
    // Shadow
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.05, 
    shadowRadius: 5, 
    elevation: 2 
  },
  sectionTitle: { 
    fontSize: 12, 
    fontWeight: 'bold', 
    color: '#94A3B8', 
    marginTop: 15, 
    marginLeft: 15, 
    marginBottom: 5, 
    textTransform: 'uppercase' 
  },
  menuItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingVertical: 15, 
    paddingHorizontal: 15, 
    borderBottomWidth: 1 
  },
  menuLeft: { flexDirection: 'row', alignItems: 'center' },
  iconBox: { 
    width: 36, 
    height: 36, 
    borderRadius: 8, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 12 
  },
  menuText: { fontSize: 16, fontWeight: '500' },
  
  logoutButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#FEF2F2', 
    paddingVertical: 16, 
    borderRadius: 16, 
    marginTop: 10 
  },
  logoutText: { color: '#EF4444', fontSize: 16, fontWeight: 'bold' },
  versionText: { textAlign: 'center', color: '#CBD5E1', marginTop: 20, fontSize: 12 }
});

export default ProfileScreen;