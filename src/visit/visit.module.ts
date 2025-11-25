import { Module } from '@nestjs/common';
import { VisitService } from './visit.service';
import { VisitController } from './visit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Visit } from './entities/visit.entity';
import { Pet } from '../pet/entities/pet.entity';
import { Veterinary } from '../veterinary/entities/veterinary.entity';
import { CashFlow } from '../cash-flow/entities/cash-flow.entity';
import { SupplyType } from '../supply-type/entities/supply-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Visit, Pet, Veterinary, CashFlow, SupplyType])],
  exports: [TypeOrmModule],
  controllers: [VisitController],
  providers: [VisitService],
})
export class VisitModule {}
