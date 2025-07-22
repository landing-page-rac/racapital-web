import Image from 'next/image';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="bg-transparent rounded-lg flex items-center">
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
  );
};

export default EventCard; 