import {
  Controller,
  Get,
  Param,
  ForbiddenException,
  UnauthorizedException,
  HttpException,
  Headers,
  BadGatewayException,
  BadRequestException,
  NotAcceptableException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { PrismaService } from './prisma/prisma.service';
import { stringify } from 'querystring';
import { AccountInfo } from './model/accountInfo.model';
import { AppVersionModel } from './model/appversion.model';
import { ApiConfig } from './constant/Config';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  getHello(): any {
    throw new NotAcceptableException();
  }

  @Get('/appversion')
  async getAppVersion(@Headers() header): Promise<AppVersionModel> {
    if (ApiConfig().IS_DEBUG == 'false' && header.apikey != ApiConfig().API_KEY)
      throw new UnauthorizedException('API Key is not valid or empty.');

    return {
      statusCode: 200,
      status: 'OK',
      serverZone: 'ap-southeast-aws-1',
      currentServerTime: `${Date.now()}`,
      isInMaintenance: process.env.IS_MAINTENANCE,
      appInfo: {
        packageName: 'th.in.pleum.itpsruplus',
        version: ApiConfig().APP_VERSION,
        versionCode: ApiConfig().APP_VERSIONCODE,
        AllowedMinimumVersion: ApiConfig().ALLOWED_MINIMUM_APP_VERSION,
      },
    };
  }
}
