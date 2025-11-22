import { Test, TestingModule } from '@nestjs/testing';
import { SupplyPriceController } from './supply-price.controller';
import { SupplyPriceService } from './supply-price.service';

describe('SupplyPriceController', () => {
  let controller: SupplyPriceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupplyPriceController],
      providers: [SupplyPriceService],
    }).compile();

    controller = module.get<SupplyPriceController>(SupplyPriceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
