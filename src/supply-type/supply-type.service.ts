import { Injectable } from '@nestjs/common';
import { CreateSupplyTypeDto } from './dto/create-supply-type.dto';
import { UpdateSupplyTypeDto } from './dto/update-supply-type.dto';

@Injectable()
export class SupplyTypeService {
  create(createSupplyTypeDto: CreateSupplyTypeDto) {
    return 'This action adds a new supplyType';
  }

  findAll() {
    return `This action returns all supplyType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} supplyType`;
  }

  update(id: number, updateSupplyTypeDto: UpdateSupplyTypeDto) {
    return `This action updates a #${id} supplyType`;
  }

  remove(id: number) {
    return `This action removes a #${id} supplyType`;
  }
}
