import { IsIn, IsString } from "class-validator";

export class UpdateVeterinaryStateDto {
  @IsString()
  @IsIn(['alta', 'baja'])
  state: 'alta' | 'baja';
}