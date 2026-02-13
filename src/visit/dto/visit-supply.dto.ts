import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class VisitSupplyDto {

  @IsNotEmpty()
  @IsInt()
  supplyTypeId: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  quantity: number;
}
