import { IsString, MaxLength, MinLength, IsEmail } from 'class-validator';

export class LocalAuthRegisterDto {
  @IsString()
  @MinLength(10)
  @MaxLength(10)
  studentId: string;

  @IsString()
  @MaxLength(255)
  studentFirstName: string;

  @IsString()
  @MaxLength(255)
  studentLastName: string;

  @IsEmail()
  @MaxLength(100)
  studentEmail: string;

  @IsString()
  @MinLength(5)
  @MaxLength(255)
  studentPassword: string;
}
