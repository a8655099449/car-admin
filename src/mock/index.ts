import { MockMethod } from 'vite-plugin-mock';

export default [
  {
    url: '/user/login',
    method: 'post',
    timeout: 1000, // 设置延时
    response: ({ body }) => {
      if (!body) return sendErrorMessage();
      const { acc, pwd } = body;
      if (acc === 'admin' && pwd === '123456') {
        return sendSuccessMessage<UserInfo>({
          data: {
            name: 'admin',
            auth: ['admin'],
          },
        });
      }
      return sendErrorMessage({ msg: '账号密码错误' });
    },
  },
] as MockMethod[];

type SuccessRequest<T> = {
  code?: number;
  data?: T;
  msg?: string;
};

const sendSuccessMessage = <T>({
  data,
  msg = 'ok',
}: SuccessRequest<T>): SuccessRequest<T> => {
  return {
    code: 0,
    msg,
    data,
  };
};

const sendErrorMessage = ({
  code = 500,
  msg = 'server is error...',
} = {}): SuccessRequest<any> => {
  return {
    code,
    msg,
  };
};
