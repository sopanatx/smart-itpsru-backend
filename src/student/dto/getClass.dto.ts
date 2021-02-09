import { IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';
export class getClassDto {
  @IsString()
  //  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(6)
  semester: string;
}
