import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogsService } from './logs.service';
import { LogsController } from './logs.controller';
import { Log, LogSchema } from './log.schema';
import { ClientsModule } from '@nestjs/microservices';
import { LogsListener } from './logs.listener';
import { RedisModule } from '@libs/redis';
import { RabbitmqModule } from '@libs/rabbitmq';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }]),
    ClientsModule.register([RabbitmqModule]),
  ],
  controllers: [LogsController, LogsListener],
  providers: [LogsService, LogsListener, RedisModule],
})
export class LogsModule {}
