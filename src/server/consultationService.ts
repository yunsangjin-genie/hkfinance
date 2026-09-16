import { Resend } from 'resend';
import { SITE_URL, getCanonicalUrl } from '../config/site';

// Simple in-memory rate limiter (IP -> timestamps)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

// Clean up old rate limit entries periodically
const cleanupInterval = setInterval(() => {
  const now = Date.now();
  for (const [ip, timestamps] of rateLimitMap.entries()) {
    const valid = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
    if (valid.length === 0) {
      rateLimitMap.delete(ip);
    } else {
      rateLimitMap.set(ip, valid);
    }
  }
}, 5 * 60 * 1000);

if (typeof cleanupInterval.unref === 'function') {
  cleanupInterval.unref();
}

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }
  recent.push(now);
  rateLimitMap.set(ip, recent);
  return true;
}

// Escape HTML utility to prevent HTML injection in emails
export function escapeHtml(str: unknown): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/\n/g, '<br/>');
}

// Mask phone number for safe logging (e.g., 010-****-8554)
export function maskPhone(phone: string): string {
  const clean = phone.replace(/[^0-9]/g, '');
  if (clean.length >= 8) {
    return clean.slice(0, 3) + '-****-' + clean.slice(-4);
  }
  return '***';
}

export type ConsultationCategory =
  | '보험 전체 점검'
  | '보장분석'
  | '실손보험'
  | '건강보험'
  | '암보험'
  | '종신보험'
  | '연금·노후'
  | '화재·재산보험'
  | '기타';

export interface ConsultationPayload {
  type?: 'insurance-consultation' | 'planner-recruitment' | string;
  name: string;
  phone: string;
  // Insurance specific:
  category?: string;
  consultationType?: string;
  // Recruitment specific:
  currentJob?: string;
  experience?: string;
  experienceType?: string;
  preferredField?: string;
  motivation?: string;
  // Shared fields:
  message?: string;
  preferredTime?: string;
  privacyAgreed?: boolean;
  privacyConsent?: boolean;
  sourceUrl?: string;
  hp_website?: string; // Honeypot field for spam prevention
}

export interface ConsultationResult {
  success: boolean;
  message: string;
  details?: string;
}

/**
 * Format current timestamp into Korean Standard Time (KST)
 */
function getKstTimestamp(): string {
  return new Intl.DateTimeFormat('ko-KR', {
    dateStyle: 'full',
    timeStyle: 'medium',
    timeZone: 'Asia/Seoul',
  }).format(new Date());
}

/**
 * Generate HTML email template for Insurance Consultation
 */
