import request from "@/utils/request";

export const createList = (data: CarItem[]) =>
  request({
    url: "/car/createList",
    method: "post",
    data,
  });
