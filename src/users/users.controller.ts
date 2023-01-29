import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Session,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { userRegisterDto } from './user-types';
import { IsAuthenticated } from 'src/auth/guards';
@UseGuards(IsAuthenticated)
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.FOUND)
  @Get()
  async getAllUsers(@Session() d: any): Promise<any> {
    try {
      const users = await this.usersService.findAll();
      return {
        data: users,
        statusCode: HttpStatus.FOUND,
        d,
      };
    } catch (e) {
      throw new HttpException(e, HttpStatus.NOT_FOUND);
    }
  }

  @HttpCode(HttpStatus.FOUND)
  @Get(':username')
  async getUser(@Param('username') userName: string): Promise<any> {
    try {
      const user = await this.usersService.findOne(userName);
      return {
        data: user,
        statusCode: HttpStatus.FOUND,
      };
    } catch (e) {
      throw new HttpException(e, HttpStatus.NOT_FOUND);
    }
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createUser(@Body() body: userRegisterDto) {
    try {
      await this.usersService.create(body);
      return {
        message: 'created successfully',
        statusCode: HttpStatus.CREATED,
      };
    } catch (e) {
      return e;
    }
  }
  @HttpCode(HttpStatus.MOVED_PERMANENTLY)
  @Put()
  async updateUser(@Body() body: userRegisterDto) {
    try {
      await this.usersService.create(body);
      return {
        message: 'created successfully',
        statusCode: HttpStatus.MOVED_PERMANENTLY,
      };
    } catch (e) {
      return e;
    }
  }
}
