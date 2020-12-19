import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MisBaresPageRoutingModule } from './mis-bares-routing.module';
import { MisBaresPage } from './mis-bares.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisBaresPageRoutingModule
  ],
  declarations: [MisBaresPage]
})
export class MisBaresPageModule {}
