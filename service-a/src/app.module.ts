import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecordsModule } from './records/records.module';
import { ExternalApiModule } from './external/external-api.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    RecordsModule,
    ExternalApiModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      process.env.MONGO_URL || 'mongodb://mongodb:27017/dataflow',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
