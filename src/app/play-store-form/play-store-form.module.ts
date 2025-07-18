import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PlayStoreFormPageRoutingModule } from './play-store-form-routing.module';
import { PlayStoreFormPage } from './play-store-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PlayStoreFormPageRoutingModule
  ],
  declarations: [PlayStoreFormPage]
})
export class PlayStoreFormPageModule {}
