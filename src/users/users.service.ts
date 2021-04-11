import { Injectable, Logger } from '@nestjs/common';
import { Users } from '../entities/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
  ) {}

  async authenticate(username: string): Promise<Users | null> {
    return await this.userRepository
      .createQueryBuilder('users')
      .where('users.username = :username', { username })
      .orWhere('users.email = :username', { username })
      .getOne();
  }
}
