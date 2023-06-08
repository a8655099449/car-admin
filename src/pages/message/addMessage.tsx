import { Button, Input, Message, PageHeader } from '@arco-design/web-react';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import Typography from '@tiptap/extension-typography';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { ReactElement, useState } from 'react';
import { useHistory } from 'react-router-dom';

import PageWrap from '@/components/base/PageWrap';
import WaitButton from '@/components/base/WaitButton';
import { getContext } from '@/context/BaseContext';
import request from '@/utils/request';
import to from '@/utils/to';

type AddMessageProps = unknown;
function AddMessage(props: AddMessageProps): ReactElement {
  const { userInfo } = getContext();

  const { replace } = useHistory();

  const [data, setData] = useState({
    title: '',
    userId: userInfo.id,
  });

  const editor = useEditor({
    extensions: [
      Placeholder.configure({
        placeholder: '请输入内容',
      }),
      StarterKit,
      Highlight,
      Typography,
      Image,
    ],
  });

  const publishDoc = async () => {
    const text = editor?.getText();
    if (!data.title?.trim()) {
      Message.warning('请输入文章标题');
      return;
    }
    if (!text?.trim()) {
      Message.warning('请输入文章内容');
      return;
    }

    const content = editor?.getHTML();
    const [err, res] = await to(
      request({
        url: 'doc/add',
        data: { ...data, content, desc: text.substring(0, 20) + '...' },
        method: 'POST',
      }),
    );
    if (err) {
      return;
    }
    Message.success('发布成功');
    replace(`/message/hotMessage`);
  };

  return (
    <PageWrap
      breadcrumb={[
        {
          title: '热点资讯',
          link: '/message/hotMessage',
        },
      ]}
      title={`发布资讯`}
      headExtra={
        <WaitButton type="primary" onClick={publishDoc}>
          发布
        </WaitButton>
      }
      style={{
        padding: 20,
      }}
    >
      <Input
        style={{
          marginBottom: 20,
          backgroundColor: 'transparent',
          border: '1px solid var(--color-neutral-3)',
        }}
        placeholder="请输入标题"
        value={data.title}
        onChange={(e) => setData({ ...data, title: e })}
      />
      <EditorContent
        editor={editor}
        style={{
          border: '1px solid var(--color-neutral-3)',
          minHeight: 800,
          padding: 10,
        }}
      />
    </PageWrap>
  );
}
export default AddMessage;
