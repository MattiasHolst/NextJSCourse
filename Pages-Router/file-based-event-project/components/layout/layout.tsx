import { useContext } from "react";
import MainHeader from "./main.header";
import NotificationContext from "@/store/notification-context";
import Notification from "../ui/notification";

export default function Layout({ children }: { children: React.ReactNode }) {
  const context = useContext(NotificationContext);
  const activeNotification = context.notification;

  return (
    <>
      <MainHeader />
      <main>{children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </>
  );
}
