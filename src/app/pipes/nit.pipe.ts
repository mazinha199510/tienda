import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nit'
})
export class NitPipe implements PipeTransform {

  transform(value: string){
    let arr = value.split('');
    let nit = '';
    for(let i = 0; i < arr.length; i++){
      if(i == 4 || i == 10 || i == 13) nit = nit + '-';
      nit = nit + value[i];
    }
    return nit;
  }

}
