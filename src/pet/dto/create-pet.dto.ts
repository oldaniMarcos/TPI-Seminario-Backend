import { IsNotEmpty, IsString, IsNumber, IsInt } from 'class-validator';

export class CreatePetDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  birthDate: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsInt()
  clientId: number;
  
  @IsNotEmpty()
  @IsInt()
  breedId: number;
}
