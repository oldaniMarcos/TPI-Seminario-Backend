import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateCashFlowDto {
  // @IsNotEmpty()
  @IsOptional()
  @IsString()
  closeDate: string;

  // @IsNotEmpty()
  @IsString()
  closeType: string;

  @IsNotEmpty()
  @IsNumber()
  initialAmount: number;

  @IsNotEmpty()
  @IsNumber()
  inflows: number;

  @IsNotEmpty()
  @IsNumber()
  outflows: number;
}
