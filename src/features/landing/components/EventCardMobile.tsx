import Image from 'next/image';
import { Event } from '../types';

interface EventCardMobileProps {
  event: Event;
}

const EventCardMobile: React.FC<EventCardMobileProps> = ({ event }) => {
  return (
    <div className="bg-transparent rounded-lg flex flex-col w-full max-w-sm mx-auto">
      <div className="w-full relative h-48">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover rounded-t-lg"
        />
      </div>
      <div className='bg-white text-[#051F42] px-6 py-6 rounded-b-lg'>
        <p className='mb-3 text-sm font-semibold text-blue-600'>EVENT</p>
        <p className='text-lg font-bold mb-3 leading-tight'>{event.title}</p>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">{event.date}</p>
          <p className="text-sm font-medium text-blue-600">{event.location}</p>
        </div>
      </div>
    </div>
  );
};

export default EventCardMobile; 