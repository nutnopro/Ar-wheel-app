import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from './dto/categories.dto';
import { FirebaseService } from '../../firebase/firebase.service';

@Injectable()
export class CategoriesandtagsService {
  private categoriesCollection: admin.firestore.CollectionReference;
  private firestore: admin.firestore.Firestore;

  constructor(private firebaseService: FirebaseService) {}

  private initCollections() {
    if (!this.firestore) {
      this.firestore = this.firebaseService.firestore;
      this.categoriesCollection = this.firestore.collection('categoriesandtags');
      console.log('CategoriesandtagsService: Firebase Firestore and categoriesCollection initialized.');
    }
  }

  async create(data: CreateCategoryDto) {
    this.initCollections();

    // ตัวอย่างตรวจสอบชื่อซ้ำ (ถ้าต้องการ)
    const exists = await this.categoriesCollection
      .where('name', '==', data.name)
      .get();

    if (!exists.empty) {
      throw new BadRequestException('Category with the same name already exists.');
    }

    const now = new Date();

    const newCategory = {
      ...data,
      createdAt: now,
      updatedAt: now,
    };

    const docRef = await this.categoriesCollection.add(newCategory);
    return { id: docRef.id, ...newCategory };
  }

  async findAll() {
    this.initCollections();

    const snapshot = await this.categoriesCollection.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async findOne(id: string) {
    this.initCollections();

    const doc = await this.categoriesCollection.doc(id).get();
    if (!doc.exists) {
      throw new NotFoundException(`Category with ID ${id} not found.`);
    }
    return { id: doc.id, ...doc.data() };
  }

  async update(id: string, updateDto: UpdateCategoryDto) {
    this.initCollections();

    const doc = await this.categoriesCollection.doc(id).get();
    if (!doc.exists) {
      throw new NotFoundException(`Category with ID ${id} not found.`);
    }

    const plainUpdateData = JSON.parse(JSON.stringify(updateDto));
    plainUpdateData.updatedAt = new Date();

    await this.categoriesCollection.doc(id).update(plainUpdateData);

    const updatedDoc = await this.categoriesCollection.doc(id).get();
    return { id: updatedDoc.id, ...updatedDoc.data() };
  }

  async remove(id: string) {
    this.initCollections();

    const doc = await this.categoriesCollection.doc(id).get();
    if (!doc.exists) {
      throw new NotFoundException(`Category with ID ${id} not found.`);
    }

    await this.categoriesCollection.doc(id).delete();
    return { message: `Category with ID ${id} successfully deleted.` };
  }
}
