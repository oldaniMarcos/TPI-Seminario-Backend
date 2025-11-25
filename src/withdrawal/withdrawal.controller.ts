import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WithdrawalService } from './withdrawal.service';
import { CreateWithdrawalDto } from './dto/create-withdrawal.dto';
import { UpdateWithdrawalDto } from './dto/update-withdrawal.dto';
import { Withdrawal } from './entities/withdrawal.entity';

@Controller('withdrawal')
export class WithdrawalController {
  constructor(private readonly withdrawalService: WithdrawalService) {}

  @Post()
  create(@Body() createWithdrawalDto: CreateWithdrawalDto): Promise<Withdrawal> {
    return this.withdrawalService.create(createWithdrawalDto);
  }

  @Get()
  findAll(): Promise<Withdrawal[]> {
    return this.withdrawalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Withdrawal> {
    return this.withdrawalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWithdrawalDto: UpdateWithdrawalDto): Promise<Withdrawal> {
    return this.withdrawalService.update(+id, updateWithdrawalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.withdrawalService.remove(+id);
  }
}
