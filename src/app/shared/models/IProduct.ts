export interface IProduct {
    uuid: string
    name: string
    price: number
    category: string
    categoryUuid?: string
    available?: boolean
}

export interface ICreateProduct {
    name: string
    price: number
    category: string
}

export interface IProductMap {
    [key: string]: string
}

export interface IProductUpdate {
    uuid: string
    updates: {
        price?: number
        available?: boolean
    }
}