import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(array: Array<any>, search: string, ...args: any[]): Array<any> {
    if (!array) { return array; }
   
    if (search) {
      search.toLocaleLowerCase();
      return array.filter(elem => elem.title.toLocaleLowerCase().indexOf(search) != -1);
  }
}
}
