import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { LogsService } from './logs.service';
import { LogDto } from './dto/log.dto';

@Controller()
export class LogsListener {
  constructor(private readonly logsService: LogsService) {}

  @EventPattern('record.created')
  async handleRecordCreated(@Payload() payload: LogDto) {
    console.log('get queue');
    await this.logsService.create({
      type: 'record.created',
      payload: `Received ${payload.count} records`,
      timestamp: new Date(),
    });
  }
}
