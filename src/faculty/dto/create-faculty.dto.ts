import { IsString, MinLength, IsOptional, IsUUID } from 'class-validator';
export class CreateFacultyDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  administrativeCode: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsUUID()
  @IsString()
  labsCoordinator: string;
}
