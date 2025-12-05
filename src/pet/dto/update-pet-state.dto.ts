import { IsIn, IsString } from "class-validator";

export class UpdatePetStateDto {
  @IsString()
  @IsIn(['alta', 'baja'])
  state: 'alta' | 'baja';
}
