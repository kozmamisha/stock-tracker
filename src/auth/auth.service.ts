import { Injectable } from '@nestjs/common';
import { FirebaseAdminService } from '../firebase/firebase-admin.service'; // Import FirebaseAdminService if used
import { auth } from 'firebase-admin'; // Import Firebase types if used

@Injectable()
export class AuthService {
  constructor(private readonly firebaseAdminService: FirebaseAdminService) {}

  async register(email: string, password: string): Promise<auth.UserRecord> {
    try {
      return await this.firebaseAdminService.admin
        .auth()
        .createUser({ email, password });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
