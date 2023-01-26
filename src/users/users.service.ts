import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { userRegisterType } from './user-types';

enum reportTypeMap {
  income = 'INCOME',
  expense = 'EXPENSE',
}

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    return await this.prisma.user.findMany({
      select: { id: true, email: true, name: true },
    });
  }
  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { name: true, email: true, id: true },
    });

    return user;
  }
  async create(data: userRegisterType) {
    await this.prisma.user.create({
      data,
    });
  }
  async update(data: userRegisterType) {
    await this.prisma.user.update({
      data,
    });
  }
  async delete(id: string) {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
