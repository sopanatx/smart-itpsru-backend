import {
  Controller,
  Get,
  Param,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { AccountInfo } from 'src/model/accountInfo.model';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/strategy/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  //@UseGuards(JwtAuthGuard)

  @Get('find/:id')
  async findUser(@Param('id') accountId: string): Promise<AccountInfo> {
    const getUser = await this.userService.findOne({ accountId });
    console.log(getUser);
    return getUser;
  }
  @UseGuards(JwtAuthGuard)
  @Get('student/:id')
  async searchStudent(@Param('id') studentId: string): Promise<AccountInfo> {
    return await this.userService.searchStudent({ studentId });
  }
}
