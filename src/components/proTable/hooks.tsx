import {
  Button,
  Form,
  Image,
  Message,
  PaginationProps,
  Popconfirm,
  Space,
} from '@arco-design/web-react';
import { IconDelete, IconEdit } from '@arco-design/web-react/icon';
import { useRequest } from 'ahooks';
import dayjs from 'dayjs';
import { useMemo, useRef, useState } from 'react';

import { getContext } from '@/context/BaseContext';
import { default as ajax } from '@/utils/request';
import to from '@/utils/to';

import { DEFAULT_PAGE_SIZE, DEFAULT_REQUEST_DATE } from './defaultData';
import OptionsBar from './OptionsBar';
import {
  HandleOptions,
  ProTableColumnProps,
  ProTableProps,
  SearchRef,
  TableRequest,
} from './type';
// useTableSetting 内置的一些setting操作
export function useTableSetting<T>(props: ReturnType<typeof useFormDrawer>) {
  const { isAdmin } = getContext().userInfo;

  const cols = useMemo(() => {
    const {
      columns = [],
      showIndex,
      pagination,
      showHandle,
      size,
      handleEditRow,
      handleDeleteItem,
    } = props;

    let _columns = columns;
    if (showIndex) {
      const fix = _columns.findIndex((item) => item.dataIndex === 'TableIndex');

      if (fix >= 0) {
        _columns.splice(fix, 1);
      }

      _columns = [
        {
          dataIndex: 'TableIndex',
          title: '序号',
          render(_, item, index) {
            const { pageSize = 20, current = 1 } = pagination as PaginationProps;

            const rank = index + 1 + pageSize * (current - 1);

            const rankColorMap = {
              1: {
                bg: 'rgb(var(--primary-6))',
              },
              2: {
                bg: 'rgb(var(--primary-5))',
              },
              3: {
                bg: 'rgb(var(--primary-4))',
              },
              4: {
                bg: 'rgb(var(--primary-3))',
              },
              5: {
                bg: 'rgb(var(--primary-2))',
              },
            };

            return (
              <span
                style={{
                  backgroundColor: rankColorMap[rank]?.bg || 'rgb(var(--primary-2))',
                  color: '#fff',
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  fontSize: 12,
                }}
                className="flex-center"
              >
                {rank > 999 ? '999+' : rank}
              </span>
            );
          },
        },
        ..._columns,
      ];
    }

    if (showHandle && isAdmin) {
      const fix = _columns.findIndex((item) => item.dataIndex === 'TABLE_HANDLE');

      if (fix >= 0) {
        _columns.splice(fix, 1);
      }

      _columns = [
        ..._columns,
        {
          title: '操作',
          dataIndex: 'TABLE_HANDLE',
          render(_, target, i) {
            return (
              <Space>
                <Button
                  size={size === 'middle' ? 'large' : size}
                  type="primary"
                  shape="round"
                  icon={<IconEdit />}
                  onClick={() => {
                    handleEditRow(target);
                  }}
                />
                <Popconfirm
                  title="是否确认删除？"
                  onOk={() => handleDeleteItem?.(target)}
                >
                  <Button
                    shape="round"
                    type="secondary"
                    icon={<IconDelete />}
                    size={size === 'middle' ? 'large' : size}
                  />
                </Popconfirm>
              </Space>
            );
          },
        },
      ];
    }

    _columns = _columns.map((item) => {
      const { valueType } = item;
      if (['radioButton', 'select'].includes(valueType || '') && !item.render) {
        item.render = (val) => {
          return <OptionsBar options={item.options} value={val} />;
        };
      }
      return item;
    });

    return _columns;
  }, [props]);

  const _selectCols = useMemo(() => {
    return cols
      .filter((item) => !item.hideInTable)
      .map((col) => {
        return {
          label: col.title,
          value: col.dataIndex,
        };
      });
  }, [cols]);

  const [selectCols, setSelectCols] = useState(_selectCols.map((col) => col.value));

  const _columns = useMemo(() => {
    return cols.filter((col) => selectCols.includes(col.dataIndex));
  }, [selectCols, cols]);

  return { selectCols, setSelectCols, options: _selectCols, _columns };
}

