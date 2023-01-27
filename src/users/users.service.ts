import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  updateAdminType,
  updateUserType,
  userRegisterType,
} from './user-types';

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
  }
  async create(data: userRegisterType) {
    await this.prisma.user.create({
      data,
    });
  }
  async update(id: string, data: updateAdminType | updateUserType) {
    await this.prisma.user.update({
      where: { id },
      data: data,
    });
  }
  async delete(id: string) {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
