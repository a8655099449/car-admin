import { getContext } from '@/context/BaseContext';

const useLocale = (locale: Locale) => {
  const { setting } = getContext();

  const { lang = 'zh-CN' } = setting || {};

  return locale[lang] as unknown as string;
};

export default useLocale;
