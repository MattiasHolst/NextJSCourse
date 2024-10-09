import EventList from "@/components/events/event-list";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";
import {
  DateFilterType,
  EventType,
  getFilteredEvents,
} from "@/helpers/api-utils";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

type FilteredEventType = {
  hasError?: boolean;
  events?: EventType[];
  date?: DateFilterType;
};

export default function FilteredEventsPage(props: FilteredEventType) {
  const router = useRouter();
  /* const filterData = router.query.slug;
  if (!filterData) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth; */

  if (props.hasError) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </>
    );
  }

  const events = props.events;

  if (!events || events.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  if (!props.date) {
    return (
      <ErrorAlert>
        <p>No date found!</p>
      </ErrorAlert>
    );
  }

  const date = new Date(props.date?.year, props.date?.month - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList events={events} />
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params } = context;

  const filterData = params?.slug;

  if (!filterData) {
    return;
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return { props: { hasError: true } };
  }

  const events = await getFilteredEvents({ year: numYear, month: numMonth });

  return {
    props: { events, date: { year: numYear, month: numMonth } },
  };
}
