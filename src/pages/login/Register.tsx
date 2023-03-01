import { Button, Form, Input, Message } from '@arco-design/web-react';
import { IconApps, IconIdcard, IconLock, IconUser } from '@arco-design/web-react/icon';
import { FC, ReactElement, useRef } from 'react';

import { useRequest } from 'ahooks'
import to from '@/utils/to';
import { registerApi } from '@/api/user';


type RegisterProps = {
  back(): void

}
const Register: FC<RegisterProps> = ({ back }): ReactElement => {
  const required = true
  const [form] = Form.useForm<UserInfo>();

  const { run, loading } = useRequest(async () => {
    const data = await form.validate()
    const [err, res] = await to(registerApi(data))

    if (!err) {
      Message.success('注册成功')
      back()
      form.resetFields()
    }

  }, {
    manual: true
  })


  return <div>
    <h1>注册</h1>
    <Form
      wrapperCol={{ span: 24 }}
      form={form}
      autoComplete="off"
    >
      <Form.Item
        field="name"
        required
        rules={[
          {
            required,
            message: "昵称格式有误",
            minLength: 1,
          },
        ]}
      >
        <Input
          type="text"
          placeholder="请输入昵称"
          required
          prefix={<IconIdcard />}
          autoComplete="on"
        />
      </Form.Item>
      <Form.Item
        field="account"
        required
        rules={[
          {
            required,
            message: "账号格式错误",
            minLength: 5,
          },
        ]}
      >
        <Input
          type="text"
          placeholder="请输入账号"
          required
          prefix={<IconUser />}
          autoComplete="off"
        />
      </Form.Item>
      <Form.Item
        field="password"
        required
        rules={[
          {
            required,
            message: "密码格式错误",
            minLength: 6,
          },
        ]}
        style={{ marginBottom: 10 }}
      >
        <Input.Password
          type="password"
          placeholder="请输入密码"
          required
          prefix={<IconLock />}
          autoComplete="off"
        />
      </Form.Item>
      <Form.Item style={{
        marginTop: 20
      }}>
        <Button type="primary" long onClick={run} loading={loading}>
          注册
        </Button>
      </Form.Item>
    </Form>
    <div className='center'>
      <Button onClick={() => {
        back()
      }}
        type='text'
      >返回登录</Button>
    </div>
  </div>;
};

export default Register;