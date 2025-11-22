import { Test, TestingModule } from '@nestjs/testing';
import { SupplyTypeController } from './supply-type.controller';
import { SupplyTypeService } from './supply-type.service';

describe('SupplyTypeController', () => {
  let controller: SupplyTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupplyTypeController],
      providers: [SupplyTypeService],
    }).compile();

    controller = module.get<SupplyTypeController>(SupplyTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
