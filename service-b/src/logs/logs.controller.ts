import { Controller, Get, Query, Res } from '@nestjs/common';
import { LogsService } from './logs.service';
import { Response } from 'express';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Get()
  async findAll(
    @Query('type') type?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.logsService.findAll({
      type,
      startDate,
      endDate,
    });
  }

  @Get('generate-pdf-report')
  async generatePdfReport(
    @Res() res: Response,
    @Query('type') type?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ): Promise<void> {
    const pdfBuffer = await this.logsService.generatePdfReport({
      type,
      startDate,
      endDate,
    });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=logs-report.pdf',
    );
    res.end(pdfBuffer);
  }
}
