import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSupplyTypeDto } from './dto/create-supply-type.dto';
import { UpdateSupplyTypeDto } from './dto/update-supply-type.dto';
import { SupplyType } from './entities/supply-type.entity';

@Injectable()
export class SupplyTypeService {
  constructor(
    @InjectRepository(SupplyType)
    private readonly supplyTypeRepository: Repository<SupplyType>,
  ) {}

  async create(createSupplyTypeDto: CreateSupplyTypeDto): Promise<SupplyType> {
    const st = this.supplyTypeRepository.create(createSupplyTypeDto);
    return this.supplyTypeRepository.save(st);
  }

  async findAll(): Promise<SupplyType[]> {
    return this.supplyTypeRepository.find({ relations: ['supplyPrices', 'lots'] });
  }

  async findOne(id: number): Promise<SupplyType> {
    const st = await this.supplyTypeRepository.findOne({ where: { id }, relations: ['supplyPrices', 'lots'] });
    if (!st) {
      throw new NotFoundException(`SupplyType with id ${id} not found`);
    }
    return st;
  }

  async update(id: number, updateSupplyTypeDto: UpdateSupplyTypeDto): Promise<SupplyType> {
    await this.findOne(id);
    await this.supplyTypeRepository.update(id, updateSupplyTypeDto as any);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const st = await this.findOne(id);
    await this.supplyTypeRepository.delete(st.id);
  }
}
