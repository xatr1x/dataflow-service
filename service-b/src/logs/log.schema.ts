import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LogDocument = HydratedDocument<Log>;

@Schema()
export class Log {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  timestamp: Date;

  @Prop({ required: true, type: Object })
  payload: Record<string, unknown>;
}

export const LogSchema = SchemaFactory.createForClass(Log);
