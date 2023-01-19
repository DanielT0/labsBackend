import { User } from 'src/users/entities/user.entity';
import { Faculty } from './entities/faculty.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { UpdateFacultyDto } from './dto/update-faculty.dto';
import { Repository } from 'typeorm';

@Injectable()
export class FacultyService {
  private readonly logger = new Logger('FacultiesService');
  constructor(
    @InjectRepository(Faculty)
    private readonly facultyRepository: Repository<Faculty>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createFacultyDto: CreateFacultyDto) {
    const { administrativeCode, name, labsCoordinator, color } =
      createFacultyDto;
    const labsCoordinatorFound = await this.userRepository.findOneBy({
      idUser: labsCoordinator,
    });
    if (!labsCoordinatorFound)
      throw new NotFoundException(`User with id ${labsCoordinator} not found`);
    try {
      const faculty = this.facultyRepository.create({
        administrativeCode,
        name,
        color,
      });
      await this.facultyRepository.save(faculty);

      return { ...faculty };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }
  async findAll() {
    return await this.facultyRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} faculty`;
  }

  update(id: number, updateFacultyDto: UpdateFacultyDto) {
    return `This action updates a #${id} faculty`;
  }

  remove(id: number) {
    return `This action removes a #${id} faculty`;
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs!',
    );
  }
}
