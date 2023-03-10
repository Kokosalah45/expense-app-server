import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }
  async validate(username: string, password: string) {
    console.log('using user validator service to validate the user');
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      return new UnauthorizedException();
    }

    return user;
  }
}
