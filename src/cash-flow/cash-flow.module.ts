import { Module } from '@nestjs/common';
import { CashFlowService } from './cash-flow.service';
import { CashFlowController } from './cash-flow.controller';
import { CashFlow } from './entities/cash-flow.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CashFlow])],
    exports: [TypeOrmModule],
  controllers: [CashFlowController],
  providers: [CashFlowService],
})
export class CashFlowModule {}
