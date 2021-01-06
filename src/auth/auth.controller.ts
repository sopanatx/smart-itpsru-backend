import { Controller, Get, Post, Body } from '@nestjs/common';
import { LocalAuthDto } from './dto/local-auth.dto';
import { LocalAuthRegisterDto } from './dto/local-auth-register.dto';
import { AuthService } from './auth.service';
import { tokenModel } from 'src/model/token.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/login')
  async login(@Body() localAuthDto: LocalAuthDto): Promise<tokenModel> {
    return this.authService.localAuthLogin(localAuthDto);
  }

  @Post('/register')
  async register(
    @Body() localAuthRegisterDto: LocalAuthRegisterDto,
  ): Promise<any> {
    //console.log(LocalAuthRegisterDto);
    return this.authService.localAuthRegister(localAuthRegisterDto);
  }
}
