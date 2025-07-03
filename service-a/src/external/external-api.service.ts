import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class ExternalApiService {
  private apiUrl = 'https://dummyjson.com/users?limit=100';

  async fetchAndSaveData(): Promise<void> {
    try {
      const { data } = await axios.get<Record<string, any>>(this.apiUrl);
      const filePath = path.join(process.cwd(), 'data.json');
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
      console.log('Error downloading file', error);

      throw error;
    }
  }
}
