import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayfilter'
})
export class ArrayfilterPipe implements PipeTransform {

  transform(array: Array<any>, name: string, value: string, ...args: any[]): Array<any> {
    if (!array) { return array; }
    // console.log(array,'pI=',name,'cI=',value);
    return array.filter(elem => elem[name] === value);
  }
}
