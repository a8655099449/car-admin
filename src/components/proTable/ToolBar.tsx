import { Checkbox, Dropdown, Menu, Space } from '@arco-design/web-react';
import { IconOriginalSize, IconRefresh, IconSettings } from '@arco-design/web-react/icon';
import { FC, ReactElement } from 'react';

import IconButton from '../IconButton';
import { useTableSetting } from './hooks';
import styles from './index.module.less';
import { TableSize } from './type';

type ToolBarProps = {
  onRefresh?: () => void;
  title?: string;
  tableSize?: TableSize;
  onTableSizeChange?: (size: TableSize) => void;
} & ReturnType<typeof useTableSetting>;
const ToolBar: FC<ToolBarProps> = ({
  onRefresh,
  title,
  tableSize = 'default',
  onTableSizeChange,
  selectCols,
  options,
  setSelectCols,
}): ReactElement => {
  return (
    <div className={`${styles['toolbar']}`}>
      <div>{title}</div>
      <div>
        <Space>
          <IconButton onClick={() => onRefresh?.()}>
            <IconRefresh />
          </IconButton>

          <Dropdown
            droplist={
              <Menu
                selectedKeys={[tableSize]}
                onClickMenuItem={(e) => {
                  onTableSizeChange?.(e as TableSize);
                }}
              >
                <Menu.Item key="default">默认</Menu.Item>
                <Menu.Item key="mini">mini</Menu.Item>
                <Menu.Item key="small">紧凑</Menu.Item>
                <Menu.Item key="middle">中等</Menu.Item>
              </Menu>
            }
            position="bl"
            trigger={'click'}
          >
            <IconButton>
              <IconOriginalSize />
            </IconButton>
          </Dropdown>
          <Dropdown
            droplist={
              <Menu
                style={{
                  width: 200,
                  padding: 10,
                }}
              >
                <div>
                  <Checkbox
                    checked={selectCols.length === options.length}
                    indeterminate={
                      selectCols.length > 0 && selectCols.length < options.length
                    }
                    onChange={(e) => {
                      if (e) {
                        setSelectCols(options.map((item) => item.value));
                      } else {
                        setSelectCols([]);
                      }

                      console.log('👴2023-03-24 18:45:49 ToolBar.tsx line:71', e);
                    }}
                  >
                    全选
                  </Checkbox>
                </div>
                <div
                  style={{
                    paddingLeft: 16,
                  }}
                >
                  <Checkbox.Group
                    options={options as any[]}
                    direction="vertical"
                    value={selectCols}
                    onChange={(e) => {
                      setSelectCols(e);
                    }}
                  />
                </div>
              </Menu>
            }
            position="bl"
            trigger={'click'}
          >
            <IconButton>
              <IconSettings />
            </IconButton>
          </Dropdown>
        </Space>
      </div>
    </div>
  );
};

export default ToolBar;
