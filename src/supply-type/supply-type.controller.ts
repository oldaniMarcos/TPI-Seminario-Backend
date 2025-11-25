import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SupplyTypeService } from './supply-type.service';
import { CreateSupplyTypeDto } from './dto/create-supply-type.dto';
import { UpdateSupplyTypeDto } from './dto/update-supply-type.dto';
import { SupplyType } from './entities/supply-type.entity';

@Controller('supply-type')
export class SupplyTypeController {
  constructor(private readonly supplyTypeService: SupplyTypeService) {}

  @Post()
  create(@Body() createSupplyTypeDto: CreateSupplyTypeDto): Promise<SupplyType> {
    return this.supplyTypeService.create(createSupplyTypeDto);
  }

  @Get()
  findAll(): Promise<SupplyType[]> {
    return this.supplyTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<SupplyType> {
    return this.supplyTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSupplyTypeDto: UpdateSupplyTypeDto): Promise<SupplyType> {
    return this.supplyTypeService.update(+id, updateSupplyTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.supplyTypeService.remove(+id);
  }
}
