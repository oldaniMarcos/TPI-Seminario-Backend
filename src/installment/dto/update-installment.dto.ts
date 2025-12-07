import { PartialType } from '@nestjs/mapped-types';
import { CreateInstallmentDto } from './create-installment.dto';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateInstallmentDto extends PartialType(CreateInstallmentDto) {
  @IsOptional()
  @IsInt()
  visitId?: number;

  @IsString()
  @IsOptional()
  payDate?: string | null;
}
