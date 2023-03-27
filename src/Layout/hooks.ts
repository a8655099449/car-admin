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

    setOpenKeys(_openKeys);
  }, []);
  return { selectKeys, openKeys, setOpenKeys };
};
