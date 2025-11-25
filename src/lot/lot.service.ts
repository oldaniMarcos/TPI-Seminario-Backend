import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLotDto } from './dto/create-lot.dto';
import { UpdateLotDto } from './dto/update-lot.dto';
import { Lot } from './entities/lot.entity';
import { SupplyType } from '../supply-type/entities/supply-type.entity';

@Injectable()
export class LotService {
  constructor(
    @InjectRepository(Lot)
    private readonly lotRepository: Repository<Lot>,
    @InjectRepository(SupplyType)
    private readonly supplyTypeRepository: Repository<SupplyType>,
  ) {}

  async create(createLotDto: CreateLotDto): Promise<Lot> {
    const supplyType = await this.supplyTypeRepository.findOne({
      where: { id: createLotDto.supplyTypeId },
    });

    if (!supplyType) {
      throw new NotFoundException(`SupplyType with id ${createLotDto.supplyTypeId} not found`);
    }

    const lot = this.lotRepository.create({
      lotNumber: createLotDto.lotNumber,
      dueDate: createLotDto.dueDate,
      units: createLotDto.units,
      supplyType,
    });

    return this.lotRepository.save(lot);
  }

  async findAll(): Promise<Lot[]> {
    return this.lotRepository.find({ relations: ['supplyType'] });
  }

  async findOne(id: number): Promise<Lot> {
    const lot = await this.lotRepository.findOne({
      where: { id },
      relations: ['supplyType'],
    });

    if (!lot) {
      throw new NotFoundException(`Lot with id ${id} not found`);
    }

    return lot;
  }

  async update(id: number, updateLotDto: UpdateLotDto): Promise<Lot> {
    await this.findOne(id);

    if (updateLotDto.supplyTypeId) {
      const supplyType = await this.supplyTypeRepository.findOne({
        where: { id: updateLotDto.supplyTypeId },
      });

      if (!supplyType) {
        throw new NotFoundException(`SupplyType with id ${updateLotDto.supplyTypeId} not found`);
      }

      await this.lotRepository.update(id, { ...updateLotDto, supplyType });
    } else {
      await this.lotRepository.update(id, updateLotDto as any);
    }

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const lot = await this.findOne(id);
    await this.lotRepository.delete(lot.id);
  }
}
