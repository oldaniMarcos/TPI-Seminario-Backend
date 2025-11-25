import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfitMarginService } from './profit-margin.service';
import { CreateProfitMarginDto } from './dto/create-profit-margin.dto';
import { UpdateProfitMarginDto } from './dto/update-profit-margin.dto';
import { ProfitMargin } from './entities/profit-margin.entity';

@Controller('profit-margin')
export class ProfitMarginController {
  constructor(private readonly profitMarginService: ProfitMarginService) {}

  @Post()
  create(@Body() createProfitMarginDto: CreateProfitMarginDto): Promise<ProfitMargin> {
    return this.profitMarginService.create(createProfitMarginDto);
  }

  @Get()
  findAll(): Promise<ProfitMargin[]> {
    return this.profitMarginService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ProfitMargin> {
    return this.profitMarginService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfitMarginDto: UpdateProfitMarginDto): Promise<ProfitMargin> {
    return this.profitMarginService.update(+id, updateProfitMarginDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.profitMarginService.remove(+id);
  }
}
