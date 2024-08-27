"use client"

import { Typography } from 'antd'
import { useSession } from 'next-auth/react'
import React from 'react'

const {Title} = Typography
const DashboardPage = () => {
  const {data:session,status} = useSession()
  return (
    <>
      <Title level={4}>Selamat Datang {session?.user?.name}</Title>
    </>
  )
}

export default DashboardPage