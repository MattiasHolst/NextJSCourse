import { createContext, useState, useEffect } from "react";

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

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === "success" ||
        activeNotification.status === "error")
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);
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
