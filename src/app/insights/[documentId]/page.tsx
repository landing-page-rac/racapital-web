import { InsightDetailPage } from '../../../features/insights';

interface InsightDetailPageProps {
  params: Promise<{
    documentId: string;
  }>;
}

export default async function InsightDetail({ params }: InsightDetailPageProps) {
  const { documentId } = await params;
  return <InsightDetailPage documentId={documentId} />;
}
