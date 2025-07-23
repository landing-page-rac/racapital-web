import Image from 'next/image';
import { Event } from '../hooks/useEventsData';

interface EventCardEnhancedProps {
  event: Event;
  isReversed?: boolean;
}

const EventCardEnhanced: React.FC<EventCardEnhancedProps> = ({ event, isReversed = false }) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex ${isReversed ? 'flex-row-reverse' : 'flex-row'} max-w-4xl mx-auto`}>
      {/* Image Section */}
      <div className="relative w-1/2 h-80">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Content Section */}
      <div className="w-1/2 p-8 flex flex-col justify-center bg-white">
        <div className="space-y-4">
          {/* Event Label */}
          <div className="inline-block">
            <span className="bg-[#041E42] text-white px-3 py-1 rounded-full text-sm font-medium uppercase tracking-wider">
              {event.type}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-[#041E42] leading-tight">
            {event.title}
          </h3>

          {/* Date and Location */}
          <div className="space-y-2 text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="font-medium">{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="font-medium">{event.location}</span>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <button className="bg-[#0C52E6] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#041E42] transition-colors duration-200 flex items-center gap-2">
              Learn More
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCardEnhanced; 