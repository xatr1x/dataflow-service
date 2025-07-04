import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { LogsModule } from './logs/logs.module';
import { MongoModule } from '@libs/mongo';

@Module({
  imports: [
    LogsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
