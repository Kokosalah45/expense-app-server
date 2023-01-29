import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { RouterModule } from '@nestjs/core';
import { ExpenseReportsModule } from './expense-reports/expense-reports.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    UsersModule,
    PrismaModule,
    ExpenseReportsModule,
    AuthModule,
    RouterModule.register([
      {
        path: '/',
        children: [
          {
            path: 'users',
            module: UsersModule,
            children: [
              {
                path: ':username',
                children: [
                  {
                    path: 'expense-reports',
                    module: ExpenseReportsModule,
                  },
                ],
              },
            ],
          },
          {
            path: 'auth',
            module: AuthModule,
          },
        ],
      },
    ]),
  ],
})
export class AppModule {}
