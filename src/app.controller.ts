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

  @Get('/appVerion')
  getAppVersion(): any {
    return {
      status: 'OK',
      appInfo: {
        version: '1.0.9 (Dev)',
        versionCode:9,
        LastUpdated: `${Date.now()}`,
        isInMaintenance: false,
        isTestServer: true,
      },
    };
  }
}
