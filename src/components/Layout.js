import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;

export const LayoutComponent = (props) => {
  const { App } = props;
  return (
    <Layout className="layout">
    <Header>
    <div className="logo" />
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        {new Array(5).fill(null).map((_, index) => {
        const key = index + 1;
        return <Menu.Item key={key}>{`nav ${key}`}</Menu.Item>;
        })}
    </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
    <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Weather</Breadcrumb.Item>
        <Breadcrumb.Item>Favorite Cities</Breadcrumb.Item>
    </Breadcrumb>

        <App />
        
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  )
}