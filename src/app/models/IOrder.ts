import { KeyValuePipe } from "@angular/common";
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
export interface IPatchOrder{ 
    paid?: boolean, 
    status?: string }

export interface IPositionStatus{
    status?: string
}
export interface IOrderByCategory {
    id: number,
    status: string,
    name: string,
    amount: number
}
export interface IOrderView{
    orderUuid: string,
    staffUuid: string,
    tableUuid: string,
    paid: boolean,
    status: string,
    positions: IPositions[]
}
export interface IOrderList {
    orderId: number,
    orderUuid: string,
    staffUuid: string,
    tableUuid: string,
    tablename?: number,
    paid: boolean,
    status: string,
    positions: IPositions[]
}

export interface IPositions {
    id: number,
    name?: string,
    category?: string,
    uuid: string,
    orderUuid: string,
    productUuid: string,
    amount: number,
    status: string,
    createdAt: Date,
    updatedAt: Date

}

export interface IMap {
    [key: string]: {name: string; category: string}

}