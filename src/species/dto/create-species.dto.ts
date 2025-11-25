import { IsNotEmpty, IsString } from "class-validator";

export class CreateSpeciesDto {

  @IsNotEmpty()
  @IsString()
  description: string;
}
