import { IsEmail, IsString, MinLength } from 'class-validator';

export class crashlyticsDto {
  @IsEmail()
  email?: string;

}