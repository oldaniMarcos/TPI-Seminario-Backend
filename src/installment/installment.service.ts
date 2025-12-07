import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInstallmentDto } from './dto/create-installment.dto';
import { UpdateInstallmentDto } from './dto/update-installment.dto';
import { Installment } from './entities/installment.entity';
import { Visit } from '../visit/entities/visit.entity';

@Injectable()
export class InstallmentService {
  constructor(
    @InjectRepository(Installment)
    private readonly installmentRepository: Repository<Installment>,
    @InjectRepository(Visit)
    private readonly visitRepository: Repository<Visit>,
  ) {}

  async create(createInstallmentDto: CreateInstallmentDto): Promise<Installment> {
    const visit = await this.visitRepository.findOne({
      where: { id: createInstallmentDto.visitId },
    });

    if (!visit) {
      throw new NotFoundException(`Visit with id ${createInstallmentDto.visitId} not found`);
    }

    const installment = this.installmentRepository.create({
      ...createInstallmentDto,
      visit,
    });
  
    return this.installmentRepository.save(installment);
  }

  async findAll(): Promise<Installment[]> {
    return this.installmentRepository.find({
      relations: ['visit'],
    });
  }

  async findOne(id: number): Promise<Installment> {
    const installment = await this.installmentRepository.findOne({
      where: { id },
      relations: ['visit'],
    });

    if (!installment) {
      throw new NotFoundException(`Installment with id ${id} not found`);
    }

    return installment;
  }

  async update(id: number, updateInstallmentDto: UpdateInstallmentDto): Promise<Installment> {
    await this.findOne(id);

    if (updateInstallmentDto.visitId) {
      const visit = await this.visitRepository.findOne({
        where: { id: updateInstallmentDto.visitId },
      });

      if (!visit) {
        throw new NotFoundException(`Visit with id ${updateInstallmentDto.visitId} not found`);
      }
    }

    await this.installmentRepository.update(id, updateInstallmentDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const installment = await this.findOne(id);
    await this.installmentRepository.delete(installment.id);
  }

  async payInstallment(id: number): Promise<Installment> {
    const installment = await this.installmentRepository.findOne({ where: { id } });

    if (!installment) {
      throw new NotFoundException(`Installment with id ${id} not found`);
    }

    const today = new Date().toISOString().split('T')[0];

    installment.payDate = today;

    return this.installmentRepository.save(installment);
  }

}