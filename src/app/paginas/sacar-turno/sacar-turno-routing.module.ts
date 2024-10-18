import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SacarTurnoPage } from './sacar-turno.page';

const routes: Routes = [
  {
    path: '',
    component: SacarTurnoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SacarTurnoPageRoutingModule {}
