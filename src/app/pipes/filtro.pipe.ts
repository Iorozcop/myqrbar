import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultado = [];
    for(const bar of value){
      if(arg === '') return value;
      if(bar.nombre.toLowerCase().indexOf(arg.toLowerCase())>-1){
        resultado.push(bar);
      };
    };
    return resultado;
  }

}
