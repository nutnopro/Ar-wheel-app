// src/auth/firebase-auth.guard.ts
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { FirebaseService } from 'src/firebase/firebase.service';
  
  @Injectable()
  export class FirebaseAuthGuard implements CanActivate {
    constructor(private firebaseService: FirebaseService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const req = context.switchToHttp().getRequest();
      const authHeader =
        req.headers['authorization'] || req.headers['Authorization'];
  
      if (!authHeader || typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException('Missing or invalid Authorization header');
      }
  
      const token = authHeader.split(' ')[1];
  
      try {
        const decodedToken = await this.firebaseService.auth.verifyIdToken(token);
        req.user = { uid: decodedToken.uid, email: decodedToken.email };
        return true;
      } catch (err) {
        throw new UnauthorizedException('Invalid or expired token');
      }
    }
  }