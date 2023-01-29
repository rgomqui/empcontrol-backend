import { IsBoolean, IsNumberString, IsString, Length, MinLength } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(3)
  surname: string;

  @IsString()
  @Length(9)
  identityNumber: string;

  @IsNumberString()
  @Length(9)
  phoneNumber: string;

  @IsBoolean()
  isActive = true;
}
