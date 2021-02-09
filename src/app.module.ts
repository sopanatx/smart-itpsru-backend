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
@Module({
  imports: [UserModule, AuthModule, AdminModule],
  controllers: [AppController, StudentController],
  providers: [AppService, PrismaService, StudentService, JwtStrategy],
})
export class AppModule {}
