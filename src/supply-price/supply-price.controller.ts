import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SupplyPriceService } from './supply-price.service';
import { CreateSupplyPriceDto } from './dto/create-supply-price.dto';
import { UpdateSupplyPriceDto } from './dto/update-supply-price.dto';

@Controller('supply-price')
export class SupplyPriceController {
  constructor(private readonly supplyPriceService: SupplyPriceService) {}

  @Post()
  create(@Body() createSupplyPriceDto: CreateSupplyPriceDto) {
    return this.supplyPriceService.create(createSupplyPriceDto);
  }

  @Get()
  findAll() {
    return this.supplyPriceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supplyPriceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSupplyPriceDto: UpdateSupplyPriceDto) {
    return this.supplyPriceService.update(+id, updateSupplyPriceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supplyPriceService.remove(+id);
  }
}
