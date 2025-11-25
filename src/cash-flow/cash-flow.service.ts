import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCashFlowDto } from './dto/create-cash-flow.dto';
import { UpdateCashFlowDto } from './dto/update-cash-flow.dto';
import { CashFlow } from './entities/cash-flow.entity';

@Injectable()
export class CashFlowService {
  constructor(
    @InjectRepository(CashFlow)
    private readonly cashFlowRepository: Repository<CashFlow>,
  ) {}

  async create(createCashFlowDto: CreateCashFlowDto): Promise<CashFlow> {
    const cashFlow = this.cashFlowRepository.create(createCashFlowDto);
    return this.cashFlowRepository.save(cashFlow);
  }

  async findAll(): Promise<CashFlow[]> {
    return this.cashFlowRepository.find({
      relations: ['withdrawals', 'visits'],
    });
  }

  async findOne(id: number): Promise<CashFlow> {
    const cashFlow = await this.cashFlowRepository.findOne({
      where: { id },
      relations: ['withdrawals', 'visits'],
    });

    if (!cashFlow) {
      throw new NotFoundException(`CashFlow with id ${id} not found`);
    }

    return cashFlow;
  }

  async update(id: number, updateCashFlowDto: UpdateCashFlowDto): Promise<CashFlow> {
    await this.findOne(id);
    await this.cashFlowRepository.update(id, updateCashFlowDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const cashFlow = await this.findOne(id);
    await this.cashFlowRepository.delete(cashFlow.id);
  }
}
