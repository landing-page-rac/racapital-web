import { InsightDetailPage } from '../../../features/insights';

interface InsightDetailPageProps {
  params: {
    documentId: string;
  };
}

export default function InsightDetail({ params }: InsightDetailPageProps) {
  return <InsightDetailPage documentId={params.documentId} />;
}
