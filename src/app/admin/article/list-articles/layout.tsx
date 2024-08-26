import React from 'react'

export const generateMetadata = () => {
    return {
        title: 'List Article'
    }
}

const ListArticleLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
      {children}
    </>
  )
}

export default ListArticleLayout