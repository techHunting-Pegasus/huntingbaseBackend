import { IsEmail, IsNumber, isNumber, IsOptional, IsString, MinLength } from 'class-validator';
import { isUniqueViolation } from 'src/common/postgres-errors';

// export class DashboardDto {
//   owner_id?: number; 
//   bundle_id?: string;
//   description?: string;
//   name?: string;

// }
export class DashboardDto {
  @IsNumber()
  owner_id!: number;


  @IsString()
  bundle_id!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  name!: string;
}