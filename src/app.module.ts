import { Teacher } from './teacher/entities/teacher.entity';
import { Faculty } from './faculty/entities/faculty.entity';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { FacultyModule } from './faculty/faculty.module';
import { TeacherModule } from './teacher/teacher.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      // entities: [User, Faculty, Teacher],
      synchronize: true,
    }),
    UsersModule,
    FacultyModule,
    TeacherModule,
  ],
})
export class AppModule {}
