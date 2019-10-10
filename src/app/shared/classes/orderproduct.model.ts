
import { IOrderProduct } from '../interfaces/orderproduct';

export class OrderProduct implements IOrderProduct {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public catId: string,
        public catTitle: string,
        public subCatId: string,
        public subCatTitle: string,
        public price: string,
        public year: string,
        public img: string,
        public publishingHouse: string,
        public binding: string,
        public comments: Array<string>,
        // tslint:disable-next-line: ban-types
        public author: Array<Object>,
        public discount: Array<string>,
        public date: string,
        public alias: string,
        public catAlias: string,
        public subCatAlias: string,
        public count: number,
    ) { }
}
