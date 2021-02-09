import {
  Controller,
  ForbiddenException,
  Get,
  GoneException,
  NotAcceptableException,
} from '@nestjs/common';

@Controller('api/admin')
export class AdminController {
  @Get('/')
  async getHelloAdmin(): Promise<any> {
    throw new ForbiddenException();
  }
}
