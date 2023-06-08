import { Avatar, List } from '@arco-design/web-react';
import { IconHeart, IconMessage, IconPlus, IconStar } from '@arco-design/web-react/icon';
import { useRequest } from 'ahooks';
import { Link, useHistory } from 'react-router-dom';

import PageWrap from '@/components/base/PageWrap';
import IconButton from '@/components/IconButton';
import request from '@/utils/request';

interface DataItem {
  id: number;
  createTime: string;
  updateTime: string;
  title: string;
  content: string;
  userId: number;
  watchCount: number;
  likeCount: number;
  username: string;
  desc: string;
}
type HotMessageProps = unknown;
const HotMessage = () => {
  const avatarSrc = [
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/9eeb1800d9b78349b24682c3518ac4a3.png~tplv-uwbnlip3yd-webp.webp',
  ];
  const imageSrc = [
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/29c1f9d7d17c503c5d7bf4e538cb7c4f.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/04d7bc31dd67dcdf380bc3f6aa07599f.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/1f61854a849a076318ed527c8fca1bbf.png~tplv-uwbnlip3yd-webp.webp',
  ];
  // const names = ['Socrates', 'Balzac', 'Plato'];

  // const dataSource = new Array(15).fill(null).map((_, index) => {
  //   return {
  //     index: index,
  //     avatar: avatarSrc[index % avatarSrc.length],
  //     title: names[index % names.length],
  //     description:
  //       'Beijing ByteDance Technology Co., Ltd. is an enterprise located in China. ByteDance has products such as TikTok, Toutiao, volcano video and Douyin (the Chinese version of TikTok).',
  //     imageSrc: imageSrc[index % imageSrc.length],
  //   };
  // });
  const pageSize = 5;
  const { data, run, loading } = useRequest((page = 1) =>
    request<Pagination<DataItem>>({
      url: '/doc/list',
      params: {
        page,
        pageSize,
      },
    }),
  );
  const { push } = useHistory();

  console.log('👴2023-06-07 16:03:53 HotMessage.tsx line:41', data);

  return (
    <PageWrap
      title={`热点资讯`}
      style={{ padding: 20 }}
      headExtra={
        <Link to={`/message/addMessage`}>
          <IconButton icon={<IconPlus />} type="primary" />
        </Link>
      }
      breadcrumb={[
        {
          title: '热点资讯',
          link: '/message/hotMessage',
        },
      ]}
    >
      <List
        className="list-demo-action-layout"
        bordered={false}
        pagination={{
          pageSize,
          total: data?.data.total,
          onChange(current) {
            run(current);
          },
        }}
        loading={loading}
        dataSource={data?.data?.items}
        render={(item, index) => (
          <List.Item
            key={index}
            style={{
              padding: '20px 0',
              borderBottom: '1px solid var(--color-fill-3)',
              cursor: 'pointer',
            }}
            actionLayout="vertical"
            actions={[
              <span key={'5'}>{item.username}</span>,
              <span key={1}>
                <IconHeart />
                {83}
              </span>,
              <span key={2}>
                <IconStar />
                {index}
              </span>,
            ]}
            onClick={() => push(`/message/detail?id=${item.id}`)}
          >
            <List.Item.Meta
              avatar={
                <Avatar shape="square">
                  <img
                    alt="avatar"
                    src={`//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp`}
                  />
                </Avatar>
              }
              title={item.title}
              description={<div className="text-row-2">{item.desc}</div>}
            />
          </List.Item>
        )}
      />
    </PageWrap>
  );
};

export default HotMessage;
