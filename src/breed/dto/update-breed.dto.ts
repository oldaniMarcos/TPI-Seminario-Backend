import { PartialType } from '@nestjs/mapped-types';
import { CreateBreedDto } from './create-breed.dto';
import { IsInt, IsOptional } from 'class-validator';

export class UpdateBreedDto extends PartialType(CreateBreedDto) {
  @IsOptional()
  @IsInt()
  speciesId?: number;
}
