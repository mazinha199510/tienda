import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/interfaces/interface';
import { TiendaService } from 'src/app/services/tienda.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];
  cargando: boolean = false;
  cliente: FormGroup;
  save: boolean = true;

  constructor(private ts: TiendaService,
              private fb: FormBuilder,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getClientes();
    this.cargarForm();    
  }

  cargarForm(i:number = 0, d:any = {}){
    switch(i){
      case 0:
        this.save = true;
        const reg = '^[0-9]+$';
        const emailReg = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$";
        this.cliente = this.fb.group({
          "id": ["", [Validators.required, Validators.pattern(reg)]],
          "nombre": ["", Validators.required],
          "apellidos": ["", Validators.required],
          "telefono": ["", [Validators.required, Validators.pattern(reg), Validators.minLength(8), Validators.maxLength(8)]],
          "correo": ["", [Validators.required, Validators.pattern(emailReg)]],
          "nit": ["", [Validators.required, Validators.pattern(reg), Validators.minLength(14), Validators.maxLength(14)]]
        });
        break;
      
      case 1:
        this.cliente.setValue({
          "id": "",
          "nombre": "",
          "apellidos": "",
          "telefono": "",
          "correo": "",
          "nit": ""
        });
        break;
      
      case 2:
        this.cliente.setValue({
          "id": d.id,
          "nombre": d.nombre,
          "apellidos": d.apellidos,
          "telefono": d.telefono,
          "correo": d.correo,
          "nit": d.nit
        });
        break;

      default:
        break;
    }  
  }

  getClientes(){
    this.cargando = true;
    this.ts.getCliente().subscribe(res => {
      this.clientes = res;
      this.cargando = false;
    })
  }

  guardar(){
    if(this.cliente.invalid) return;
    this.ts.findCliente(this.cliente.get('id').value).subscribe(res => {
      if(res){
        this.toastr.warning('El id '+ this.cliente.get('id').value +' ingresado ya existe', 'Guardar Cliente');
      }
    },
    err => {
      this.ts.saveCliente(this.cliente).subscribe(res => {
        if(res){
          this.toastr.success('Cliente agregado exitosamente', 'Guardar Cliente');
        }
        this.cargarForm(1);
        this.getClientes();
      });
    });    
  }

  cargar(id){
    this.save = false;
    this.ts.findCliente(id).subscribe(res => {
      this.cargarForm(2,res);
    });
  }

  eliminar(){
    Swal.fire({
      title: 'Eliminar Cliente',
      text: "¿Esta seguro de eliminar al cliente seleccionado?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ts.deleteCliente(this.cliente.get('id').value).subscribe(res => {
          console.log(res);
          if(res != null){
            this.toastr.success('Cliente eliminado exitosamente', 'Eliminar Cliente');
          } else{
            this.toastr.warning('Error al eliminar cliente', 'Guardar Cliente');
          }
          this.getClientes();
        });
      }
    });    
  }

  modificar(){
    this.ts.modifyCliente(this.cliente).subscribe(res => {
      if(res != null){
        this.toastr.success('Cliente modificado exitosamente', 'Modificar Cliente');
      } else{
        this.toastr.success('Error al modificar cliente', 'Modificar Cliente');
      }
      this.getClientes();
    });
  }
}
