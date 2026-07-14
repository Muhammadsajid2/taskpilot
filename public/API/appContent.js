import { request } from "../utils/request";

export const getAppContent = () => request({ url: "/app-content", method: "GET" });
