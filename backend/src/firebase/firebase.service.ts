import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as path from 'path';

@Injectable()
export class FirebaseService implements OnModuleInit {
  public firestore: admin.firestore.Firestore;
  public auth: admin.auth.Auth;

  onModuleInit() {
    if (admin.apps.length == 0) {
      const serviceAccountPath = path.join(process.cwd(), 'config', 'firebase-admin-config.json');
      let serviceAccount;
      try {
        serviceAccount = require(serviceAccountPath);
      } catch (error) {
        console.error(
          `Failed to load Firebase service account key from: ${serviceAccountPath}`,
        );
        console.error(
          'Please ensure the serviceAccountKey.json file exists and is accessible.',
        );
        throw new Error(
          'Firebase service account key file not found or unreadable.',
        );
      }

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        // databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
        storageBucket: `${serviceAccount.project_id}.appspot.com`,
      });
      console.log(
        'Firebase Admin SDK initialized successfully via FirebaseService from JSON.',
      );
    } else {
      console.log('Firebase Admin SDK already initialized.');
    }

    this.firestore = admin.firestore();
    this.auth = admin.auth();
  }
  getAuth() {
    return admin.auth;
  }
}
