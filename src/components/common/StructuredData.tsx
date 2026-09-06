import React from 'react';
import { CompanyInfo, NavigationPage } from '../../types';
import { faqItems } from '../../data/faqs';
import { initialCompanyInfo } from '../../data/company';

interface StructuredDataProps {
  companyInfo?: CompanyInfo;
  currentPage: NavigationPage;
}

export const StructuredData: React.FC<StructuredDataProps> = ({ companyInfo, currentPage }) => {
  const company = companyInfo || initialCompanyInfo;
  const schemaOrganization = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    '@id': 'https://mokdong.hkfp.co.kr/#organization',
    name: company.fullName,
    alternateName: ['HK금융파트너스 목동지점', 'HK금융파트너스 경인사업본부 목동지점'],
    url: 'https://mokdong.hkfp.co.kr/',
    logo: 'https://mokdong.hkfp.co.kr/logo.png',
    description: company.mainSlogan + ' ' + company.coreMessage,
    slogan: company.mainSlogan,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${company.address} ${company.detailAddress}`,
      addressLocality: '강남구 역삼동',
      addressRegion: '서울특별시',
      postalCode: company.zipCode || '06123',
      addressCountry: 'KR',
    },
    telephone: company.mobile || company.phone,
    email: company.email,
    faxNumber: company.fax,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 37.5013,
      longitude: 127.0256,
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
      { '@type': 'AdministrativeArea', name: '서울특별시 양천구' },
      { '@type': 'AdministrativeArea', name: '서울특별시 강서구' },
      { '@type': 'AdministrativeArea', name: '서울특별시 영등포구' },
      { '@type': 'AdministrativeArea', name: '수도권' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: '보험 상담 및 보장분석 서비스',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '실손의료보험 맞춤 상담' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '3대 질병 암·뇌·심장 보장분석' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '연금 및 노후 준비 컨설팅' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '화재 및 재산종합보험 설계' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '보험설계사 신입/경력 리크루팅 및 교육' } },
      ],
    },
  };

  const schemaFAQ = {
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
  };

  const schemaBreadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '홈',
        item: 'https://mokdong.hkfp.co.kr/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: currentPage === 'home' ? '메인' : currentPage,
        item: `https://mokdong.hkfp.co.kr/${currentPage === 'home' ? '' : currentPage}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrganization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumbs) }}
      />
    </>
  );
};
