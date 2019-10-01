import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBinding'
})
export class FilterBindingPipe implements PipeTransform {

  transform(array: Array<any>, binding: string, ...args: any[]): Array<any> {
    if (!array) { return array; }
    if (binding === 'all')
      {return array;}
    if (binding) {
      return array.filter(elem => {
        // tslint:disable-next-line: prefer-for-of
        if (elem.binding === binding) {
          return elem;
        }
      });
    } else { return array; }
  }

}
