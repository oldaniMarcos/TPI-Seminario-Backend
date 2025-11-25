import { PartialType } from '@nestjs/mapped-types';
import { CreateVisitDto } from './create-visit.dto';
import { IsOptional, IsInt, IsArray } from 'class-validator';

export class UpdateVisitDto extends PartialType(CreateVisitDto) {
  @IsOptional()
  @IsInt()
  petId?: number;

  @IsOptional()
  @IsInt()
  veterinaryId?: number;

  @IsOptional()
  @IsInt()
  cashFlowId?: number;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  supplyTypeIds?: number[];
}
