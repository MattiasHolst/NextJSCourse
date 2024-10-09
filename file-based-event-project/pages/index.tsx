import EventList from "@/components/events/event-list";
import { EventType } from "@/dummy-data";
import { getFeaturedEvents } from "@/helpers/api-utils";

type FeaturedEventType = {
  featuredEvents: EventType[];
};

export default function HomePage(props: FeaturedEventType) {
  return (
    <div>
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
    revalidate: 1800
  };
}
