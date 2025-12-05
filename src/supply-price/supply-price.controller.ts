import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SupplyPriceService } from './supply-price.service';
import { CreateSupplyPriceDto } from './dto/create-supply-price.dto';
import { UpdateSupplyPriceDto } from './dto/update-supply-price.dto';
import { SupplyPrice } from './entities/supply-price.entity';

@Controller('supply-price')
export class SupplyPriceController {
  constructor(private readonly supplyPriceService: SupplyPriceService) {}

  @Post()
  create(@Body() createSupplyPriceDto: CreateSupplyPriceDto): Promise<SupplyPrice> {
    return this.supplyPriceService.create(createSupplyPriceDto);
  }

  @Get()
  findAll(): Promise<SupplyPrice[]> {
    return this.supplyPriceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<SupplyPrice> {
    return this.supplyPriceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSupplyPriceDto: UpdateSupplyPriceDto): Promise<SupplyPrice> {
    return this.supplyPriceService.update(+id, updateSupplyPriceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.supplyPriceService.remove(+id);
  }

  @Get('types/:supplyTypeId')
  findByType(@Param('supplyTypeId') supplyTypeId: string): Promise<SupplyPrice[]> {
    return this.supplyPriceService.findByType(+supplyTypeId);
  }
}
