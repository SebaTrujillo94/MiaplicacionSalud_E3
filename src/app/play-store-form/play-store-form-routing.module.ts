import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayStoreFormPage } from './play-store-form.page';

const routes: Routes = [
  {
    path: '',
    component: PlayStoreFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayStoreFormPageRoutingModule {}
