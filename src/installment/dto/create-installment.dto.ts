import { IsNotEmpty, IsNumber, IsString, IsInt } from 'class-validator';

export class CreateInstallmentDto {
  @IsNotEmpty()
  @IsString()
  dueDate: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsString()
  payDate: string;

  @IsNotEmpty()
  @IsInt()
  visitId: number;
}
