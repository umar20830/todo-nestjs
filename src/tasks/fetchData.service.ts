import { Injectable } from '@nestjs/common';

@Injectable()
export class FetchService {
  async fetchData(url: string): Promise<any> {
    const response = await fetch(url);
    return response.json();
  }
}
