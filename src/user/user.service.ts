import { Injectable, Inject } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
  ) {}

  async create(createUser: CreateUserDto): Promise<User> {
    const userCreated = await this.usersRepository.create({
      firstName: createUser.firstName,
      lastName: createUser.lastName,
    });

    return userCreated;
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        id,
      },
    });
  }
}
