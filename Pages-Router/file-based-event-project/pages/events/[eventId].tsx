import EventContent from "@/components/event-detail/event-content";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventSummary from "@/components/event-detail/event-summary";
import Comments from "@/components/input/comments";
import {
  EventType,
  getEventById,
  getFeaturedEvents,
} from "@/helpers/api-utils";
import { GetStaticPropsContext } from "next";
import Head from "next/head";

type EventDetailType = {
  event: EventType;
};

export default function EventDetailPage(props: EventDetailType) {
  const event = props.event;
  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
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
      <Comments eventId={event.id} />
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
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({
    params: { eventId: event.id },
  }));

  return {
    paths,
    fallback: true,
  };
}
