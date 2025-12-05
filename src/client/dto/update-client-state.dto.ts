import { IsIn, IsString } from "class-validator";

export class UpdateClientStateDto {
  @IsString()
  @IsIn(['alta', 'baja'])
  state: 'alta' | 'baja';
}
