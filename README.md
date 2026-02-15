# AR Wheel Project - README

![AR Wheel Frontend](https://img.shields.io/badge/Platform-React%20Native-blue) ![Backend](https://img.shields.io/badge/Backend-NestJS-red) ![Database](https://img.shields.io/badge/Database-MySQL-orange)

## 📋 รายละเอียดโปรเจค

AR Wheel Project เป็นแอปพลิเคชันมือถือ (Mobile Application) ที่สร้างด้วย React Native พร้อมระบบ Backend ที่พัฒนาด้วย NestJS โดยมีหน้าที่หลักคือ:

- **Frontend**: React Native Application - แอปพลิเคชันมือถือ Android/iOS
- **Backend**: NestJS Server - API Server สำหรับจัดการข้อมูล
- **Database**: MySQL - ฐานข้อมูลสำหรับเก็บข้อมูล
- **Authentication**: Firebase Auth - ระบบตรวจสอบสิทธิ์
- **Storage**: Firebase Firestore - ระบบจัดเก็บข้อมูลเพิ่มเติม

### หน้าที่หลัก
- ✅ ระบบสมาชิก (Sign Up, Login)
- ✅ ระบบแอดมิน (Admin Dashboard)
- ✅ จัดการผู้ใช้ (User Management)
- ✅ จัดการหมวดหมู่สินค้า (Category Management)
- ✅ จัดการรุ่นสินค้า (Model Management)
- ✅ จัดการร้านค้า (Store Management)
- ✅ ระบบบันทึกข้อมูล (System Logs)

---

## 📦 System Requirements (ความต้องการของระบบ)

### สำหรับทั้ง Frontend และ Backend

| ความต้องการ | เวอร์ชั่นขั้นต่ำ |
|-----------|-----------|
| **Node.js** | 20.x หรือสูงกว่า |
| **npm** | 10.x หรือสูงกว่า |
| **Java JDK** | 11.x หรือสูงกว่า |
| **Android SDK** | API Level 33 ขึ้นไป |
| **Git** | 2.30 หรือสูงกว่า |

### สำหรับ Frontend (React Native)

- **Android Studio** (สำหรับ Android Development)
- **Android SDK Platform** API Level 33+
- **Gradle** (รวมใน Android Studio)

### สำหรับ Backend (NestJS)

- **MySQL Server** 8.0 หรือสูงกว่า
- **Firebase Project** (สำหรับ Authentication)

---

## 🚀 ขั้นตอนการติดตั้ง

### ⚙️ Prerequisite - ติดตั้งเครื่องมือที่จำเป็น

#### 1. ติดตั้ง Node.js ($NodeJS >= 20.x)

```bash
# ตรวจสอบเวอร์ชั่น
node --version
npm --version
```

#### 2. ติดตั้ง Java Development Kit (JDK)

```bash
# ตรวจสอบ JDK
java -version
```

#### 3. ติดตั้ง Android Studio

- ดาวน์โหลดจาก [https://developer.android.com/studio](https://developer.android.com/studio)
- ติดตั้งตามขั้นตอน โปรแกรมจะติดตั้ง Android SDK, Android Emulator, และ Gradle
- ตั้งค่า ANDROID_HOME environment variable:

**สำหรับ Windows:**
```powershell
# ค้นหา Android SDK location:
# โดยปกติอยู่ที่: C:\Users\<Username>\AppData\Local\Android\Sdk

# ตั้งค่า Environment Variable ผ่าน PowerShell:
[System.Environment]::SetEnvironmentVariable("ANDROID_HOME", "C:\Users\<YourUsername>\AppData\Local\Android\Sdk")
[System.Environment]::SetEnvironmentVariable("PATH", "$ENV:PATH;$ENV:ANDROID_HOME\platform-tools;$ENV:ANDROID_HOME\tools")
```

#### 4. ติดตั้ง Git

- ดาวน์โหลดจาก [https://git-scm.com](https://git-scm.com)

#### 5. ติดตั้ง MySQL Server

- ดาวน์โหลดจาก [https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/)
- ตั้งค่าชื่อผู้ใช้ และรหัสผ่าน (สำคัญมาก!)

---

## 📁 Clone GitHub Repository

```bash
# เปิด Command Prompt หรือ PowerShell ไปยังโฟลเดอร์ที่ต้องการตั้งโปรเจค
cd D:\MyProjects   # หรือโฟลเดอร์อื่นๆ

# Clone repository
git clone https://github.com/your-username/your-repo.git

# เข้าไปในโฟลเดอร์โปรเจค
cd Ar-wheel-app
```

---

## 🎯 Frontend Setup (React Native + Android)

### ขั้นตอนที่ 1: ติดตั้ง Dependencies

```bash
# เข้าไปในโฟลเดอร์ Frontend
cd Ar-wheel-app

# ติดตั้ง node modules
npm install

# ตรวจสอบการติดตั้งสำเร็จ
npm list
```

### ขั้นตอนที่ 2: ตั้งค่า Android

```bash
# ตรวจสอบ Android setup
npx @react-native-community/cli-platform-android doctor
```

### ขั้นตอนที่ 3: เปิด Android Emulator หรือเตรียม Device

**ตัวเลือกที่ 1: ใช้ Android Emulator**
- เปิด Android Studio
- ไปที่ **AVD Manager** (Android Virtual Device)
- สร้าง Virtual Device หากยังไม่มี (recommend: API Level 33+)
- เปิด Emulator

**ตัวเลือกที่ 2: ใช้ Physical Android Device**
- เชื่อมต่อ USB Device
- เปิด Developer Mode บนเครื่อง
- ตรวจสอบการเชื่อมต่อ:
  ```bash
  adb devices
  ```

### ขั้นตอนที่ 4: รันแอปพลิเคชัน

```bash
# ในลงนี้ terminal ที่อยู่ที่โฟลเดอร์ Ar-wheel-app

# Terminal 1: เรียกใช้ Metro Bundler
npm start

# Terminal 2: รันแอปบน Android (รอให้ Metro Bundler พร้อม)
npm run android
```

**ผลลัพธ์ที่คาดหวัง:**
- Metro Bundler จะเริ่มทำงาน (บอก "Loading dependency graph" เสร็จ)
- Gradle จะ build project
- แอปจะติดตั้งบน Emulator/Device โดยอัตโนมัติ

### ขั้นตอนที่ 5: ตรวจสอบการทำงาน

- ควรเห็นแอปเปิดขึ้นบน Emulator/Device
- ทดสอบการนำทาง (Navigation)
- ตรวจสอบการเชื่อมต่อ Backend API

---

## 🔧 Backend Setup (NestJS + MySQL)

### ขั้นตอนที่ 1: ติดตั้ง Dependencies

```bash
# กลับไปยังโฟลเดอร์หลัก
cd ..

# เข้าไปในโฟลเดอร์ Backend
cd arappbackend

# ติดตั้ง node modules
npm install
```

### ขั้นตอนที่ 2: ตั้งค่าฐานข้อมูล

```bash
# ตรวจสอบว่า MySQL กำลังทำงาน
mysql -u root -p

# ถ้าสำเร็จ ให้ออกจาก MySQL
exit
```

### ขั้นตอนที่ 3: ตั้งค่า Environment Variables

สร้างไฟล์ `.env` ในโฟลเดอร์ `arappbackend`:

```bash
# .env file สำหรับ Backend

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_mysql_password
DB_NAME=ar_wheel_db

# Firebase Configuration
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY=your_firebase_private_key
FIREBASE_CLIENT_EMAIL=your_firebase_client_email

# API Configuration
API_PORT=3001
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=24h
```

**หมายเหตุ:** ต้องติดตั้ง Firebase Project ก่อน และ copy ข้อมูล Service Account Key

### ขั้นตอนที่ 4: สร้างและสปปอร์ตฐานข้อมูล

```bash
# สร้างฐานข้อมูล
npm run typeorm migration:generate src/migrations/InitialMigration

# ประมาณ run migration (ต้องตั้งค่า TypeORM ให้เรียบร้อยก่อน)
npm run typeorm migration:run
```

### ขั้นตอนที่ 5: รัน Backend Server

```bash
# Development mode (with watch)
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

**ผลลัพธ์ที่คาดหวัง:**
```
[Nest] 12345  - 02/15/2026, 10:30:00 AM     LOG [NestFactory] Starting Nest application...
[Nest] 12345  - 02/15/2026, 10:30:02 AM     LOG [InstanceLoader] AppModule dependencies initialized
[Nest] 12345  - 02/15/2026, 10:30:02 AM     LOG [RoutesResolver] AppController {/}: 
[Nest] 12345  - 02/15/2026, 10:30:02 AM     LOG [NestApplication] Nest application successfully started
```

---

## 📱 การเชื่อมต่อ Frontend กับ Backend

### อัปเดต API URL ใน Frontend

แก้ไขไฟล์ `Ar-wheel-app/src/services/api.ts`:

```typescript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';  // URL Backend Server

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// เพิ่ม Interceptor สำหรับ Token
apiClient.interceptors.request.use((config) => {
  // เพิ่ม authentication token
  return config;
});

export default apiClient;
```

**หมายเหตุ:**
- ถ้าใช้ Emulator: ใช้ `10.0.2.2:3001` แทน `localhost:3001`
- ถ้าใช้ Physical Device: ใช้ IP Address ของเครื่อง เช่น `192.168.1.100:3001`

---

## ✅ Checklist - ตรวจสอบการทำงาน

### Frontend
- [ ] npm install สำเร็จ
- [ ] Android Emulator/Device เชื่อมต่อแล้ว
- [ ] Metro Bundler เริ่มทำงาน
- [ ] แอปเปิดขึ้นบน Emulator/Device
- [ ] UI ปรากฏถูกต้อง
- [ ] Navigation ทำงาน

### Backend
- [ ] npm install สำเร็จ
- [ ] .env ตั้งค่าเรียบร้อย
- [ ] MySQL ทำงาน
- [ ] Server เริ่มทำงาน บน port 3001
- [ ] Swagger API Docs สามารถเข้าถึงได้ที่ `http://localhost:3001/api/docs`

### Connection
- [ ] Frontend สามารถเชื่อมต่อ Backend
- [ ] API calls สำเร็จ
- [ ] ข้อมูลแสดงถูกต้องบน Frontend

---

## 🔌 Common Commands

### Frontend Commands
```bash
cd Ar-wheel-app

npm start              # เริ่ม Metro Bundler
npm run android        # รัน Android app
npm run ios           # รัน iOS app
npm run lint          # ตรวจสอบ code style
npm test              # รัน unit tests
npm run android -- --reset-cache  # รีเซ็ต cache และรัน
```

### Backend Commands
```bash
cd arappbackend

npm run start         # รัน production build
npm run start:dev    # รัน development mode (watch mode)
npm run build        # build project
npm run lint         # ตรวจสอบ code style
npm test             # รัน unit tests
npm run test:e2e     # รัน end-to-end tests
```

---

## 📊 Project Structure

```
My-AR-Project-Work/
├── Ar-wheel-app/                 # Frontend (React Native)
│   ├── src/
│   │   ├── components/           # UI Components
│   │   ├── screens/              # Screen Pages
│   │   ├── navigation/           # Navigation Config
│   │   ├── services/             # API Services
│   │   ├── context/              # Context API
│   │   ├── data/                 # Mock Data
│   │   └── utils/                # Utilities
│   ├── android/                  # Android Native Code
│   ├── ios/                      # iOS Native Code
│   ├── package.json
│   └── tsconfig.json
│
└── arappbackend/                 # Backend (NestJS)
    ├── src/
    │   ├── auth/                 # Authentication Module
    │   ├── modules/              # Business Logic
    │   │   ├── users/
    │   │   ├── stores/
    │   │   ├── models/
    │   │   ├── categoriesandtags/
    │   │   ├── logs/
    │   │   └── admins/
    │   ├── firebase/             # Firebase Service
    │   ├── config/               # Configuration
    │   └── main.ts               # Entry Point
    ├── test/                     # E2E Tests
    ├── package.json
    └── tsconfig.json
```

---

## 🐛 Troubleshooting

### ปัญหา: "command not found: react-native"
```bash
# วิธีแก้:
npm install -g @react-native-community/cli
```

### ปัญหา: "ANDROID_HOME not set"
```powershell
# วิธีแก้ (Windows PowerShell - Admin):
[System.Environment]::SetEnvironmentVariable("ANDROID_HOME", "C:\Users\<YourUsername>\AppData\Local\Android\Sdk", "User")
```

### ปัญหา: Metro Bundler timeout
```bash
# วิธีแก้:
npm start -- --reset-cache
```

### ปัญหา: "Port 3001 is already in use"
```bash
# วิธีแก้ (Windows PowerShell):
Get-Process -Id (Get-NetTCPConnection -LocalPort 3001).OwningProcess | Stop-Process -Force

# หรือใช้ port อื่น โดยแก้ .env
API_PORT=3002
```

### ปัญหา: MySQL connection failed
```bash
# ตรวจสอบ MySQL Status
mysql -u root -p -e "SELECT 1;"

# หรือเริ่มบริการ MySQL ใหม่:
# Windows: Services > MySQL80 > Start
```

### ปัญหา: Gradle build error
```bash
# วิธีแก้:
cd Ar-wheel-app
./gradlew clean
./gradlew build
```

---

## 📚 Documentation & Resources

- [React Native Documentation](https://reactnative.dev)
- [NestJS Documentation](https://docs.nestjs.com)
- [TypeORM Documentation](https://typeorm.io)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Android Studio Documentation](https://developer.android.com/studio/intro)

---

## 👥 Team & Support

หากมีปัญหาหรือข้อสงสัย:
- ตรวจสอบ GitHub Issues
- อ่าน Documentation ข้างต้น
- ติดต่อทีมพัฒนา

---

## 📝 License

This project is private and confidential.

---

**ปรับปรุงล่าสุด:** 15 กุมภาพันธ์ 2026

**หมายเหตุ:** ให้แน่ใจว่ามีการติดตั้งและตั้งค่า Environment Variables ทั้งหมดให้เรียบร้อยก่อนดำเนินการต่อ
