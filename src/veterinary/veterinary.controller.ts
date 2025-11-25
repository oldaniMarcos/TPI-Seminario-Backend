import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VeterinaryService } from './veterinary.service';
import { CreateVeterinaryDto } from './dto/create-veterinary.dto';
import { UpdateVeterinaryDto } from './dto/update-veterinary.dto';
import { Veterinary } from './entities/veterinary.entity';

@Controller('veterinary')
export class VeterinaryController {
  constructor(private readonly veterinaryService: VeterinaryService) {}

  @Post()
  create(@Body() createVeterinaryDto: CreateVeterinaryDto): Promise<Veterinary> {
    return this.veterinaryService.create(createVeterinaryDto);
  }

  @Get()
  findAll(): Promise<Veterinary[]> {
    return this.veterinaryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Veterinary> {
    return this.veterinaryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVeterinaryDto: UpdateVeterinaryDto): Promise<Veterinary> {
    return this.veterinaryService.update(+id, updateVeterinaryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.veterinaryService.remove(+id);
  }
}
