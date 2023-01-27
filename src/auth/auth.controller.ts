import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { LocalGuard } from './guards';

@Controller()
export class AuthController {
  //signIn
  // will actually sign the user in with a session in order to do that a password is needed
  @UseGuards(LocalGuard)
  @Post('signin')
  async sigin(@Request() req: any) {
    return req.user;
  }
  //signUp
  @Post('signup')
  async signup(@Request() req: any) {
    return req.user;
  }

  //logout
  @UseGuards(LocalGuard)
  @Post('singout')
  async singout(@Request() req: any) {
    return req.user;
  }
}
