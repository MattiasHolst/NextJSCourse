import { EventType } from "@/dummy-data";
import Link from "next/link";

export default function EventItem({ event }: { event: EventType }) {
  const humanReadableDate = new Date(event.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedAdress = event.location.replace(", ", "\n");

  const exploreLink = `/events/${event.id}`;

  return (
    <li>
      <img src={"/" + event.image} alt={event.title} />
      <div>
        <div>
          <h2>{event.title}</h2>
          <div>
            <time>{humanReadableDate}</time>
          </div>
          <div>
            <address>{formattedAdress}</address>
          </div>
        </div>
        <div>
          <Link href={exploreLink}>Explore Event</Link>
        </div>
      </div>
    </li>
  );
}
