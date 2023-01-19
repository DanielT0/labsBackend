import { Faculty } from './../../faculty/entities/faculty.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  idUser: string;

  @Column('text', {
    unique: true,
  })
  identification: string;

  @Column('text', {
    unique: true,
  })
  email: string;

  @Column('text')
  password: string;

  @OneToOne(() => Faculty)
  faculty?: Faculty;
}
