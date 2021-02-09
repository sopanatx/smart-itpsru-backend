import {
  Controller,
  Get,
  Post,
  Param,
  HttpException,
  UseGuards,
  UnauthorizedException,
  ForbiddenException,
  Body,
  NotAcceptableException,
} from '@nestjs/common';
import { AccountInfo } from 'src/model/accountInfo.model';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/strategy/jwt-auth.guard';
import { GetUser } from 'src/decorator/getuser.decorator';
import { UpdateAccountInfoDto } from 'src/user/dto/update-account-info';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('find/')
  async findUser(@GetUser() user): Promise<AccountInfo> {
    const { userId } = user;
    return await this.userService.findOne(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('student/:id')
  async searchStudent(@Param('id') studentId: string): Promise<AccountInfo> {
    return await this.userService.searchStudent(studentId);
  }

  @Post('update_account_info')
  async updateAccountInfo(
    @Body() UpdateAccountInfoDto: UpdateAccountInfoDto,
  ): Promise<UpdateAccountInfoDto> {
    throw new NotAcceptableException();
  }
}
