import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterYear'
})
export class FilterYearPipe implements PipeTransform {

  transform(array: Array<any>, min: string, max: string, ...args: any[]): Array<any> {
    if (!array) { return array; }

    if (min && max) {
      return array.filter(elem => (elem.year <= max && elem.year >= min));
    } else { return array; }
    }
  }
