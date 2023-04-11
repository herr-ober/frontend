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

export interface IOrder {

    uuid: string
    eventUuid: string
    staffUuid: string
    tableUuid: string
    paid: boolean
    status: string
    positions: ICreateOrderPositionData[]
}