import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectToArray'
})
export class ObjectToArrayPipe implements PipeTransform {

  transform(obj: Array<any>, name: string, ...args: any[]): Array<string> {
    // console.log(array,'pI=',name,'cI=',value);
   let arr: Array<string>;
    arr= obj.map(a => a.name);
    console.log('arr',arr);
    
    return arr;

    // let arr: Array<string>;
    // obj.forEach(elem => {
    //   arr.push(elem[name]);
    //   console.log('mas',elem[name]);

    // });
    // return arr;
  }

}
