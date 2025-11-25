import { Module } from '@nestjs/common';
import { BreedService } from './breed.service';
import { BreedController } from './breed.controller';
import { Breed } from './entities/breed.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Species } from '../species/entities/species.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Breed, Species])],
  exports: [TypeOrmModule],
  controllers: [BreedController],
  providers: [BreedService],
})
export class BreedModule {}
