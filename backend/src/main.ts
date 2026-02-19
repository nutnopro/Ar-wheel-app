import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // ตั้งค่า Validation Pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  }));

  // ตั้งค่า Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('AR App API')
    .setDescription('API documentation for the AR App')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // เปิด CORS
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // ⚠️ จุดสำคัญที่แก้ไข: 
  // เปลี่ยนจาก 3210 เป็น 3000 เพื่อให้ตรงกับที่ Frontend เรียก
  // คงค่า '0.0.0.0' ไว้เพื่อให้ Emulator มองเห็นเครื่องเรา
  await app.listen(process.env.PORT || 3000, '0.0.0.0');

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();