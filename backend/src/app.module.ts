import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { StoresModule } from './modules/stores/stores.module';
import { AdminsModule } from './modules/admins/admins.module';
// import { StatisticsModule } from './modules/statistics/statistics.module';
// import { ModelsModule } from './modules/models/models.module';
// import { LogsModule } from './modules/logs/logs.module';
// import { CategoriesandtagsModule } from './modules/categoriesandtags/categories-and-tags.module';
import { FirebaseModule } from './firebase/firebase.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true
    }),
    FirebaseModule,
    UsersModule,
    StoresModule,
    AdminsModule,
    AuthModule,
    // StatisticsModule,
    // ModelsModule,
    // LogsModule,
    // CategoriesandtagsModule,
  ],   
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
