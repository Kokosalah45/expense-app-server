import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { RouterModule } from '@nestjs/core';
import { ExpenseReportsModule } from './expense-reports/expense-reports.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

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
    AuthModule,
  ],
  providers: [AuthService],
})
export class AppModule {}
