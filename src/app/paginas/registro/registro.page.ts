import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/entidades/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service/usuario.service.component';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {

  public formu:FormGroup = new FormGroup({

    nombre:new FormControl(''),

  });
  

  listaUsuarios:Usuario[] = [];
  public usuario:Usuario;
  public password2:string = '';
  

  constructor(public router:Router,private us:UsuarioService,private ngZone:NgZone){
    this.usuario = {nombre: '',apellido:'', mail:'', nacimiento: new Date(), usuario:'', password: '', tipo_usuario: 1,especialidad:'', dias_atencion:[],
      horario_desde:0,horario_hasta:0,especialidad_foto:null, perfil_foto:null, autorizado:1};
  }

  diasSemana: string[] = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];
  diasSeleccionados: boolean[] = Array(5).fill(false);

  booleanoDias(index: number, event: any) {
    this.diasSeleccionados[index] = event.target.checked;
    this.cargarDias();
  }

  cargarDias() {
    // return this.usuario.dias_atencion = this.diasSeleccionados.filter((dia, index) => this.diasSeleccionados[index]);
    return this.usuario.dias_atencion = this.diasSeleccionados.map(dia => dia || false);
  }

  subirFoto(event: Event, tipo: 'especialidad_foto' | 'perfil_foto') {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
          const result = e.target?.result as string;
          if (tipo === 'especialidad_foto') {
              this.usuario.especialidad_foto = result;
          } else if (tipo === 'perfil_foto') {
              this.usuario.perfil_foto = result;
          }
      };
      reader.readAsDataURL(file);
  }

}


  validarExiste(){
    return this.us.listaUsuario.filter(t=> t.nombre.toLowerCase() == this.usuario.nombre.toLowerCase()).length == 1;
  }

  passwordCoinciden():boolean{
    return this.usuario.password === this.password2;
  }

  CamposLlenos() {
    return this.usuario.nombre && this.usuario.apellido && this.usuario.mail && this.usuario.usuario  && this.password2 && this.usuario.password === this.password2;
  }


  public registrar(){


    if(this.CamposLlenos()){

      if(this.usuario.tipo_usuario != 1)
        this.usuario.autorizado=0;
      else
      this.usuario.autorizado=1;


      // localStorage.setItem('usuarioLogueado',JSON.stringify(this.usuario));
      this.us.registrarEnApi(this.usuario).subscribe(

        x=>{
          console.log(x);
          //localStorage.setItem('usuarioLogueado',JSON.stringify(<Usuario>x));
  
          alert("Usuario creado exitosamente!");

          this.ngZone.run(() => {
          this.router.navigate(['/login']);
        });
        

        }
      );


    } else {
      alert('Por favor, complete todos los campos y asegúrese de que las contraseñas coincidan.');
    }

    // this.us.listaUsuario.push(this.usuario);
    // localStorage.setItem('usuarios',JSON.stringify(this.us.listaUsuario));
    // this.us.listaUsuario=JSON.parse(JSON.stringify(this.us.listaUsuario));
  
  }


}
