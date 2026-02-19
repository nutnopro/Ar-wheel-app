import { Module } from '@nestjs/common';
import { LogsController } from './logs.controller';
import { LogsService } from './logs.service';
import { FirebaseService } from 'src/firebase/firebase.service';

@Module({
  controllers: [LogsController],
  providers: [LogsService,FirebaseService],
    exports: [ LogsService]

})
export class LogsModule {}
