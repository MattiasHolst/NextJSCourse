import EventContent from "@/components/event-detail/event-content";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventSummary from "@/components/event-detail/event-summary";
import ErrorAlert from "@/components/ui/error-alert";
import { EventType } from "@/dummy-data";
import { getAllEvents, getEventById } from "@/helpers/api-utils";
import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";

type EventDetailType = {
  event: EventType;
};

export default function EventDetailPage(props: EventDetailType) {
  const event = props.event;
  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }
  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        address={event.location}
        date={event.date}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const eventId = context.params?.eventId;

  if (!eventId) {
    return;
  }

  const event = await getEventById(eventId as string);

  return {
    props: { event },
  };
}

export async function getStaticPaths() {
  const events = await getAllEvents();

  const paths = events.map((event) => ({
    params: { eventId: event.id },
  }));

  return {
    paths,
    fallback: false,
  };
}
