export const isSSR = !(typeof window !== 'undefined' && document !== undefined);

export const isDev = process.env.NODE_ENV === `development`;

export const isChinese = (str: string) => /[\u4e00-\u9fa5]/.test(str);
