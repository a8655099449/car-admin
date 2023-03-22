import { Button, Upload } from '@arco-design/web-react';
import { FC, ReactElement, useState } from 'react';

import CryptoJS from 'crypto-js';
import { UploadItem } from '@arco-design/web-react/es/Upload';
import request from '@/utils/request';
import { useRequest } from 'ahooks';

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


type HomePageProps = any

const handleUpload = async (file: UploadItem, oss: Oss) => {

  const res1 = await request<Oss>({
    method: "GET",
    baseURL: "/oss",
    url: `/dasugc/v1/api/v1/oss/token`,
  });

  const { AccessKeyId, AccessKeySecret, SecurityToken } = res1.data.ugc.ossToken.data

  const { originFile, name } = file
  const date = new Date();
  date.setHours(date.getHours() + 1);
  date.setHours(date.getHours() + 1);
  const policyText = {
    expiration: date.toISOString(), // 设置policy过期时间。
    conditions: [
      // 限制上传大小。
      ["content-length-range", 0, 1024 * 1024 * 1024 * 10],
    ],
  };
  const policy = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(JSON.stringify(policyText)));

  console.log(policy,)
  console.log(AccessKeySecret,)

  const signature = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(AccessKeySecret, policy,));


  const params = {
    key: '',
    policy,
    signature,
    OSSAccessKeyId: AccessKeyId,
    success_action_status: 200,
    name,
    'x-oss-security-token': SecurityToken,
  }

  const formData = new FormData();

  Object.keys(params).forEach((key) => {
    formData.append(key, params[key]);
  })
  formData.append('file', originFile as File)

  const res = await request({
    baseURL: '/loadOss',
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })

  console.log('👴2023-03-22 11:15:05 index.tsx line:76', res)

}

const HomePage: FC<HomePageProps> = (): ReactElement => {

  const { data } = useRequest(async () => {
    const res = await request<Oss>({
      method: "GET",
      baseURL: "/oss",
      url: `/dasugc/v1/api/v1/oss/token`,
    });
    return res
  })

  const [file, setFile] = useState<UploadItem[]>([]);


  console.log('👴', CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1('aaa', 'bbb')))


  return <div>
    <h1>welcome</h1>
    <Upload
      onChange={(file) => {
        setFile(file)
      }}
      limit={2}
      fileList={file}
    />
    <Button onClick={() => handleUpload(file[0], data?.data as Oss)}
      style={{ marginTop: 20 }}
      type='primary'
    >开始上传</Button>
  </div>;
};

export default HomePage;