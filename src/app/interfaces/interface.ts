export interface Cliente {
    id: number,
    nombre: string,
    apellidos: string,
    telefono: number,
    correo: string,
    NIT: string
}

export interface Producto{
    id: number,
    nombre: string,
    descripcion: string,
    precio: number
}

export interface Orden{
    id: number,
    idCliente: number,
    cliente: string,
    idProducto: number,
    producto: string,
    cantidad: number,
    total: number,
    fecha: string
}
