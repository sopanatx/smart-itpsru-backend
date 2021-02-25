import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { LocalAuthDto } from './dto/local-auth.dto';
import { LocalAuthRegisterDto } from './dto/local-auth-register.dto';
import { AuthService } from './auth.service';
import { tokenModel } from 'src/model/token.model';
import { DecryptCipherText } from '../utils/crypto';
import { JwtAuthGuard } from './strategy/jwt-auth.guard';
import { GetUser } from 'src/decorator/getuser.decorator';
import { RefreshTokenValidateDto } from './dto/refreshToken.dto';

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
    return this.authService.localAuthRegister(localAuthRegisterDto);
  }

  @Post('/refresh')
  async getRefreshToken(@Body() body): Promise<any> {
    return {};
  }
  @UseGuards(JwtAuthGuard)
  @Post('/validate_refresh')
  async validateRefreshToken(
    @Body() refreshTokenValidateDto: RefreshTokenValidateDto,
    @GetUser() user,
  ): Promise<object> {
    return await this.authService.validateRefreshToken(
      refreshTokenValidateDto,
      user,
    );
  }
}
