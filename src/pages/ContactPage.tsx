import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Car,
  Train,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Send,
} from 'lucide-react';
import { CompanyInfo } from '../types';
import { Breadcrumb } from '../components/common/Breadcrumb';

interface ContactPageProps {
  companyInfo: CompanyInfo;
  onNavigate: (path: string) => void;
  onOpenConsult: (category?: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  companyInfo,
  onNavigate,
  onOpenConsult,
}) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Breadcrumb
        items={[
          { name: '홈', path: '/' },
          { name: '오시는 길 및 연락처' },
        ]}
        onNavigate={onNavigate}
      />

      {/* Header Banner */}
      <header className="bg-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-950 text-blue-300 text-xs font-bold border border-blue-800">
            LOCATION &amp; CONTACT · 목동 오시는 길
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            오시는 길 및 연락처
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-3xl mx-auto leading-relaxed font-normal">
            지하철 5호선 오목교역 인근에 위치한 목동지점 오시는 길과 직통 연락처 안내입니다. HK금융파트너스 경인사업본부 목동지점은 서울 목동을 기반으로 하는 보험 상담 지점으로서, 쾌적한 전용 상담실과 주차 시설을 완비하고 있습니다. 보험 상담이 필요한 고객과 보험설계사를 시작하려는 분을 따뜻하게 맞이합니다.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-2 text-xs text-blue-300">
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHO: HK금융파트너스 목동지점
            </span>
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHERE: 서울 양천구 목동 (오목교역)
            </span>
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHAT: 방문 상담 및 내방 안내
            </span>
            <span className="bg-blue-950/70 px-2.5 py-1 rounded-md border border-blue-800/60 font-medium">
              WHO FOR: 내방 고객 & 방문 예비 설계사
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Core Info & Map Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Contact Details Card */}
          <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs space-y-6">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                BRANCH INFO
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-1">
                {companyInfo.fullName}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                지점장 {companyInfo.leaderName}
              </p>
            </div>

            <div className="space-y-3.5 text-xs text-slate-700">
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">주소</span>
                  <span className="text-slate-600 leading-relaxed">
                    {companyInfo.address} {companyInfo.detailAddress}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                <Phone className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">전화번호</span>
                  <span className="text-slate-600">
                    지점장 직통: <strong>{companyInfo.mobile}</strong>
                  </span>
                  <br />
                  <span className="text-slate-500">
                    대표전화: {companyInfo.tel} | 팩스: {companyInfo.fax}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                <Mail className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">이메일</span>
                  <span className="text-slate-600">{companyInfo.email}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">업무 및 상담 시간</span>
                  <span className="text-slate-600">{companyInfo.consultHours}</span>
                  <p className="text-[11px] text-blue-700 font-medium mt-0.5">
                    * 평일 야간 및 주말 방문 상담은 사전 예약 시 가능합니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('/consulting/consultation')}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Calendar className="w-4 h-4" />
                <span>방문 및 온라인 상담 예약 신청</span>
              </button>
            </div>
          </div>

          {/* Transport & Access Guide */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Train className="w-5 h-5 text-indigo-600" />
                <span>대중교통 이용 안내</span>
              </h3>
              <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
                <div className="p-3.5 bg-indigo-50/50 rounded-xl border border-indigo-100">
                  <strong className="text-indigo-950 font-bold block mb-1">
                    지하철 5호선 오목교역 (목동운동장앞)
                  </strong>
                  오목교역 2번 또는 3번 출구에서 도보 약 3~5분 거리 (목동 현대백화점 및 방송회관 인근)
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <strong className="text-slate-900 font-bold block mb-1">
                    간선·지선 버스 노선
                  </strong>
                  목동대학타워, 오목교역 정류장 하차 (603, 640, 650, 5012, 6211, 6628, 6638 등)
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Car className="w-5 h-5 text-emerald-600" />
                <span>자가용 및 주차 안내</span>
              </h3>
              <div className="text-xs text-slate-600 leading-relaxed space-y-2">
                <p>
                  네비게이션에 <strong>"목동 현대백화점"</strong> 또는 <strong>"오목교역"</strong>을 검색하시면 편리합니다.
                </p>
                <p className="text-slate-500">
                  건물 내 지하 주차장 이용이 가능하며, 사전 상담 예약 고객께는 무료 주차권을 지원해 드립니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
