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
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    ClientModule, PetModule, VisitModule, SpeciesModule, BreedModule, LotModule, SupplyTypeModule, SupplyPriceModule, VeterinaryModule, ProfitMarginModule, CashFlowModule, WithdrawalModule, InstallmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
