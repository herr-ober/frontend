export interface IEvent {
    name: string
    location: string
    date: Date
}


export class Event implements IEvent {

    name: string
    location: string
    date: Date

    constructor(name: string, location: string, date: Date) {
        this.name = name;
        this.location = location;
        this.date = date;
    }
}