import { PaginationDto } from './../common/dtos/pagination.dto';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class UsersService {
  private readonly logger = new Logger('ProductsService');
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const { ...userDetails } = createUserDto;
      const product = this.userRepository.create({
        ...userDetails,
      });
      await this.userRepository.save(product);

      return { ...product };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const users = await this.userRepository.find({
      take: limit,
      skip: offset,
    });
    return users;
  }

  async findOne(term: string) {
    let user: User;
    if (isUUID(term)) {
      user = await this.userRepository.findOneBy({ idUser: term });
    } else {
      const queryBuilder = this.userRepository.createQueryBuilder('user');
      user = await queryBuilder
        .where(`email = :email or identification = :identification`, {
          email: term,
          identification: term,
        })
        .getOne();
    }

    if (!user) throw new NotFoundException(`User with term ${term} not found`);
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    if (error.code === '11546') throw new NotFoundException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs!',
    );
  }
}
