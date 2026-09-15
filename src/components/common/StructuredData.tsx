import React from 'react';
import { CompanyInfo } from '../../types';
import { faqItems } from '../../data/faqs';
import { initialCompanyInfo } from '../../data/company';
import { blogPosts } from '../../data/blog';
import { SITE_ROUTES } from '../../router/routes';
import { SITE_URL, getCanonicalUrl } from '../../config/site';

interface StructuredDataProps {
  companyInfo?: CompanyInfo;
  currentPath: string;
}

export const StructuredData: React.FC<StructuredDataProps> = ({ companyInfo, currentPath }) => {
  const company = companyInfo || initialCompanyInfo;
  const currentRoute = SITE_ROUTES[currentPath];

  // Base Organization & FinancialService Schema
  const schemaOrganization = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    '@id': `${SITE_URL}/#organization`,
    name: company.fullName,
    alternateName: [
      'HK금융파트너스 목동지점',
      'HK금융파트너스 경인사업본부 목동지점',
      '목동 보험상담',
      '윤상진 지점장',
    ],
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/logo.png`,
    description: company.mainSlogan + ' ' + company.coreMessage,
    slogan: company.mainSlogan,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${company.address} ${company.detailAddress}`.trim(),
      addressLocality: '강남구 역삼동',
      addressRegion: '서울특별시',
      addressCountry: 'KR',
    },
    telephone: company.tel || '070-8252-9712',
    email: company.email,
    faxNumber: company.fax,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 37.5034,
      longitude: 127.0448,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    founder: {
      '@type': 'Person',
      name: company.leaderName,
      jobTitle: company.leaderTitle,
      description: company.leaderGreeting,
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: '서울특별시' },
      { '@type': 'AdministrativeArea', name: '수도권' },
      { '@type': 'AdministrativeArea', name: '전국' },
    ],
  };

  // BreadcrumbList Schema
  const breadcrumbItems = currentRoute?.breadcrumb || [{ name: '홈', path: '/' }];
  const schemaBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.path ? getCanonicalUrl(item.path) : undefined,
    })),
  };

  // Dynamic FAQPage Schema
  const schemaFAQ = currentPath === '/faq'
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.directAnswer + (item.detailedExplanation ? ' ' + item.detailedExplanation : ''),
          },
        })),
      }
    : null;

  // Dynamic Blog Article Schema
  let schemaArticle = null;
  if (currentPath.startsWith('/insurance-info/')) {
    const slug = currentPath.replace('/insurance-info/', '');
    const post = blogPosts.find((p) => p.id === slug);
    if (post) {
      schemaArticle = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.summary,
        author: {
          '@type': 'Person',
          name: post.author,
        },
        publisher: {
          '@type': 'Organization',
          name: company.fullName,
        },
        datePublished: post.publishDate.replace(/\./g, '-'),
        dateModified: post.updateDate ? post.updateDate.replace(/\./g, '-') : undefined,
        mainEntityOfPage: getCanonicalUrl(`/insurance-info/${post.id}`),
      };
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrganization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }}
      />
      {schemaFAQ && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }}
        />
      )}
      {schemaArticle && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaArticle) }}
        />
      )}
    </>
  );
};
