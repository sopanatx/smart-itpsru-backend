import { Injectable, NotFoundException } from '@nestjs/common';
import {
  AccountInfoWhereUniqueInput,
  AccountWhereInput,
  AccountWhereUniqueInput,
} from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async findOne(where: AccountInfoWhereUniqueInput): Promise<any> {
    const getAccountInfo = await this.prisma.accountInfo.findOne({
      where,
      include: {
        Account: {
          select: {
            studentId: true,
            studentEmail: true,
            studentFirstName: true,
            studentLastName: true,
            userLevel: true,
          },
        },
      },
    });
    if (!getAccountInfo) throw new NotFoundException();

    return { getAccountInfo };
  }
  async searchStudent(where: AccountWhereUniqueInput): Promise<any> {
    console.log("searchStudent:",where);
    const search = await this.prisma.account.findOne({
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
}
