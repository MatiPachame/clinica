import { Pipe, PipeTransform } from '@angular/core';
import { Disponibilidad } from '../entidades/disponibilidad';

@Pipe({
  name: 'filtromeds',
  standalone: true
})
export class FiltromedsPipe implements PipeTransform {

  transform(value: Array<Disponibilidad>, filtro: string): Array<Disponibilidad> {
    if (!filtro) {
      return value; // Si no hay filtro, devolver la lista original
    }

    filtro = filtro.toLowerCase(); // Convertir el filtro a minúsculas una vez

    return value.filter(t => t.especialidad && t.especialidad.toLowerCase().indexOf(filtro) > -1);
  }

}
