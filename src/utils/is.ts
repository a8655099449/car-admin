export const isSSR = !(typeof window !== 'undefined' && document !== undefined);

export const isDev = process.env.NODE_ENV === `development`;
