import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ProductosComponent } from './components/productos/productos.component';
import { OrdenesComponent } from './components/ordenes/ordenes.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NitPipe } from './pipes/nit.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    ProductosComponent,
    OrdenesComponent,
    NitPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    HttpClient,
    FormBuilder
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
