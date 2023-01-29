import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}
  async isPasswordEqual(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }
  async validateUser(username: string, password: string) {
    console.log('validating user...');
    const user = await this.userService.findOne(username, true);

    if (user && (await this.isPasswordEqual(password, user.password))) {
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }
}
