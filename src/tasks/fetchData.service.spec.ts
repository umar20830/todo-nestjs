import { Test, TestingModule } from '@nestjs/testing';
import { FetchService } from './fetchData.service';

describe('FetchService', () => {
  let service: FetchService;

  beforeEach(async () => {
    const test: TestingModule = await Test.createTestingModule({
      providers: [FetchService],
    }).compile();

    service = test.get<FetchService>(FetchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fetch data from API', async () => {
    const mockResponse = { id: 1, name: 'Umer' };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      } as Response),
    );

    const result = await service.fetchData('https://api.example.com/data');
    expect(result).toEqual(mockResponse);
  });
});
