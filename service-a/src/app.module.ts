import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecordsModule } from './records/records.module';
import { ExternalApiModule } from './external/external-api.module';
import { MongoModule } from '@libs/mongo';

@Module({
  imports: [
    RecordsModule,
    ExternalApiModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
