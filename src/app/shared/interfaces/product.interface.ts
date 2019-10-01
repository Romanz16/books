export interface IProduct {
    id: string;
    title: string;
    description: string;
    catId: string;
    catTitle: string;
    subCatId: string;
    subCatTitle: string;
    price: string;
    year: string;
    img: string;
    publishingHouse: string;
    binding: string;
    comments: Array<string>;
    author: Array<Object>;
    discount: Array<string>;
    date: string;
    alias: string;
    catAlias: string;
    subCatAlias: string;
}
