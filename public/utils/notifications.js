import { notification } from 'antd'
export const logoutNotifications = () => {
  return notification.success({
    message: 'Logout Successful',
    description: 'You have successfully logged out.',
  })
}
export const logInNotifications = () => {
  return notification.success({
    message: 'Login Successful',
    description: 'You have successfully logged in.',
  })
}
export const customNotification = (message, description) => {
  return notification.success({
    message: message,
    description: description,
    placement: 'topRight',
  })
}
export const ErrorNotification = (message, description) => {
  return notification.error({
    message: message,
    description: description,
    placement: 'topRight',
  })
}
