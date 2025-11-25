import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PetService } from './pet.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet } from './entities/pet.entity';

@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post()
  create(@Body() createPetDto: CreatePetDto): Promise<Pet> {
    return this.petService.create(createPetDto);
  }

  @Get()
  findAll(): Promise<Pet[]> {
    return this.petService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Pet> {
    return this.petService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto): Promise<Pet> {
    return this.petService.update(+id, updatePetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.petService.remove(+id);
  }
}
