import { IsNotEmptyObject, IsString } from 'class-validator';
export class CreateTeacherDto {
  @IsString()
  idTeacher: string;

  @IsString()
  @IsNotEmptyObject()
  idFaculty: string;
}
