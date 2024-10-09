import { EventType } from "@/dummy-data";

export async function getAllEvents() {
  const response = await fetch(
    "https://nextjs-course-493d9-default-rtdb.europe-west1.firebasedatabase.app/events.json"
  );

  const data = await response.json();

  const events = [];

  for (const key in data) {
    events.push({ id: key, ...data[key] });
  }

  return events;
}

export async function getFeaturedEvents() {
  const events = (await getAllEvents()) as EventType[];
  return events.filter((event) => event.isFeatured);
}

export async function getEventById(id: string) {
  const events = (await getAllEvents()) as EventType[];
  return events.find((event) => event.id === id);
}
