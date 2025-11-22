import { Injectable } from '@nestjs/common';
import { CreateSupplyPriceDto } from './dto/create-supply-price.dto';
import { UpdateSupplyPriceDto } from './dto/update-supply-price.dto';

@Injectable()
export class SupplyPriceService {
  create(createSupplyPriceDto: CreateSupplyPriceDto) {
    return 'This action adds a new supplyPrice';
  }

  findAll() {
    return `This action returns all supplyPrice`;
  }

  findOne(id: number) {
    return `This action returns a #${id} supplyPrice`;
  }

  update(id: number, updateSupplyPriceDto: UpdateSupplyPriceDto) {
    return `This action updates a #${id} supplyPrice`;
  }

  remove(id: number) {
    return `This action removes a #${id} supplyPrice`;
  }
}
