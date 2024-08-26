export interface IRegisterUser {
    name:string,
    phonenumber:string,
    password:string
}

export interface ILoginUser{
    phonenumber:string,
    password:string
}

export interface IOtpUser{
    otp:string
}

// export interface IVerifyOtpUser{
//     phonenumber:string,
//     otp:string
// }