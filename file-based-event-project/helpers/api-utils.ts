export type EventType = {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
};

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

export type DateFilterType = {
  year: number;
  month: number;
};

export async function getFilteredEvents(dateFilter: DateFilterType) {
  const { year, month } = dateFilter;

  const events = await getAllEvents();

  let filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}
