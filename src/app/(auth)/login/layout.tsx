import React from 'react'

export async function generateMetadata() {
    return {
        title: 'Login'
    }
}
const LoginLayout = ({children} : {children: React.ReactNode}) => {
  return (
    <>
        {children}
    </>
  )
}

export default LoginLayout