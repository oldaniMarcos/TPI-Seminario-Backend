import { PartialType } from '@nestjs/mapped-types';
import { CreatePetDto } from './create-pet.dto';
import { IsInt, IsOptional } from 'class-validator';

export class UpdatePetDto extends PartialType(CreatePetDto) {
  @IsOptional()
  @IsInt()
  clientId?: number;

  @IsOptional()
  @IsInt()
  breedId?: number;
}
