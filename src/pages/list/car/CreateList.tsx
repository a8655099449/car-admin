import { createList } from "@/api/car";
import { Button, Input, Message, Table } from "@arco-design/web-react"
import { useMemo } from "react";


const testStr = `
22.3
英朗
21431
2021款改款典范1.5L自动精英型
125900 
-47500
78400
4500
6938
89838
22.3
帝豪
17585
2022款第4代1.5L CVT尊贵型
83900
- 4500
79400
4000
7027
90427
22.3
科鲁泽
14117
2022款轻混RS 330T自动畅快版
117900
- 43000
74900
3000
6628
84528
22.3
荣威i5 
13463
2021款1.5L CVT钻石版
84900
- 14000
70900
4000
6274
81174
22.3
名爵5 
11341
2021款改款180DWVT CVT青春豪华
82900
-7000
75900
3500
6717
86117
22.3
奕炫
10989
2021款230T自动追影骑士版
86900
- 10000
76900
4000
6805
87705
22.3
艾瑞泽5
9260
2021款PRO 1.5L CVT青春版
69900
- 7000
62900
4000
5566
72466
22.3
飞度
8514
2021款1.5L CVT潮享版
86800
-8500
78300
4000
6929
89229
22.3
YARiS L致炫
7121
2021款致炫X 1.5L CVT领先版
89800
-14500
75300
4000
6664
85964
22.3
瑞虎5x
6862
2020款1.5L CVT时尚版
85900
-17000
68900
4000
6097
78997
22.3
哪吒V
6482
2021款长续航娱乐版升级型
72900
-1000
71900
4500
0
76400
`

const transitionData = (str: string) => {

  const textArr = str.split("\n").filter((item) => item.trim())

  const keyArr: (keyof CarItem)[] = ['inventoryTime', 'brand', 'saleCount', 'model', 'guidePrice', 'discount', 'nakedPrice', 'insurance', 'purchaseTax', 'landingPrice'];

  if (textArr.length % keyArr.length !== 0) {
    Message.warning('解析错误，请检查')

    return []
  }


  let obj = {} as any
  const itemList: CarItem[] = []

  for (let i = 0; i < textArr.length; i++) {
    const v = textArr[i]

    const index = i % keyArr.length

    obj[keyArr[index]] = v
    if (index === keyArr.length - 1) {
      itemList.push(obj)
      obj = {}
    }
  }

  return itemList

}


const CreateList = () => {

  const list = useMemo(() => transitionData(testStr), [])

  const handleSave = async () => {
    const res = await createList(list)
    console.log('👴2023-03-16 17:32:09 index.tsx line:158', res)
  }

  return (
    <div>
      <div style={{ marginBottom: 10 }}>

        <Button onClick={handleSave}>保存</Button>

      </div>
      <Input.TextArea style={{
        height: 200,
        marginBottom: 10
      }} />


      <Table<CarItem>
        data={list}
        rowKey={'brand'}
        columns={[
          {
            dataIndex: "inventoryTime",
            title: "盘点时间"
          },
          {
            dataIndex: "brand",
            title: "品牌"
          },
          {
            dataIndex: "saleCount",
            title: "销量"
          },
          {
            dataIndex: "model",
            title: "车型"
          },
          {
            dataIndex: "guidePrice",
            title: "指导价"
          },
          {
            dataIndex: "discount",
            title: "优惠行情价"
          },
          {
            dataIndex: "nakedPrice",
            title: "裸车价"
          },
          {
            dataIndex: "insurance",
            title: "保险"
          },
          {
            dataIndex: "purchaseTax",
            title: "购置税"
          },
          {
            dataIndex: "landingPrice",
            title: "落地行情价"
          },

        ]}

      />
    </div>
  )
}


export default CreateList