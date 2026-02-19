import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { FirebaseService } from '../../firebase/firebase.service';

@Injectable()
export class UsersService {
    private usersCollection: admin.firestore.CollectionReference;
    private firestore: admin.firestore.Firestore;
    private auth: admin.auth.Auth;

    constructor(private firebaseService: FirebaseService) { }

    private initCollections() {
        if (!this.firestore || !this.auth) {
            this.firestore = this.firebaseService.firestore;
            this.auth = this.firebaseService.auth;
            this.usersCollection = this.firestore.collection('users');
            console.log('UsersService: Firebase services (Firestore, Auth) and usersCollection initialized via FirebaseService.');
        }
    }

    async create(data: CreateUserDto) {
        this.initCollections()
        const { email, username, password } = data;
        const plainData = JSON.parse(JSON.stringify(data));
        delete plainData.email;
        delete plainData.username;
        delete plainData.password;


        const emailExists = await this.usersCollection.where('email', '==', email).get();
        if (!emailExists.empty) {
            throw new BadRequestException('ผู้ที่ใช้อีเมลนี้มีอยู่แล้ว');
        }
        const usernameExists = await this.usersCollection.where('username', '==', username).get();
        if (!usernameExists.empty) {
            throw new BadRequestException('ผู้ใช้ที่ใช้ชื่อนี้มีอยู่แล้ว');
        }

        let userRecord;
        try {
            userRecord = await this.auth.createUser({
                email,
                password,
                displayName: username,
            });
        } catch (error) {
            if (error.code === 'auth/email-already-exists') {
                throw new BadRequestException('มีผู้ใช้อีเมลนี้อยู่แล้วใน Firebase Auth.');
            } else if (error.code === 'auth/invalid-password') {
                throw new BadRequestException('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร');
            }
            throw new BadRequestException(error.message);
        }
        const now = new Date();
        const newUser = {
            email,
            username,
            ...plainData,
            createdAt: now,
            lastPasswordChange: now,
            lastLoginAt: now,
            lastVisitAt: now,
        };
        await this.usersCollection.doc(userRecord.uid).set(newUser);
        return newUser;
    }

