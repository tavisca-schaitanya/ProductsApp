import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormProductComponent } from './reactive-form-product/reactive-form-product.component';

@NgModule({
  declarations: [
    AppComponent,
    ReactiveFormProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [ReactiveFormProductComponent]
})
export class AppModule { }
