import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { Visit } from './entities/visit.entity';
import { Pet } from '../pet/entities/pet.entity';
import { Veterinary } from '../veterinary/entities/veterinary.entity';
import { CashFlow } from '../cash-flow/entities/cash-flow.entity';
import { SupplyType } from '../supply-type/entities/supply-type.entity';

@Injectable()
export class VisitService {
  constructor(
    @InjectRepository(Visit)
    private readonly visitRepository: Repository<Visit>,
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
    @InjectRepository(Veterinary)
    private readonly veterinaryRepository: Repository<Veterinary>,
    @InjectRepository(CashFlow)
    private readonly cashFlowRepository: Repository<CashFlow>,
    @InjectRepository(SupplyType)
    private readonly supplyTypeRepository: Repository<SupplyType>,
  ) {}

  async create(createVisitDto: CreateVisitDto): Promise<Visit> {
    const pet = await this.petRepository.findOne({ where: { id: createVisitDto.petId } });
    if (!pet) throw new NotFoundException(`Pet with id ${createVisitDto.petId} not found`);

    const veterinary = await this.veterinaryRepository.findOne({ where: { id: createVisitDto.veterinaryId } });
    if (!veterinary) throw new NotFoundException(`Veterinary with id ${createVisitDto.veterinaryId} not found`);

    const cashFlow = await this.cashFlowRepository.findOne({ where: { id: createVisitDto.cashFlowId } });
    if (!cashFlow) throw new NotFoundException(`CashFlow with id ${createVisitDto.cashFlowId} not found`);

    const supplyTypes = await Promise.all(
      createVisitDto.supplyTypeIds.map(async (id) => {
        const st = await this.supplyTypeRepository.findOne({ where: { id } });
        if (!st) throw new NotFoundException(`SupplyType with id ${id} not found`);
        return st;
      }),
    );

    const visit = this.visitRepository.create({
      dateTime: createVisitDto.dateTime,
      diagnostic: createVisitDto.diagnostic,
      amount: createVisitDto.amount,
      pet,
      veterinary,
      cashFlow,
      supplyTypes,
    });

    return this.visitRepository.save(visit);
  }

  async findAll(): Promise<Visit[]> {
    return this.visitRepository.find({ relations: ['pet', 'veterinary', 'cashFlow', 'installments', 'supplyTypes'] });
  }

  async findOne(id: number): Promise<Visit> {
    const visit = await this.visitRepository.findOne({ where: { id }, relations: ['pet', 'veterinary', 'cashFlow', 'installments', 'supplyTypes'] });
    if (!visit) throw new NotFoundException(`Visit with id ${id} not found`);
    return visit;
  }

  async update(id: number, updateVisitDto: UpdateVisitDto): Promise<Visit> {
    const visit = await this.findOne(id);

    if (updateVisitDto.petId) {
      const pet = await this.petRepository.findOne({ where: { id: updateVisitDto.petId } });
      if (!pet) throw new NotFoundException(`Pet with id ${updateVisitDto.petId} not found`);
      visit.pet = pet;
    }

    if (updateVisitDto.veterinaryId) {
      const veterinary = await this.veterinaryRepository.findOne({ where: { id: updateVisitDto.veterinaryId } });
      if (!veterinary) throw new NotFoundException(`Veterinary with id ${updateVisitDto.veterinaryId} not found`);
      visit.veterinary = veterinary;
    }

    if (updateVisitDto.cashFlowId) {
      const cashFlow = await this.cashFlowRepository.findOne({ where: { id: updateVisitDto.cashFlowId } });
      if (!cashFlow) throw new NotFoundException(`CashFlow with id ${updateVisitDto.cashFlowId} not found`);
      visit.cashFlow = cashFlow;
    }

    if (updateVisitDto.supplyTypeIds) {
      const supplyTypes = await Promise.all(
        updateVisitDto.supplyTypeIds.map(async (id) => {
          const st = await this.supplyTypeRepository.findOne({ where: { id } });
          if (!st) throw new NotFoundException(`SupplyType with id ${id} not found`);
          return st;
        }),
      );
      visit.supplyTypes = supplyTypes;
    }

    if (updateVisitDto.dateTime !== undefined) visit.dateTime = updateVisitDto.dateTime;
    if (updateVisitDto.diagnostic !== undefined) visit.diagnostic = updateVisitDto.diagnostic;
    if (updateVisitDto.amount !== undefined) visit.amount = updateVisitDto.amount;

    return this.visitRepository.save(visit);
  }

  async remove(id: number): Promise<void> {
    const visit = await this.findOne(id);
    await this.visitRepository.delete(visit.id);
  }
}
