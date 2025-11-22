import { Injectable } from '@nestjs/common';
import { CreateVeterinaryDto } from './dto/create-veterinary.dto';
import { UpdateVeterinaryDto } from './dto/update-veterinary.dto';

@Injectable()
export class VeterinaryService {
  create(createVeterinaryDto: CreateVeterinaryDto) {
    return 'This action adds a new veterinary';
  }

  findAll() {
    return `This action returns all veterinary`;
  }

  findOne(id: number) {
    return `This action returns a #${id} veterinary`;
  }

  update(id: number, updateVeterinaryDto: UpdateVeterinaryDto) {
    return `This action updates a #${id} veterinary`;
  }

  remove(id: number) {
    return `This action removes a #${id} veterinary`;
  }
}
