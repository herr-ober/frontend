import { IProduct } from "./IProduct";

export interface ICreateNewOrder {

    tableUuid: string
    positions: ICreateOrderPositionData[]
}

export interface ICreateOrderPositionData {
    
    orderUuid?: string
    productUuid: string
    amount: number
}