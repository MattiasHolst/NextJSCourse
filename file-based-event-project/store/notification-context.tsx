import { createContext, useState } from "react";

type NotificationDataType = {
  title: string;
  message: string;
  status: string;
};

type NotificationContextType = {
  notification: NotificationDataType | null | undefined;
  showNotification: (notificationData: NotificationDataType) => void;
  hideNotification: () => void;
};

const NotificationContext = createContext<NotificationContextType>({
  notification: null,
  showNotification: function (notificationData: NotificationDataType) {},
  hideNotification: function () {},
});

export function NotificationContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeNotification, setActiveNotification] = useState<
    NotificationDataType | null | undefined
  >();
  function showNotificationHandler(notificationData: NotificationDataType) {
    setActiveNotification(notificationData);
  }
  function hideNotificationHandler() {
    setActiveNotification(null);
  }

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };
  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
