import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  HttpStatus,
  HttpException,
  Body,
} from '@nestjs/common';
import { ExpenseReportsService } from './expense-reports.service';
import { reportTypeDtoOptional, reportsDto } from './reportsTypes';

@Controller()
export class ExpenseReportsController {
  constructor(private readonly expenseReportsService: ExpenseReportsService) {}
  @Get()
  getAllReports(
    @Param('userId') userId: string,
    @Query() { reportType }: reportTypeDtoOptional,
  ) {
    // if the user has admin privileges you can skip checking wether the id in the param is equal to the id in the token
    // if the user doesn't have privileges you must check wether the id in the param is equal to the id in the token or not
    const reports = this.expenseReportsService.findAll(userId, reportType);
    if (reports) {
      return reports;
    }
    throw new HttpException(
      {
        message: 'Not Found',
        statusCode: HttpStatus.NOT_FOUND,
      },
      HttpStatus.NOT_FOUND,
    );
  }
  // @Get(':source')
  // getSpecificReport(@Param('source') reportSource: string) {
  //   // if the user has admin privileges you can skip checking wether the id in the param is equal to the id in the token
  //   // if the user doesn't have privileges you must check wether the id in the param is equal to the id in the token or not
  //   const record = this.expenseReportsService.getSpecificReport(reportSource);
  //   if (record) {
  //     return record;
  //   }
  //   throw new HttpException(
  //     {
  //       message: 'Record Not Found',
  //       statusCode: HttpStatus.NOT_FOUND,
  //     },
  //     HttpStatus.NOT_FOUND,
  //   );
  // }
  @Post()
  async createReport(@Body() reportData: reportsDto) {
    try {
      await this.expenseReportsService.create(reportData);
      return {
        message: 'Record created Successfully',
        statusCode: HttpStatus.CREATED,
      };
    } catch (e) {
      return { code: e.code, description: e.meta.message };
    }
  }
  //   @Put(':source')
  //   updateReport(
  //     @Param('source') source: string,
  //     @Body() reportData: reportsDto,
  //   ) {
  //     this.expenseReportsService.updateReport(source, reportData);
  //     return {
  //       message: 'Record updated Successfully',
  //       statusCode: HttpStatus.OK,
  //     };
  //   }
  //   @Delete(':source')
  //   deleteReport(@Param('source') source: string) {
  //     this.expenseReportsService.deleteReport(source);
  //     return 1;
  //   }
}
