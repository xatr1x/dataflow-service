import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecordsService } from './records.service';
import { RecordsController } from './records.controller';
import { Record, RecordSchema } from './record.schema';
import { ClientsModule } from '@nestjs/microservices';
import { RedisModule } from '@libs/redis';
import { RabbitmqModule } from '@libs/rabbitmq';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Record.name, schema: RecordSchema }]),
    ClientsModule.register([RabbitmqModule]),
  ],
  controllers: [RecordsController],
  providers: [RecordsService, RedisModule],
})
export class RecordsModule {}
