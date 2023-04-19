export interface IStaff {
    staffList: Array<IStaffItem>
}

export interface IStaffItem {
    uuid: string
    id: number
    eventUuid: string
    name: string
    role: string
    code: string
}
