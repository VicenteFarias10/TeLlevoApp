import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallesViajePasajeroPage } from './detalles-viaje-pasajero.page';

const routes: Routes = [
  {
    path: '',
    component: DetallesViajePasajeroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallesViajePasajeroPageRoutingModule {}
