export interface IProduct {
    uuid: string
    name: string
    price: number
    category: string
    categoryUuid?: string
}

export interface ICreateProduct {
    name: string
    price: number
    category: string
}

export interface IProductMap {
    [key: string]: string
}