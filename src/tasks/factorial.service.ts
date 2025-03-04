import { Injectable } from '@nestjs/common';

@Injectable()
export class FactorialService {
  factorial(n: number): number {
    if (n < 0) return -1;
    if (n === 0) return 1;
    return n * this.factorial(n - 1);
  }
}
