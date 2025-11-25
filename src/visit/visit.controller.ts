import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VisitService } from './visit.service';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { Visit } from './entities/visit.entity';

@Controller('visit')
export class VisitController {
  constructor(private readonly visitService: VisitService) {}

  @Post()
  create(@Body() createVisitDto: CreateVisitDto): Promise<Visit> {
    return this.visitService.create(createVisitDto);
  }

  @Get()
  findAll(): Promise<Visit[]> {
    return this.visitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Visit> {
    return this.visitService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVisitDto: UpdateVisitDto): Promise<Visit> {
    return this.visitService.update(+id, updateVisitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.visitService.remove(+id);
  }
}
