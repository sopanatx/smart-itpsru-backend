import {
  Controller,
  Get,
  Param,
  ForbiddenException,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { PrismaService } from './prisma/prisma.service';
import { stringify } from 'querystring';
import { AccountInfo } from './model/accountInfo.model';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  getHello(): any {
    const prisma = new PrismaClient();
    throw new ForbiddenException();
  }

  @Get('/appversion')
  getAppVersion(): any {
    return {
      status: 'OK',
      appInfo: {
        packageName: 'th.in.pleum.itpsruplus',
        version: '1.9.6',
        versionCode: 96,
        currentServerTime: `${Date.now()}`,
        isInMaintenance: false,
      },
    };
  }
}
