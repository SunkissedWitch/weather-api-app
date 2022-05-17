import React from 'react'
import { Layout } from 'antd';
import { Routes, Route } from "react-router-dom";
import Login from './Login';
import IsAuthorized from '../helpers/IsAuthorized';
import ProtectedRoute from './ProtectedRoute';

const { Content } = Layout;

export const LayoutComponent = (props) => {
  const { App } = props;

  return (
    <Layout className="gradient-background">
      <Content>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="login" element={<Login />} />
          <Route path="protected" 
            element={
            <IsAuthorized >
              <ProtectedRoute />
            </IsAuthorized>} />
        </Routes>     
      </Content>
    </Layout>
  )
}