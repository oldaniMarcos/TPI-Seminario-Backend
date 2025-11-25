import { Module } from '@nestjs/common';
import { SupplyPriceService } from './supply-price.service';
import { SupplyPriceController } from './supply-price.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplyPrice } from './entities/supply-price.entity';
import { SupplyType } from '../supply-type/entities/supply-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SupplyPrice, SupplyType])],
  exports: [TypeOrmModule],
  controllers: [SupplyPriceController],
  providers: [SupplyPriceService],
})
export class SupplyPriceModule {}
