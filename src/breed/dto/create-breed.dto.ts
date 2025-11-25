import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateBreedDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsInt()
  speciesId: number; // FK to Species
}
