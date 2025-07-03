import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Record } from './record.schema';
import { CreateRecordDto } from './dto/create-record.dto';
import { SearchRecordsDto } from './dto/search-records.dto';
import { FilterQuery } from 'mongoose';
import { ClientProxy } from '@nestjs/microservices';
import type { RedisClientType } from 'redis';

interface RecordsJson {
  users: CreateRecordDto[];
}

@Injectable()
export class RecordsService {
  constructor(
    @InjectModel(Record.name) private recordModel: Model<Record>,
    @Inject('RABBITMQ_SERVICE') private readonly rabbitClient: ClientProxy,
    @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType,
  ) {}

  async create(dto: CreateRecordDto): Promise<Record> {
    try {
      const created = new this.recordModel(dto);
      const result = await created.save();

      this.rabbitClient.emit('record.created', { count: 1 });

      await this.redisClient.sendCommand([
        'TS.ADD',
        'metrics:record_created',
        '*',
        '1',
      ]);

      return result;
    } catch (error) {
      console.error('Error adding record:', error);
      throw error;
    }
  }

  async findAll(): Promise<Record[]> {
    return this.recordModel.find().sort({ createdAt: -1 }).exec();
  }

  async importFromJsonBuffer(buffer: Buffer) {
    try {
      const records: RecordsJson = JSON.parse(buffer.toString()) as RecordsJson;

      if (!Array.isArray(records.users)) {
        throw new Error('Wrong structure for JSON: { users: [...] }');
      }

      const result = await this.recordModel.insertMany(records.users);

      this.rabbitClient.emit('record.created', { count: result.length });

      await this.redisClient.sendCommand([
        'TS.ADD',
        'metrics:record_created',
        '*',
        result.length.toString(),
      ]);

      return result;
    } catch (error) {
      console.error('Error adding many records:', error);
      throw error;
    }
  }

  async search(dto: SearchRecordsDto) {
    try {
      const filter: FilterQuery<Record> = {};

      if (dto.name) filter.name = { $regex: dto.name, $options: 'i' };
      if (dto.email) filter.email = { $regex: dto.email, $options: 'i' };
      if (dto.university)
        filter.university = { $regex: dto.university, $options: 'i' };

      const skip = dto.skip ?? 0;
      const limit = dto.limit ?? 10;

      const records = await this.recordModel
        .find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec();

      const total = await this.recordModel.countDocuments(filter);

      return { total, records };
    } catch (error) {
      console.log('Error searching records', error);

      throw error;
    }
  }

  async deleteAll(): Promise<{ deletedCount: number }> {
    try {
      const result = await this.recordModel.deleteMany({});
      return { deletedCount: result.deletedCount ?? 0 };
    } catch (error) {
      console.log('Error deleting all records', error);

      throw error;
    }
  }
}
