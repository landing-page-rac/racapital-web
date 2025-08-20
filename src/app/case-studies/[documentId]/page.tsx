import { CaseStudyDetailPage } from '../../../features/case-studies';

interface CaseStudyDetailPageProps {
  params: Promise<{
    documentId: string;
  }>;
}

export default async function CaseStudyDetail({ params }: CaseStudyDetailPageProps) {
  const { documentId } = await params;
  return <CaseStudyDetailPage documentId={documentId} />;
}
