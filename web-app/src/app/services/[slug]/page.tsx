import { notFound } from 'next/navigation';
import Link from 'next/link';
import { fallbackData } from '@/lib/strapi';

const servicesContent = {
  'legal-consultation': {
    title: 'Legal Consultation Services',
    component: () => import('../legal-consultation/page'),
  },
  'foreign-investment': {
    title: 'Foreign Investment Services',
    content: 'Professional foreign investment services and consultation.'
  },
  'contracts': {
    title: 'Contracts',
    content: 'Professional contract services and consultation.'
  },
  'notarization': {
    title: 'Notarization',
    content: 'Professional notarization services and consultation.'
  },
  'insurance': {
    title: 'Insurance',
    content: 'Professional insurance services and consultation.'
  },
  'banking': {
    title: 'Banks and Financial Institutions',
    content: 'Professional banking services and consultation.'
  },
  'corporate-governance': {
    title: 'Corporate Governance Services',
    content: 'Professional corporate governance services and consultation.'
  },
  'liquidation': {
    title: 'Companies Liquidation',
    content: 'Professional company liquidation services and consultation.'
  }
};

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return fallbackData.services.map((service) => ({
    slug: service.slug,
  }));
}

export default function ServicePage({ params }: Props) {
  const service = fallbackData.services.find(s => s.slug === params.slug);
  const content = servicesContent[params.slug as keyof typeof servicesContent];
  
  if (!service || !content) {
    notFound();
  }
  
  return (
    <div className="min-h-screen bg-white text-[#4B2615]">
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Link 
            href="/" 
            className="inline-flex items-center text-[#4B2615]/70 hover:text-[#4B2615] text-sm font-medium transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-20">
          <div className="max-w-4xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-8 text-[#4B2615]">{content.title}</h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-[#4B2615]/80 leading-relaxed">
                {typeof content === 'object' && 'content' in content ? content.content : `Professional ${service.title.toLowerCase()} services and consultation.`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
