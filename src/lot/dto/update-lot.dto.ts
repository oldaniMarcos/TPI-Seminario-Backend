import { PartialType } from '@nestjs/mapped-types';
import { CreateLotDto } from './create-lot.dto';
import { IsInt, IsOptional } from 'class-validator';

export class UpdateLotDto extends PartialType(CreateLotDto) {
  @IsOptional()
  @IsInt()
  supplyTypeId?: number;
}
