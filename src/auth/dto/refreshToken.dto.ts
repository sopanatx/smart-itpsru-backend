import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
export class RefreshTokenValidateDto {
  @IsString()
  @IsOptional()
  accessToken: string;

  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
