import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  // EmailAuthProvider, // ไม่ได้ใช้ Comment ออกได้
  // reauthenticateWithCredential, // ไม่ได้ใช้ Comment ออกได้
  // updatePassword, // ไม่ได้ใช้ Comment ออกได้
  // getAuth, // ไม่ได้ใช้ Comment ออกได้
} from 'firebase/auth';
import {
  // Firestore, // ไม่ได้ใช้
  collection,
  getDocs,
  query,
  documentId,
  where,
  serverTimestamp,
  addDoc,
  setDoc,
  doc,
} from 'firebase/firestore';
import { LoginDto } from './dto/login.dto';
import { auth, db } from '../../config/firebase.config';
import validator from 'validator';
import { RegisterUserDto } from './dto/register.dto';
import * as admin from 'firebase-admin';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthService {
  private usersCollection: admin.firestore.CollectionReference;
  private firestore: admin.firestore.Firestore;
  private auth: admin.auth.Auth;

  constructor(private firebaseService: FirebaseService) { }

  private initCollections() {
    if (!this.firestore || !this.auth) {
      this.firestore = this.firebaseService.firestore;
      this.auth = this.firebaseService.auth;
      this.usersCollection = this.firestore.collection('users');
      console.log(
        'UsersService: Firebase services (Firestore, Auth) and usersCollection initialized via FirebaseService.',
      );
    }
  }

  // ===== REGISTER =====
  async register(dto: RegisterUserDto) {
    const { email, password, username, phoneNumber, dateOfBirth } = dto;

    // 1. ตรวจสอบว่ามี user นี้ในระบบหรือยัง (เช็กจาก email)
    const qCheck = query(collection(db, 'users'), where('email', '==', email));
    const snapCheck = await getDocs(qCheck);

    if (!snapCheck.empty) {
      const userData = snapCheck.docs[0].data();
      // ถ้า status ไม่ใช่ deleted ให้ปฏิเสธการสมัคร
      if (userData.status !== 'deleted') {
        throw new HttpException('User already exists', HttpStatus.CONFLICT);
      }
    }

    try {
      // 2. สร้าง User ใน Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const uid = userCredential.user.uid;

      // 3. เตรียมข้อมูลลง Firestore
      const newUserContent = {
        uid: uid,
        username: username,
        email: email,
        phoneNumber: phoneNumber,
        dateOfBirth: dateOfBirth,
        role: 'user',
        status: 'active',
        createdAt: serverTimestamp(),
        firstName: null,
        lastName: null,
        updatedAt: null,
      };

      // 4. บันทึกลง Firestore
      await setDoc(doc(db, 'users', uid), newUserContent);

      // 5. บันทึก Logs
      await addDoc(collection(db, 'logs'), {
        action: 'REGISTER',
        userId: uid,
        timestamp: serverTimestamp(),
        details: `User ${email} registered successfully`,
      });

      return { message: 'Registration successful', uid: uid };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // ===== LOGIN (UPDATED & OPTIMIZED) =====
  async login(body: LoginDto) {
    let email = body.usernameOrEmail;

    // 1. ถ้าไม่ใช่ Email (แปลว่าเป็น Username) ให้ไปค้นหา Email จาก DB
    if (!validator.isEmail(body.usernameOrEmail)) {
      console.log(`Searching for username: ${body.usernameOrEmail}`);

      // ใช้ query where เพื่อดึงเฉพาะ user ที่ตรงกัน (Performance ดีขึ้นมาก)
      const q = query(
        collection(db, 'users'),
        where('username', '==', body.usernameOrEmail)
      );
      const snapshot = await getDocs(q);

      // ถ้าหา Username ไม่เจอในระบบ
      if (snapshot.empty) {
        console.warn('Username not found in DB');
        // Throw Error ทันทีเพื่อให้ Frontend รู้ว่า Login ไม่ผ่าน
        throw new HttpException('Invalid email or password', HttpStatus.UNAUTHORIZED);
      }

      // ถ้าเจอ ให้ดึง Email ออกมาใช้ Login ต่อ
      email = snapshot.docs[0].data().email;
      console.log(`Found email for username: ${email}`);
    }

    try {
      // 2. Login เข้า Firebase Auth
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email, // ใช้อีเมลที่หามาได้
        body.password,
      );

      const user = userCredential.user;
      const userDocId = user.uid;

      console.log('Login Auth Success, UID:', userDocId);

      // 3. ดึงข้อมูล Profile เพิ่มเติม
      const q = query(
        collection(db, 'users'),
        where(documentId(), '==', userDocId),
      );

      const snapshot = await getDocs(q);
      let userData = {};
      snapshot.forEach((doc) => { userData = doc.data(); });

      // 4. ส่ง Token และข้อมูลกลับไป
      return {
        access_token: await user.getIdToken(),
        refreshToken: user.refreshToken,
        user: userData,
      };

    } catch (error) {
      console.error('Login Error:', error.code, error.message);
      // ส่ง 401 Unauthorized กลับไปเสมอเมื่อ Login พลาด
      throw new HttpException('Invalid email or password', HttpStatus.UNAUTHORIZED);
    }
  }

  // ===== FORGOT PASSWORD =====
  async forgotPassword(email: string) {
    const actionCodeSettings = {
      url: 'http://localhost:3000/reset-password', // Your frontend reset page
      handleCodeInApp: false,
    };
    const resetLink = await admin
      .auth()
      .generatePasswordResetLink(email, actionCodeSettings);
    return 'forgotPassword ' + resetLink;
  }

  // ===== CHANGE PASSWORD =====
  async Changepassword(body: ChangePasswordDto) {
    this.initCollections();

    try {
      // Verify current password
      await signInWithEmailAndPassword(auth, body.email, body.oldPassword);
      console.log('Current password verified!');

      // Update password using Admin SDK
      const user = await this.auth.getUserByEmail(body.email);
      await this.auth.updateUser(user.uid, {
        password: body.newPassword,
      });
      console.log('Password updated successfully!');
    } catch (error) {
      if (error.code === 'auth/wrong-password' || error.message.includes('wrong-password')) {
        console.error('The current password you entered is incorrect.');
        throw new HttpException('Invalid current password', HttpStatus.UNAUTHORIZED);
      } else {
        console.error('Error:', error.message);
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }
    return 'Password changed successfully.';
  }
}