import request from "@/utils/request";

// 注册用户
export const registerApi = (data: any) =>
  request({
    url: "/user/create",
    method: "post",
    data,
  });
// login

interface Login {
  user: UserInfo;
  token: string;
}
export const loginApi = (data: any) =>
  request<Login>({
    url: "/user/login",
    method: "post",
    data,
  });

export const userListAPI = (query: any) =>
  request<Pagination<UserInfo>>({
    url: "/user/list",
    method: "get",
    params: query,
  });
