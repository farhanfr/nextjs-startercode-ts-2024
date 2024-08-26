"use client"

import React from 'react'
import { DownOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Dropdown, Space } from 'antd'
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';


const DropdownAdminProfile = () => {

    const router = useRouter()
    const { data: session, status } = useSession()

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    Profile
                </a>
            ),
        },
        {
            key: '2',
            danger: true,
            label: 'Logout',
            onClick: () => { 

                signOut({ callbackUrl: "/" })
            }
        },
    ];

    return (
        <>
            <Dropdown menu={{ items }}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        {/* Hover me
                        <DownOutlined /> */}
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar icon={<UserOutlined />} />
                            <span style={{ padding: 5 }}>{session?.user?.name ?? "-"}</span>
                        </div>
                    </Space>
                </a>
            </Dropdown>
        </>
    )
}

export default DropdownAdminProfile