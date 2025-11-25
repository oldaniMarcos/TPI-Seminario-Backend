import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSupplyTypeDto {
  @IsNotEmpty()
  @IsString()
  description: string;
}
