import { Module } from '@nestjs/common';
import { WithdrawalService } from './withdrawal.service';
import { WithdrawalController } from './withdrawal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Withdrawal } from './entities/withdrawal.entity';
import { CashFlow } from '../cash-flow/entities/cash-flow.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Withdrawal, CashFlow])],
  exports: [TypeOrmModule],
  controllers: [WithdrawalController],
  providers: [WithdrawalService],
})
export class WithdrawalModule {}
