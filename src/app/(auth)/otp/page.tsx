"use client"

import { loginAuth } from '@/services/auth'
import { ILoginUser, IOtpUser } from '@/types/auth'
import { AlertError, AlertSuccess, AlertWarning, getTimeNowAndOneMinute } from '@/utils/extension'
import { Button, Card, Form, Typography, Input, Spin } from 'antd'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const { Title, Text } = Typography

const OtpPage = () => {
  const router = useRouter()

  const [valueInput, setValueInput] = useState<IOtpUser>({
    otp: ""
  })

  const [loading, setLoading] = useState(false)
  const [loadingResend, setLoadingResend] = useState(false)


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name
    const value = event.target.value
    setValueInput(val => ({ ...val, [name]: value }))
  }


  const handleSubmit = async () => {
    setLoading(true)
    let otpData = JSON.parse(localStorage.getItem('otpData') ?? "")
    try {
      const res = await signIn('credentials', {
        phonenumber: otpData.phonenumber,
        otp: valueInput.otp,
        redirect: false,
      })
      if (!res?.error) {
        router.push('/admin/dashboard')
        localStorage.removeItem('otpData')
        // setLoading(false)
      }
      else {
        AlertError(res.error)
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
    }
  }



  const handleResendOTP = async () => {
    setLoadingResend(true)
    let otpData = JSON.parse(localStorage.getItem('otpData') ?? "")
    const otpDataSend: ILoginUser = {
      phonenumber: otpData.phonenumber,
      password: otpData.password,
    }
    const result = await loginAuth(otpDataSend)
    if (result.success) {
      localStorage.setItem('otpData', JSON.stringify(otpDataSend))
      AlertSuccess("Resend OTP Success")
    } else {
      AlertError(result.message)
    }
    setLoadingResend(false)
  }

  return (

    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <Card style={{ width: '50%' }}>
        <Title level={4}>Please enter the OTP that has been sent to you</Title>
        {/*   <CountdownTimer startTime={new Date("2024-06-22T00:00:00")} endTime={new Date("2024-06-22T00:00:01")} /> */}
        <Form
          // name="basic"
          layout='vertical'
          onFinish={handleSubmit}
          // labelCol={{ span: 8 }}
          // wrapperCol={{ span: 16 }}
          // style={{ maxWidth: 600 }}
          // initialValues={{ remember: true }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off">

          <Form.Item
            label="Otp"
            name="otp"
            rules={[{ required: true, message: 'Please input your OTP!' }]}
          >
            <Input name='otp' onChange={handleChange} />
          </Form.Item>
          <Form.Item>
            {
              loading ?
                <Spin /> :
                <Button type="primary" htmlType="submit">
                  Submit OTP
                </Button>
            }
          </Form.Item>
        </Form>

        <center>
          {
            loadingResend ?
            <Spin /> :
            <Text className='text-lg fw-bold cursor-pointer' onClick={handleResendOTP}>Resend OTP</Text>
          }
          
        </center>

      </Card>
    </main>
  )
}

export default OtpPage