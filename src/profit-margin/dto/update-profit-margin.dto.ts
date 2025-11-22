import { PartialType } from '@nestjs/mapped-types';
import { CreateProfitMarginDto } from './create-profit-margin.dto';

export class UpdateProfitMarginDto extends PartialType(CreateProfitMarginDto) {}
