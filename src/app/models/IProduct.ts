
export interface IProduct {
    name: string
    price: number
    category: string
}


export class Product implements IProduct {

    name: string
    price: number
    category: string

    constructor(name: string, price: number, category: string) {
        this.name = name;
        this.price = price;
        this.category = category;
    }
}