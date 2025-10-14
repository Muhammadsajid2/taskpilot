import { request } from "../utils/request";

export function loginFn(data) {
  return request({
    url: `/auth/login`,
    method: "POST",
    data: data,
  });
}
