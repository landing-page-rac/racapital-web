import Image from 'next/image';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="bg-transparent rounded-lg flex items-center">
      <div className="w-1/3 relative">
        <Image
          src={event.image}
          alt={event.title}
          width={220}
          height={160}
          className="w-full h-full object-cover"
        />
      </div>
      <div className='bg-white text-[#051F42] px-8 py-10'>
        <p className='mb-4 text-lg'>EVENT</p>
        <p className='text-xl mb-4'>{event.title}</p>
        <p>{event.date}</p>
      </div>
    </div>
  );
};

export default EventCard; 