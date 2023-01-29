import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Session as GetSession,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { IsAuthenticated, LocalGuard } from './guards';
import { UsersService } from 'src/users/users.service';

@Controller()
export class AuthController {
  constructor(private readonly userService: UsersService) {}
  //signIn
  // will actually sign the user in with a session in order to do that a password is needed
  @UseGuards(LocalGuard)
  @Post('signin')
  async sigin(@Request() req: any) {
    return req.user;
  }

  @UseGuards(IsAuthenticated)
  @Get('me')
  getMe(@Request() req: any) {
    return req.user;
  }

  //signUp
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signup(@Request() req: any) {
    return req.user;
  }

  //logout
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(LocalGuard)
  @Post('singout')
  async singout(@GetSession() session: any) {
    await session.destroy();
  }
}
