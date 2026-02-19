import { Module } from '@nestjs/common';
import { CategoriesandtagsController } from './categories-and-tags.controller';
import { CategoriesandtagsService } from './categories-and-tags.service';
import { FirebaseService } from 'src/firebase/firebase.service';

@Module({
  controllers: [CategoriesandtagsController],
  providers: [CategoriesandtagsService,FirebaseService],
      exports: [CategoriesandtagsService]
})
export class CategoriesandtagsModule {}
