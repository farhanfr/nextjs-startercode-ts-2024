"use client"

import React, { useState } from 'react'

import { loginAuth } from '@/services/auth'
import { ILoginUser } from '@/types/auth'
import { AlertError, AlertSuccess } from '@/utils/extension'
import { Button, Card, Divider, Form, Input, Spin, Typography } from 'antd'
import { useRouter } from 'next/navigation'

const { Title, Text } = Typography
const LoginPage = () => {
    const router = useRouter()

    const [valueInput, setValueInput] = useState<ILoginUser>({
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

    const handleLogin = async() => {
        setLoading(true)
        const result = await loginAuth(valueInput)
        if (result.success) {
            AlertSuccess("Login Success")
            localStorage.setItem('otpData', JSON.stringify(valueInput))
            router.push('/otp')
        }else{
            AlertError(result.message)
        }
        setLoading(false)
    }

    return (
        <>
            <main className='flex min-h-screen flex-col items-center justify-between p-24'>
                <Card style={{ width: '50%' }}>
                    <Title level={3}>Login To Dashboard</Title>
                    <Form
                        name="basic"
                        layout='vertical'
                        onFinish={handleLogin}
                        // labelCol={{ span: 8 }}
                        // wrapperCol={{ span: 16 }}
                        // style={{ maxWidth: 600 }}
                        // initialValues={{ remember: true }}
                        // onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        autoComplete="off">
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
                    <center>
                        <Text>Haven't account? <b className='cursor-pointer' onClick={() => {
                            router.push('/register')
                        }}>Klik Disini</b>
                        </Text>
                    </center>
                </Card>
            </main>
        </>
    )
}

export default LoginPage