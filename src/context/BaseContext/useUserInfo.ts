import { USER_INFO } from '@/config/localKeys';
import useStorage from '@/utils/useStorage';

export type UserHooks = {
  userInfo: UserInfo;
  setUserInfo(p: UserInfo): void;
};

export const userHooks = (): UserHooks => {
  const [userInfo, setUserInfo] = useStorage<UserInfo>(USER_INFO, {});

  return { userInfo, setUserInfo };
};
