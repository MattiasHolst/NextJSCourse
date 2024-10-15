import EventList from "@/components/events/event-list";
import NewsletterRegistration from "@/components/input/newsletter-registration";
import { EventType, getFeaturedEvents } from "@/helpers/api-utils";
import Head from "next/head";

type FeaturedEventType = {
  featuredEvents: EventType[];
};

export default function HomePage(props: FeaturedEventType) {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="Find a lot of great evets that allow you to evolve..."
        />
      </Head>
      <NewsletterRegistration />
      <EventList events={props.featuredEvents} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      featuredEvents: featuredEvents,
    },
    revalidate: 1800,
  };
}
