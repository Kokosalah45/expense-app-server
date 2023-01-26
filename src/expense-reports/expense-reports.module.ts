import { Module } from '@nestjs/common';
import { ExpenseReportsService } from './expense-reports.service';
import { ExpenseReportsController } from './expense-reports.controller';

@Module({
  providers: [ExpenseReportsService],
  controllers: [ExpenseReportsController],
})
export class ExpenseReportsModule {}
