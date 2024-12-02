import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage {

  constructor(private router: Router) {}

  irSacarTurno() {
    this.router.navigate(['/sacar-turno']);  // Asegúrate de tener esta ruta configurada
  }

  irChat() {
    this.router.navigate(['/chat']);  // Asegúrate de tener esta ruta configurada
  }

  irPerfil() {
    this.router.navigate(['/perfil']);  // Asegúrate de tener esta ruta configurada
  }

  CerrarSesion() {
    this.router.navigate(['']);  // Asegúrate de tener esta ruta configurada
    localStorage.removeItem('UsuarioToken');
  }
}

