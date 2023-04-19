export interface ICreateTable {
    tableNumber: number
}

export interface ITable {
    uuid: string
    tableNumber: number
    eventUuid: string
}

export interface ITableMap {
    [key: string]: number
}