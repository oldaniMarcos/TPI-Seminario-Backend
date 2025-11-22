import { PartialType } from '@nestjs/mapped-types';
import { CreateSupplyPriceDto } from './create-supply-price.dto';

export class UpdateSupplyPriceDto extends PartialType(CreateSupplyPriceDto) {}
