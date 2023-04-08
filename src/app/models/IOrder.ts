import { IProduct } from "./IProduct";

export interface ICreateNewOrder {

    eventUuid: string
    staffUuid: string
    tableUuid: string
    positions: ICreateOrderPositionData[]
}

export interface ICreateOrderPositionData {
    
    orderUuid?: string
    productUuid: string
    amount: number
}