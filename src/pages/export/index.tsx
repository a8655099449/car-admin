import { copy2Clipboard, downloadFile } from '@/utils';
import { Button, Input, Message, Table } from '@arco-design/web-react';
import { FC, ReactElement, useMemo, useState } from 'react';

interface IProps { }
const ExportPage: FC<IProps> = (): ReactElement => {

   // const List =  lazyload(`./pages/list/index.tsx`)
   const [text, setText] = useState(`/marketingCenter/marketing/travelCard	出行卡管理	Travel card management
   /marketingCenter/marketing/travelCard	序号	Serial number
   /marketingCenter/marketing/travelCard	出行卡名称	Travel card name
   /marketingCenter/marketing/travelCard	业务类型	Type of business
   /marketingCenter/marketing/travelCard	全部	all
   /marketingCenter/marketing/travelCard	体验卡	Experience card
   /marketingCenter/marketing/travelCard	付费卡	Charge card
   /marketingCenter/marketing/travelCard	兑换卡	Exchange card
   /marketingCenter/marketing/travelCard	商城卡	Mall card
   /marketingCenter/marketing/travelCard	适用出行业务	Applicable travel service
   /marketingCenter/marketing/travelCard	公交	Public transport
   /marketingCenter/marketing/travelCard	轻轨	Light rail
   /marketingCenter/marketing/travelCard	电单车	Motor cycle
   /marketingCenter/marketing/travelCard	停车场	Parking lot
   /marketingCenter/marketing/travelCard	网约车	online car-hailing
   /marketingCenter/marketing/travelCard	小单车	bicycle
   /marketingCenter/marketing/travelCard	出行卡类型	Travel card type
   /marketingCenter/marketing/travelCard	次数卡	Frequency card
   /marketingCenter/marketing/travelCard	时长卡	Time card
   /marketingCenter/marketing/travelCard	出行卡内容	Travel card content
   /marketingCenter/marketing/travelCard	销售时间	Sales time
   /marketingCenter/marketing/travelCard	至	to
   /marketingCenter/marketing/travelCard	原价（元）	Original price (yuan)
   /marketingCenter/marketing/travelCard	优惠价（元）	Preferential price (yuan)
   /marketingCenter/marketing/travelCard	已购买	purchased
   /marketingCenter/marketing/travelCard	有效期	Validity period
   /marketingCenter/marketing/travelCard	天	day
   /marketingCenter/marketing/travelCard	状态	state
   /marketingCenter/marketing/travelCard	创建时间	Creation time
   /marketingCenter/marketing/travelCard	新增出行卡	New travel card
   /marketingCenter/marketing/travelCard	规则设置	Rule setting`);

   const items = useMemo(() => {

      const rows = text.split('\n')

      const items = rows.map(item => {
         const [model, zh, en, other] = item.split('\t').map(i => i.trim())
         return { model, en: other || en, zh }

      })

      return items

   }, [text])

   const handleExport = (t = 'download') => {
      const map: any = {}

      const enMap = {
         'en': {},
         'zh': {}
      }


      items.forEach(item => {
         if (!map[item.model]) {
            map[item.model] = []
         }
         map[item.model].push(item)
      })

      Object.keys(map).forEach(key => {
         map[key].forEach((item: any) => {

            if (!enMap['en'][key]) {
               enMap['en'][key] = {}
            }
            enMap['en'][key][item.zh] = item.en

            if (!enMap['zh'][key]) {
               enMap['zh'][key] = {}
            }
            enMap['zh'][key][item.zh] = item.zh
         })
      })

      const fileContext = JSON.stringify(enMap, null, 2)
      if (t === 'copy') {
         copy2Clipboard(fileContext)
         Message.success('复制成功')
         return
      }

      downloadFile('local.json', fileContext,)
   }





   return <div style={{ padding: 10 }}>
      <Button onClick={() => handleExport()} type='primary' style={{
         marginBottom: 10,
         marginRight: 10
      }}>导出</Button>
      <Button onClick={() => handleExport('copy')} type='primary' style={{
         marginBottom: 10
      }}>复制</Button>

      <Input.TextArea
         style={{
            height: 500,
            marginBottom: 10
         }}
         value={text}
         onChange={e => setText(e)}
      />

      <Table
         data={items}
         pagination={false}
         columns={[
            {
               dataIndex: "model",
               title: "model"
            },
            {
               dataIndex: "en",
               title: "英文"
            },
            {
               dataIndex: "zh",
               title: "中文"
            }
         ]}
      />


   </div>;
};

export default ExportPage;