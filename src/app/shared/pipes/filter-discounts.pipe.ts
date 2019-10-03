import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterDiscounts'
})
export class FilterDiscountsPipe implements PipeTransform {

  transform(array: Array<any>, count: number, ...args: any[]): Array<any> {
    if (!array) { return array; }
    array.sort((a: any, b: any) => {
      const nameA = a['date'].seconds;
      const nameB = b['date'].seconds;
      if (nameA > nameB) {
        return -1;
      } else if (nameA > nameB) {
        return 1;
      } else {
        return 0;
      }
    });
    // console.log('arrtop=',array);
    return array.filter(el => el.discount[0]).splice(0, count);
  }

}
