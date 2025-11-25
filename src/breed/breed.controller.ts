import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BreedService } from './breed.service';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { Breed } from './entities/breed.entity';

@Controller('breed')
export class BreedController {
  constructor(private readonly breedService: BreedService) {}

  @Post()
  create(@Body() createBreedDto: CreateBreedDto): Promise<Breed> {
    return this.breedService.create(createBreedDto);
  }

  @Get()
  findAll(): Promise<Breed[]> {
    return this.breedService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Breed> {
    return this.breedService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBreedDto: UpdateBreedDto): Promise<Breed> {
    return this.breedService.update(+id, updateBreedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.breedService.remove(+id);
  }
}
