import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LotService } from './lot.service';
import { CreateLotDto } from './dto/create-lot.dto';
import { UpdateLotDto } from './dto/update-lot.dto';
import { Lot } from './entities/lot.entity';

@Controller('lot')
export class LotController {
  constructor(private readonly lotService: LotService) {}

  @Post()
  create(@Body() createLotDto: CreateLotDto): Promise<Lot> {
    return this.lotService.create(createLotDto);
  }

  @Get()
  findAll(): Promise<Lot[]> {
    return this.lotService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Lot> {
    return this.lotService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLotDto: UpdateLotDto): Promise<Lot> {
    return this.lotService.update(+id, updateLotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.lotService.remove(+id);
  }

  @Get('types/:supplyTypeId')
    findByType(@Param('supplyTypeId') supplyTypeId: string): Promise<Lot[]> {
      return this.lotService.findBySupplyType(+supplyTypeId);
    }
}
