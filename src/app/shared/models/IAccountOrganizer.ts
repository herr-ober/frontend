export interface IAccountOrganizer {
    account: {
        uuid: string
        email: string
        name: string
        passwordHash: string
    }
}

export interface ICreateAccountOrganizer {
    name: string
    email: string
    password: string
}

export interface ILoginAccountOrganizer {
    email: string
    password: string
}