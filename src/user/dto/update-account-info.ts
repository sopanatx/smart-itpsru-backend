import {
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
} from 'class-validator';
export class UpdateAccountInfoDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  accountId: string;

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
}
