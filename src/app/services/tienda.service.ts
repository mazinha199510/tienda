import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Cliente, Orden, Producto } from '../interfaces/interface';
import { map } from 'rxjs/operators';

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

  //Ordenes
  getOrdenes(){
    return this.http.get<Orden[]>(`${environment.baseUrl}ordenes`).pipe(map(res => {
      for(let i = 0; i < res.length; i++){
        this.findCliente(res[i].idCliente).subscribe(cliente => {
          res[i].cliente = cliente.nombre + ' ' + cliente.apellidos;
        });
        this.findProducto(res[i].idProducto).subscribe(producto => {
          res[i].producto = producto.nombre;
        });
      }  
      return res;    
    }));
  }

  saveOrden(producto){
    const params = {
      "id": producto.value.id,
      "idCliente": producto.value.idCliente,
      "idProducto": producto.value.idProducto,
      "cantidad": producto.value.cantidad,
      "total": producto.value.total,
      "fecha":producto.value.fecha
    };
    return this.http.post<Orden>(`${environment.baseUrl}ordenes`, params);
  }

  findOrden(producto){
    return this.http.get<Orden>(`${environment.baseUrl}ordenes/${producto}`);
  }

  deleteOrden(producto){
    return this.http.delete<any>(`${environment.baseUrl}ordenes/${producto}`);
  }

  modifyOrden(producto){
    const params = {
      "id": producto.value.id,
      "idCliente": producto.value.idCliente,
      "idProducto": producto.value.idProducto,
      "cantidad": producto.value.cantidad,
      "total": producto.value.total,
      "fecha":producto.value.fecha
    };
    return this.http.put<Orden>(`${environment.baseUrl}ordenes/${producto.value.id}`, params);
  }
}
