import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prodById'
})
export class ProdByIdPipe implements PipeTransform {

  transform(array: Array<any>, pid: Array<any>, ...args: any[]): Array<any> {
    if (!array) { return array; }
    let arr: Array<any> = [];
    arr = array.filter(elem => {
      for (let i = 0; i < pid['uorderIdProduct'].length; i++) {
        if (elem.id === pid['uorderIdProduct'][i]) {
          return elem;
        }
      }
    });

    return arr;

  }
}