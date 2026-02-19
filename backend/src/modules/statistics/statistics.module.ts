import { Module } from '@nestjs/common';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { FirebaseService } from 'src/firebase/firebase.service';

@Module({
  controllers: [StatisticsController],
  providers: [StatisticsService, FirebaseService],
  exports: [StatisticsService]
})
export class StatisticsModule {}
