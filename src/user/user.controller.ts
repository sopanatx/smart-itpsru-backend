import { Controller, Get, Param, HttpException } from '@nestjs/common';
import { AccountInfo } from 'src/model/accountInfo.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('find/:id')
  async findUser(@Param('id') accountId: string): Promise<AccountInfo> {
    const getUser = await this.userService.findOne({ accountId });
    console.log(getUser);
    return getUser;
  }
  @Get('student/:id')
  async searchStudent(@Param('id') studentId: string): Promise<AccountInfo> {
    return await this.userService.searchStudent({ studentId });
  }
}
