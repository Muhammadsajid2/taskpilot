import { request } from "../utils/request";

export const getCurrentUser = () => request({ url: "/users/me", method: "GET" });
export const updateCurrentUser = (data) => request({ url: "/users/me", method: "PATCH", data });
