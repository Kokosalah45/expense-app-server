import { Injectable } from '@nestjs/common';
import { report, reportTypeOptional } from 'src/expense-reports/reportsTypes';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExpenseReportsService {
  constructor(private prisma: PrismaService) {}
  async findAll(userId: string, type?: reportTypeOptional): Promise<any> {
    try {
      return await this.prisma.expense.findMany({
        where: {
          userId,
          type,
        },
        select: {
          source: true,
          amount: true,
          type: true,
        },
      });
    } catch (e) {
      throw e;
    }
  }
  //   getSpecificReport(source: string): reportRecordType | null {
  //     const { reports } = db;
  //     const report = reports.find(
  //       (report) => source.toLowerCase() === report.source.toLowerCase(),
  //     );

  //     return report ? report : null;
  //   }
  async create(data: report) {
    await this.prisma.expense.create({
      data,
    });
  }
  //   updateReport(source: string, data: reportType) {
  //     const { reports } = db;
  //     const oldReportData = this.getSpecificReport(source);
  //     this.deleteReport(source);
  //     if (oldReportData) {
  //       const newReport = {
  //         ...oldReportData,
  //         ...data,
  //         update_at: new Date(),
  //       };
  //       reports.push(newReport);
  //     }
  //   }
  //   deleteReport(source: string) {
  //     const { reports } = db;
  //     db['reports'] = reports.filter(
  //       (report) => report.source.toLowerCase() !== source.toLowerCase(),
  //     );
  //   }
}
