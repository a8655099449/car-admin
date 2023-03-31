import request from '@/utils/request';

export const createList = (data: CarItem[]) =>
  request({
    url: '/car/createList',
    method: 'post',
    data,
  });

export const updateList = (data: CarItem[]) =>
  request({
    url: '/car/updateList',
    method: 'post',
    data,
  });
