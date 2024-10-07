import { EventType } from "@/dummy-data";
import EventItem from "./event-item";

export default function EventList({ events }: { events: EventType[] }) {
  return (
    <ul>
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </ul>
  );
}
