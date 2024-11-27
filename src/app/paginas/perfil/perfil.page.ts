import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { DataUsuario } from 'src/app/entidades/data-usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service/usuario.service.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage {
  public decode:DataUsuario = {data: {id: 0,nombre: '',apellido:'', mail:'', nacimiento: new Date(), usuario:'', password: '', tipo_usuario: 0, autorizado:1}};

  constructor(private usuarioservices:UsuarioService) { 
    const token = localStorage.getItem('UsuarioToken');
    this.decode = jwtDecode<any>(token!);
    console.log("Usuario:",this.decode);
  }

}
