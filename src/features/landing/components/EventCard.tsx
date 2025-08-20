import Image from 'next/image';
import Link from 'next/link';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <Link href={`/events/${event.documentId}`} className="block">
      <div className="bg-transparent rounded-lg flex items-center hover:scale-105 transition-transform duration-300 cursor-pointer">
        <div className="w-96 relative h-[290px]">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover rounded-l-lg"
          />
        </div>
        <div className='bg-white text-[#051F42] px-8 py-10 h-[250px]'>
          <p className='mb-4 text-lg'>EVENT</p>
          <p className='text-xl mb-4'>{event.title}</p>
          <p>{event.date}</p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard; 