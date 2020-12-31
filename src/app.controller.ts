import {
  Controller,
  Get,
  Param,
  ForbiddenException,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaClient, AccountInfoWhereUniqueInput } from '@prisma/client';
// or const { PrismaClient } = require('@prisma/client')
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

  @Get('/appVersion')
  getAppVersion(): any {
    return {
      status: 'OK',
      appInfo: {
        version: '1.7.0-BETA',
        versionCode: 70,
        currentServerTime: `${Date.now()}`,
        isInMaintenance: false,
      },
    };
  }
}
