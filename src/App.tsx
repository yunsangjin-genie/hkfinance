import React, { useState, useEffect } from 'react';
import { NavigationPage, CompanyInfo } from './types';
import { initialCompanyInfo } from './data/company';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileStickyBar } from './components/layout/MobileStickyBar';
import { StructuredData } from './components/common/StructuredData';
import { ConsultModal } from './components/forms/ConsultModal';
import { RecruitModal } from './components/forms/RecruitModal';
import { AdminConfigModal } from './components/common/AdminConfigModal';

// Pages
import { HomePage } from './pages/HomePage';
import { BranchPage } from './pages/BranchPage';
import { ProductsPage } from './pages/ProductsPage';
import { ConsultingPage } from './pages/ConsultingPage';
import { RecruitmentPage } from './pages/RecruitmentPage';
import { InfoPage } from './pages/InfoPage';
import { FAQPage } from './pages/FAQPage';
import { LegalPages } from './pages/LegalPages';

export default function App() {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('home');
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

  const handleNavigate = (page: NavigationPage) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync hash routing if user opens with #recruit or #consult
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'recruit' || hash === 'recruitment') {
      setCurrentPage('recruitment');
    } else if (hash === 'consult' || hash === 'consulting') {
      setCurrentPage('consulting');
    } else if (hash === 'branch') {
      setCurrentPage('branch');
    } else if (hash === 'products') {
      setCurrentPage('products');
    } else if (hash === 'info') {
      setCurrentPage('info');
    } else if (hash === 'faq') {
      setCurrentPage('faq');
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Dynamic SEO Structured Data (JSON-LD) */}
      <StructuredData companyInfo={companyInfo} currentPage={currentPage} />

      {/* Main Global Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenConsult={handleOpenConsult}
        onOpenRecruit={handleOpenRecruit}
        onOpenAdminConfig={() => setAdminConfigOpen(true)}
        companyInfo={companyInfo}
      />

      {/* Main Page Routing Views */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            companyInfo={companyInfo}
            onOpenConsult={handleOpenConsult}
            onOpenRecruit={handleOpenRecruit}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'branch' && (
          <BranchPage
            companyInfo={companyInfo}
            onOpenConsult={() => handleOpenConsult(`목동지점장 ${companyInfo.leaderName} 1:1 상담`)}
            onOpenRecruit={handleOpenRecruit}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'products' && (
          <ProductsPage onOpenConsult={handleOpenConsult} />
        )}

        {currentPage === 'consulting' && (
          <ConsultingPage
            companyInfo={companyInfo}
            onOpenConsultModal={handleOpenConsult}
          />
        )}

        {currentPage === 'recruitment' && (
          <RecruitmentPage
            companyInfo={companyInfo}
            onOpenRecruitModal={handleOpenRecruit}
          />
        )}

        {currentPage === 'info' && (
          <InfoPage onOpenConsult={handleOpenConsult} />
        )}

        {currentPage === 'faq' && (
          <FAQPage
            onOpenConsult={handleOpenConsult}
            onOpenRecruit={handleOpenRecruit}
          />
        )}

        {currentPage === 'privacy' && (
          <LegalPages type="privacy" companyInfo={companyInfo} />
        )}

        {currentPage === 'terms' && (
          <LegalPages type="terms" companyInfo={companyInfo} />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
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

      {/* Admin Information & Placeholder Config Modal */}
      <AdminConfigModal
        isOpen={adminConfigOpen}
        onClose={() => setAdminConfigOpen(false)}
        companyInfo={companyInfo}
        onSave={handleSaveCompanyInfo}
      />
    </div>
  );
}
