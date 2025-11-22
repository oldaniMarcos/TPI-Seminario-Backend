import { Test, TestingModule } from '@nestjs/testing';
import { SupplyTypeService } from './supply-type.service';

describe('SupplyTypeService', () => {
  let service: SupplyTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupplyTypeService],
    }).compile();

    service = module.get<SupplyTypeService>(SupplyTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
