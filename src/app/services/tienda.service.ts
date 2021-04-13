import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Cliente, Producto } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})

export class TiendaService {

  constructor(private http: HttpClient) { }

  //Clientes
  getCliente(){
    return this.http.get<Cliente[]>(`${environment.baseUrl}clientes`);
  }

  saveCliente(cliente){
    const params = {
      "id": cliente.value.id,
      "nombre": cliente.value.nombre,
      "apellidos": cliente.value.apellidos,
      "telefono": cliente.value.telefono,
      "correo": cliente.value.correo,
      "nit": cliente.value.nit
    };
    return this.http.post<Cliente>(`${environment.baseUrl}clientes`, params);
  }

  findCliente(cliente){
    return this.http.get<Cliente>(`${environment.baseUrl}clientes/${cliente}`);
  }

  deleteCliente(cliente){
    return this.http.delete<any>(`${environment.baseUrl}clientes/${cliente}`);
  }

  modifyCliente(cliente){
    const params = {
      "id": cliente.value.id,
      "nombre": cliente.value.nombre,
      "apellidos": cliente.value.apellidos,
      "telefono": cliente.value.telefono,
      "correo": cliente.value.correo,
      "nit": cliente.value.nit
    };
    return this.http.put<Cliente>(`${environment.baseUrl}clientes/${cliente.value.id}`, params);
  }

  //Productos
  getProductos(){
    return this.http.get<Producto[]>(`${environment.baseUrl}productos`);
  }

  saveProducto(producto){
    const params = {
      "id": producto.value.id,
      "nombre": producto.value.nombre,
      "descripcion": producto.value.descripcion,
      "precio": producto.value.precio
    };
    return this.http.post<Producto>(`${environment.baseUrl}productos`, params);
  }

  findProducto(producto){
    return this.http.get<Producto>(`${environment.baseUrl}productos/${producto}`);
  }

  deleteProducto(producto){
    return this.http.delete<any>(`${environment.baseUrl}productos/${producto}`);
  }

  modifyProducto(producto){
    const params = {
      "id": producto.value.id,
      "nombre": producto.value.nombre,
      "descripcion": producto.value.descripcion,
      "precio": producto.value.precio
    };
    return this.http.put<Producto>(`${environment.baseUrl}productos/${producto.value.id}`, params);
  }
}
