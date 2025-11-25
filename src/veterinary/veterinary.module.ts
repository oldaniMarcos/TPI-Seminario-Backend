import { Module } from '@nestjs/common';
import { VeterinaryService } from './veterinary.service';
import { VeterinaryController } from './veterinary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Veterinary } from './entities/veterinary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Veterinary])],
  exports: [TypeOrmModule],
  controllers: [VeterinaryController],
  providers: [VeterinaryService],
})
export class VeterinaryModule {}
