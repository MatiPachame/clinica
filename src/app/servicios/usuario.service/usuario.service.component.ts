import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/entidades/usuario';
import { Disponibilidad } from 'src/app/entidades/disponibilidad';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private API: String = "https://matipachame-apiclinica.mdbgo.io";

  public usuarioLogueado: Usuario = { nombre: '', apellido: '', mail: '', nacimiento: new Date(), usuario: '', password: '', tipo_usuario: 0, autorizado: 1 };

  constructor(private http: HttpClient) {}

  public estoyLogueado(): boolean {
    return this.usuarioLogueado.usuario != '';
  }

  public loginAPI(usuario: Usuario) {
    return this.http.post(this.API + "/login", usuario);
  }

  public setLogueadoXApi(usuario: Usuario) {
    this.usuarioLogueado = usuario;

  }

  public GetDisponibilidadMedicos(usuario: Usuario[]) {
    return this.http.post(this.API + "/get_disponibilidad", usuario);
  }

  public nuevoTurno(usuario: Disponibilidad){
    return this.http.post(this.API + "/tomar_turno", usuario);
  }

  public GetTurnosTomados(usuario: Disponibilidad[]) {
    return this.http.post(this.API + "/get_turnos_tomados", usuario);
  }

}
