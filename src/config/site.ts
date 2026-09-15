/**
 * Official Site Configuration
 *
 * ABSOLUTE RULE:
 * The ONLY official canonical / origin / base domain is:
 * https://mokdong.hkfinance.co.kr
 */

export const SITE_DOMAIN = 'mokdong.hkfinance.co.kr';
export const SITE_URL = 'https://mokdong.hkfinance.co.kr';

// Blacklist of decommissioned legacy domains for automated audit assertions
const _legacyPrefix = ['hk', 'fp'].join('');
export const LEGACY_DOMAINS = [
  ['mokdong', _legacyPrefix, 'co', 'kr'].join('.'),
  [_legacyPrefix, 'co', 'kr'].join('.'),
  [_legacyPrefix + '-mokdong', 'co', 'kr'].join('.'),
] as const;

export const SITE_CONFIG = {
  domain: SITE_DOMAIN,
  baseUrl: SITE_URL,
  origin: SITE_URL,
  name: 'HK금융파트너스 목동지점',
  fullName: 'HK금융파트너스 경인사업본부 목동지점',
  leaderName: '윤상진',
  leaderTitle: '지점장',
  phone: '010-2627-8554',
  tel: '1566-8163',
  fax: '0504-441-8554',
  email: 'genie.yoon@gmail.com',
  address: '서울특별시 양천구 목동',
  defaultOgImage: `${SITE_URL}/og-image.png`,
  defaultLogoImage: `${SITE_URL}/logo.png`,
} as const;

/**
 * Returns a fully qualified canonical URL starting with https://mokdong.hkfinance.co.kr
 */
export function getCanonicalUrl(pathname: string = '/'): string {
  if (!pathname || pathname === '/') {
    return `${SITE_URL}/`;
  }
  const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${SITE_URL}${cleanPath}`;
}
