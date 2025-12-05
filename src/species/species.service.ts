import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';
import { Repository } from 'typeorm';
import { Species } from './entities/species.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SpeciesService {

  constructor (
    @InjectRepository(Species)
    private speciesRepository: Repository<Species>,
  ) { }

  create(createSpeciesDto: CreateSpeciesDto) {

    const { description } = createSpeciesDto;

    const species = this.speciesRepository.create({
      description,
    });

    return this.speciesRepository.save(species);
  }

  async findAll(): Promise<Species[]> {
    return this.speciesRepository
      .createQueryBuilder('species')
      .loadRelationCountAndMap(
        'species.breedsCount',
        'species.breeds'
      )
      .getMany()
  }

  async findOne(id: number): Promise<Species> {
    const species = await this.speciesRepository.findOneBy({ id });

    if (!species) {
      throw new NotFoundException(`Species with id ${id} not found`);
    }

    return species;
  }

  async update(
    id: number,
    updateSpeciesDto: UpdateSpeciesDto,
  ): Promise<Species> {
    const species = await this.speciesRepository.findOneBy({ id });

    if (!species) {
      throw new NotFoundException(`Species with id ${id} not found`);
    }

    const { description } = updateSpeciesDto;

    if (description !== undefined) {
      species.description = description;
    }

    return this.speciesRepository.save(species);
  }

  async remove(id: number): Promise<void> {
    const result = await this.speciesRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Species with id ${id} not found`);
    }
  }
}
