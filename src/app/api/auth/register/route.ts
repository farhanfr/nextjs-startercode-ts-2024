import { ICustomError } from "@/types/error"
import { API_KEY, BASE_URL } from "@/utils/constants"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    try {
        const data = await request.json()

        const formData = new FormData()

        for(let key in data) {
            formData.append(key, data[key])
        }

            // formData.append('name', JSON.stringify(data.name))
            // formData.append('phonenumber', JSON.stringify(data.phonenumber))
            // formData.append('password', JSON.stringify(data.password))

        const response = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'api-key': API_KEY ?? "1234"
            },
            body: formData
        })

        const res = await response.json();
        console.log(res)

        if (!response.ok) {
            throw {
                status: response.status,
                message: res.data[0].msg,
            }
        }

        return NextResponse.json({ "success": true, "data": res.data });
    } catch (error) {
        const err = error as ICustomError
        return NextResponse.json({ "success": false,"message": err.message }, {
            status: err.status,
        });
    }

}