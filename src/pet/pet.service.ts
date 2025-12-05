import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet } from './entities/pet.entity';
import { Client } from '../client/entities/client.entity';
import { Breed } from '../breed/entities/breed.entity';
// import { PetListDto } from './dto/pet-list.dto';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) {}

  async create(createPetDto: CreatePetDto): Promise<Pet> {
    const client = await this.clientRepository.findOne({ where: { id: createPetDto.clientId } });
    if (!client) {
      throw new NotFoundException(`Client with id ${createPetDto.clientId} not found`);
    }

    const breed = await this.breedRepository.findOne({ where: { id: createPetDto.breedId } });
    if (!breed) {
      throw new NotFoundException(`Breed with id ${createPetDto.breedId} not found`);
    }

    const pet = this.petRepository.create({
      name: createPetDto.name,
      birthDate: createPetDto.birthDate,
      age: createPetDto.age,
      state: createPetDto.state,
      client,
      breed,
    });

    return this.petRepository.save(pet);
  }

  async findAll(): Promise<Pet[]> {
    return this.petRepository.find({ relations: ['client', 'breed', 'visits'] });
  }

  async findOne(id: number): Promise<Pet> {
    const pet = await this.petRepository.findOne({ where: { id }, relations: ['client', 'breed', 'visits'] });
    if (!pet) {
      throw new NotFoundException(`Pet with id ${id} not found`);
    }
    return pet;
  }

  async update(id: number, updatePetDto: UpdatePetDto): Promise<Pet> {
    const pet = await this.findOne(id);

    if (updatePetDto.clientId) {
      const client = await this.clientRepository.findOne({ where: { id: updatePetDto.clientId } });
      if (!client) {
        throw new NotFoundException(`Client with id ${updatePetDto.clientId} not found`);
      }
      pet.client = client;
    }

    if (updatePetDto.breedId) {
      const breed = await this.breedRepository.findOne({ where: { id: updatePetDto.breedId } });
      if (!breed) {
        throw new NotFoundException(`Breed with id ${updatePetDto.breedId} not found`);
      }
      pet.breed = breed;
    }

    // apply other fields
    if (updatePetDto.name !== undefined) pet.name = updatePetDto.name;
    if (updatePetDto.birthDate !== undefined) pet.birthDate = updatePetDto.birthDate;
    if (updatePetDto.age !== undefined) pet.age = updatePetDto.age;
    if (updatePetDto.state !== undefined) pet.state = updatePetDto.state;

    return this.petRepository.save(pet);
  }

  async remove(id: number): Promise<void> {
    const pet = await this.findOne(id);
    await this.petRepository.delete(pet.id);
  }

  // async findByClientId(clientId: number): Promise<PetListDto[]> {
  //   const pets = await this.petRepository.find({
  //     where: { client: { id: clientId } },
  //     relations: {
  //       breed: {
  //         species: true
  //       }
  //     }
  //   });

  //   return pets.map(pet => ({
  //     id: pet.id,
  //     name: pet.name,
  //     birthDate: pet.birthDate,
  //     age: pet.age,
  //     state: pet.state,
  //     breedName: pet.breed.description,
  //     speciesName: pet.breed.species.description,
  //   }));
  // }

  async findByClientId(clientId: number) {
    return this.petRepository
      .createQueryBuilder('pet')
      .leftJoin('pet.breed', 'breed')
      .leftJoin('breed.species', 'species')
      .select([
        'pet.id AS id',
        'pet.name AS name',
        "DATE_FORMAT(pet.birthDate, '%Y-%m-%d') AS birthDate",
        'pet.age AS age',
        'pet.state AS state',
        'pet.clientId AS clientId',
        'breed.description AS breedName',
        'species.description AS speciesName',
      ])
      .where('pet.clientId = :clientId', { clientId })
      .getRawMany();
  }

  async updateState(id: number, state: 'alta' | 'baja') {
    await this.petRepository.update(id, { state });

    return this.petRepository
      .createQueryBuilder('pet')
      .leftJoin('pet.breed', 'breed')
      .leftJoin('breed.species', 'species')
      .where('pet.id = :id', { id })
      .select([
        'pet.id AS id',
        'pet.name AS name',
        "DATE_FORMAT(pet.birthDate, '%Y-%m-%d') AS birthDate",
        'pet.age AS age',
        'pet.state AS state',
        'pet.clientId AS clientId',
        'breed.id AS breedId',
        'breed.description AS breedName',
        'species.description AS speciesName',
      ])
      .getRawOne();
  }

}
