import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallesViajePasajeroPageRoutingModule } from './detalles-viaje-pasajero-routing.module';

import { DetallesViajePasajeroPage } from './detalles-viaje-pasajero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallesViajePasajeroPageRoutingModule
  ],
  declarations: [DetallesViajePasajeroPage]
})
export class DetallesViajePasajeroPageModule {}
