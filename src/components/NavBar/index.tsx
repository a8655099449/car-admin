import { Dropdown, Menu, Message, Modal, Select } from '@arco-design/web-react';
import {
  IconExport,
  IconGithub,
  IconLanguage,
  IconMoonFill,
  IconSettings,
  IconSunFill,
  IconUser,
} from '@arco-design/web-react/icon';
import React, { FC, ReactElement, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { getContext } from '@/context/BaseContext';

import logo from '../../logo.svg';
import IconButton from '../IconButton';
import styles from './index.module.less';
import SettingView from './SettingView';

const NavBar: FC = (): ReactElement => {
  const [settingViewShow, settingSetViewShow] = useState(false);

  const { setting, setSetting, userInfo, setUserInfo } = getContext();
  const { theme } = setting;
  const isDark = theme !== 'dark';
  const { replace } = useHistory();
  const { pathname } = useLocation();

  return (
    <div className={`${styles['navbar']}`}>
      <SettingView
        visible={settingViewShow}
        onCancel={() => settingSetViewShow(false)}
        onOk={() => settingSetViewShow(false)}
      />
      <div className={`${styles['logo']}`}>
        <img
          src={logo}
          alt=""
          style={{
            margin: 10,
          }}
        />
        百车盘点
      </div>
      <div className={`${styles['right-bar']}`}>
        <IconButton
          icon={<IconGithub />}
          className="mr-10"
          href="https://github.com/a8655099449/react-vite-admin"
          target="_block"
        />
        <IconButton
          icon={isDark ? <IconMoonFill /> : <IconSunFill />}
          onClick={(e) => {
            const theme = !isDark ? 'light' : 'dark';
            setSetting({
              ...setting,
              theme,
            });
          }}
          className="mr-10"
        />
        <Select
          triggerElement={
            <IconButton
              icon={<IconLanguage />}
              style={{
                marginRight: 10,
              }}
            />
          }
          options={[
            { label: '中文', value: 'zh-CN' },
            { label: 'English', value: 'en-US' },
          ]}
          trigger="hover"
          triggerProps={{
            autoAlignPopupWidth: false,
            autoAlignPopupMinWidth: true,
            position: 'br',
          }}
          value={setting.lang}
          onChange={(e) => {
            setSetting({ ...setting, lang: e });
          }}
        />

        <IconButton icon={<IconSettings />} onClick={() => settingSetViewShow(true)} />
        <Dropdown
          droplist={
            <Menu>
              <Menu.Item key="name">
                <IconUser />
                {userInfo.name}
              </Menu.Item>
              <Menu.Item
                key="logout"
                onClick={(e) => {
                  Modal.confirm({
                    title: '退出登录提示',
                    content: '是否确认退出？',
                    onOk() {
                      setUserInfo({});
                      replace(`/login?redirect=${pathname}`);
                      Message.success('退出登录成功！');
                    },
                  });
                }}
              >
                <IconExport />
                退出登录
              </Menu.Item>
            </Menu>
          }
          position="br"
          trigger={'click'}
        >
          <IconButton
            icon={<IconUser />}
            style={{
              marginLeft: 10,
            }}
          />
        </Dropdown>
      </div>
    </div>
  );
};

export default NavBar;
