"use client"

import { editArticle, fetchDetailArticle } from '@/services/article'
import { IArticle, IEditArticle } from '@/types/article'
import { AlertError, AlertSuccess } from '@/utils/extension'
import { Button, Form, Input, Spin, Typography } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'


const { Title, Text } = Typography
const FormEditArticlePage = ({params}: {params: {slug: string}}) => {
    const router = useRouter()

    const [loading, setLoading] = useState<boolean>(false)
    const [valueInput, setValueInput] = useState<IEditArticle>({
        id: "0",
        title: "",
        content: ""
    })
    const [article, setArticle] = useState<IArticle>({} as IArticle)
    const [loadingArticle, setLoadingArticle] = useState<boolean>(true)

    const handleChange = (event: any) => {
        const name = event.target.name
        const value = event.target.value
        setValueInput(val => ({ ...val, [name]: value }))
    }

    const handleSubmit = async () => {
        setLoading(true)
        const result = await editArticle(valueInput)
        if (result.success) {
            AlertSuccess("Success add article")
            router.back()
        } else {
            AlertError(result.message)
        }
        setLoading(false)
    }

    const handleFetchArticle = async () => {
        setLoadingArticle(true)
        const result = await fetchDetailArticle(params.slug)
        if (result.success) {
            setArticle(result.data)
            setValueInput(val => ({ ...val, id: result.data.id, title: result.data.title, content: result.data.content }))
        } else {
            AlertError(result.message)
        }
        setLoadingArticle(false)
    }

    useEffect(() => {
        handleFetchArticle()
    }, [])

    return (
        <>
            <Title level={3}>Edit Article</Title>
            {
                loadingArticle ? (
                    <center>
                        <Spin />
                    </center>
                ) : (
                    <Form
                name="basic"
                layout='vertical'
                onFinish={handleSubmit}
                autoComplete="off"
                initialValues={{
                    title: article.title,
                    content: article.content}}
                >
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please input title article!' }]}
                >
                    <Input type='text' name='title' onChange={handleChange}/>
                </Form.Item>

                <Form.Item
                    label="Content"
                    name="content"
                    rules={[{ required: true, message: 'Please input your content!' }]}
                >
                    <Input.TextArea name='content' onChange={handleChange}></Input.TextArea>
                </Form.Item>

                <Form.Item>
                    {
                        loading ?
                            <Spin /> :
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                    }
                </Form.Item>
            </Form>
                )
            }
            
        </>
    )
}

export default FormEditArticlePage