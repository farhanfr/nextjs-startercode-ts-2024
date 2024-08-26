"use client"

import React, { useState } from 'react'
import { IRegisterUser } from '@/types/auth'
import { Button, Card, Divider, Form, Input, Spin, Typography } from 'antd'
import { useRouter } from 'next/navigation'
import { registerAuth } from '@/services/auth'
import { AlertError, AlertSuccess } from '@/utils/extension'


const { Title, Text } = Typography
const RegisterPage = () => {
    const router = useRouter()

    const [valueInput, setValueInput] = useState<IRegisterUser>({
        name: "",
        phonenumber: "",
        password: ""
    })
    const [loading, setLoading] = useState<boolean>(false)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name
        const value = event.target.value
        setValueInput(val => ({ ...val, [name]: value }))

        console.log(valueInput)
    }

    const handleRegister = async() => {
        setLoading(true)
        const result = await registerAuth(valueInput)
        if (result.success) {
            AlertSuccess("Register Success")
        }else{
            AlertError(result.message)
        }
        setLoading(false)
    }

    return (
        <>
            <main className='flex min-h-screen flex-col items-center justify-between p-24'>

                <Card style={{ width: '50%' }}>
                    <Title level={3}>Register</Title>
                    <Form
                        name="basic"
                        onFinish={handleRegister}
                        // labelCol={{ span: 8 }}
                        // wrapperCol={{ span: 16 }}
                        // style={{ maxWidth: 600 }}
                        // initialValues={{ remember: true }}
                        // onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        autoComplete="off">
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <Input name='name' onChange={handleChange} />
                        </Form.Item>

                        <Form.Item
                            label="Phonenumber"
                            name="phonenumber"
                            rules={[{ required: true, message: 'Please input your phonenumber!' }]}
                        >
                            <Input type='number' name='phonenumber' onChange={handleChange} />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password name='password' onChange={handleChange} />
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
                    <Divider />
                    <Text>Sudah punya akun? <b onClick={() => {
                        router.push("/login")
                    }}>Klik Disini</b>
                    </Text>
                </Card>
            </main>
        </>
    )
}

export default RegisterPage