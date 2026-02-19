import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateStoreDto, UpdateStoreDto, WheelDto } from './dto/stores.dto';
import { FirebaseService } from '../../firebase/firebase.service';

@Injectable()
export class StoresService {
    private storesCollection: admin.firestore.CollectionReference;
    private firestore: admin.firestore.Firestore;
    private auth: admin.auth.Auth;
    constructor(private firebaseService: FirebaseService) {}

    private initCollections() {
        if (!this.firestore || !this.auth) {
            this.firestore = this.firebaseService.firestore;
            this.auth = this.firebaseService.auth;
            this.storesCollection = this.firestore.collection('stores');
            console.log('StoresService: Firestore services (Firestore, Auth) and storesCollection initialized via FirebaseService.');
        }
    }
    
    async create(data: CreateStoreDto) {
        this.initCollections();
        const { storeName, email, password, wheels } = data;
        const plainData = JSON.parse(JSON.stringify(data));

        // ตรวจสอบ email ซ้ำ
        if (email) {
            const emailExists = await this.storesCollection.where('email', '==', email).get();
            if (!emailExists.empty) {
                throw new BadRequestException('ร้านค้าที่ใช้อีเมลนี้มีอยู่แล้ว');
            }
        }

        // ตรวจสอบ storeName ซ้ำ
        if (storeName) {
            const nameExists = await this.storesCollection.where('storeName', '==', storeName).get();
            if (!nameExists.empty) {
                throw new BadRequestException('ร้านค้าที่ใช้ชื่อนี้มีอยู่แล้ว');
            }
        }

        // ✅ สร้าง Firebase Auth User สำหรับร้านค้า
        let storeRecord: admin.auth.UserRecord | undefined;
        if (email && password) {
            try {
                storeRecord = await this.auth.createUser({
                    email,
                    password,
                    displayName: storeName,
                });
            } catch (error: any) {
                if (error.code === 'auth/email-already-exists') {
                    throw new BadRequestException('มีผู้ใช้อีเมลนี้อยู่แล้วใน Firebase Auth.');
                } else if (error.code === 'auth/invalid-password') {
                    throw new BadRequestException('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร');
                }
                throw new BadRequestException(error.message);
            }
        }

        const now = new Date();
        const newStoreRef = storeRecord 
            ? this.storesCollection.doc(storeRecord.uid) 
            : this.storesCollection.doc();

        const newStore = {
            ...plainData,
            createdAt: data.createdAt || now,
            lastLoginAt: data.lastLoginAt || now,
            updatedAt: now,
            wheels: wheels || [], // ถ้าไม่มี wheels ให้เป็น array ว่าง
        };

        await newStoreRef.set(newStore);
        return { id: newStoreRef.id, ...newStore };
    }

    async findAll() {
        this.initCollections();
        const snapshot = await this.storesCollection.get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    async findOne(storeId: string) {
        this.initCollections();
        const storeDoc = await this.storesCollection.doc(storeId).get();
        if (!storeDoc.exists) {
            throw new NotFoundException(`ไม่พบร้านค้าที่มี ID ${storeId}`);
        }
        return { id: storeDoc.id, ...storeDoc.data() };
    }

    async update(storeId: string, updateStoreDto: UpdateStoreDto) {
        this.initCollections();

        const storeDoc = await this.storesCollection.doc(storeId).get();
        if (!storeDoc.exists) {
            throw new NotFoundException(`ไม่พบร้านค้าที่มี ID ${storeId}`);
        }

        // ตรวจสอบ email ซ้ำ
        if (updateStoreDto.email) {
            const emailExists = await this.storesCollection
                .where('email', '==', updateStoreDto.email)
                .get();
            const isDifferentStore = emailExists.docs.some(doc => doc.id !== storeId);
            if (isDifferentStore) {
                throw new BadRequestException('ร้านค้าที่ใช้อีเมลนี้มีอยู่แล้ว');
            }
        }

        // ตรวจสอบ storeName ซ้ำ
        if (updateStoreDto.storeName) {
            const nameExists = await this.storesCollection
                .where('storeName', '==', updateStoreDto.storeName)
                .get();
            const isDifferentStore = nameExists.docs.some(doc => doc.id !== storeId);
            if (isDifferentStore) {
                throw new BadRequestException('ร้านค้าที่ใช้ชื่อนี้มีอยู่แล้ว');
            }
        }

        const plainUpdateData = JSON.parse(JSON.stringify(updateStoreDto));
        plainUpdateData.updatedAt = new Date();

        // ถ้า wheels เป็น undefined ให้ไม่ลบ array เดิม
        if (plainUpdateData.wheels === undefined) {
            delete plainUpdateData.wheels;
        }

        await this.storesCollection.doc(storeId).update(plainUpdateData);

        const updatedStoreDoc = await this.storesCollection.doc(storeId).get();
        return { id: updatedStoreDoc.id, ...updatedStoreDoc.data() };
    }

    async remove(storeId: string) {
        this.initCollections();
        const storeDoc = await this.storesCollection.doc(storeId).get();
        if (!storeDoc.exists) {
            throw new NotFoundException(`ไม่พบร้านค้าที่มี ID ${storeId}`);
        }

        // ✅ ลบออกจาก Firebase Auth ด้วย
        try {
            await this.auth.deleteUser(storeId);
            console.log(`Store ${storeId} deleted from Firebase Auth.`);
        } catch (error: any) {
            console.warn(`ไม่สามารถลบผู้ใช้จาก Firebase Auth ได้: ${error.message}`);
        }

        await this.storesCollection.doc(storeId).delete();
        return { message: `ลบร้านค้าที่มี ID ${storeId} สำเร็จ` };
    }
}
