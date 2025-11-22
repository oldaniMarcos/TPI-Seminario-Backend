import { Injectable } from '@nestjs/common';
import { CreateProfitMarginDto } from './dto/create-profit-margin.dto';
import { UpdateProfitMarginDto } from './dto/update-profit-margin.dto';

@Injectable()
export class ProfitMarginService {
  create(createProfitMarginDto: CreateProfitMarginDto) {
    return 'This action adds a new profitMargin';
  }

  findAll() {
    return `This action returns all profitMargin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profitMargin`;
  }

  update(id: number, updateProfitMarginDto: UpdateProfitMarginDto) {
    return `This action updates a #${id} profitMargin`;
  }

  remove(id: number) {
    return `This action removes a #${id} profitMargin`;
  }
}
