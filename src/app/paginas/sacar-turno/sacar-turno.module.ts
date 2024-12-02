import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SacarTurnoPageRoutingModule } from './sacar-turno-routing.module';

import { SacarTurnoPage } from './sacar-turno.page';
import { FiltromedsPipe } from "../../pipe/filtromeds.pipe";
import { QuitarusadosPipe } from "../../pipe/quitarusados.pipe";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SacarTurnoPageRoutingModule,
    FiltromedsPipe,
    QuitarusadosPipe
],
  declarations: [SacarTurnoPage]
})
export class SacarTurnoPageModule {}
