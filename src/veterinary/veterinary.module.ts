import { Module } from '@nestjs/common';
import { VeterinaryService } from './veterinary.service';
import { VeterinaryController } from './veterinary.controller';

@Module({
  controllers: [VeterinaryController],
  providers: [VeterinaryService],
})
export class VeterinaryModule {}
