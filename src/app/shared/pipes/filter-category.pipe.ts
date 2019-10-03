import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCategory'
})
export class FilterCategoryPipe implements PipeTransform {
  transform(array: Array<any>, cat: string, subCat?: string, ...args: any[]): Array<any> {
    if (!array) { return array; }
    if (cat === 'all') {
      return array;
    }
    if (subCat) {
      return array.filter(elem => elem['subCatAlias'] === subCat);
    }
    else {
      if (cat) {
        return array.filter(elem => elem['catAlias'] === cat);
      }
    }
  }
}
