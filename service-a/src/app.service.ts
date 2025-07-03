import { Injectable } from '@nestjs/common';
import { ExternalApiService } from './external/external-api.service';

@Injectable()
export class AppService {
  constructor(private readonly externalApiService: ExternalApiService) {
    this.externalApiService.fetchAndSaveData();
  }

  getHello(): string {
    return 'Hello World!';
  }
}
