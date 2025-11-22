import { Test, TestingModule } from '@nestjs/testing';
import { SupplyPriceService } from './supply-price.service';

describe('SupplyPriceService', () => {
  let service: SupplyPriceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupplyPriceService],
    }).compile();

    service = module.get<SupplyPriceService>(SupplyPriceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
