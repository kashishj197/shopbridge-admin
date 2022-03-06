import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateInventoryComponent } from './inventory/create-inventory/create-inventory.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: HomeComponent,
  },
  {
    path: 'create',
    component: CreateInventoryComponent
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
