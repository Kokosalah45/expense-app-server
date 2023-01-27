import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}
  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne(email, true);
    if (user && user.password === password) {
      return true;
    }
    throw new UnauthorizedException();
  }
}
