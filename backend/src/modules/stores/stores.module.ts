import { Module } from '@nestjs/common';
import { StoresController } from './stores.controller';
import { StoresService } from './stores.service';
import { FirebaseService } from 'src/firebase/firebase.service';

@Module({
  controllers: [StoresController],
  providers: [StoresService, FirebaseService],
  exports: [StoresService]
})
export class StoresModule {}
