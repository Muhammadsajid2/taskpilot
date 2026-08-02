import { request } from "../utils/request";

const paginationQuery = ({ page = 1, size = 10 } = {}) => `?page=${page}&size=${size}`;

export const getPushDevices = (pagination) => request({ url: `/push-notifications/devices${paginationQuery(pagination)}`, method: "GET" });
export const getNotificationCampaigns = (pagination) => request({ url: `/push-notifications/campaigns${paginationQuery(pagination)}`, method: "GET" });
export const sendPushNotification = (data) => request({ url: "/push-notifications/send", method: "POST", data });

// This public endpoint is called by the phone app after it receives an FCM token.
export const registerPushDevice = (data) => request({ url: "/push-notifications/devices", method: "POST", data });
