import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UsersService } from '../users/users.service';

//local guard login method calls this
@Injectable()
export class UserSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: any, done: any) {
    console.log('Serilized user', user);
    done(null, user.username);
  }

  async deserializeUser(username: any, done: any) {
    const user = await this.usersService.findOne(username, false);
    if (!user) {
      return done(
        `Could not deserialize user: user with ${username} could not be found`,
        null,
      );
    }

    done(null, user);
  }
}
