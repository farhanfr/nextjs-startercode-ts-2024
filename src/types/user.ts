
export interface IUser {
    id?: string
    name?: string
    accessToken?: string
    refreshToken?: string
}

export interface IUserWithId extends IUser {
    id: string;
}