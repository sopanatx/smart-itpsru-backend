import {
  Injectable,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LocalAuthDto } from './dto/local-auth.dto';
import { tokenModel } from 'src/model/token.model';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { LocalAuthRegisterDto } from './dto/local-auth-register.dto';
import { JwtService } from '@nestjs/jwt';
import { checkStudentMajor } from '../utils/misc';
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validatePassword(localAuthDto: LocalAuthDto): Promise<any> {
    const { studentId, studentPassword } = localAuthDto;
    const user = await this.prisma.account
      .findUnique({
        where: { studentId },
      })
      .then();
    if (!user) throw new NotFoundException('User not found!');

    // นำ Password ที่ได้จาก User ไป hash กับ salt บน db ถ้าตรงกันก็ return ค่าออกไป
    // หากรหัสผ่านไม่ตรงกันให้ thorw error ออกไป
    const hash = await bcrypt.hash(studentPassword, user.studentPasswordSalt);
    if (hash != user.studentPassword) throw new UnauthorizedException();
    await this.prisma.account.update({
      where: { studentId: studentId },
      data: { lastLogin: new Date(), updatedAt: new Date() },
    });
    console.log('[DBG] DATE:', new Date());
    return user;
  }

  async localAuthLogin(localAuthDto: LocalAuthDto): Promise<tokenModel> {
    const getPayload = await this.validatePassword(localAuthDto);
    const payload = {
      aud: getPayload.id,
      username: getPayload.studentId,
      studentName:
        getPayload.studentFirstName + ' ' + getPayload.studentLastName,
      userLevel: getPayload.userLevel,
    };

    const accessToken = this.jwtService.sign(payload);
    return {
      accessToken: accessToken,
    };
  }

  async localAuthRegister(
    localAuthRegister: LocalAuthRegisterDto,
  ): Promise<any> {
    const {
      studentId,
      studentFirstName,
      studentLastName,
      studentEmail,
      studentPassword,
      nickname,
      educateGroup,
      admissionYear,
      phoneNumber,
    } = localAuthRegister;
    console.log({ studentId });
    await checkStudentMajor(studentId);
    const user = await this.prisma.account.findUnique({
      where: { studentId },
    });
    if (user)
      throw new ConflictException(
        `Student ID: "${studentId}" already exist in our database.`,
      );
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(studentPassword, salt);
    const createdUser = await this.prisma.account.create({
      data: {
        studentId: studentId,
        studentEmail: studentEmail,
        studentFirstName: studentFirstName,
        studentLastName: studentLastName,
        studentPassword: hash,
        studentPasswordSalt: salt,
        userLevel: 'STUDENT',
      },
    });
    const accountId = createdUser.id;
    if (createdUser) {
      return this.localAuthLogin({ studentId, studentPassword });
    }
  }
}
