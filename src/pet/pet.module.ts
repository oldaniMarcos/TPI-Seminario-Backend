import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetController } from './pet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { Breed } from '../breed/entities/breed.entity';
import { Client } from '../client/entities/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pet, Breed, Client])],
  exports: [TypeOrmModule],
  controllers: [PetController],
  providers: [PetService],
})
export class PetModule {}
