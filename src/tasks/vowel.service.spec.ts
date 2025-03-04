import { Test, TestingModule } from '@nestjs/testing';
import { VowelService } from './vowel.service';

describe('VowelService', () => {
  let service: VowelService;

  beforeEach(async () => {
    const test: TestingModule = await Test.createTestingModule({
      providers: [VowelService],
    }).compile();

    service = test.get<VowelService>(VowelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return correct vowel count', () => {
    expect(service.countVowels('NestJS')).toBe(1); 
    expect(service.countVowels('')).toBe(0); 
  });
});
