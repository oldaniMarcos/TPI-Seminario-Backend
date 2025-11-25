import { PartialType } from '@nestjs/mapped-types';
import { CreateSupplyPriceDto } from './create-supply-price.dto';
import { IsInt, IsOptional } from 'class-validator';

export class UpdateSupplyPriceDto extends PartialType(CreateSupplyPriceDto) {
  @IsOptional()
  @IsInt()
  supplyTypeId?: number;
}
