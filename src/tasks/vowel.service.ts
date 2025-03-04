import { Injectable } from '@nestjs/common';

@Injectable()
export class VowelService {
  countVowels(str: string): number {
    const vowels = 'aeiouAEIOU';
    return str.split('').filter((char) => vowels.includes(char)).length;
  }
}
