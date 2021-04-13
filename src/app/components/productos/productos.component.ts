import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/interfaces/interface';
import { TiendaService } from 'src/app/services/tienda.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  productos: Producto[] = [];
  cargando: boolean = false;
  producto: FormGroup;
  save: boolean = true;

  constructor(private ts: TiendaService,
              private fb: FormBuilder,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getProductos();
    this.cargarForm();  
  }

  cargarForm(i:number = 0, d:any = {}){
    switch(i){
      case 0:
        this.save = true;
        const reg = '^[0-9]+$';
        const Decreg = '^[0-9.]+$';
        const emailReg = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$";
        this.producto = this.fb.group({
          "id": ["", [Validators.required, Validators.pattern(reg)]],
          "nombre": ["", Validators.required],
          "descripcion": [""],
          "precio": ["", [Validators.required, Validators.pattern(Decreg)]]
        });
        break;
      
      case 1:
        this.producto.setValue({
          "id": "",
          "nombre": "",
          "descripcion": "",
          "precio": ""
        });
        break;
      
      case 2:
        this.producto.setValue({
          "id": d.id,
          "nombre": d.nombre,
          "descripcion": (d.descripcion)? d.descripcion: '',
          "precio": d.precio
        });
        break;

      default:
        break;
    }  
  }

  getProductos(){
    this.cargando = true;
    this.ts.getProductos().subscribe(res => {
      this.productos = res;
      this.cargando = false;
    })
  }

  guardar(){
    if(this.producto.invalid) return;
    this.ts.findProducto(this.producto.get('id').value).subscribe(res => {
      if(res){
        this.toastr.warning('El id '+ this.producto.get('id').value +' ingresado ya existe', 'Guardar Producto');
      }
    },
    err => {
      this.ts.saveProducto(this.producto).subscribe(res => {
        if(res){
          this.toastr.success('Producto agregado exitosamente', 'Guardar Producto');
        }
        this.cargarForm(1);
        this.getProductos();
      });
    });    
  }

  cargar(id){
    this.save = false;
    this.ts.findProducto(id).subscribe(res => {
      console.log(res);
      this.cargarForm(2,res);
    });
  }

  eliminar(){
    Swal.fire({
      title: 'Eliminar Producto',
      text: "¿Esta seguro de eliminar al producto seleccionado?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ts.deleteProducto(this.producto.get('id').value).subscribe(res => {
          console.log(res);
          if(res != null){
            this.toastr.success('Producto eliminado exitosamente', 'Eliminar Producto');
          } else{
            this.toastr.warning('Error al eliminar producto', 'Guardar Producto');
          }
          this.getProductos();
        });
      }
    });    
  }

  modificar(){
    this.ts.modifyProducto(this.producto).subscribe(res => {
      if(res != null){
        this.toastr.success('Producto modificado exitosamente', 'Modificar Producto');
      } else{
        this.toastr.success('Error al modificar producto', 'Modificar Producto');
      }
      this.getProductos();
    });
  }

}
