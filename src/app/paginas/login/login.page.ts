import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/entidades/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service/usuario.service.component';
import { NavController } from '@ionic/angular';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  public usuario: Usuario = {nombre: '',apellido:'', mail:'', nacimiento: new Date(), usuario:'', password: '', tipo_usuario: 0, autorizado:1};
  public isLoading: boolean = false;

  constructor(private navCtrl: NavController, private usuarioService: UsuarioService) {

    if(this.usuarioService.estoyLogueado()) {
      this.navCtrl.navigateRoot('chat');

   }
}

login() {
  this.isLoading = true; 
  this.usuarioService.loginAPI(this.usuario).subscribe({next:
    x => {
      if (x == null) {
        alert("Usuario/contraseña incorrecta");
      } else {
        // Decodifica el token
        var decode = jwtDecode<any>(x.toString());

        if (decode.data.usuario != null) {
          this.isLoading = false;

          if (decode.data.autorizado == 0) {
            alert("Su usuario aún no está habilitado.");
          } else {
            localStorage.setItem("UsuarioToken", x.toString());
            this.navCtrl.navigateRoot('chat');
          }
        }
      }
    },
    error : err => {
      this.isLoading = false;
      console.error(err);
      alert('Error en la autenticación.');
    }
});
}
}
