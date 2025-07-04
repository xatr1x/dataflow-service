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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Records')
@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new record' })
  @ApiResponse({ status: 201, description: 'Record created successfully' })
  create(@Body() dto: CreateRecordDto): Promise<Record> {
    return this.recordsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all records' })
  @ApiResponse({ status: 200, description: 'List of records' })
  findAll(): Promise<Record[]> {
    return this.recordsService.findAll();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload and import a JSON file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: 'multipart/form-data' })
  uploadFile(@UploadedFile() file: { buffer: Buffer }) {
    return this.recordsService.importFromJsonBuffer(file.buffer);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search records' })
  @ApiResponse({ status: 200, description: 'Filtered records' })
  search(@Query() dto: SearchRecordsDto) {
    return this.recordsService.search(dto);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete all records' })
  @ApiResponse({ status: 200, description: 'All records deleted' })
  deleteAll() {
    return this.recordsService.deleteAll();
  }
}
