import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CashFlowService } from './cash-flow.service';
import { CreateCashFlowDto } from './dto/create-cash-flow.dto';
import { UpdateCashFlowDto } from './dto/update-cash-flow.dto';
import { CashFlow } from './entities/cash-flow.entity';

@Controller('cash-flow')
export class CashFlowController {
  constructor(private readonly cashFlowService: CashFlowService) {}

  @Post()
  create(@Body() createCashFlowDto: CreateCashFlowDto): Promise<CashFlow> {
    return this.cashFlowService.create(createCashFlowDto);
  }

  @Get()
  findAll(): Promise<CashFlow[]> {
    return this.cashFlowService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<CashFlow> {
    return this.cashFlowService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCashFlowDto: UpdateCashFlowDto): Promise<CashFlow> {
    return this.cashFlowService.update(+id, updateCashFlowDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.cashFlowService.remove(+id);
  }
}
