import { Test, TestingModule } from '@nestjs/testing';
import { FactorialService } from './factorial.service';

describe('FactorialService', () => {
  let service: FactorialService;

  beforeEach(async () => {
    const test: TestingModule = await Test.createTestingModule({
      providers: [FactorialService],
    }).compile();

    service = test.get<FactorialService>(FactorialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return 1 for factorial of 0', () => {
    expect(service.factorial(0)).toBe(1);
  });

  it('should return correct factorial for positive numbers', () => {
    expect(service.factorial(1)).toBe(1);
    expect(service.factorial(2)).toBe(2);
    expect(service.factorial(3)).toBe(6);
    expect(service.factorial(4)).toBe(24);
    expect(service.factorial(5)).toBe(120);
  });

  it('should return -1 for negative numbers', () => {
    expect(service.factorial(-1)).toBe(-1);
    expect(service.factorial(-5)).toBe(-1);
  });
});
