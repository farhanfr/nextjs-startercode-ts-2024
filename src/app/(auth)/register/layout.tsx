import React from 'react'

export async function generateMetadata() {
    return {
        title: 'Register'
    }
}
const RegisterLayout = ({children} : {children: React.ReactNode}) => {
  return (
    <>
        {children}
    </>
  )
}

export default RegisterLayout