import React from 'react'

export const generateMetadata = () => {
    return {
        title: 'Form Edit Article'
    }
}

const FormEditLayout = ( {children}: {children: React.ReactNode}) => {
  return (
    <>
        {children}
    </>
  )
}

export default FormEditLayout