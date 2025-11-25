import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateProfitMarginDto {
  @IsNotEmpty()
  @IsString()
  beginDate: string;

  @IsNotEmpty()
  @IsNumber()
  mult: number;
}
