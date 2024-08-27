import React from 'react'

export const generateMetadata = () => {
    return {
        title: 'Form Add Article'
    }
}

const FormAddLayout = ( {children}: {children: React.ReactNode}) => {
  return (
    <>
        {children}
    </>
  )
}

export default FormAddLayout