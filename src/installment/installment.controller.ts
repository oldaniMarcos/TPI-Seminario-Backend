import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InstallmentService } from './installment.service';
import { CreateInstallmentDto } from './dto/create-installment.dto';
import { UpdateInstallmentDto } from './dto/update-installment.dto';
import { Installment } from './entities/installment.entity';

@Controller('installment')
export class InstallmentController {
  constructor(private readonly installmentService: InstallmentService) {}

  @Post()
  create(@Body() createInstallmentDto: CreateInstallmentDto): Promise<Installment> {
    return this.installmentService.create(createInstallmentDto);
  }

  @Get()
  findAll(): Promise<Installment[]> {
    return this.installmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Installment> {
    return this.installmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInstallmentDto: UpdateInstallmentDto): Promise<Installment> {
    return this.installmentService.update(+id, updateInstallmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.installmentService.remove(+id);
  }
}
