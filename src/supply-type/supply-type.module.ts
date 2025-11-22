import { Module } from '@nestjs/common';
import { SupplyTypeService } from './supply-type.service';
import { SupplyTypeController } from './supply-type.controller';

@Module({
  controllers: [SupplyTypeController],
  providers: [SupplyTypeService],
})
export class SupplyTypeModule {}
