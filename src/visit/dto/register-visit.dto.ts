import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsInt,
  IsArray,
  ValidateNested,
  IsBoolean,
  IsDateString,
  Min,
  IsOptional
} from 'class-validator';

import { Type } from 'class-transformer';
import { VisitSupplyDto } from './visit-supply.dto';

export class RegisterVisitDto {

  @IsNotEmpty()
  @IsInt()
  petId: number;

  @IsNotEmpty()
  @IsInt()
  vetId: number;

  @IsNotEmpty()
  @IsString()
  diagnostic: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VisitSupplyDto)
  supplies: VisitSupplyDto[];

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  visitValue: number;

  @IsNotEmpty()
  @IsBoolean()
  payInInstallments: boolean;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  total: number;

  @IsDateString()
  @IsOptional()
  dueDate: string;
}
