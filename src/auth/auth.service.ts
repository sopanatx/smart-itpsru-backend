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
import axios from 'axios';
import * as crypto from 'crypto';
import * as CryptoJS from 'crypto-js';
import { DecryptCipherText, EncryptCipherText } from '../utils/crypto';
import { RefreshTokenValidateDto } from './dto/refreshToken.dto';
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
    const {
      id,
      studentId,
      studentFirstName,
      studentLastName,
      userLevel,
    } = getPayload;
    const refreshToken = await EncryptCipherText(
      studentFirstName + ' ' + studentLastName,
      studentId,
    );

    const updateRefreshToken = await this.prisma.account.update({
      where: {
        id,
      },
      data: {
        refreshToken,
      },
    });
    const payload = {
      aud: id,
      username: studentId,
      studentName: studentFirstName + ' ' + studentLastName,
      userLevel: userLevel,
    };

    const accessToken = this.jwtService.sign(payload);
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
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
    let profileImageUrl = `https://reg.psru.ac.th/WebApp1/std_name/${admissionYear}/${studentId}.jpg`;

    const saveInfo = await this.userService.updateAccountInfo({
      accountId,
      nickname,
      educateGroup,
      admissionYear,
      phoneNumber,
      profileImageUrl,
    });
    if (createdUser && saveInfo) {
      return this.localAuthLogin({ studentId, studentPassword });
    }
  }
  async validateRefreshToken(
    refreshTokenValidateDto: RefreshTokenValidateDto,
    user,
  ): Promise<object> {
    const { refreshToken } = refreshTokenValidateDto;
    const { username } = user;
    const getDecrypt = await DecryptCipherText(refreshToken);
    console.log(getDecrypt['username']);
    if (getDecrypt['username'] != username)
      throw new UnauthorizedException(
        `Account: ${username} not have permission to use this function.`,
      );
    const checkRefreshToken = await this.prisma.account.findUnique({
      where: {
        studentId: `${username}`,
      },
      select: {
        refreshToken: true,
      },
    });
    if (checkRefreshToken['refreshToken'] != refreshToken) {
      throw new UnauthorizedException('refreshToken does not exist.');
    }
    return getDecrypt;
  }
}
