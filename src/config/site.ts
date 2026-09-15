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

export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-image.jpg`;
export const DEFAULT_OG_IMAGE_WIDTH = 1200;
export const DEFAULT_OG_IMAGE_HEIGHT = 630;
export const DEFAULT_OG_IMAGE_TYPE = 'image/jpeg';

export const SITE_CONFIG = {
  domain: SITE_DOMAIN,
  baseUrl: SITE_URL,
  origin: SITE_URL,
  name: 'HK금융파트너스 목동지점',
  fullName: 'HK금융파트너스 경인사업본부 목동지점',
  leaderName: '윤상진',
  leaderTitle: '지점장',
  phone: '010-2627-8554',
  tel: '070-8252-9712',
  fax: '0504-441-8554',
  email: 'genie.yoon@gmail.com',
  address: '강남구 역삼동 708-33 파라다이스 밴처타워 6층',
  defaultOgImage: DEFAULT_OG_IMAGE,
  defaultLogoImage: `${SITE_URL}/hk-logo.svg`,
  ogImageWidth: DEFAULT_OG_IMAGE_WIDTH,
  ogImageHeight: DEFAULT_OG_IMAGE_HEIGHT,
  ogImageType: DEFAULT_OG_IMAGE_TYPE,
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
