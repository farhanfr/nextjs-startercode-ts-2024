"use client"

import { Layout, Menu, theme } from 'antd';
import {
  HeartTwoTone,
  PieChartOutlined,
  SlidersOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { HeaderAdminComponent } from '@/components/headerAdmin';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const { Sider, Content, Footer } = Layout;

const MainAdminLayout = ({children}: {children: React.ReactNode}) => {
  const urlPathName = usePathname()
  const pathName = urlPathName.split("/")[2]

  const [selectedKey,setSelectedKey] = useState(pathName == "dashboard" ? "1" : "2")


  return (
    <>
        <Layout>
          <Sider trigger={null}>
            <Menu
              theme="dark"
              mode="inline"
              style={{ marginTop: '3rem' }}
              defaultSelectedKeys={[selectedKey]}
              items={[
                {
                  key: '1',
                  icon: <PieChartOutlined />,
                  label: <Link href={"/admin/dashboard"}>Dashboard</Link>,
                },
                {
                  key: '2',
                  icon: <SlidersOutlined />,
                  label: <Link href={"/admin/article/list-articles"}>List Article</Link>,
                },
                // {
                //   key: '3',
                //   icon: <TeamOutlined />,
                //   label: <NavLink href="/users">Usuários</NavLink>,
                // },
                // {
                //   key: '4',
                //   icon: <DeploymentUnitOutlined />,
                //   label: <NavLink href="/units">Unidades</NavLink>,
                // },
                // {
                //   key: '5',
                //   icon: <UnorderedListOutlined />,
                //   label: <NavLink href="/companies">Empresas</NavLink>,
                // },
              ]}
              onClick={({key}) => {
                setSelectedKey(key)
              }}
            />
          </Sider>
          <Layout className="site-layout">
            <HeaderAdminComponent />
            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                height: '52rem',
                background: '#fff',
                overflow: 'auto',
              }}
            >
              {children}
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Made with {<HeartTwoTone twoToneColor="#993399" />} by{' '}
              <Link href="https://github.com/biantris" target="_blank">
                Reacts
              </Link>
            </Footer>
          </Layout>
        </Layout>
    </>
  )
}

export default MainAdminLayout