export interface ICreateEvent {
    name: string
    location: string
    date: Date
}


export interface IEvent {
    uuid: string
    organizerUuid: string
    name: string
    location: string
    date: Date
}

export interface IUpdateEvent {
    name: string
    location: string
    date: Date
}
