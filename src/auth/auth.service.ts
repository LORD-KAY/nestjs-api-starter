import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Users } from 'src/entities/users.entity';
import { IAuth, IUser } from '../types/types';
import { UsersService } from '../users/users.service';
import { isValidPassword } from '../utils/helpers';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(user: IUser): Promise<IAuth> {
    const payload = {
      username: user?.username,
      role: user?.role?.id,
      userType: user?.userType,

      sub: user?.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
      userType: user.userType,
    };
  }

  async register(user: any): Promise<Users | null> {
    try {
      //return this.userService.register(user);
    } catch (e) {
      return e;
    }
  }
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.authenticate(username);
    if (user && isValidPassword(password, user.password)) {
      const { password, ...rest } = user;
      this.logger.log(user);
      return rest;
    }
    throw new UnauthorizedException(null, 'Invalid login credentials');
  }
}
