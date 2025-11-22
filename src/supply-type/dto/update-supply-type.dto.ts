import { PartialType } from '@nestjs/mapped-types';
import { CreateSupplyTypeDto } from './create-supply-type.dto';

export class UpdateSupplyTypeDto extends PartialType(CreateSupplyTypeDto) {}
