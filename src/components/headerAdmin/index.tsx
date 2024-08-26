'use client';

import { Layout, theme } from 'antd';
import DropdownAdminProfile from '../dropdownAdminProfile';

import 'antd/dist/reset.css';

const { Header } = Layout;

export const HeaderAdminComponent = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Header
        style={{
          display: 'flex',
          background: colorBgContainer,
          alignItems: 'center',
          justifyContent: 'end',
        }}
      >
        <DropdownAdminProfile />
      </Header>
    </>
  );
};
