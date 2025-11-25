import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWithdrawalDto } from './dto/create-withdrawal.dto';
import { UpdateWithdrawalDto } from './dto/update-withdrawal.dto';
import { Withdrawal } from './entities/withdrawal.entity';
import { CashFlow } from '../cash-flow/entities/cash-flow.entity';

@Injectable()
export class WithdrawalService {
  constructor(
    @InjectRepository(Withdrawal)
    private readonly withdrawalRepository: Repository<Withdrawal>,
    @InjectRepository(CashFlow)
    private readonly cashFlowRepository: Repository<CashFlow>,
  ) {}

  async create(createWithdrawalDto: CreateWithdrawalDto): Promise<Withdrawal> {
    const cashFlow = await this.cashFlowRepository.findOne({ where: { id: createWithdrawalDto.cashFlowId } });
    if (!cashFlow) {
      throw new NotFoundException(`CashFlow with id ${createWithdrawalDto.cashFlowId} not found`);
    }

    const w = this.withdrawalRepository.create({
      dateTime: createWithdrawalDto.dateTime,
      description: createWithdrawalDto.description,
      amount: createWithdrawalDto.amount,
      state: createWithdrawalDto.state,
      payDate: createWithdrawalDto.payDate,
      cashFlow,
    });

    return this.withdrawalRepository.save(w);
  }

  async findAll(): Promise<Withdrawal[]> {
    return this.withdrawalRepository.find({ relations: ['cashFlow'] });
  }

  async findOne(id: number): Promise<Withdrawal> {
    const w = await this.withdrawalRepository.findOne({ where: { id }, relations: ['cashFlow'] });
    if (!w) {
      throw new NotFoundException(`Withdrawal with id ${id} not found`);
    }
    return w;
  }

  async update(id: number, updateWithdrawalDto: UpdateWithdrawalDto): Promise<Withdrawal> {
    const w = await this.findOne(id);

    if (updateWithdrawalDto.cashFlowId) {
      const cashFlow = await this.cashFlowRepository.findOne({ where: { id: updateWithdrawalDto.cashFlowId } });
      if (!cashFlow) {
        throw new NotFoundException(`CashFlow with id ${updateWithdrawalDto.cashFlowId} not found`);
      }
      w.cashFlow = cashFlow;
    }

    if (updateWithdrawalDto.dateTime !== undefined) w.dateTime = updateWithdrawalDto.dateTime;
    if (updateWithdrawalDto.description !== undefined) w.description = updateWithdrawalDto.description;
    if (updateWithdrawalDto.amount !== undefined) w.amount = updateWithdrawalDto.amount;
    if (updateWithdrawalDto.state !== undefined) w.state = updateWithdrawalDto.state;
    if (updateWithdrawalDto.payDate !== undefined) w.payDate = updateWithdrawalDto.payDate;

    return this.withdrawalRepository.save(w);
  }

  async remove(id: number): Promise<void> {
    const w = await this.findOne(id);
    await this.withdrawalRepository.delete(w.id);
  }
}
