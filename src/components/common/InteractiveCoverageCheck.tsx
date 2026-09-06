import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, HelpCircle, ArrowRight, RotateCcw, Activity } from 'lucide-react';

interface InteractiveCoverageCheckProps {
  onOpenConsult: (category: string) => void;
}

export const InteractiveCoverageCheck: React.FC<InteractiveCoverageCheckProps> = ({ onOpenConsult }) => {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      id: 'q1',
      title: '실손의료보험 가입 여부 및 시기',
      options: [
        { label: '가입되어 있음 (4세대 또는 최근 가입)', score: 20 },
        { label: '가입되어 있으나 갱신 보험료가 부담됨 (구 실손)', score: 10 },
        { label: '실손보험이 없거나 가입 여부를 잘 모름', score: 0 },
      ],
    },
    {
      id: 'q2',
      title: '3대 질병 (암·뇌·심장) 진단비 준비',
      options: [
        { label: '암·뇌혈관·허혈성심장질환 모두 폭넓게 준비됨', score: 25 },
        { label: '암 진단비만 있거나 뇌출혈/급성심근경색만 보장', score: 10 },
        { label: '중대 질병 진단비가 부족하거나 확인해보지 않음', score: 0 },
      ],
    },
    {
      id: 'q3',
      title: '수술비 및 입원일당 보장',
      options: [
        { label: '질병/상해 종수술비 및 주요 수술비가 잘 구성됨', score: 20 },
        { label: '실손 외에 별도 수술비 특약이 부족함', score: 5 },
        { label: '전혀 준비되어 있지 않음', score: 0 },
      ],
    },
    {
      id: 'q4',
      title: '월 납입 보험료와 가계 재정 밸런스',
      options: [
        { label: '월 소득의 5~10% 수준으로 무리 없이 유지 중', score: 20 },
        { label: '보험료가 다소 부담되어 조정을 원함', score: 10 },
        { label: '납입 기간이나 갱신 구조를 잘 모름', score: 5 },
      ],
    },
    {
      id: 'q5',
      title: '은퇴 및 노후 생활비 파이프라인',
      options: [
        { label: '국민연금 외에 개인연금/저축보험 준비 중', score: 15 },
        { label: '준비 필요성을 느끼나 아직 시작하지 못함', score: 5 },
        { label: '전혀 준비 계획이 없음', score: 0 },
      ],
    },
  ];

  const handleSelect = (qId: string, optionLabel: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: optionLabel }));
  };

  const calculateScore = () => {
    let total = 0;
    questions.forEach((q) => {
      const selected = q.options.find((opt) => opt.label === answers[q.id]);
      if (selected) total += selected.score;
    });
    return total;
  };

  const allAnswered = Object.keys(answers).length === questions.length;
  const score = calculateScore();

  const getResultLevel = () => {
    if (score >= 80) {
      return {
        title: '보장 상태 양호',
        badge: '안정형',
        color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        desc: '전반적인 기초 의료비 및 3대 질병 보장이 균형 있게 잡혀 있습니다. 최신 의학 기술 특약 보강 여부와 노후 연금 플랜만 가볍게 점검해 보시는 것을 권장합니다.',
      };
    } else if (score >= 50) {
      return {
        title: '부분 보완 및 최적화 권장',
        badge: '주의형',
        color: 'text-amber-700 bg-amber-50 border-amber-200',
        desc: '기본적인 보험은 있으나 뇌혈관·허혈성심장 등 보장 범위 누락이 있거나 갱신형 보험료 부담이 발생할 수 있습니다. 불필요한 중복을 덜어내는 보장분석이 도움이 됩니다.',
      };
    } else {
      return {
        title: '정밀 보장분석 시급',
        badge: '위험형',
        color: 'text-rose-700 bg-rose-50 border-rose-200',
        desc: '예기치 못한 중대 질환이나 병원비 발생 시 실질적인 경제적 방어막이 취약할 수 있습니다. 목동지점 윤상진 지점장과 함께 기존 증권을 토대로 1:1 맞춤 무료 진단을 받아보세요.',
      };
    }
  };

  const result = getResultLevel();

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl shadow-sm overflow-hidden p-6 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full mb-2">
            <Activity className="w-3.5 h-3.5" /> 30초 내 보험 건강 자가진단
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-slate-900">
            내 보험, 제대로 준비되어 있을까요?
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            간단한 5가지 질문으로 현재 나의 보장 밸런스를 즉시 점검해 보세요.
          </p>
        </div>
        {showResult && (
          <button
            onClick={() => {
              setAnswers({});
              setShowResult(false);
            }}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" /> 다시 진단하기
          </button>
        )}
      </div>

      {!showResult ? (
        <div className="space-y-6 pt-6">
          {questions.map((q, idx) => (
            <div key={q.id} className="space-y-2.5">
              <p className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 text-xs flex items-center justify-center font-bold">
                  {idx + 1}
                </span>
                {q.title}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {q.options.map((opt) => {
                  const isSelected = answers[q.id] === opt.label;
                  return (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => handleSelect(q.id, opt.label)}
                      className={`p-3 text-left text-xs md:text-sm rounded-xl border transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/60 text-blue-900 font-semibold shadow-xs ring-1 ring-blue-500'
                          : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 text-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span>{opt.label}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-500">
              * 답변 완료: {Object.keys(answers).length} / {questions.length}개
            </span>
            <button
              disabled={!allAnswered}
              onClick={() => setShowResult(true)}
              className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm transition flex items-center justify-center gap-2 ${
                allAnswered
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>진단 결과 확인하기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="pt-6 space-y-6">
          <div className={`p-6 rounded-2xl border ${result.color}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-current/15">
              <div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/80 border border-current/20">
                  진단 결과: {result.badge}
                </span>
                <h4 className="text-xl font-bold mt-1">{result.title} (점수: {score}점/100점)</h4>
              </div>
            </div>
            <p className="text-sm mt-3 leading-relaxed opacity-95">
              {result.desc}
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 leading-relaxed space-y-1">
            <p className="font-semibold text-slate-800">📌 목동지점 지점장 윤상진의 조언</p>
            <p>• 자가진단 결과는 일반적인 참고용이며, 실제 약관 및 증권 내역에 따라 보장 세부 내용은 다를 수 있습니다.</p>
            <p>• 무조건적인 해지나 신규 가입보다는, 유지할 계약과 보완할 담보를 명확히 구분하는 것이 중요합니다.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
            <button
              onClick={() => {
                setAnswers({});
                setShowResult(false);
              }}
              className="w-full sm:w-auto px-5 py-3 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-xl text-sm font-medium transition"
            >
              다시 체크하기
            </button>
            <button
              onClick={() => onOpenConsult('보험 전체 점검 (자가진단 후 정밀상담)')}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md transition flex items-center justify-center gap-2"
            >
              <span>지점장 윤상진 1:1 무료 보장분석 신청</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
