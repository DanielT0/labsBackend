import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { FacultyService } from './faculty.service';
import { FacultyController } from './faculty.controller';
import { Faculty } from './entities/faculty.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  controllers: [FacultyController],
  providers: [FacultyService],
  imports: [TypeOrmModule.forFeature([Faculty, User])],
})
export class FacultyModule {}
