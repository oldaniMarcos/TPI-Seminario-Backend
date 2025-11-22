import { Module } from '@nestjs/common';
import { ProfitMarginService } from './profit-margin.service';
import { ProfitMarginController } from './profit-margin.controller';

@Module({
  controllers: [ProfitMarginController],
  providers: [ProfitMarginService],
})
export class ProfitMarginModule {}
