import { useNavigate } from "react-router-dom";
import { Layout, Form, Input, Button } from 'antd';
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const { Content } = Layout;

  const signIn = async (values) => {
    try {
      const send = await axios.post('http://localhost:4141/api/login', {
        username: values.username,
        password: values.password
      })
      localStorage.setItem('MyTemporaryToken', send.data.bearer);
      // console.log('localStorage', localStorage.getItem('MyTemporaryToken'))
      navigate('/');
      // положить в локалсторедж, и сделать защищенный роут, где он будет проверяться
    }
    catch (error) {
      console.log(error)
    }
  }

  const onFinish = (values) => {
    console.log('Success:', values);
    signIn(values);
  };

  return (
    <>
      <Button
      ghost
      shape="round"
      onClick={() => navigate('/')}
      >
        Back to Home
      </Button>

        <Content style={{width: '80%'}}>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button shape="round" type="secondary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>   
        </Content>
    </>
  )
}

export default Login;
