import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Usuario } from '../../entidades/usuario';
import { RouterModule } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { UsuarioService } from 'src/app/servicios/usuario.service/usuario.service.component';
import { Disponibilidad } from 'src/app/entidades/disponibilidad';
import { DataUsuario } from 'src/app/entidades/data-usuario';

@Component({
  selector: 'app-sacar-turno',
  standalone: true,
  templateUrl: './sacar-turno.page.html', // Asegúrate de que esta ruta sea correcta
  styleUrls: ['./sacar-turno.page.scss'], // Opcional, si tienes estilos
  imports: [CommonModule, RouterModule]
})

export class SacarTurnoComponent {
  public medicos: Usuario[] = [];
  public disponibilidad: Disponibilidad[] = [];
  public decode: DataUsuario = { data: { id: 0, nombre: '', apellido: '', mail: '', nacimiento: new Date(), usuario: '', password: '', tipo_usuario: 0, autorizado: 1 } };

  constructor(private usuarioservices: UsuarioService) {
    const token = localStorage.getItem('UsuarioToken');
    this.decode = jwtDecode<any>(token!);
    this.getMedicos();
  }

  private getMedicos() {
    this.usuarioservices.GetDisponibilidadMedicos(this.medicos).subscribe(x => {
      this.medicos = Object.assign([], x);
    });
  }

  public buscarDisponibilidad(medico: Usuario) {
    this.disponibilidad = []; // Limpiar disponibilidad anterior
    const diasSemana = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes'];
    const hoy = new Date();

    for (let i = 0; i < 14; i++) {
      const diaActual = new Date();
      diaActual.setDate(hoy.getDate() + i);
      const diaSemanaIndex = (diaActual.getDay() + 6) % 7;

      if (diaSemanaIndex >= 5) {
        continue; // Si es sábado o domingo, continuamos
      }

      if (medico.dias_atencion && medico.dias_atencion[diaSemanaIndex]) {
        const desde = medico.horario_desde ?? 0;
        const hasta = medico.horario_hasta ?? 24;

        for (let hora = desde; hora < hasta; hora++) {
          this.disponibilidad.push({
            id_medico: medico.id_medico,
            id_usuario: this.decode.data.id,
            nombre: medico.nombre,
            apellido: medico.apellido,
            especialidad: medico.especialidad,
            fecha: this.formatDateForMySQL(new Date(diaActual)),
            hora: hora,
            aceptado: "Pendiente"
          });
        }
      }
    }
  }

  public formatDateForMySQL(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day} 00:00:00`; // Solo la fecha, sin hora
  }

  public tomarTurno(turno: Disponibilidad) {
    this.usuarioservices.nuevoTurno(turno).subscribe(x => {
      alert("Turno tomado correctamente");
      this.disponibilidad = []; // Limpiar la disponibilidad
    });
  }
}

