import { IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';
export class LocalAuthDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(10)
  studentId: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  studentPassword: string;
}
