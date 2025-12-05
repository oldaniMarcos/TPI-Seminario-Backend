import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VeterinaryService } from './veterinary.service';
import { CreateVeterinaryDto } from './dto/create-veterinary.dto';
import { UpdateVeterinaryDto } from './dto/update-veterinary.dto';
import { Veterinary } from './entities/veterinary.entity';
import { UpdateVeterinaryStateDto } from './dto/update-veterinary-state.dto';

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

  @Patch(':id/state')
  updateState(
    @Param('id') id: number,
    @Body() dto: UpdateVeterinaryStateDto,
  ) {
    return this.veterinaryService.updateState(id, dto.state);
  }
}
