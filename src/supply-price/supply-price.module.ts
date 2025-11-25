import { Module } from '@nestjs/common';
import { SupplyPriceService } from './supply-price.service';
import { SupplyPriceController } from './supply-price.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplyPrice } from './entities/supply-price.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SupplyPrice])],
  exports: [TypeOrmModule],
  controllers: [SupplyPriceController],
  providers: [SupplyPriceService],
})
export class SupplyPriceModule {}
