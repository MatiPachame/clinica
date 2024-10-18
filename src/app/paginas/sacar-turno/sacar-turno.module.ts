import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SacarTurnoPageRoutingModule } from './sacar-turno-routing.module';

import { SacarTurnoPage } from './sacar-turno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SacarTurnoPageRoutingModule
  ],
  declarations: [SacarTurnoPage]
})
export class SacarTurnoPageModule {}
