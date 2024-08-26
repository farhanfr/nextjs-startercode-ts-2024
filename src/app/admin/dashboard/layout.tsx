import React from 'react'

export const generateMetadata = () => {
    return {
        title: 'Dashboard'
    }
}

const DashboardLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
      {children}
    </>
  )
}

export default DashboardLayout