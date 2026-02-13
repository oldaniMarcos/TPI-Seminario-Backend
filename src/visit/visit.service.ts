import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { Visit } from './entities/visit.entity';
import { Pet } from '../pet/entities/pet.entity';
import { Veterinary } from '../veterinary/entities/veterinary.entity';
import { CashFlow } from '../cash-flow/entities/cash-flow.entity';
import { SupplyType } from '../supply-type/entities/supply-type.entity';
import { RegisterVisitDto } from './dto/register-visit.dto';
import { Lot } from '../lot/entities/lot.entity';
import { Installment } from '../installment/entities/installment.entity';

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

  async registerVisit(registerVisitDto: RegisterVisitDto): Promise<void> {
    console.log(registerVisitDto);

    const queryRunner = this.visitRepository.manager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const {
        petId,
        vetId,
        diagnostic,
        supplies,
        // visitValue, // unused
        payInInstallments,
        total,
        dueDate
      } = registerVisitDto;

      const manager = queryRunner.manager;

      // fetch the latest cash register
      const [cashFlow] = await this.cashFlowRepository.find({
        order: { id: 'DESC' },
        take: 1,
      })

      if (!cashFlow) {
        throw new Error('No CashFlow records found');
      }

      // create the visit
      const visit = manager.create(Visit, {
        dateTime: new Date().toISOString(),
        diagnostic,
        amount: total,
        pet: { id: petId },
        veterinary: { id: vetId },
        cashFlow: { id: cashFlow.id },
        supplyTypes: supplies.map(s => ({ id: s.supplyTypeId })),
      });
      await manager.save(visit);

      // add inflows to cash register
      cashFlow.inflows = Number(cashFlow.inflows || 0) + Number(total);
      await manager.save(cashFlow);

      // update supply stock
      for (const s of supplies) {
        let remaining = s.quantity;

        const lots = await manager.find(Lot, {
          where: {
            supplyType: { id: s.supplyTypeId },
            units: MoreThan(0),
          },
          order: { 
            dueDate: 'ASC' 
          },
          lock: { mode: 'pessimistic_write' },
        });

        if (!lots.length) {
          throw new Error(`No stock available for supply type ${s.supplyTypeId}`);
        }

        for (const lot of lots) {
          if (remaining <= 0) break;

          const available = lot.units;

          if (available >= remaining) {
            lot.units = available - remaining;
            remaining = 0;
            await manager.save(lot);
            break;
          } else {
            remaining -= available;
            lot.units = 0;
            await manager.save(lot);
          }
        }

        if (remaining > 0) {
          throw new Error(`Not enough stock for supply type ${s.supplyTypeId}. Remaining quantity: ${remaining}`);
        }
      }

      // create installments if needed
      if (payInInstallments) {
        const installmentValue = Number(total) / 3;

        let currentDue = new Date(dueDate);

        for (let i = 0; i < 3; i++) {
          const installment = manager.create(Installment, {
            visit: { id: visit.id },
            amount: installmentValue,
            dueDate: new Date(currentDue).toISOString().split('T')[0],
          });

          await manager.save(installment)

          currentDue = new Date(currentDue);
          currentDue.setMonth(currentDue.getMonth() + 1);
        }
      }

      // commit
      await queryRunner.commitTransaction();

    } catch (error) {

      await queryRunner.rollbackTransaction();
      throw error;

    } finally {

      await queryRunner.release();

    }
  }
}
