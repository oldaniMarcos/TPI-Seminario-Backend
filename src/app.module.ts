import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import { PetModule } from './pet/pet.module';
import { VisitModule } from './visit/visit.module';
import { SpeciesModule } from './species/species.module';
import { BreedModule } from './breed/breed.module';
import { LotModule } from './lot/lot.module';
import { SupplyTypeModule } from './supply-type/supply-type.module';
import { SupplyPriceModule } from './supply-price/supply-price.module';
import { VeterinaryModule } from './veterinary/veterinary.module';
import { ProfitMarginModule } from './profit-margin/profit-margin.module';
import { CashFlowModule } from './cash-flow/cash-flow.module';
import { WithdrawalModule } from './withdrawal/withdrawal.module';
import { InstallmentModule } from './installment/installment.module';

@Module({
  imports: [ClientModule, PetModule, VisitModule, SpeciesModule, BreedModule, LotModule, SupplyTypeModule, SupplyPriceModule, VeterinaryModule, ProfitMarginModule, CashFlowModule, WithdrawalModule, InstallmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