    async findAll() {
        this.initCollections()
        const snapshot = await this.usersCollection.get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    async findOne(uid: string) {
        this.initCollections()
        const userDoc = await this.usersCollection.doc(uid).get();
        if (!userDoc.exists) {
            throw new NotFoundException(`ไม่พบผู้ใช้ที่มี ID ${uid}`);
        }
        return { id: userDoc.id, ...userDoc.data() };
    }

    async update(uid: string, updateUserDto: UpdateUserDto) {
        this.initCollections();

        const userDoc = await this.usersCollection.doc(uid).get();
        if (!userDoc.exists) {
            throw new NotFoundException(`ไม่พบผู้ใช้ที่มี ID ${uid}`);
        }

        const plainUpdateData = JSON.parse(JSON.stringify(updateUserDto));

        await this.usersCollection.doc(uid).update(plainUpdateData);

        const updatedUserDoc = await this.usersCollection.doc(uid).get();
        return { id: updatedUserDoc.id, ...updatedUserDoc.data() };
    }

    async updateUserRole(uid: string, role: string) {
        this.initCollections();

        // ตรวจสอบว่ามี user นี้อยู่จริงหรือไม่
        const userDoc = await this.usersCollection.doc(uid).get();
        if (!userDoc.exists) {
            throw new NotFoundException(`ไม่พบผู้ใช้ที่มี ID ${uid}`);
        }

        const userData = userDoc.data();
        const oldRole = userData?.role || 'unknown';

        // อัปเดต role ใน Firestore
        await this.usersCollection.doc(uid).update({
            role: role,
            updatedAt: new Date(),
        });

        // บันทึก Log สำหรับ Audit Trail
        const logsCollection = this.firestore.collection('logs');
        await logsCollection.add({
            action: 'UPDATE_USER_ROLE',
            userId: uid,
            oldRole: oldRole,
            newRole: role,
            timestamp: new Date(),
            details: `Role changed from ${oldRole} to ${role}`,
        });

        console.log(`Role updated for user ${uid}: ${oldRole} -> ${role}`);

        // ส่งข้อมูล user ที่อัปเดตแล้วกลับไป
        const updatedUserDoc = await this.usersCollection.doc(uid).get();
        return { id: updatedUserDoc.id, ...updatedUserDoc.data() };
    }

    async remove(uid: string) {
        this.initCollections()
        const userDoc = await this.usersCollection.doc(uid).get();
        if (!userDoc.exists) {
            throw new NotFoundException(`ไม่พบผู้ใช้ที่มี ID ${uid}`);
        }
        try {
            await this.auth.deleteUser(uid);
            console.log(`User ${uid} deleted from Firebase Auth.`);
        } catch (error) {
            console.warn(`ไม่สามารถลบผู้ใช้จาก Firebase Auth ได้: ${error.message}`);
        }
        await this.usersCollection.doc(uid).delete();
        return { message: `ลบผู้ใช้ที่มี ID ${uid} สำเร็จ` };
    }

    // async addFavorite(userId: string, modelId: string) {
    //     this.initCollections()
    //     const userRef = this.usersCollection.doc(userId);
    //     const userDoc = await userRef.get();

    //     if (!userDoc.exists) {
    //         throw new NotFoundException(`User with ID ${userId} not found.`);
    //     }

    //     const favorites = userDoc.data()?.favorites || [];
    //     if (favorites.some(fav => fav.modelId === modelId)) {
    //         throw new BadRequestException('Model is already in favorites.');
    //     }

    //     const newFavorite = { modelId, addedAt: new Date() };
    //     await userRef.update({
    //         favorites: admin.firestore.FieldValue.arrayUnion(newFavorite),
    //     });
    //     return newFavorite;
    // }

    // async removeFavorite(userId: string, modelId: string) {
    //     this.initCollections()
    //     const userRef = this.usersCollection.doc(userId);
    //     const userDoc = await userRef.get();

    //     if (!userDoc.exists) {
    //         throw new NotFoundException(`User with ID ${userId} not found.`);
    //     }

    //     const favorites = userDoc.data()?.favorites || [];
    //     const updatedFavorites = favorites.filter(fav => fav.modelId !== modelId);

    //     if (favorites.length === updatedFavorites.length) {
    //         throw new BadRequestException('Model not found in favorites.');
    //     }

    //     await userRef.update({
    //         favorites: updatedFavorites,
    //     });
    //     return { message: `Model ${modelId} removed from favorites.` };
    // }

    // async addFollowing(userId: string, storeId: string) {
    //     this.initCollections()
    //     const userRef = this.usersCollection.doc(userId);
    //     const userDoc = await userRef.get();

    //     if (!userDoc.exists) {
    //         throw new NotFoundException(`User with ID ${userId} not found.`);
    //     }

    //     const following = userDoc.data()?.following || [];
    //     if (following.some(foll => foll.storeId === storeId)) {
    //         throw new BadRequestException('Store is already being followed.');
    //     }

    //     const newFollowing = { storeId, followedAt: new Date() };
    //     await userRef.update({
    //         following: admin.firestore.FieldValue.arrayUnion(newFollowing),
    //     });
    //     return newFollowing;
    // }

    // async removeFollowing(userId: string, storeId: string) {
    //     this.initCollections()
    //     const userRef = this.usersCollection.doc(userId);
    //     const userDoc = await userRef.get();

    //     if (!userDoc.exists) {
    //         throw new NotFoundException(`User with ID ${userId} not found.`);
    //     }

    //     const following = userDoc.data()?.following || [];
    //     const updatedFollowing = following.filter(foll => foll.storeId !== storeId);

    //     if (following.length === updatedFollowing.length) {
    //         throw new BadRequestException('Store not found in following list.');
    //     }

    //     await userRef.update({
    //         following: updatedFollowing,
    //     });
    //     return { message: `Store ${storeId} removed from following list.` };
    // }
}