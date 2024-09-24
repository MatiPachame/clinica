import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/entidades/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'https://matipachame-apiclinica.mdbgo.io';

  constructor(private http: HttpClient) {}

  loginAPI(usuario: Usuario): Observable<any> {
    return this.http.post(this.apiUrl, usuario);
  }

  setLogueado(): void {
    localStorage.setItem('logueado', 'true');
  }

  estoyLogueado(): boolean {
    return localStorage.getItem('logueado') === 'true';
  }
}
