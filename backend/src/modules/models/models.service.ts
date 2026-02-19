import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ModelDimensionsDto, ModelFileUrlsDto } from './dto/models.dto';
import { FirebaseService } from '../../firebase/firebase.service';

@Injectable()
export class ModelsService {
    private modelsCollection: admin.firestore.CollectionReference;
    private firestore: admin.firestore.Firestore;

    constructor(private firebaseService: FirebaseService) {}

    private initCollections() {
        if (!this.firestore) {
            this.firestore = this.firebaseService.firestore;
            this.modelsCollection = this.firestore.collection('models');
            console.log('ModelsService: Firebase Firestore and modelsCollection initialized.');
        }
    }

    async create(data: ModelDimensionsDto) {
        this.initCollections();

        const now = new Date();
        const newModel = {
            ...data,
            createdAt: now,
            updatedAt: now,
        };

        const docRef = await this.modelsCollection.add(newModel);
        return { id: docRef.id, ...newModel };
    }

    async findAll() {
        this.initCollections();
        const snapshot = await this.modelsCollection.get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    async findOne(mid: string) {
        this.initCollections();
        const modelDoc = await this.modelsCollection.doc(mid).get();
        if (!modelDoc.exists) {
            throw new NotFoundException(`Model with ID ${mid} not found.`);
        }
        return { id: modelDoc.id, ...modelDoc.data() };
    }

    async update(mid: string, updateDto: ModelFileUrlsDto) {
        this.initCollections();

        const modelDoc = await this.modelsCollection.doc(mid).get();
        if (!modelDoc.exists) {
            throw new NotFoundException(`Model with ID ${mid} not found.`);
        }

        const plainUpdateData = JSON.parse(JSON.stringify(updateDto));
        plainUpdateData.updatedAt = new Date();

        await this.modelsCollection.doc(mid).update(plainUpdateData);

        const updatedModelDoc = await this.modelsCollection.doc(mid).get();
        return { id: updatedModelDoc.id, ...updatedModelDoc.data() };
    }

    async remove(mid: string) {
        this.initCollections();
        const modelDoc = await this.modelsCollection.doc(mid).get();
        if (!modelDoc.exists) {
            throw new NotFoundException(`Model with ID ${mid} not found.`);
        }

        await this.modelsCollection.doc(mid).delete();
        return { message: `Model with ID ${mid} successfully deleted.` };
    }
}
