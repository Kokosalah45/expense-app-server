import { Injectable, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  updateAdminType,
  updateUserType,
  userRegisterType,
} from './user-types';
import { LocalStrategy } from 'src/auth/strategies';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstname: true,
        lastname: true,
        username: true,
      },
    });
  }
  async findOne(username: string, includePassword = false) {
    const user = await this.prisma.user.findUnique({
      where: { username },
      select: {
        firstname: true,
        lastname: true,
        username: true,
        email: true,
        id: true,
        password: includePassword,
      },
    });

    return user;
    //errors
    //finds something that doesnt exist
  }
  async create(data: userRegisterType) {
    await this.prisma.user.create({
      data,
    });
    //errors
    //creates something to a value that is unique and already exists
  }
  async update(id: string, data: updateAdminType | updateUserType) {
    await this.prisma.user.update({
      where: { id },
      data: data,
    });
    //errors
    //updates something that doesnt exist
    //updates something to a value that is unique and already exists
  }
  async delete(id: string) {
    await this.prisma.user.delete({
      where: { id },
    });
    //errors
    //delete something that doesnt exist
  }
}
