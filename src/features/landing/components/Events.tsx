import EventCard from './EventCard';
import Button from '../../../shared/components/ui/Button';
import Container from '../../../shared/components/ui/Container';
import { Event } from '../types';
import event1 from '../assets/event-1.png';
import event2 from '../assets/event-2.png';

// Dummy data for events
const dummyEvents: Event[] = [
  {
    id: '1',
    type: 'EVENT',
    title: 'Advancing Corporate Stewardship: Best Practices for ESG Integration',
    location: 'JAKARTA',
    date: '1 FEBRUARY 2022',
    image: event1,
  },
  {
    id: '2',
    type: 'EVENT',
    title: 'Strategic Agility in the Digital Era: Driving Growth through Innovation',
    location: 'JAKARTA',
    date: '1 FEBRUARY 2022',
    image: event2,
  },
  {
    id: '3',
    type: 'EVENT',
    title: 'Sustainable Finance Summit: Building Resilient Portfolios',
    location: 'SINGAPORE',
    date: '15 MARCH 2022',
    image: event1,
  },
  {
    id: '4',
    type: 'EVENT',
    title: 'Digital Transformation in Capital Markets',
    location: 'HONG KONG',
    date: '22 APRIL 2022',
    image: event2,
  },
];

interface EventsProps {
  events?: Event[];
  showMoreButton?: boolean;
}

const Events: React.FC<EventsProps> = ({
  events = dummyEvents,
  showMoreButton = true
}) => {
  // Show only first 2 events by default
  const displayedEvents = events.slice(0, 3);

  return (
    <section className="bg-[#041E42] py-16">
      <Container maxWidth="7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Latest Events
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Stay updated with our latest events, conferences, and industry insights
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {displayedEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {showMoreButton && (
          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-[#041E42]"
            >
              MORE EVENTS
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
};

export default Events;
