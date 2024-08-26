"use client"

import { Button, Typography } from "antd";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()

  const { Title } = Typography

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Title level={1}>Starter code NEXT.JS 2024 - TS</Title>
        <Button type='primary' size='large' onClick={() => {
          // router.push('/admin/dashboard')
          signIn()
        }}>Goto Dashboard</Button>
      </main>
    </>
  );
}
