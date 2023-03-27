import {
  Button,
  Checkbox,
  Form,
  FormInstance,
  Icon,
  Input,
  Message,
} from '@arco-design/web-react';
import { IconClockCircle, IconLock, IconUser } from '@arco-design/web-react/icon';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { loginApi } from '@/api/user';
import { USER_INFO } from '@/config/localKeys';
import { getContext } from '@/context/BaseContext';
import { md5, wait } from '@/utils';
import { isDev } from '@/utils/is';
import storage from '@/utils/storage';
import { useQuery } from '@/utils/use';
import useLocale from '@/utils/useLocale';
import useStorage from '@/utils/useStorage';

import styles from './index.module.less';
import i18n from './locale';
import Register from './Register';

export default function login() {
  // const form = useRef<FormInstance>();
  const [form] = Form.useForm<UserInfo>();
  const { replace } = useHistory();
  const [loading, setLoading] = useState(false);
  const { userInfo, setUserInfo } = getContext();
  const locale = useLocale(i18n);

  const { redirect = '/' } = useQuery();
  const handleLogin = async () => {
    setLoading(true);
    const value = await form.validate();

    value.password = md5(value.password);
    const res = await loginApi(value).finally(() => setLoading(false));
    if (res.code === 200) {
      const { token, user } = res.data;
      loginSuccess(user);
      storage.set('token', token);
    }
  };

  const loginSuccess = (data: UserInfo) => {
    setUserInfo({ ...data });
    setLoading(false);
    replace(redirect);
    Message.success('登录成功');
  };

  const [status, setStatus] = useState(0);

  const required = true;
  return (
    <div className={`${styles['login']}`}>
      <div className={`${styles['login-box']}`}>
        {status === 1 && <Register back={() => setStatus(0)} />}
        {status === 0 && (
          <>
            <h1>{locale['login.title']}</h1>
            <Form
              wrapperCol={{ span: 24 }}
              form={form}
              initialValues={userInfo.remember ? userInfo : {}}
            >
              <Form.Item
                field="account"
                required
                rules={[
                  {
                    required,
                    message: '账号格式错误',
                    minLength: 5,
                  },
                ]}
              >
                <Input
                  type="text"
                  placeholder="请输入账号"
                  required
                  prefix={<IconUser />}
                />
              </Form.Item>
              <Form.Item
                field="password"
                required
                rules={[
                  {
                    required,
                    message: '密码格式错误',
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
                />
              </Form.Item>

              <div className="flex-between">
                <div>
                  <Form.Item
                    style={{
                      marginBottom: 10,
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                    field="remember"
                    itemType="checkbox"
                    initialValue={true}
                  >
                    <Checkbox defaultChecked> 记住密码</Checkbox>
                  </Form.Item>
                </div>
                <div
                  style={{
                    marginTop: -10,
                  }}
                >
                  <Button
                    type="text"
                    onClick={() => {
                      setStatus(1);
                    }}
                  >
                    注册
                  </Button>
                </div>
              </div>
              <Form.Item>
                <Button type="primary" long onClick={handleLogin} loading={loading}>
                  {locale['login.title']}
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </div>
    </div>
  );
}
