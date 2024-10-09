import EventList from "@/components/events/event-list";
import EventsSearch from "@/components/events/events-search";
import { EventType } from "@/dummy-data";
import { getAllEvents } from "@/helpers/api-utils";
import { useRouter } from "next/router";

type EventPageType = {
  events: EventType[];
};

export default function EventsPage(props: EventPageType) {
  const { events } = props;
  const router = useRouter();

  function findEventsHandler(year: string, month: string) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList events={events} />;
    </>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: { events },
    revalidate: 60,
  };
}
