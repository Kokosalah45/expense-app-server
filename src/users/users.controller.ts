import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get(':userId')
  async getUser(@Param('userId') userId: string): Promise<any> {
    try {
      const user = await this.usersService.findOne(userId);
      return {
        data: user,
        statusCode: HttpStatus.FOUND,
      };
    } catch (e) {
      throw new HttpException(e, HttpStatus.NOT_FOUND);
    }
  }

  @Get()
  async getAllUsers(): Promise<any> {
    try {
      const users = await this.usersService.findAll();
      return {
        data: users,
        statusCode: HttpStatus.FOUND,
      };
    } catch (e) {
      throw new HttpException(e, HttpStatus.NOT_FOUND);
    }
  }
}
