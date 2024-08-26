import { ICustomError } from "@/types/error";
import { API_KEY, BASE_URL } from "@/utils/constants";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
    try {
        const response = await fetch(`${BASE_URL}/articles/${params.slug}`, {
            method: 'GET',
            headers: {
                'api-key': API_KEY ?? "1234"
            },
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
        return NextResponse.json({ "success": false, "message": err.message }, {
            status: err.status,
        });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
    try {
        const data = await request.formData()

        const response = await fetch(`${BASE_URL}/articles/${params.slug}`, {
            method: 'PUT',
            headers: {
                'api-key': API_KEY ?? "1234"
            },
            body: data
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
        return NextResponse.json({ "success": false, "message": err.message }, {
            status: err.status,
        });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { slug: string } }) {
    try {

        const response = await fetch(`${BASE_URL}/articles/${params.slug}`, {
            method: 'DELETE',
            headers: {
                'api-key': API_KEY ?? "1234"
            },
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
        return NextResponse.json({ "success": false, "message": err.message }, {
            status: err.status,
        });
    }
}