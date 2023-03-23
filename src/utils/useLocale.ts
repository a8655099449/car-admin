import { getContext } from '@/context/BaseContext';

const useLocale = (locale: Locale) => {
  const { setting } = getContext();

  const { lang = 'zh-CN' } = setting || {};

  return locale[lang];
};

export default useLocale;
