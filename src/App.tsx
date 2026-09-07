import React, { useState } from 'react';
import { CompanyInfo } from './types';
import { initialCompanyInfo } from './data/company';
import { useRouter } from './router/useRouter';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileStickyBar } from './components/layout/MobileStickyBar';
import { StructuredData } from './components/common/StructuredData';
import { ConsultModal } from './components/forms/ConsultModal';
import { RecruitModal } from './components/forms/RecruitModal';
import { AdminConfigModal } from './components/common/AdminConfigModal';

// Pages
import { HomePage } from './pages/HomePage';
import { BranchAboutPage } from './pages/about/BranchAboutPage';
import { ManagerPage } from './pages/about/ManagerPage';
import { InsuranceHubPage } from './pages/insurance/InsuranceHubPage';
import { InsuranceDetailPage } from './pages/insurance/InsuranceDetailPage';
import { ConsultingHubPage } from './pages/consulting/ConsultingHubPage';
import { CoverageAnalysisPage } from './pages/consulting/CoverageAnalysisPage';
import { ConsultationFormPage } from './pages/consulting/ConsultationFormPage';
import { RecruitHubPage } from './pages/recruit/RecruitHubPage';
import { RecruitProcessPage } from './pages/recruit/RecruitProcessPage';
import { RecruitSupportPage } from './pages/recruit/RecruitSupportPage';
import { RecruitStoryPage } from './pages/recruit/RecruitStoryPage';
import { InsuranceInfoHubPage } from './pages/insurance-info/InsuranceInfoHubPage';
import { InsuranceInfoDetailPage } from './pages/insurance-info/InsuranceInfoDetailPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';

