import { CaseStudyDetailPage } from '../../../features/case-studies';

interface CaseStudyDetailPageProps {
  params: {
    documentId: string;
  };
}

export default function CaseStudyDetail({ params }: CaseStudyDetailPageProps) {
  return <CaseStudyDetailPage documentId={params.documentId} />;
}
