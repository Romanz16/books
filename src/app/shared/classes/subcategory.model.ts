import { ISubCategory } from '../interfaces/subcategory.interface';

export class SubCategory implements ISubCategory {
    constructor(
        public id: string,
        public title: string,
        public alias: string,
        public parentId: string,
    ) { }
}