import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Cliente, Orden, Producto } from 'src/app/interfaces/interface';
import { TiendaService } from 'src/app/services/tienda.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.scss']
})
export class OrdenesComponent implements OnInit {

  ordenes: Orden[] = [];
  cargando: boolean = false;
  orden: FormGroup;
  save: boolean = true;
  clientes: Cliente[] = [];
  productos: Producto[] = [];
  precio: number = 0;
  total: number = 0;

  constructor(private ts: TiendaService,
              private fb: FormBuilder,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getOrdenes();
    this.cargarForm();  
    this.cargarClientes();
    this.cargarProductos();
  }

  cargarForm(i:number = 0, d:any = {}){
    this.total = 0;
    this.precio = 0;
    switch(i){
      case 0:
        this.save = true;
        const reg = '^[0-9]+$';
        const Decreg = '^[0-9.]+$';
        this.orden = this.fb.group({
          "id": ["", [Validators.required, Validators.pattern(reg)]],
          "idCliente": ["", Validators.required],
          "idProducto": ["", Validators.required],
          "cantidad": [1, [Validators.required, Validators.pattern(reg)]],
          "total": [this.total, [Validators.required, Validators.pattern(Decreg)]],
          "fecha": ["", [Validators.required]]
        });
        break;
      
      case 1:
        this.orden.setValue({
          "id": "",
          "idCliente": "",
          "idProducto": "",
          "cantidad": 1,
          "total": this.total,
          "fecha": ""
        });
        break;
      
      case 2:
        this.orden.setValue({
          "id": d.id,
          "idCliente": d.idCliente,
          "idProducto": d.idProducto,
          "cantidad": d.cantidad,
          "total": d.total,
          "fecha": d.fecha
        });
        break;

      default:
        break;
    }  
  }

  cargarClientes(){
    this.ts.getCliente().subscribe(res => {
      this.clientes = res;
    });
  }

  cargarProductos(){
    this.ts.getProductos().subscribe(res => {
      this.productos = res;
    });
  }

  getOrdenes(){
    this.cargando = true;
    this.ts.getOrdenes().subscribe(res => {
      this.ordenes = res;
      this.cargando = false;
    })
  }
  
  cargarTotal(e,i=0){
    if(i == 0){
      this.ts.findProducto(e.target.value).subscribe(res => {
        this.precio = res.precio;
        this.orden.get('total').setValue(this.precio * this.orden.get('cantidad').value);
      });
    } else if(i == 1){
      this.orden.get('total').setValue(this.precio * this.orden.get('cantidad').value);
    } else{
      this.ts.findProducto(e).subscribe(res => {
        this.precio = res.precio;
        this.orden.get('total').setValue(this.precio * this.orden.get('cantidad').value);
      });
    }
    
  }

  guardar(){
    if(this.orden.invalid) return;
    this.ts.findOrden(this.orden.get('id').value).subscribe(res => {
      if(res){
        this.toastr.warning('El id '+ this.orden.get('id').value +' ingresado ya existe', 'Guardar Orden');
      }
    },
    err => {
      this.ts.saveOrden(this.orden).subscribe(res => {
        if(res){
          this.toastr.success('Orden agregada exitosamente', 'Guardar Orden');
        }
        this.cargarForm(1);
        this.getOrdenes();
      });
    });    
  }

  cargar(id){
    this.save = false;
    this.ts.findOrden(id).subscribe(res => {
      this.cargarTotal(res.idProducto,2);
      this.cargarForm(2,res);
    });
  }

  eliminar(){
    Swal.fire({
      title: 'Eliminar Orden',
      text: "¿Esta seguro de eliminar la orden seleccionada?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ts.deleteOrden(this.orden.get('id').value).subscribe(res => {
          console.log(res);
          if(res != null){
            this.toastr.success('Orden eliminada exitosamente', 'Eliminar Orden');
          } else{
            this.toastr.warning('Error al eliminar orden', 'Eliminar Orden');
          }
          this.getOrdenes();
        });
      }
    });    
  }

  modificar(){
    this.ts.modifyOrden(this.orden).subscribe(res => {
      if(res != null){
        this.toastr.success('Orden modificada exitosamente', 'Modificar Orden');
      } else{
        this.toastr.success('Error al modificar orden', 'Modificar Orden');
      }
      this.getOrdenes();
    });
  }

}
