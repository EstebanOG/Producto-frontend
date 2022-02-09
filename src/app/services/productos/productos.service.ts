import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private API_SERVER = "http://localhost:8080/productos/";
  constructor(private httpClient: HttpClient) { }

  public getAllProducto(): Observable<any>{
    return this.httpClient.get(this.API_SERVER);
  }

  public saveProducto (persona:any): Observable<any>{
    return this.httpClient.post(this.API_SERVER,persona);
  }

  public deleteProducto(id: any): Observable<any>{
    return this.httpClient.delete(this.API_SERVER+"delete/"+id);
  }
}
