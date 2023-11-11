import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeCondPage } from './welcome-cond.page';

const routes: Routes = [
  {
    path: '',
    component: WelcomeCondPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelcomeCondPageRoutingModule {}
