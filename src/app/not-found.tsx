"use client"

import { Button, Typography } from "antd"
import { useRouter } from "next/navigation"

const{Title} = Typography

export default function NotFoundPage() {
    const router = useRouter()
    return(
        <>
        <Title level={2}>Page Not Found</Title>
        <Button type="primary" onClick={() => router.back()} className="bg-green-700">Back</Button>
        </>
        
    )
}