import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it } from '@jest/globals';
import { Amortized } from './amortized';

describe('Amortized', () => {
  let provider: Amortized;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Amortized],
    }).compile();

    provider = module.get<Amortized>(Amortized);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
