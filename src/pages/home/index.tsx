import { Button, Divider, Space, Upload } from '@arco-design/web-react';
import { UploadItem } from '@arco-design/web-react/es/Upload';
import { useRequest } from 'ahooks';
import CryptoJS from 'crypto-js';
import { FC, ReactElement, useState } from 'react';

import request from '@/utils/request';

interface Oss {
  ugc: Ugc;
}

interface Ugc {
  ossToken: OssToken;
}

interface OssToken {
  code: string;
  data: Data;
}

interface Data {
  AccessKeyId: string;
  AccessKeySecret: string;
  Expiration: string;
  SecurityToken: string;
}

type HomePageProps = any;

const handleUpload = async (file: UploadItem) => {
  const { data } = await request<any>({
    method: 'GET',
    url: `/file/ossSign`,
  });

  const { originFile, name } = file;

  const params = {
    key: 'test/' + name,
    success_action_status: 200,
    host: 'https://zjs-ugc.oss-cn-hangzhou.aliyuncs.com',
    ...data,
  };

  const formData = new FormData();

  Object.keys(params).forEach((key) => {
    formData.append(key, params[key]);
  });
  formData.append('file', originFile as File);

  const res = await request({
    baseURL: '/loadOss',
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return params.host + '/' + params.key;
};

const HomePage: FC<HomePageProps> = (): ReactElement => {
  const { data } = useRequest(
    async () => {
      const res = await request<Oss>({
        method: 'GET',
        baseURL: '/oss',
        url: `/dasugc/v1/api/v1/oss/token`,
      });
      return res;
    },
    {
      manual: true,
    },
  );

  const [file, setFile] = useState<UploadItem[]>([]);

  return (
    <div>
      <h1>welcome</h1>
      <Upload
        onChange={(file) => {
          // setFile(file);
        }}
        directory // 上传文件夹
      />
      <Divider />
      <Space>
        <Button onClick={() => handleUpload(file[0])} type="primary">
          开始上传
        </Button>

        <Button
          type="primary"
          onClick={async () => {
            const res = await request({
              baseURL: '/rl',
              url: '/fshare/v3/chat-session/get/filelist?container=1606410&s=0&n=20',
            });

            console.log('👴2023-04-19 17:27:35 index.tsx line:105', res);
          }}
        >
          请求测试
        </Button>
      </Space>
    </div>
  );
};

export default HomePage;
