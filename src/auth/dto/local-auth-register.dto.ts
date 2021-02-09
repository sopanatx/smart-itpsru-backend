import {
  IsString,
  MaxLength,
  MinLength,
  IsEmail,
  IsNumberString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class LocalAuthRegisterDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(10)
  studentId: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  studentFirstName: string;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  studentLastName: string;

  @IsEmail()
  @MaxLength(100)
  studentEmail: string;

  @IsString()
  @MinLength(5)
  @MaxLength(255)
  @IsNotEmpty()
  studentPassword: string;

  @IsString()
  @MaxLength(20)
  nickname: string;

  @IsNumberString()
  @IsNotEmpty()
  @MaxLength(1)
  educateGroup: number;

  @IsNumberString()
  @IsNotEmpty()
  @MaxLength(2)
  admissionYear: number;

  @IsNumberString()
  @IsNotEmpty()
  @MaxLength(10)
  phoneNumber: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  profileImageUrl: string;
}
