import { request } from "../utils/request";

export const getPushDevices = () => request({ url: "/push-notifications/devices", method: "GET" });
export const getNotificationCampaigns = () => request({ url: "/push-notifications/campaigns", method: "GET" });
export const sendPushNotification = (data) => request({ url: "/push-notifications/send", method: "POST", data });

// This public endpoint is called by the phone app after it receives an FCM token.
export const registerPushDevice = (data) => request({ url: "/push-notifications/devices", method: "POST", data });
