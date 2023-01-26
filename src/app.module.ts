import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { RouterModule } from '@nestjs/core';
import { ExpenseReportsModule } from './expense-reports/expense-reports.module';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    ExpenseReportsModule,
    RouterModule.register([
      {
        path: 'users',
        module: UsersModule,
        children: [
          {
            path: ':userId',
            children: [
              {
                path: 'expense-reports',
                module: ExpenseReportsModule,
              },
            ],
          },
        ],
      },
    ]),
  ],
})
export class AppModule {}