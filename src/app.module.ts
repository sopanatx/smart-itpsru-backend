import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { StudentService } from './student/student.service';
import { StudentController } from './student/student.controller';
import { JwtStrategy } from './auth/strategy/jwt.strategy';
import { AdminModule } from './admin/admin.module';
import { NewsModule } from './news/news.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    UserModule,
    AuthModule,
    AdminModule,
    NewsModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController, StudentController],
  providers: [AppService, PrismaService, StudentService, JwtStrategy],
})
export class AppModule {}
