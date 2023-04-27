import { Descriptions, Image, Spin } from '@arco-design/web-react';
import { useRequest } from 'ahooks';
import React, { useMemo } from 'react';

import PageWrap from '@/components/base/PageWrap';
import request from '@/utils/request';
import { useQuery } from '@/utils/use';

interface RequestData {
  icon: string;
  brandName: string;
  image: string;
  id: number;
  name: string;
  items: Item[];
}

interface Item {
  saleCount: number;
  guidePrice: number;
  landingPrice: number;
  discount: number;
  inventoryTime: string;
}

const CardDetail = () => {
  const { modelId } = useQuery();

  console.log('👴2023-04-26 10:32:48 cardDetail.tsx line:8', modelId);

  const { data, loading } = useRequest(async () =>
    request<RequestData>({
      url: '/car/modelDetails',
      params: { modelId },
    }),
  );

  const _data = useMemo(() => data?.data, [data]);

  return (
    <PageWrap title={_data?.name} showTitle>
      <Spin loading={loading}>
        <div>
          <div>
            <Image src={_data?.image} />
          </div>

          <div>
            <Descriptions
              data={[
                {
                  label: '月均销量',
                  value: _data?.saleCount,
                },
              ]}
            />
          </div>
        </div>
      </Spin>
    </PageWrap>
  );
};

export default CardDetail;
