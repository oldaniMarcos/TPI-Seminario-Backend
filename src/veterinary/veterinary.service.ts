import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVeterinaryDto } from './dto/create-veterinary.dto';
import { UpdateVeterinaryDto } from './dto/update-veterinary.dto';
import { Veterinary } from './entities/veterinary.entity';

@Injectable()
export class VeterinaryService {
  constructor(
    @InjectRepository(Veterinary)
    private readonly veterinaryRepository: Repository<Veterinary>,
  ) {}

  async create(createVeterinaryDto: CreateVeterinaryDto): Promise<Veterinary> {
    const v = this.veterinaryRepository.create(createVeterinaryDto);
    return this.veterinaryRepository.save(v);
  }

  async findAll(): Promise<Veterinary[]> {
    return this.veterinaryRepository.find({ relations: ['visits'] });
  }

  async findOne(id: number): Promise<Veterinary> {
    const v = await this.veterinaryRepository.findOne({ where: { id }, relations: ['visits'] });
    if (!v) {
      throw new NotFoundException(`Veterinary with id ${id} not found`);
    }
    return v;
  }

  async update(id: number, updateVeterinaryDto: UpdateVeterinaryDto): Promise<Veterinary> {
    await this.findOne(id);
    await this.veterinaryRepository.update(id, updateVeterinaryDto as any);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const v = await this.findOne(id);
    await this.veterinaryRepository.delete(v.id);
  }
}
