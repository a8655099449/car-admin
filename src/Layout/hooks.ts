import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useListenRoute = () => {
  const { pathname } = useLocation();

  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const selectKeys = useMemo(() => {
    const _key = pathname;
    return [_key];
  }, [pathname]);

  useEffect(() => {
    const _key = pathname;
    const _openKeys = _key
      .split('/')
      .filter((item) => item)
      .map((item) => `/${item}`);
    console.log('👴2023-03-25 17:44:33 hooks.ts line:17', _openKeys);

    setOpenKeys(_openKeys);
  }, []);
  return { selectKeys, openKeys, setOpenKeys };
};
