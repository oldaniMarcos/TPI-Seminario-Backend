import { 
  IsNotEmpty, 
  IsString, 
  IsNumber, 
  IsInt, 
  IsArray 
} from 'class-validator';

export class CreateVisitDto {
  @IsNotEmpty()
  @IsString()
  dateTime: string;

  @IsNotEmpty()
  @IsString()
  diagnostic: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsInt()
  petId: number;

  @IsNotEmpty()
  @IsInt()
  veterinaryId: number;

  @IsNotEmpty()
  @IsInt()
  cashFlowId: number;

  @IsNotEmpty()
  @IsArray()
  @IsInt({ each: true })
  supplyTypeIds: number[];  // Many-to-Many FK list
}
