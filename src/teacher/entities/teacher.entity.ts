import { User } from 'src/users/entities/user.entity';
import { Faculty } from './../../faculty/entities/faculty.entity';
import { Column, OneToOne, PrimaryColumn } from 'typeorm';
export class Teacher {
  @Column('text')
  name: string;

  @OneToOne(() => User)
  @PrimaryColumn()
  idTeacher?: User;

  @OneToOne(() => Faculty)
  idFaculty?: Faculty;
}
