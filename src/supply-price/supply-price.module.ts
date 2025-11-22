import { Module } from '@nestjs/common';
import { SupplyPriceService } from './supply-price.service';
import { SupplyPriceController } from './supply-price.controller';

@Module({
  controllers: [SupplyPriceController],
  providers: [SupplyPriceService],
})
export class SupplyPriceModule {}
