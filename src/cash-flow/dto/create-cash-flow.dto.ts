import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateCashFlowDto {
  @IsNotEmpty()
  @IsString()
  closeDate: string;

  @IsNotEmpty()
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
