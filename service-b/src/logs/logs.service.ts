/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as PDFDocument from 'pdfkit';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log, LogDocument } from './log.schema';

interface CreateLogInput {
  type: string;
  payload: string;
  timestamp: Date;
}

@Injectable()
export class LogsService {
  constructor(
    @InjectModel(Log.name) private readonly logModel: Model<LogDocument>,
  ) {}

  async findAll(filters: {
    type?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<Log[]> {
    const query: {
      type?: string;
      timestamp?: {
        $gte?: Date;
        $lte?: Date;
      };
    } = {};

    if (filters.type) {
      query.type = filters.type;
    }

    if (filters.startDate || filters.endDate) {
      query.timestamp = {};
      if (filters.startDate) {
        query.timestamp.$gte = new Date(filters.startDate);
      }
      if (filters.endDate) {
        query.timestamp.$lte = new Date(filters.endDate);
      }
    }

    return this.logModel.find(query).exec();
  }

  async findByFilter(filter: Partial<Log>): Promise<Log[]> {
    return this.logModel.find(filter).exec();
  }

  async deleteAll(): Promise<void> {
    await this.logModel.deleteMany({});
  }

  async create(data: CreateLogInput): Promise<Log> {
    const createdLog = new this.logModel(data);
    return createdLog.save();
  }

  async generatePdfReport(filters: {
    type?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<Buffer> {
    const query: {
      type?: string;
      timestamp?: {
        $gte?: Date;
        $lte?: Date;
      };
    } = {};

    if (filters.type) {
      query.type = filters.type;
    }
    if (filters.startDate || filters.endDate) {
      query.timestamp = {};
      if (filters.startDate) {
        query.timestamp.$gte = new Date(filters.startDate);
      }
      if (filters.endDate) {
        query.timestamp.$lte = new Date(filters.endDate);
      }
    }

    const logs = await this.logModel.find(query).sort({ timestamp: -1 }).exec();

    return new Promise<Buffer>((resolve) => {
      const doc = new PDFDocument();
      const buffers: Buffer[] = [];

      doc.on('data', (chunk: Buffer<ArrayBufferLike>) => buffers.push(chunk));
      doc.on('end', () => {
        const pdfBuffer = Buffer.concat(buffers);
        resolve(pdfBuffer);
      });

      doc.fontSize(18).text('Logs Report').moveDown();

      logs.forEach((log) => {
        doc
          .fontSize(12)
          .text(`Type: ${log.type}`)
          .text(`Payload: ${JSON.stringify(log.payload)}`)
          .text(`Timestamp: ${new Date(log.timestamp).toISOString()}`)
          .moveDown();
      });

      doc.end();
    });
  }
}
