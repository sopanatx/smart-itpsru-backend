import { Injectable, NotFoundException } from '@nestjs/common';
import {
  AccountInfoWhereUniqueInput,
  AccountWhereInput,
  AccountWhereUniqueInput,
} from '@prisma/client';
import { account } from 'src/model/account.model';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateAccountInfoDto } from './dto/update-account-info';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  //ส่วนนี้จะแสดงข้อมูลที่ละเอียดกว่าค้นหาโดย รหัสนักศึกษา ดังนั้น ส่วนนี้จึงใช้เฉพาะ Authorized user เท่านั้น
  async findOne(where: AccountInfoWhereUniqueInput): Promise<any> {
    const getAccountInfo = await this.prisma.account.findUnique({
      where,
      select: {
        id: true,
        studentId: true,
        studentEmail: true,
        studentFirstName: true,
        studentLastName: true,
        userLevel: true,
        lastLogin: true,
        isActivate: true,
        AccountInfo: {
          select: {
            id: true,
            accountId: true,
            nickname: true,
            graduateSchool: true,
            admissionYear: true,
            educateGroup: true,
            profileImageUrl: true,
            canContactAddress: true,
            currentAddress: true,
            workAddress: true,
            phoneNumber: true,
            facebookAccount: true,
            lineID: true,
            privacyPermission: true,
          },
        },
      },
    });
    if (!getAccountInfo) throw new NotFoundException();

    return { getAccountInfo };
  }
  async searchStudent(where: AccountWhereUniqueInput): Promise<any> {
    console.log('searchStudent:', where);
    const search = await this.prisma.account.findUnique({
      where,
      select: {
        studentId: true,
        studentEmail: true,
        studentFirstName: true,
        studentLastName: true,

        AccountInfo: {
          select: {
            accountId: true,
            nickname: true,
            admissionYear: true,
            educateGroup: true,
            profileImageUrl: true,
            privacyPermission: true,
          },
        },
      },
    });
    return search;
  }

  async updateAccountInfo(UpdateAccountInfoDto: UpdateAccountInfoDto) {
    const {
      accountId,
      nickname,
      educateGroup,
      admissionYear,
      phoneNumber,
    } = UpdateAccountInfoDto;

    const updateUser = await this.prisma.accountInfo.create({
      data: {
        nickname: nickname,
        educateGroup: +educateGroup,
        admissionYear: +admissionYear,
        Account: {
          connect: {
            id: accountId,
          },
        },
      },
    });

    console.log(updateUser);

    return UpdateAccountInfoDto;
  }
}
