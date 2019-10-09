import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByDate'
})
export class SortByDatePipe implements PipeTransform {
  transform(array: Array<any>, ...args: any[]): Array<any> {
    if (!array) { return array; }
    array.sort(function (a, b) {
      const nameA = a['date'];
      const nameB = b['date'];
      if (nameA > nameB) {
        return -1;

      }
      if (nameA < nameB) {
        return 1;
      }
      return 0;
    });
    return array;
  }


}