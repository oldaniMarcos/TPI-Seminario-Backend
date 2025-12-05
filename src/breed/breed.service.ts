import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Breed } from './entities/breed.entity';
import { Repository } from 'typeorm';
import { Species } from '../species/entities/species.entity';

@Injectable()
export class BreedService {

  constructor(
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
    @InjectRepository(Species)
    private readonly speciesRepository: Repository<Species>,
  ) { }

  async create(createBreedDto: CreateBreedDto): Promise<Breed> {

    const { description, speciesId } = createBreedDto;

    const species = await this.speciesRepository.findOneBy({ id: speciesId });
    if (!species) {
      throw new NotFoundException('Species not found');
    }

    const breed = this.breedRepository.create({
      description,
      species,
    });

    return this.breedRepository.save(breed);
  }

  async findAll(): Promise<Breed[]> {
    return this.breedRepository.find({
      relations: ['species'],
    });
  }

  async findOne(id: number): Promise<Breed> {
    const breed = await this.breedRepository.findOne({
      where: { id },
      relations: ['species'],
    });

    if (!breed) {
      throw new NotFoundException(`Breed with id ${id} not found`);
    }

    return breed;
  }

  async update(id: number, updateBreedDto: UpdateBreedDto): Promise<Breed> {
    const breed = await this.breedRepository.findOne({
      where: { id },
      relations: ['species'],
    });

    if (!breed) {
      throw new NotFoundException(`Breed with id ${id} not found`);
    }

    const { description, speciesId } = updateBreedDto;

    // Update primitive fields
    if (description !== undefined) {
      breed.description = description;
    }

    // Update species relation if provided
    if (speciesId !== undefined) {
      const species = await this.speciesRepository.findOneBy({ id: speciesId });
      if (!species) {
        throw new NotFoundException(`Species with id ${speciesId} not found`);
      }
      breed.species = species;
    }

    return await this.breedRepository.save(breed);
  }

  async remove(id: number): Promise<void> {
    const result = await this.breedRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Breed with id ${id} not found`);
    }
  }

  async findBySpecies(speciesId: number) {
    return this.breedRepository.find({
      where: { species: { id: speciesId } }
    });
  }
}
