"use client"

import { addArticle } from '@/services/article'
import { IAddArticle } from '@/types/article'
import { AlertError, AlertSuccess } from '@/utils/extension'
import { Button, Form, Input, Space, Spin, Typography } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const { Title, Text } = Typography
const FormAddArticlePage = () => {

    const router = useRouter()

    const [loading, setLoading] = useState<boolean>(false)
    const [selectedImage, setSelectedImage] = useState(null);

    const [valueInput, setValueInput] = useState({
        title: "",
        content: ""
    })

    const handleChange = (event: any) => {
        const name = event.target.name
        const value = event.target.value
        setValueInput(val => ({ ...val, [name]: value }))
        console.log(valueInput)
    }

    const handleImageChange = (event: any) => {
        const file = event.target.files[0];
        setSelectedImage(file);
        console.log(file)
    };

    const handleSubmit = async () => {
        setLoading(true)
        const data: IAddArticle = {
            "title": valueInput.title,
            "content": valueInput.content,
            "picture": selectedImage
        }
        const result = await addArticle(data)
        if (result.success) {
            AlertSuccess("Success add article")
            router.back()
        } else {
            AlertError(result.message)
        }
        setLoading(false)
    }

    return (
        <>
            <Title level={3}>Add Article</Title>
            <Form
                name="basic"
                layout='vertical'
                onFinish={handleSubmit}

                autoComplete="off">
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please input title article!' }]}
                >
                    <Input type='text' name='title' onChange={handleChange} />
                </Form.Item>

                <Form.Item
                    label="Content"
                    name="content"
                    rules={[{ required: true, message: 'Please input your content!' }]}
                >
                    <Input.TextArea name='content' onChange={handleChange}></Input.TextArea>
                </Form.Item>

                <Form.Item
                    label="Cover"
                    name="cover"
                    rules={[{ required: true, message: 'Please add cover article!' }]}
                >
                    <Input type='file' name='cover' onChange={handleImageChange} accept='image/*' />

                </Form.Item>

                <Form.Item>
                    <Text>Preview cover:</Text>
                    {selectedImage && (
                        <Image width={200} height={200} src={URL.createObjectURL(selectedImage)} alt="Selected Image" />)}
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
        </>
    )
}

export default FormAddArticlePage