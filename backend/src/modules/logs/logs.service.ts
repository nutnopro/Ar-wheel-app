import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateLogDto } from './dto/logs.dto';
import { FirebaseService } from '../../firebase/firebase.service';

@Injectable()
export class LogsService {
    private logsCollection: admin.firestore.CollectionReference;
    private firestore: admin.firestore.Firestore;

    constructor(private firebaseService: FirebaseService) { }

    private initCollections() {
        if (!this.firestore) {
            this.firestore = this.firebaseService.firestore;
            this.logsCollection = this.firestore.collection('logs');
            console.log('LogsService: Firebase Firestore and logsCollection initialized.');
        }
    }

    async create(data: CreateLogDto) {
        this.initCollections();

        // กำหนด createAt เป็น Date ปัจจุบัน ถ้าไม่ได้ส่งมา
        const createdAt = data.createdAt ?? new Date();

        // เตรียมข้อมูลสำหรับบันทึก (กำหนด createAt ให้เป็นตัวแปรที่ถูกต้อง)
        const newLog = {
            ...data,
            createAt: createdAt,
        };

        const docRef = await this.logsCollection.add(newLog);
        return { id: docRef.id, ...newLog };
    }

    async findAll(limit: number = 100) {
        this.initCollections();

        // Query logs sorted by timestamp/createAt descending (newest first)
        const snapshot = await this.logsCollection
            .orderBy('timestamp', 'desc')
            .limit(limit)
            .get();

        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    async findOne(logId: string) {
        this.initCollections();
        const logDoc = await this.logsCollection.doc(logId).get();
        if (!logDoc.exists) {
            throw new NotFoundException(`Log with ID ${logId} not found.`);
        }
        return { id: logDoc.id, ...logDoc.data() };
    }

    async update(logId: string, updateData: Partial<CreateLogDto>) {
        this.initCollections();

        const logDoc = await this.logsCollection.doc(logId).get();
        if (!logDoc.exists) {
            throw new NotFoundException(`Log with ID ${logId} not found.`);
        }

        const plainUpdateData = JSON.parse(JSON.stringify(updateData));
        await this.logsCollection.doc(logId).update(plainUpdateData);

        const updatedLogDoc = await this.logsCollection.doc(logId).get();
        return { id: updatedLogDoc.id, ...updatedLogDoc.data() };
    }

    async remove(logId: string) {
        this.initCollections();
        const logDoc = await this.logsCollection.doc(logId).get();
        if (!logDoc.exists) {
            throw new NotFoundException(`Log with ID ${logId} not found.`);
        }

        await this.logsCollection.doc(logId).delete();
        return { message: `Log with ID ${logId} successfully deleted.` };
    }
}
