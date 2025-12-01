import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateWithdrawalDto {
  @IsString()
  @IsNotEmpty()
  dateTime: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  amount: number;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  payDate: string;

  @IsNumber()
  cashFlowId: number;
}
