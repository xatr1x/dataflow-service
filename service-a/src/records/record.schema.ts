import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Record extends Document {
  @Prop()
  externalId: number;

  @Prop({ index: true })
  name: string;

  @Prop({ index: true })
  email: string;

  @Prop()
  phone: string;

  @Prop({ index: true })
  university: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const RecordSchema = SchemaFactory.createForClass(Record);

RecordSchema.set('autoIndex', true);
RecordSchema.index({ name: 1 });
RecordSchema.index({ email: 1 });
RecordSchema.index({ university: 1 });
