import {
  Body,
  Controller,
  Post,
  Get,
  UseInterceptors,
  UploadedFile,
  Query,
  Delete,
} from '@nestjs/common';
import { RecordsService } from './records.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { Record } from './record.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { SearchRecordsDto } from './dto/search-records.dto';

@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Post()
  create(@Body() dto: CreateRecordDto): Promise<Record> {
    return this.recordsService.create(dto);
  }

  @Get()
  findAll(): Promise<Record[]> {
    return this.recordsService.findAll();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: { buffer: Buffer }) {
    return this.recordsService.importFromJsonBuffer(file.buffer);
  }

  @Get('search')
  search(@Query() dto: SearchRecordsDto) {
    return this.recordsService.search(dto);
  }

  @Delete()
  deleteAll() {
    return this.recordsService.deleteAll();
  }
}
