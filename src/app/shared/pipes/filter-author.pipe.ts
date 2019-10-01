import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterAuthor'
})
export class FilterAuthorPipe implements PipeTransform {

  transform(array: Array<any>, author: string, ...args: any[]): Array<any> {
    if (!array) { return array; }
    if (author === 'all')
    {return array;}

    if (author) {
      return array.filter(elem => {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < elem.author.length; i++) {
          if (elem.author[i] === author) {
            return elem;
          }
        }
      });
    } else { return array; }
  }

}
