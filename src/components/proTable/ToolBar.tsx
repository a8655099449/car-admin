import { Button, Checkbox, Dropdown, Menu, Space } from '@arco-design/web-react';
import {
  IconOriginalSize,
  IconPlus,
  IconRefresh,
  IconSettings,
} from '@arco-design/web-react/icon';
import { FC, ReactElement, ReactNode } from 'react';

import { getContext } from '@/context/BaseContext';

import IconButton from '../IconButton';
import { useTableSetting } from './hooks';
import styles from './index.module.less';
import { ProTableProps, TableSize } from './type';

type ToolBarProps<T = unknown> = ReturnType<typeof useTableSetting> &
  ProTableProps<T> & {
    onRefresh?: () => void;
    tableSize?: TableSize;
    onTableSizeChange?: (size: TableSize) => void;
    refreshLoading: boolean;
    openFormDrawerShow(): void;
  };
function ToolBar<T>({
  onRefresh,
  title,
  tableSize = 'default',
  onTableSizeChange,
  selectCols,
  options,
  setSelectCols,
  toolButtons,
  refreshLoading,
  openFormDrawerShow,
  hideToolButtons = [],
  showHandle,
}: ToolBarProps<T>): ReactElement {
  const { userInfo } = getContext();

  if (!userInfo.isAdmin) {
    showHandle = false;
  }

  return (
    <div className={`${styles['toolbar']}`}>
      <div className={`${styles['title']}`}>{title}</div>
      <div>
        <Space>
          {toolButtons}
          {showHandle && !hideToolButtons.includes('add') && (
            <IconButton icon={<IconPlus />} type="primary" onClick={openFormDrawerShow} />
          )}
          <IconButton onClick={() => onRefresh?.()}>
            <IconRefresh spin={refreshLoading} />
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
}

export default ToolBar;
