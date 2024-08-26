import { ILoginUser, IOtpUser, IRegisterUser } from "@/types/auth"
import { API_KEY } from "@/utils/constants"

export const registerAuth = async (data:IRegisterUser) => {
    
    const response = await fetch(`/api/auth/register`, {
        method: 'POST',
        body: JSON.stringify(data),
    })
    return await response.json()
}

export const loginAuth = async (data:ILoginUser) => {
    
    const response = await fetch(`/api/auth/login`, {
        method: 'POST',
        body: JSON.stringify(data),
    })
    return await response.json()
}

// export const verifyOtp = async (data:IVerifyOtpUser) => {
    
//     const response = await fetch(`http://localhost:3000/api/auth/otp`, {
//         method: 'POST',
//         body: JSON.stringify(data),
//     })
//     return await response.json()
// }