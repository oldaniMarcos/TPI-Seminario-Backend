import { IsNotEmpty, IsString, IsNumber, IsInt } from 'class-validator';

export class CreateSupplyPriceDto {
  @IsNotEmpty()
  @IsString()
  beginDate: string;

  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsInt()
  supplyTypeId: number;
}
