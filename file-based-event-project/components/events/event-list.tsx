import { EventType } from "@/helpers/api-utils";
import EventItem from "./event-item";
import classes from "@/styles/event-list.module.css";

export default function EventList({ events }: { events: EventType[] }) {
  return (
    <ul className={classes.list}>
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </ul>
  );
}
