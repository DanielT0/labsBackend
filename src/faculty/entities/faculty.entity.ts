import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Faculty {
  @PrimaryGeneratedColumn('uuid')
  idFaculty: string;

  @Column('text', {
    unique: true,
  })
  name: string;

  @Column('text')
  administrativeCode: string;

  @Column({ type: 'text', nullable: true })
  color: string;

  @OneToOne(() => User, (user) => user.idUser)
  labsCoordinator: User;
}
