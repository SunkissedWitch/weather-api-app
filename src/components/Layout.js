import { Layout } from 'antd';

const { Content } = Layout;

export const LayoutComponent = (props) => {
  const { App } = props;
  return (
    <Layout className="gradient-background">
      <Content>
          <App />     
      </Content>
    </Layout>
  )
}