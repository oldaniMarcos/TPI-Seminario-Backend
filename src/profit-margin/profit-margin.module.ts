import { Module } from '@nestjs/common';
import { ProfitMarginService } from './profit-margin.service';
import { ProfitMarginController } from './profit-margin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfitMargin } from './entities/profit-margin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProfitMargin])],
  exports: [TypeOrmModule],
  controllers: [ProfitMarginController],
  providers: [ProfitMarginService],
})
export class ProfitMarginModule {}
