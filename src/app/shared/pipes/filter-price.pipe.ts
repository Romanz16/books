import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPrice'
})
export class FilterPricePipe implements PipeTransform {

  transform(array: Array<any>, min: string, max: string, ...args: any[]): Array<any> {
if (!array) { return array; }

    if (min && max) {
      return array.filter(elem => (elem.price <= max && elem.price >= min));
    } else { return array;     }
    }
  }


