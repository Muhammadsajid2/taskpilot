import { notification as staticNotification } from "antd";

let notificationApi = staticNotification;

/**
 * Sets the notification API instance to be used by the utility.
 * This allows using the context-aware API from Ant Design's App component.
 */
export const setNotificationApi = (api) => {
  notificationApi = api;
};

export const logoutNotifications = () => {
  return notificationApi.success({
    message: "Logout Successful",
    description: "You have successfully logged out.",
    placement: "topRight",
  });
};

export const logInNotifications = () => {
  return notificationApi.success({
    message: "Login Successful",
    description: "You have successfully logged in.",
    placement: "topRight",
  });
};

export const customNotification = (message, description) => {
  return notificationApi.success({
    message: message || "Success",
    description: description,
    placement: "topRight",
  });
};

export const ErrorNotification = (message, description) => {
  return notificationApi.error({
    message: message || "Error",
    description: description,
    placement: "topRight",
  });
};
