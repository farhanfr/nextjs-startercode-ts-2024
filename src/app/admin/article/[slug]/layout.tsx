import { getSlugsArticle } from '@/services/article'
import React from 'react'

// export const generateStaticParams = async() => {
//     const slugs = await getSlugsArticle()
//     return slugs
// }

export const generateMetadata = () => {
    return {
        title: 'Detail Article'
    }
}
const DetailArticleLayout = ( {children}: {children: React.ReactNode}) => {
  return (
    <>
      {children}
    </>
  )
}

export default DetailArticleLayout