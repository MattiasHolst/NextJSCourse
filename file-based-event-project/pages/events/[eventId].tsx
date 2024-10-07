import EventContent from "@/components/event-detail/event-content";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventSummary from "@/components/event-detail/event-summary";
import ErrorAlert from "@/components/ui/error-alert";
import { getEventById } from "@/dummy-data";
import { useRouter } from "next/router";

export default function EventDetailPage() {
  const router = useRouter();
  const eventId = router.query.eventId as string;
  const event = getEventById(eventId);
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
