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

        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'api-key': API_KEY ?? "1234"
            },
            body: formData
        })


        const res = await response.json();

        if (!response.ok) {
            throw {
                status: response.status,
                message: res.message,
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