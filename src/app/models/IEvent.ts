export interface IEvent {
    uuid: string
    organizerUuid: string
    name: string
    location: string
    date: Date
}


export interface ICreateEvent {
    name: string
    location: string
    date: Date
}

export interface IUpdateEvent {
    name: string
    location: string
    date: Date
}


/*
export class Event implements IEvent {

    uuid: string
    organizerUuid: string
    name: string
    location: string
    date: Date

    constructor(uuid: string, organizerUuid: string, name: string, location: string, date: Date) {
        this.uuid = uuid;
        this.organizerUuid = organizerUuid;
        this.name = name;
        this.location = location;
        this.date = date;
    }
} */