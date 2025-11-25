import { Module } from '@nestjs/common';
import { SupplyTypeService } from './supply-type.service';
import { SupplyTypeController } from './supply-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplyType } from './entities/supply-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SupplyType])],
  exports: [TypeOrmModule],
  controllers: [SupplyTypeController],
  providers: [SupplyTypeService],
})
export class SupplyTypeModule {}
