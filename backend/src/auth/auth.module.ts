// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { FirebaseAuthGuard } from './firebase-auth.guard';
import { RolesGuard } from './roles.guard';

@Module({
  imports: [FirebaseModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    FirebaseAuthGuard,
    RolesGuard,
  ],
  exports: [FirebaseAuthGuard, RolesGuard],
})
export class AuthModule {}