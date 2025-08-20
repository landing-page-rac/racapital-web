import { EventDetailPage } from '../../../features/events';

interface EventDetailPageProps {
  params: {
    documentId: string;
  };
}

export default function EventDetail({ params }: EventDetailPageProps) {
  return <EventDetailPage documentId={params.documentId} />;
}
