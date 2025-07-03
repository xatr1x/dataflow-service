import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { LogsModule } from './logs/logs.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    LogsModule,
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
