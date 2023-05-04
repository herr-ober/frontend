export interface IAccountOrganizer {
    uuid: string
    email: string
    name: string
    password: string
}

export interface ICreateAccountOrganizer {
    name: string
    email: string
    password: string
}

export interface IDeleteAccountOrganizer {
    uuid: string
}

export interface ILoginAccountOrganizer {
    email: string
    password: string
}