// src/auth/roles.guard.ts
import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { ROLES_KEY, AppRole } from './roles.decorator';
  import { FirebaseService } from 'src/firebase/firebase.service';
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(
      private reflector: Reflector,
      private firebaseService: FirebaseService,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const requiredRoles = this.reflector.getAllAndOverride<AppRole[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
  
      // ถ้า endpoint นี้ไม่ได้กำหนด role ก็ผ่านไปเลย
      if (!requiredRoles || requiredRoles.length === 0) {
        return true;
      }
  
      const request = context.switchToHttp().getRequest();
      const userFromToken = request.user;
  
      if (!userFromToken?.uid) {
        throw new ForbiddenException('No user in request');
      }
  
      const firestore = this.firebaseService.firestore;
      const doc = await firestore.collection('users').doc(userFromToken.uid).get();
      const userData = doc.data();
  
      const role = userData?.role as AppRole;
  
      if (!role || !requiredRoles.includes(role)) {
        throw new ForbiddenException('Insufficient role');
      }
  
      request.userRole = role;
      return true;
    }
  }