// useTableColumns 主要作用是修改Table的columns的渲染方式
export function useTableColumns<T>(cols: ProTableColumnProps<T>[]) {
  const _columns = useMemo(() => {
    const _cols = cols
      ?.filter((item) => !item.hideInTable)
      ?.map((col) => {
        const { valueType, render } = col;

        if (!render && valueType === 'dateRange') {
          col.render = (value) => {
            return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
          };
        }
        if (!render && valueType === 'dateMonth') {
          col.render = (value) => {
            return dayjs(value).format('YYYY年MM月');
          };
        }

        return col;
      });

    return _cols;
  }, [cols]);

  return _columns;
}

export function useTableRequest<T>(
  params: ProTableProps<T> & {
    searchRef: SearchRef<T>;
  },
) {
  const { request, searchRef, method, baseRequestUrl, queryPageOptions = {} } = params;

  return useRequest(async () => {
    let _request: TableRequest<T> = undefined;

    if (typeof request === 'string' || (request === undefined && baseRequestUrl)) {
      _request = async (params, searchValues, sorter, filter) => {
        const options = {
          url: request || queryPageOptions.url || baseRequestUrl + '/queryPage',
          method: method || queryPageOptions.method,
          params: { ...params, ...searchValues, sorter, filter },
          data: { ...params, ...searchValues, sorter, filter },
        } as any;

        if (method === 'post') {
          delete options.params;
        }

        const res = await ajax<Pagination<T>>(options);

        return {
          data: res.data.items,
          success: true,
          total: res.data.total,
        };
      };
    } else if (typeof request === 'function') {
      _request = request;
    }
    if (!_request) {
      return DEFAULT_REQUEST_DATE;
    }

    const [err, res] = await to(
      _request?.(
        {
          page: searchRef.current.pagination.current || 1,
          pageSize: searchRef.current.pagination.pageSize || DEFAULT_PAGE_SIZE,
        },
        searchRef.current.searchValues,
        searchRef.current.sorter,
        searchRef.current.filter,
      ),
    );

    if (err) {
      return DEFAULT_REQUEST_DATE;
    }

    return res;
  });
}

export function useFormDrawer<T = any>(
  props: ProTableProps<T> & {
    run(): void;
  },
) {
  const { columns, deleteOptions, update, run, baseRequestUrl, addOptions } = props;

  const [mode, setMode] = useState<'add' | 'edit'>('add');

  const [fromDrawerInstance] = Form.useForm<T>();

  const [formDrawerShow, setFormDrawerShow] = useState(false);
  const ref = useRef({
    target: {} as any,
  });

  // 点击关闭
  const close = () => {
    setFormDrawerShow(false);
    ref.current.target = {};
    fromDrawerInstance.resetFields();
    setMode('add');
  };

  const openFormDrawerShow = () => {
    setFormDrawerShow(true);
  };

  const handleEditRow = (t: T) => {
    ref.current.target = t;
    setFormDrawerShow(true);
    fromDrawerInstance.setFieldsValue(t as any);
    setMode('edit');
  };
  // todo 删除某行
  const handleDeleteItem = async (t: T) => {
    const { deleteOptions = {} } = props;

    const { url = baseRequestUrl + '/delete', method = 'post' } = deleteOptions;

    const [err] = await to(ajax({ url, method, params: t, data: t }));
    if (!err) {
      Message.success('删除成功');
      run();
      close();
    }
  };

  // TODO 点击确定
  const handleConfirm = async () => {
    // const  value =
    const value = await fromDrawerInstance.validate();
    const item = { ...value } as any;

    if (ref.current.target?.id) {
      item.id = ref.current.target.id;
    }

    if (mode === 'edit') {
      const { url = baseRequestUrl + '/update', method = 'post' } = update || {};

      const [err] = await to(ajax({ url, method, data: item }));
      if (!err) {
        Message.success('更新成功');
        close();
        run();
      }
    }
    if (mode === 'add') {
      const { url = baseRequestUrl + '/add', method = 'post' } =
        addOptions || ({} as HandleOptions);
      const [err] = await to(ajax({ url, method, data: item }));
      if (!err) {
        Message.success('添加成功');
        close();
        run();
      }
    }
  };

  const formColumns = columns?.filter((item) => !item.hideInHandleForm);

  return {
    ...props,
    formDrawerShow,
    fromDrawerInstance,
    handleEditRow,
    mode,
    handleConfirm,
    close,
    formColumns,
    handleDeleteItem,
    openFormDrawerShow,
  };
}
