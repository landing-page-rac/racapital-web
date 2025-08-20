import { EventDetailPage } from '../../../features/events';

interface EventDetailPageProps {
  params: Promise<{
    documentId: string;
  }>;
}

export default async function EventDetail({ params }: EventDetailPageProps) {
  const { documentId } = await params;
  return <EventDetailPage documentId={documentId} />;
}
