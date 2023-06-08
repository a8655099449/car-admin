import { Button, Card, Divider, Input, Message } from '@arco-design/web-react';
import { useRequest } from 'ahooks';
import { ReactElement, useState } from 'react';
import { Redirect } from 'react-router-dom';

import PageWrap from '@/components/base/PageWrap';
import WaitButton from '@/components/base/WaitButton';
import { getContext } from '@/context/BaseContext';
import request from '@/utils/request';
import to from '@/utils/to';
import { useQuery } from '@/utils/use';
interface Data {
  id: number;
  createTime: string;
  updateTime: string;
  title: string;
  content: string;
  userId: number;
  watchCount: number;
  likeCount: number;
  desc: string;
  username: string;
}

interface Comment {
  id: number;
  createTime: string;
  username: string;
  avatar: string;
  userId: number;
  content: string;
  docId: number;
}

function DocDetails(): ReactElement {
  const { id } = useQuery();
  const { userInfo } = getContext();
  if (!id) {
    return <Redirect to={'/'} />;
  }

  const { data } = useRequest(() =>
    request<Data>({
      url: '/doc/detail',
      params: { id },
    }),
  );
  const { data: commentList, run: getComment } = useRequest(() =>
    request<Comment[]>({
      url: '/doc/comment',
      params: { id },
    }),
  );
  const [comment, setComment] = useState('');

  const addComment = async () => {
    if (!comment.trim()) {
      return Message.warning('请输入评论内容');
    }
    const [err, res] = await to(
      request({
        url: '/comment/add',
        method: 'post',
        data: {
          content: comment,
          docId: id,
          userId: userInfo.id,
        },
      }),
    );
    if (err) {
      Message.error('评论失败');
      return;
    }
    Message.success('评论成功');
    setComment('');
    getComment();
  };

  return (
    <PageWrap
      breadcrumb={[
        {
          title: '热点资讯',
          link: '/message/hotMessage',
        },
      ]}
      title={data?.data?.title}
    >
      <h1 style={{ textAlign: 'center' }}>{data?.data?.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: data?.data?.content || '' }} />
      <Divider />
      <h2 className="flex-between">
        <div>评论</div>
        <div>
          <WaitButton type="primary" onClick={addComment}>
            添加评论
          </WaitButton>
        </div>
      </h2>
      <Input.TextArea
        value={comment}
        onChange={setComment}
        placeholder="添加一条友善的评论吧"
      />
      <Divider />
      {commentList?.data.map((item) => (
        <Card
          title={item.username}
          key={item.id}
          size="small"
          style={{ marginBottom: 10 }}
        >
          {item.content}
        </Card>
      ))}
    </PageWrap>
  );
}
export default DocDetails;
