import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialComponentsModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { AppNavComponent } from './app-nav/app-nav.component';
import { CreateInventoryComponent } from './inventory/create-inventory/create-inventory.component';
import { ViewProductComponent } from './inventory/view-product/view-product.component';
import { ViewInventoryComponent } from './inventory/view-inventory/view-inventory.component';
import { DetailsDialogComponent } from './inventory/view-product/details-dialog/details-dialog.component';
import { EditDialogComponent } from './inventory/edit-inventory/edit-dialog/edit-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppNavComponent,
    CreateInventoryComponent,
    ViewProductComponent,
    ViewInventoryComponent,
    DetailsDialogComponent,
    EditDialogComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialComponentsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
