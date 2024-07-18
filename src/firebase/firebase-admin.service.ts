import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as serviceAccount from '../../config/serviceAccountKey.json';

@Injectable()
export class FirebaseAdminService implements OnModuleInit {
  public admin: admin.app.App;

  onModuleInit() {
    this.admin = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
  }
}