function buildInsuranceEmailHtml(params: {
  name: string;
  phone: string;
  category: string;
  preferredTime: string;
  message?: string;
  sourceUrl?: string;
  kstDate: string;
}): string {
  const { name, phone, category, preferredTime, message, sourceUrl, kstDate } = params;
  const pageUrl = sourceUrl || getCanonicalUrl('/consulting/consultation');

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Pretendard", Roboto, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f8fafc; padding: 24px; margin: 0; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
    .header { background: #0f172a; color: #ffffff; padding: 32px 24px; text-align: center; }
    .header h1 { margin: 0 0 8px 0; font-size: 22px; font-weight: 800; color: #ffffff; }
    .header p { margin: 0; font-size: 14px; color: #94a3b8; }
    .content { padding: 32px 24px; }
    .section-title { font-size: 15px; font-weight: 700; color: #0284c7; border-bottom: 2px solid #e0f2fe; padding-bottom: 6px; margin: 24px 0 16px 0; }
    .info-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    .info-table th { width: 32%; text-align: left; padding: 10px 12px; background: #f1f5f9; color: #475569; font-size: 13px; font-weight: 600; border-bottom: 1px solid #e2e8f0; }
    .info-table td { padding: 10px 12px; font-size: 14px; color: #0f172a; border-bottom: 1px solid #e2e8f0; }
    .message-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; font-size: 14px; color: #334155; white-space: pre-wrap; word-break: break-all; }
    .footer { background: #f8fafc; padding: 20px 24px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
    .badge { display: inline-block; background: #0284c7; color: #ffffff; padding: 3px 8px; border-radius: 6px; font-size: 12px; font-weight: 600; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>HK금융파트너스 목동지점</h1>
      <p>새로운 고객 보험 상담 신청이 접수되었습니다.</p>
    </div>
    <div class="content">
      <div class="section-title">신청자 정보</div>
      <table class="info-table">
        <tr>
          <th>신청자 이름</th>
          <td><strong>${escapeHtml(name)}</strong></td>
        </tr>
        <tr>
          <th>연락처</th>
          <td><a href="tel:${escapeHtml(phone)}" style="color: #0284c7; text-decoration: none; font-weight: bold;">${escapeHtml(phone)}</a></td>
        </tr>
        <tr>
          <th>상담 구분</th>
          <td><span class="badge">보험 상담</span></td>
        </tr>
        <tr>
          <th>상담 희망 분야</th>
          <td><strong>${escapeHtml(category)}</strong></td>
        </tr>
        <tr>
          <th>상담 희망 시간</th>
          <td>${escapeHtml(preferredTime || '상관없음 (빠른 상담 희망)')}</td>
        </tr>
        <tr>
          <th>개인정보 동의</th>
          <td><span style="color: #059669; font-weight: bold;">동의 완료</span></td>
        </tr>
        <tr>
          <th>접수 일시 (KST)</th>
          <td>${escapeHtml(kstDate)}</td>
        </tr>
      </table>

      <div class="section-title">문의 및 상담 요청 내용</div>
      <div class="message-box">
        ${message ? escapeHtml(message) : '<em style="color: #94a3b8;">작성된 세부 문의 내용이 없습니다.</em>'}
      </div>

      <div style="margin-top: 28px; text-align: center;">
        <a href="tel:${escapeHtml(phone)}" style="display: inline-block; background: #0284c7; color: #ffffff; padding: 12px 24px; border-radius: 8px; font-weight: 700; font-size: 14px; text-decoration: none;">고객 바로 전화 걸기</a>
      </div>
    </div>
    <div class="footer">
      접수 페이지: <a href="${escapeHtml(pageUrl)}" style="color: #0284c7;">${escapeHtml(pageUrl)}</a><br/>
      본 메일은 HK금융파트너스 경인사업본부 목동지점 공식 웹사이트 시스템에서 자동 발송되었습니다.
    </div>
  </div>
</body>
</html>`;
}

/**
 * Generate HTML email template for Planner Recruitment Consultation
 */
function buildRecruitmentEmailHtml(params: {
  name: string;
  phone: string;
  experience: string;
  currentJob?: string;
  preferredTime: string;
  message?: string;
  sourceUrl?: string;
  kstDate: string;
}): string {
  const { name, phone, experience, currentJob, preferredTime, message, sourceUrl, kstDate } = params;
  const pageUrl = sourceUrl || getCanonicalUrl('/recruit');

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Pretendard", Roboto, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f8fafc; padding: 24px; margin: 0; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
    .header { background: #1e1b4b; color: #ffffff; padding: 32px 24px; text-align: center; }
    .header h1 { margin: 0 0 8px 0; font-size: 22px; font-weight: 800; color: #ffffff; }
    .header p { margin: 0; font-size: 14px; color: #a5b4fc; }
    .content { padding: 32px 24px; }
    .section-title { font-size: 15px; font-weight: 700; color: #4f46e5; border-bottom: 2px solid #e0e7ff; padding-bottom: 6px; margin: 24px 0 16px 0; }
    .info-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    .info-table th { width: 32%; text-align: left; padding: 10px 12px; background: #f8fafc; color: #475569; font-size: 13px; font-weight: 600; border-bottom: 1px solid #e2e8f0; }
    .info-table td { padding: 10px 12px; font-size: 14px; color: #0f172a; border-bottom: 1px solid #e2e8f0; }
    .message-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; font-size: 14px; color: #334155; white-space: pre-wrap; word-break: break-all; }
    .footer { background: #f8fafc; padding: 20px 24px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
    .badge { display: inline-block; background: #4f46e5; color: #ffffff; padding: 3px 8px; border-radius: 6px; font-size: 12px; font-weight: 600; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>HK금융파트너스 목동지점</h1>
      <p>새로운 보험설계사 입문 및 이직 상담 신청이 접수되었습니다.</p>
    </div>
    <div class="content">
      <div class="section-title">지원자 정보</div>
      <table class="info-table">
        <tr>
          <th>신청자 이름</th>
          <td><strong>${escapeHtml(name)}</strong></td>
        </tr>
        <tr>
          <th>연락처</th>
          <td><a href="tel:${escapeHtml(phone)}" style="color: #4f46e5; text-decoration: none; font-weight: bold;">${escapeHtml(phone)}</a></td>
        </tr>
        <tr>
          <th>상담 구분</th>
          <td><span class="badge">설계사 상담</span></td>
        </tr>
        <tr>
          <th>경력 여부</th>
          <td><strong>${escapeHtml(experience)}</strong></td>
        </tr>
        <tr>
          <th>현재 직업 / 상황</th>
          <td>${escapeHtml(currentJob || '미기재')}</td>
        </tr>
        <tr>
          <th>상담 희망 시간</th>
          <td>${escapeHtml(preferredTime || '상관없음 (빠른 상담 희망)')}</td>
        </tr>
        <tr>
          <th>개인정보 수집 동의</th>
          <td><span style="color: #059669; font-weight: bold;">동의 완료</span></td>
        </tr>
        <tr>
          <th>접수 일시 (KST)</th>
          <td>${escapeHtml(kstDate)}</td>
        </tr>
      </table>

      <div class="section-title">문의 내용 및 지원 동기</div>
      <div class="message-box">
        ${message ? escapeHtml(message) : '<em style="color: #94a3b8;">작성된 세부 문의 내용이 없습니다.</em>'}
      </div>

      <div style="margin-top: 28px; text-align: center;">
        <a href="tel:${escapeHtml(phone)}" style="display: inline-block; background: #4f46e5; color: #ffffff; padding: 12px 24px; border-radius: 8px; font-weight: 700; font-size: 14px; text-decoration: none;">지원자 바로 전화 걸기</a>
      </div>
    </div>
    <div class="footer">
      접수 페이지: <a href="${escapeHtml(pageUrl)}" style="color: #4f46e5;">${escapeHtml(pageUrl)}</a><br/>
      본 메일은 HK금융파트너스 경인사업본부 목동지점 공식 웹사이트 시스템에서 자동 발송되었습니다.
    </div>
  </div>
</body>
</html>`;
}

/**
 * Universal Consultation & Recruitment Processor
 */
export async function processConsultation(
  payload: ConsultationPayload,
  clientIp: string
): Promise<ConsultationResult> {
  const cleanIp = (clientIp || '127.0.0.1').split(',')[0].trim();

  // 1. Honeypot spam check: if filled, quietly succeed without sending spam
  if (payload.hp_website && payload.hp_website.trim().length > 0) {
    console.warn(`[CONSULTATION] honeypot triggered from IP: ${cleanIp}`);
    return {
      success: true,
      message: '상담 신청이 접수되었습니다. 확인 후 연락드리겠습니다.',
    };
  }

  // 2. Rate limit check
  if (!checkRateLimit(cleanIp)) {
    console.warn(`[CONSULTATION] rate limit exceeded from IP: ${cleanIp}`);
    return {
      success: false,
      message: '요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.',
    };
  }

  // 3. Validation
  const name = (payload.name || '').trim();
  const phone = (payload.phone || '').trim();
  const privacyAgreed = Boolean(
    payload.privacyAgreed ?? payload.privacyConsent ?? (payload as any).agreePrivacy
  );

  // Determine inquiry type
  const isRecruitment =
    payload.type === 'planner-recruitment' ||
    payload.type === 'recruitment' ||
    payload.consultationType === '설계사 상담' ||
    payload.category === '설계사 상담' ||
    Boolean(payload.experience || payload.experienceType);

  const inquiryTypeStr = isRecruitment ? '설계사 상담' : '보험 상담';

  if (!name || name.length < 2 || name.length > 50) {
    console.warn(`[CONSULTATION] validation failed: invalid name (length: ${name.length})`);
    return {
      success: false,
      message: '신청자 성함을 2자 이상 50자 이하로 올바르게 입력해 주세요.',
    };
  }

  // Phone normalization: accepts 01026278554, 010-2627-8554, etc.
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  if (cleanPhone.length < 9 || cleanPhone.length > 12) {
    console.warn(`[CONSULTATION] validation failed: invalid phone format (digits: ${cleanPhone.length})`);
    return {
      success: false,
      message: '연락처를 올바른 전화번호 형식으로 입력해 주세요 (예: 010-1234-5678).',
    };
  }

  if (!privacyAgreed) {
    console.warn(`[CONSULTATION] validation failed: privacy consent not given`);
    return {
      success: false,
      message: '개인정보 수집 및 이용에 동의해야 상담 신청이 가능합니다.',
    };
  }

  // Normalize phone for display in email
  let formattedPhone = cleanPhone;
  if (cleanPhone.length === 11) {
    formattedPhone = cleanPhone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  } else if (cleanPhone.length === 10) {
    formattedPhone = cleanPhone.startsWith('02')
      ? cleanPhone.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3')
      : cleanPhone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  }

  console.log(
    `[CONSULTATION] request received (Type: ${inquiryTypeStr}, Name: ${name}, Phone: ${maskPhone(cleanPhone)})`
  );
  console.log(`[CONSULTATION] validation success`);

  const preferredTime = (payload.preferredTime || '').trim() || '상관없음 (빠른 상담 희망)';
  const message = (payload.message || payload.motivation || '').trim();
  const kstDateString = getKstTimestamp();

  let subject: string;
  let htmlContent: string;

  if (isRecruitment) {
    const experience =
      (payload.experience || payload.experienceType || '').trim() || '신입 (보험영업 경험 없음)';
    const currentJob = (payload.currentJob || '').trim();

    subject = `[목동지점 설계사 상담 신청] ${name}`;
    htmlContent = buildRecruitmentEmailHtml({
      name,
      phone: formattedPhone,
      experience,
      currentJob,
      preferredTime,
      message,
      sourceUrl: payload.sourceUrl || getCanonicalUrl('/recruit'),
      kstDate: kstDateString,
    });
  } else {
    const category =
      (payload.category || payload.consultationType || (payload as any).consultType || '').trim() ||
      '보장분석';

    subject = `[목동지점 보험상담 신청] ${name}`;
    htmlContent = buildInsuranceEmailHtml({
      name,
      phone: formattedPhone,
      category,
      preferredTime,
      message,
      sourceUrl: payload.sourceUrl || getCanonicalUrl('/consulting/consultation'),
      kstDate: kstDateString,
    });
  }

  // 4. Send via Resend
  const receiverEmail = process.env.CONSULTATION_RECEIVER_EMAIL || 'genie.yoon@gmail.com';
  const rawFrom = process.env.CONSULTATION_FROM_EMAIL || 'onboarding@resend.dev';
  const fromEmail = rawFrom.includes('<') ? rawFrom : `HK금융파트너스 목동지점 <${rawFrom}>`;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[CONSULTATION] RESEND_API_KEY missing in environment variables.');
    return {
      success: false,
      message: '상담 신청 처리 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    };
  }

  try {
    console.log(`[CONSULTATION] sending email via Resend to ${receiverEmail}`);
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from: fromEmail,
      to: [receiverEmail],
      subject,
      html: htmlContent,
    });

    if (result.error) {
      console.error('[CONSULTATION] email send failed:', result.error);
      return {
        success: false,
        message: '상담 신청 처리 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
      };
    }

    console.log(`[CONSULTATION] email success (id: ${result.data?.id})`);
    return {
      success: true,
      message: '상담 신청이 접수되었습니다. 확인 후 연락드리겠습니다.',
    };
  } catch (err: any) {
    console.error('[CONSULTATION] server error:', err?.message || err);
    return {
      success: false,
      message: '상담 신청 처리 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    };
  }
}
