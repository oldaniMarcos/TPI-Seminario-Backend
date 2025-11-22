import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfitMarginService } from './profit-margin.service';
import { CreateProfitMarginDto } from './dto/create-profit-margin.dto';
import { UpdateProfitMarginDto } from './dto/update-profit-margin.dto';

@Controller('profit-margin')
export class ProfitMarginController {
  constructor(private readonly profitMarginService: ProfitMarginService) {}

  @Post()
  create(@Body() createProfitMarginDto: CreateProfitMarginDto) {
    return this.profitMarginService.create(createProfitMarginDto);
  }

  @Get()
  findAll() {
    return this.profitMarginService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profitMarginService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfitMarginDto: UpdateProfitMarginDto) {
    return this.profitMarginService.update(+id, updateProfitMarginDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profitMarginService.remove(+id);
  }
}
