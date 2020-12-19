import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisBaresPage } from './mis-bares.page';

const routes: Routes = [
  {
    path: '',
    component: MisBaresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisBaresPageRoutingModule {}
