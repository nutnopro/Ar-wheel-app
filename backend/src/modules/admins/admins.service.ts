import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateAdminDto, UpdateAdminDto } from './dto/admins.dto';
import { FirebaseService } from '../../firebase/firebase.service';

@Injectable()
export class AdminsService {
    private adminsCollection: admin.firestore.CollectionReference;
    private firestore: admin.firestore.Firestore;
    private auth: admin.auth.Auth;

    constructor(private firebaseService: FirebaseService) {}

    private initCollections() {
        if (!this.firestore || !this.auth) {
            this.firestore = this.firebaseService.firestore;
            this.auth = this.firebaseService.auth;
            this.adminsCollection = this.firestore.collection('admins');
            console.log('AdminsService: Firestore (Firestore, Auth) and adminsCollection initialized via FirebaseService.');
        }
    }
    
    async create(data: CreateAdminDto) {
        this.initCollections();
        const { username, email, password } = data;
        const plainData = JSON.parse(JSON.stringify(data));
        delete plainData.password;

        // ตรวจสอบว่า email ซ้ำหรือไม่
        if (email) {
            const emailExists = await this.adminsCollection.where('email', '==', email).get();
            if (!emailExists.empty) {
                throw new BadRequestException('ผู้ดูแลระบบที่ใช้อีเมลนี้มีอยู่แล้ว');
            }
        }

        // ตรวจสอบว่า username ซ้ำหรือไม่
        if (username) {
            const nameExists = await this.adminsCollection.where('username', '==', username).get();
            if (!nameExists.empty) {
                throw new BadRequestException('ผู้ดูแลระบบที่มีชื่อผู้ใช้นี้มีอยู่แล้ว');
            }
        }

        // สร้างใน Firebase Auth
        let adminRecord;
        try {
            adminRecord = await this.auth.createUser({
                email,
                password,
                displayName: username,
            });
        } catch (error) {
            if (error.code === 'auth/email-already-exists') {
                throw new BadRequestException('ผู้ดูแลระบบที่มีอีเมลนี้มีอยู่แล้วใน Firebase Auth.');
            } else if (error.code === 'auth/invalid-password') {
                throw new BadRequestException('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร');
            }
            throw new BadRequestException(error.message);
        }

        // บันทึก Firestore
        const now = new Date();
        const newAdmin = {
            email,
            username,
            ...plainData,
            createdAt: now,
            updatedAt: now,
        };

        await this.adminsCollection.doc(adminRecord.uid).set(newAdmin);
        return { id: adminRecord.uid, ...newAdmin };
    }

    async findAll() {
        this.initCollections();
        const snapshot = await this.adminsCollection.get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    async findOne(adminId: string) {
        this.initCollections();
        const adminDoc = await this.adminsCollection.doc(adminId).get();
        if (!adminDoc.exists) {
            throw new NotFoundException(`ไม่พบผู้ดูแลระบบที่มี ID ${adminId}`);
        }
        return { id: adminDoc.id, ...adminDoc.data() };
    }

    async update(adminId: string, updateAdminDto: UpdateAdminDto) {
        this.initCollections();

        const adminDoc = await this.adminsCollection.doc(adminId).get();
        if (!adminDoc.exists) {
            throw new NotFoundException(`ไม่พบผู้ดูแลระบบที่มี ID ${adminId}`);
        }

        const plainUpdateData = JSON.parse(JSON.stringify(updateAdminDto));
        plainUpdateData.updatedAt = new Date();

        // ถ้ามีการอัปเดต email หรือ password → sync Firebase Auth ด้วย
        try {
            const updateAuthData: any = {};
            if (updateAdminDto.email) updateAuthData.email = updateAdminDto.email;
            if (updateAdminDto.password) updateAuthData.password = updateAdminDto.password;
            if (updateAdminDto.username) updateAuthData.displayName = updateAdminDto.username;

            if (Object.keys(updateAuthData).length > 0) {
                await this.auth.updateUser(adminId, updateAuthData);
            }
        } catch (error) {
            throw new BadRequestException(`ไม่สามารถอัปเดต Firebase Auth ได้: ${error.message}`);
        }

        await this.adminsCollection.doc(adminId).update(plainUpdateData);

        const updatedAdminDoc = await this.adminsCollection.doc(adminId).get();
        return { id: updatedAdminDoc.id, ...updatedAdminDoc.data() };
    }

    async remove(adminId: string) {
        this.initCollections();
        const adminDoc = await this.adminsCollection.doc(adminId).get();
        if (!adminDoc.exists) {
            throw new NotFoundException(`ไม่พบผู้ดูแลระบบที่มี ID ${adminId}`);
        }

        // ลบจาก Firebase Auth
        try {
            await this.auth.deleteUser(adminId);
            console.log(`Admin ${adminId} deleted from Firebase Auth.`);
        } catch (error) {
            console.warn(`ไม่สามารถลบผู้ดูแลระบบจาก Firebase Auth ได้: ${error.message}`);
        }

        // ลบจาก Firestore
        await this.adminsCollection.doc(adminId).delete();
        return { message: `ลบผู้ดูแลระบบที่มี ID ${adminId} สำเร็จ` };
    }
}
