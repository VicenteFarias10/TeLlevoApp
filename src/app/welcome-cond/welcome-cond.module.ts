import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WelcomeCondPageRoutingModule } from './welcome-cond-routing.module';

import { WelcomeCondPage } from './welcome-cond.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WelcomeCondPageRoutingModule
  ],
  declarations: [WelcomeCondPage]
})
export class WelcomeCondPageModule {}
