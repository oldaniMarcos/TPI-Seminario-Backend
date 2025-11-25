import { IsNotEmpty, IsString, IsNumber, IsInt } from 'class-validator';

export class CreateLotDto {
  @IsNotEmpty()
  @IsString()
  lotNumber: string;

  @IsNotEmpty()
  @IsString()
  dueDate: string;

  @IsNotEmpty()
  @IsNumber()
  units: number;

  @IsNotEmpty()
  @IsInt()
  supplyTypeId: number;
}
