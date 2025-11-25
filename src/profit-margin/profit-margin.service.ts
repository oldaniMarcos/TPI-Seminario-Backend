import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfitMarginDto } from './dto/create-profit-margin.dto';
import { UpdateProfitMarginDto } from './dto/update-profit-margin.dto';
import { ProfitMargin } from './entities/profit-margin.entity';

@Injectable()
export class ProfitMarginService {
  constructor(
    @InjectRepository(ProfitMargin)
    private readonly profitMarginRepository: Repository<ProfitMargin>,
  ) {}

  async create(createProfitMarginDto: CreateProfitMarginDto): Promise<ProfitMargin> {
    const pm = this.profitMarginRepository.create(createProfitMarginDto);
    return this.profitMarginRepository.save(pm);
  }

  async findAll(): Promise<ProfitMargin[]> {
    return this.profitMarginRepository.find();
  }

  async findOne(id: number): Promise<ProfitMargin> {
    const pm = await this.profitMarginRepository.findOne({ where: { id } });
    if (!pm) {
      throw new NotFoundException(`ProfitMargin with id ${id} not found`);
    }
    return pm;
  }

  async update(id: number, updateProfitMarginDto: UpdateProfitMarginDto): Promise<ProfitMargin> {
    await this.findOne(id);
    await this.profitMarginRepository.update(id, updateProfitMarginDto as any);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const pm = await this.findOne(id);
    await this.profitMarginRepository.delete(pm.id);
  }
}
