import { Module } from '@nestjs/common';
import { InstallmentService } from './installment.service';
import { InstallmentController } from './installment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Installment } from './entities/installment.entity';
import { Visit } from '../visit/entities/visit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Installment, Visit])],
  exports: [TypeOrmModule],
  controllers: [InstallmentController],
  providers: [InstallmentService],
})
export class InstallmentModule {}
