import { AppProps } from "next/app";
import "../styles/globals.css";
import Layout from "@/components/layout/layout";
import Head from "next/head";
import Notification from "@/components/ui/notification";
import { NotificationContextProvider } from "@/store/notification-context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <title>NextJS Events</title>
          <meta name="description" content="NextJS Events" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Component {...pageProps} />;
        <Notification message="This is a test" status="pending" title="Test" />
      </Layout>
    </NotificationContextProvider>
  );
}

export default MyApp;
