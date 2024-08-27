"use client"

import { fetchDetailArticle, getSlugsArticle } from '@/services/article'
import { IArticle } from '@/types/article'
import { AlertError } from '@/utils/extension'
import { Divider, Space, Spin, Typography } from 'antd'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const { Title } = Typography

const DetailArticlePage = ({ params }: { params: { slug: string } }) => {

    const [article, setArticle] = useState<IArticle>({} as IArticle)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const handleFetchArticle = async () => {
        setIsLoading(true)
        // await getSlugsArticle()
        const result = await fetchDetailArticle(params.slug)
        if (result.success) {
            setArticle(result.data)
        } else {
            AlertError(result.message)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        handleFetchArticle()
    }, [])

    return (
        <>
            {
                isLoading ? (
                    <center>
                        <Spin />
                    </center>
                ) : (
                    <div>
                        <Title level={4}>{article.title}</Title>
                        <Divider />
                        <Image src={article?.images[0]?.url} alt="image" width={200} height={200} className='rounded-xl' />
                        <p>{article.content}</p>
                    </div>
                )
            }
        </>
    )
}

export default DetailArticlePage