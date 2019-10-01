import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPublishing'
})
export class FilterPublishingPipe implements PipeTransform {

  transform(array: Array<any>, publishing: string, ...args: any[]): Array<any> {
    if (!array) { return array; }
    if (publishing === 'all')
      {return array;}
    if (publishing) {
      return array.filter(elem => {
        // tslint:disable-next-line: prefer-for-of
        if (elem.publishingHouse === publishing) {
          return elem;
        }
      });
    } else { return array; }
  }

}
