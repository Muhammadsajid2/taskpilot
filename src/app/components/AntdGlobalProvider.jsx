"use client";

import { App } from "antd";
import { setNotificationApi } from "../../../public/utils/notifications";
import { useEffect } from "react";

export default function AntdGlobalProvider({ children }) {
  const { notification } = App.useApp();

  useEffect(() => {
    if (notification) {
      setNotificationApi(notification);
    }
  }, [notification]);

  return <>{children}</>;
}
