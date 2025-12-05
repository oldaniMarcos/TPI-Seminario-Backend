import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSupplyPriceDto } from './dto/create-supply-price.dto';
import { UpdateSupplyPriceDto } from './dto/update-supply-price.dto';
import { SupplyPrice } from './entities/supply-price.entity';
import { SupplyType } from '../supply-type/entities/supply-type.entity';

@Injectable()
export class SupplyPriceService {
  constructor(
    @InjectRepository(SupplyPrice)
    private readonly supplyPriceRepository: Repository<SupplyPrice>,
    @InjectRepository(SupplyType)
    private readonly supplyTypeRepository: Repository<SupplyType>,
  ) {}

  async create(createSupplyPriceDto: CreateSupplyPriceDto): Promise<SupplyPrice> {
    const supplyType = await this.supplyTypeRepository.findOne({ where: { id: createSupplyPriceDto.supplyTypeId } });
    if (!supplyType) {
      throw new NotFoundException(`SupplyType with id ${createSupplyPriceDto.supplyTypeId} not found`);
    }

    const sp = this.supplyPriceRepository.create({
      beginDate: createSupplyPriceDto.beginDate,
      currency: createSupplyPriceDto.currency,
      price: createSupplyPriceDto.price,
      supplyType,
    });

    return this.supplyPriceRepository.save(sp);
  }

  async findAll(): Promise<SupplyPrice[]> {
    return this.supplyPriceRepository.find({ relations: ['supplyType'] });
  }

  async findOne(id: number): Promise<SupplyPrice> {
    const sp = await this.supplyPriceRepository.findOne({ where: { id }, relations: ['supplyType'] });
    if (!sp) {
      throw new NotFoundException(`SupplyPrice with id ${id} not found`);
    }
    return sp;
  }

  async update(id: number, updateSupplyPriceDto: UpdateSupplyPriceDto): Promise<SupplyPrice> {
    const sp = await this.findOne(id);

    if (updateSupplyPriceDto.supplyTypeId) {
      const supplyType = await this.supplyTypeRepository.findOne({ where: { id: updateSupplyPriceDto.supplyTypeId } });
      if (!supplyType) {
        throw new NotFoundException(`SupplyType with id ${updateSupplyPriceDto.supplyTypeId} not found`);
      }
      sp.supplyType = supplyType;
    }

    if (updateSupplyPriceDto.beginDate !== undefined) sp.beginDate = updateSupplyPriceDto.beginDate;
    if (updateSupplyPriceDto.currency !== undefined) sp.currency = updateSupplyPriceDto.currency;
    if (updateSupplyPriceDto.price !== undefined) sp.price = updateSupplyPriceDto.price;

    return this.supplyPriceRepository.save(sp);
  }

  async remove(id: number): Promise<void> {
    const sp = await this.findOne(id);
    await this.supplyPriceRepository.delete(sp.id);
  }

  async findByType(supplyTypeId: number) {
    return this.supplyPriceRepository.find({
      where: { supplyType: { id: supplyTypeId } }
    });
  }
}
