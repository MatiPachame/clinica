import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/entidades/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'https://matipachame-apiclinica.mdbgo.io';

  public usuarioLogueado: Usuario = { nombre: '', apellido: '', mail: '', nacimiento: new Date(), usuario: '', password: '', tipo_usuario: 0, autorizado: 1 };

  constructor(private http: HttpClient) {}

  public estoyLogueado(): boolean {
    return this.usuarioLogueado.usuario != '';
  }

  public loginAPI(usuario: Usuario) {
    return this.http.post(this.apiUrl + "/login", usuario);
  }

  public setLogueadoXApi(usuario: Usuario) {
    this.usuarioLogueado = usuario;

  }
}
