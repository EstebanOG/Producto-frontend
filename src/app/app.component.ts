import { Component, OnInit, ViewChild  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from './services/productos/productos.service';
import { MatTableDataSource } from '@angular/material/table';import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AfterContentInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  productoForm: FormGroup;
  productoEditForm: FormGroup;
  producto: any;
  dataSource: MatTableDataSource<any>;

  displayedColumns: string[] = ['codigo', 'descripcion', 'color', 'tamanio', 'valor', 'opciones'];

  panelOpenState = false;

  constructor(
    public fb: FormBuilder,
    public productosService: ProductosService
  ) {

  }
  ngAfterContentInit(): void {
    this.setDataAndPagination();
  }
  ngOnInit(): void {
    this.productoForm = this.fb.group({
      codigo: [''],
      descripcion: ['', Validators.required],
      color: ['', Validators.required],
      tamanio: ['', Validators.required],
      valor: ['', Validators.required]
    });

    this.productoEditForm = this.fb.group({
      codigo: [''],
      descripcion: ['', Validators.required],
      color: ['', Validators.required],
      tamanio: ['', Validators.required],
      valor: ['', Validators.required]
    });


    this.productosService.getAllProducto().subscribe(resp=>{
      this.producto = resp;
      this.setDataAndPagination();
    },
    error =>{console.error(error)});
  }

  guardar(): void {
      this.productosService.saveProducto(this.productoForm.value).subscribe(resp => {
        this.productoForm.reset();
        this.productoForm.setErrors(null);
        this.producto = this.producto.filter((product: { codigo: any; }) => resp.codigo!==product.codigo);
        this.producto.push(resp);
        this.setDataAndPagination();
      },
      error => {console.error(error)}
      )
  }

  actualizar(): void{
    this.productosService.saveProducto(this.productoEditForm.value).subscribe(resp => {
      this.productoEditForm.reset();
      this.productoEditForm.setErrors(null);
      this.producto = this.producto.filter((product: { codigo: any; }) => resp.codigo!==product.codigo);
      this.producto.push(resp);
      this.setDataAndPagination();
    },
    error => {console.error(error)}
    )
  }

  eliminar(producto: any){
    this.productosService.deleteProducto(producto.codigo).subscribe(resp=>{
      if(!resp){
        this.producto.pop(producto);
        this.setDataAndPagination();
      }
    })
  }

  editar(producto: any){
    this.productoEditForm.setValue({
      codigo: producto.codigo,
      descripcion: producto.descripcion,
      color: producto.color,
      tamanio: producto.tamanio,
      valor: producto.valor
    });
    this.panelOpenState = !this.panelOpenState;
  }

  setDataAndPagination(){
    this.dataSource = new MatTableDataSource(this.producto);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
