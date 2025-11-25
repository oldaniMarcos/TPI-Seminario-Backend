import { Module } from '@nestjs/common';
import { LotService } from './lot.service';
import { LotController } from './lot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lot } from './entities/lot.entity';
import { SupplyType } from '../supply-type/entities/supply-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lot, SupplyType])],
  exports: [TypeOrmModule],
  controllers: [LotController],
  providers: [LotService],
})
export class LotModule {}
