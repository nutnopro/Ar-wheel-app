import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateStoreStatisticsDto, UpdateStoreStatisticsDto } from './dto/store-statistics.dto';
import { FirebaseService } from '../../firebase/firebase.service';

@Injectable()
export class StatisticsService {
    private statisticsCollection: admin.firestore.CollectionReference;
    private firestore: admin.firestore.Firestore;

    constructor(private firebaseService: FirebaseService) {}

    private initCollections() {
        if (!this.firestore) {
            this.firestore = this.firebaseService.firestore;
            this.statisticsCollection = this.firestore.collection('statistics');
            console.log('StatisticsService: Firebase Firestore and statisticsCollection initialized via FirebaseService.');
        }
    }

    async create(data: CreateStoreStatisticsDto) {
        this.initCollections();

        // ตรวจสอบซ้ำ (ถ้าจำเป็น) เช่น totalModels ต้องไม่ซ้ำ หรือเงื่อนไขอื่น
        // ตัวอย่าง: ไม่ให้สร้างซ้ำตาม totalModels
        const exists = await this.statisticsCollection
            .where('totalModels', '==', data.totalModels)
            .get();

        if (!exists.empty) {
            throw new BadRequestException('Statistics with this totalModels already exists.');
        }

        const now = new Date();
        const newStatistics = {
            ...data,
            createdAt: now,
            updatedAt: now,
        };

        const docRef = await this.statisticsCollection.add(newStatistics);
        return { id: docRef.id, ...newStatistics };
    }

    async findAll() {
        this.initCollections();
        const snapshot = await this.statisticsCollection.get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    async findOne(sid: string) {
        this.initCollections();
        const statisticsDoc = await this.statisticsCollection.doc(sid).get();
        if (!statisticsDoc.exists) {
            throw new NotFoundException(`Statistics with ID ${sid} not found.`);
        }
        return { id: statisticsDoc.id, ...statisticsDoc.data() };
    }

    async update(sid: string, updateDto: UpdateStoreStatisticsDto) {
        this.initCollections();

        const statisticsDoc = await this.statisticsCollection.doc(sid).get();
        if (!statisticsDoc.exists) {
            throw new NotFoundException(`Statistics with ID ${sid} not found.`);
        }

        const plainUpdateData = JSON.parse(JSON.stringify(updateDto));
        plainUpdateData.updatedAt = new Date();

        await this.statisticsCollection.doc(sid).update(plainUpdateData);

        const updatedStatisticsDoc = await this.statisticsCollection.doc(sid).get();
        return { id: updatedStatisticsDoc.id, ...updatedStatisticsDoc.data() };
    }

    async remove(sid: string) {
        this.initCollections();
        const statisticsDoc = await this.statisticsCollection.doc(sid).get();
        if (!statisticsDoc.exists) {
            throw new NotFoundException(`Statistics with ID ${sid} not found.`);
        }

        await this.statisticsCollection.doc(sid).delete();
        return { message: `Statistics with ID ${sid} successfully deleted.` };
    }
}