export default function App() {
  const { currentPath, navigate } = useRouter();
  const [consultModalOpen, setConsultModalOpen] = useState(false);
  const [consultCategory, setConsultCategory] = useState<string>('보험 전체 점검 (보장분석)');
  const [recruitModalOpen, setRecruitModalOpen] = useState(false);
  const [adminConfigOpen, setAdminConfigOpen] = useState(false);

  // Persistent Company & Branch Information
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(() => {
    try {
      const saved = localStorage.getItem('hk_branch_company_info');
      if (saved) {
        return { ...initialCompanyInfo, ...JSON.parse(saved) };
      }
    } catch {
      // ignore
    }
    return initialCompanyInfo;
  });

  const handleSaveCompanyInfo = (updated: CompanyInfo) => {
    setCompanyInfo(updated);
    try {
      localStorage.setItem('hk_branch_company_info', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleOpenConsult = (category?: string) => {
    if (category) {
      setConsultCategory(category);
    }
    setConsultModalOpen(true);
  };

  const handleOpenRecruit = () => {
    setRecruitModalOpen(true);
  };

  const renderCurrentPage = () => {
    if (currentPath === '/' || currentPath === '') {
      return (
        <HomePage
          companyInfo={companyInfo}
          onNavigate={navigate}
          onOpenConsult={handleOpenConsult}
          onOpenRecruit={handleOpenRecruit}
        />
      );
    }

    if (currentPath === '/about' || currentPath === '/about/company') {
      return (
        <BranchAboutPage
          companyInfo={companyInfo}
          onNavigate={navigate}
          onOpenConsult={handleOpenConsult}
          onOpenRecruit={handleOpenRecruit}
        />
      );
    }

    if (currentPath === '/about/manager') {
      return (
        <ManagerPage
          companyInfo={companyInfo}
          onNavigate={navigate}
          onOpenConsult={handleOpenConsult}
          onOpenRecruit={handleOpenRecruit}
        />
      );
    }

    if (currentPath === '/insurance') {
      return (
        <InsuranceHubPage
          onNavigate={navigate}
          onOpenConsult={handleOpenConsult}
        />
      );
    }

    if (currentPath.startsWith('/insurance/')) {
      const type = currentPath.replace('/insurance/', '');
      return (
        <InsuranceDetailPage
          type={type}
          onNavigate={navigate}
          onOpenConsult={handleOpenConsult}
        />
      );
    }

    if (currentPath === '/consulting') {
      return (
        <ConsultingHubPage
          onNavigate={navigate}
          onOpenConsult={handleOpenConsult}
        />
      );
    }

    if (currentPath === '/consulting/analysis') {
      return (
        <CoverageAnalysisPage
          onNavigate={navigate}
          onOpenConsult={handleOpenConsult}
        />
      );
    }

    if (currentPath === '/consulting/consultation') {
      return (
        <ConsultationFormPage
          companyInfo={companyInfo}
          onNavigate={navigate}
        />
      );
    }

    if (currentPath === '/recruit') {
      return (
        <RecruitHubPage
          companyInfo={companyInfo}
          onNavigate={navigate}
          onOpenRecruit={handleOpenRecruit}
        />
      );
    }

    if (currentPath === '/recruit/process') {
      return (
        <RecruitProcessPage
          onNavigate={navigate}
          onOpenRecruit={handleOpenRecruit}
        />
      );
    }

    if (currentPath === '/recruit/support') {
      return (
        <RecruitSupportPage
          onNavigate={navigate}
          onOpenRecruit={handleOpenRecruit}
        />
      );
    }

    if (currentPath === '/recruit/story') {
      return (
        <RecruitStoryPage
          onNavigate={navigate}
          onOpenRecruit={handleOpenRecruit}
        />
      );
    }

    if (currentPath === '/insurance-info') {
      return (
        <InsuranceInfoHubPage
          onNavigate={navigate}
          onOpenConsult={handleOpenConsult}
        />
      );
    }

    if (currentPath.startsWith('/insurance-info/')) {
      const slug = currentPath.replace('/insurance-info/', '');
      return (
        <InsuranceInfoDetailPage
          slug={slug}
          onNavigate={navigate}
          onOpenConsult={handleOpenConsult}
        />
      );
    }

    if (currentPath === '/contact') {
      return (
        <ContactPage
          companyInfo={companyInfo}
          onNavigate={navigate}
          onOpenConsult={handleOpenConsult}
        />
      );
    }

    if (currentPath === '/faq') {
      return (
        <FAQPage
          onNavigate={navigate}
          onOpenConsult={handleOpenConsult}
          onOpenRecruit={handleOpenRecruit}
        />
      );
    }

    if (currentPath === '/privacy') {
      return <PrivacyPolicyPage onNavigate={navigate} />;
    }

    if (currentPath === '/terms') {
      return <TermsPage onNavigate={navigate} />;
    }

    // Default Fallback
    return (
      <HomePage
        companyInfo={companyInfo}
        onNavigate={navigate}
        onOpenConsult={handleOpenConsult}
        onOpenRecruit={handleOpenRecruit}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Dynamic SEO Structured Data (JSON-LD) */}
      <StructuredData companyInfo={companyInfo} currentPath={currentPath} />

      {/* Main Global Header with Active Route Highlight & Breadcrumbs */}
      <Header
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenConsult={handleOpenConsult}
        onOpenRecruit={handleOpenRecruit}
        onOpenAdminConfig={() => setAdminConfigOpen(true)}
        companyInfo={companyInfo}
      />

      {/* Main Page Routing Views */}
      <main className="flex-1">{renderCurrentPage()}</main>

      {/* Global Multi-Page Footer with Secured Admin PIN Entry */}
      <Footer
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenConsult={handleOpenConsult}
        onOpenRecruit={handleOpenRecruit}
        onOpenAdminConfig={() => setAdminConfigOpen(true)}
        companyInfo={companyInfo}
      />

      {/* Mobile Sticky Action Bar */}
      <MobileStickyBar
        onOpenConsult={() => handleOpenConsult()}
        onOpenRecruit={handleOpenRecruit}
        companyInfo={companyInfo}
      />

      {/* Dual Funnel Conversion Modals */}
      <ConsultModal
        isOpen={consultModalOpen}
        onClose={() => setConsultModalOpen(false)}
        initialCategory={consultCategory}
        companyInfo={companyInfo}
      />

      <RecruitModal
        isOpen={recruitModalOpen}
        onClose={() => setRecruitModalOpen(false)}
        companyInfo={companyInfo}
      />

      {/* Admin Information & Config Modal */}
      <AdminConfigModal
        isOpen={adminConfigOpen}
        onClose={() => setAdminConfigOpen(false)}
        companyInfo={companyInfo}
        onSave={handleSaveCompanyInfo}
      />
    </div>
  );
}
