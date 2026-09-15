import React, { useState } from 'react';
import { Phone, Mail, MapPin, Copy, Check, Download, Printer, Share2, Building2, Smartphone, FileText } from 'lucide-react';
import { CompanyInfo } from '../../types';
import { HKLogo } from './HKLogo';
import { SITE_URL } from '../../config/site';

interface DigitalBusinessCardProps {
  companyInfo: CompanyInfo;
  className?: string;
  showActions?: boolean;
}

export const DigitalBusinessCard: React.FC<DigitalBusinessCardProps> = ({
  companyInfo,
  className = '',
  showActions = true,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `[HK금융파트너스 ${companyInfo.division} ${companyInfo.branch}]
지점장/팀장 ${companyInfo.leaderName}
• 직통 휴대전화: ${companyInfo.mobile || companyInfo.phone}
• 대표번호: ${companyInfo.tel || '1566-8163'}
• 팩스: ${companyInfo.fax || '0504-441-8554'}
• 이메일: ${companyInfo.email}
• 주소: (${companyInfo.zipCode || '06123'}) ${companyInfo.address} ${companyInfo.detailAddress}`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownloadVCard = () => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
N:윤;상진;;;
FN:윤상진
ORG:HK금융파트너스;경인사업본부 목동지점
TITLE:지점장 / 팀장
TEL;TYPE=CELL:${companyInfo.mobile || '010-2627-8554'}
TEL;TYPE=WORK:${companyInfo.tel || '1566-8163'}
TEL;TYPE=FAX:${companyInfo.fax || '0504-441-8554'}
EMAIL;TYPE=INTERNET,WORK:${companyInfo.email || 'genie.yoon@gmail.com'}
ADR;TYPE=WORK:;;${companyInfo.address} ${companyInfo.detailAddress};서울;;${companyInfo.zipCode || '07997'};대한민국
NOTE:HK금융파트너스 고객 맞춤 보장분석 및 보험설계사 멘토링
URL:${SITE_URL}
END:VCARD`;

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `HK금융파트너스_${companyInfo.leaderName}_지점장_명함.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`w-full max-w-xl mx-auto ${className}`}>
      {/* Physical-style Business Card UI */}
      <div className="relative bg-white rounded-2xl shadow-xl border border-slate-200/90 overflow-hidden text-slate-800 p-6 sm:p-8 transition hover:shadow-2xl">
        {/* Subtle security/pattern background accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-blue-50/60 to-transparent pointer-events-none" />

        {/* Card Header: Brand Logo & Leader Affiliation */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4">
          {/* Logo Brand Mark */}
          <div className="space-y-0.5">
            <HKLogo size="lg" />
          </div>

          {/* Affiliation & Name */}
          <div className="text-left sm:text-right space-y-1">
            <p className="text-xs font-semibold text-slate-600 tracking-tight">
              {companyInfo.division || '경인사업본부'} {companyInfo.branch || '목동지점'} / <span className="text-blue-700 font-bold">지점장 · 팀장</span>
            </p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-[0.2em] uppercase font-sans">
              {companyInfo.leaderName.split('').join(' ')}
            </h3>
            <p className="text-sm font-bold text-blue-700 sm:text-right pt-0.5">
              <a href={`tel:${companyInfo.mobile || companyInfo.phone}`} className="hover:underline inline-flex items-center gap-1">
                <span>M. {companyInfo.mobile || companyInfo.phone}</span>
              </a>
            </p>
          </div>
        </div>

        {/* Card Divider Bar */}
        <div className="relative my-4">
          <div className="h-0.5 bg-slate-900 w-full" />
          <span className="absolute -top-2.5 left-0 px-2 bg-white text-[11px] font-bold text-slate-900 uppercase tracking-wider">
            HK금융파트너스
          </span>
        </div>

        {/* Card Footer: Address, Phone, Fax, Email */}
        <div className="space-y-2 pt-1 text-xs text-slate-700">
          <div className="flex items-start gap-2">
            <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
            <span className="leading-snug">
              <strong className="text-slate-900 font-mono">[{companyInfo.zipCode || '06123'}]</strong> {companyInfo.address} {companyInfo.detailAddress}
              <span className="text-[11px] text-slate-500 block">(지하철 2호선·신분당선 강남역 및 신논현역 인근)</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 font-mono text-[11px] sm:text-xs">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-900">T.</span>
              <a href={`tel:${companyInfo.tel || '1566-8163'}`} className="hover:text-blue-700 hover:underline">
                {companyInfo.tel || '1566-8163'}
              </a>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-900">F.</span>
              <span>{companyInfo.fax || '0504-441-8554'}</span>
            </div>
            <div className="flex items-center gap-1.5 sm:justify-end">
              <span className="font-bold text-slate-900">E.</span>
              <a href={`mailto:${companyInfo.email}`} className="hover:text-blue-700 hover:underline truncate">
                {companyInfo.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons Bar */}
      {showActions && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {/* Call Directly */}
          <a
            href={`tel:${companyInfo.mobile || companyInfo.phone}`}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>직통 전화 걸기</span>
          </a>

          {/* SMS Message */}
          <a
            href={`sms:${companyInfo.mobile || companyInfo.phone}`}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs transition"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>문자 상담 문의</span>
          </a>

          {/* Copy Card Info */}
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl border border-slate-200 transition cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">복사 완료!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-600" />
                <span>명함 정보 복사</span>
              </>
            )}
          </button>

          {/* Download vCard */}
          <button
            type="button"
            onClick={handleDownloadVCard}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl border border-slate-200 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            <span>연락처 저장 (vCF)</span>
          </button>
        </div>
      )}
    </div>
  );
};
