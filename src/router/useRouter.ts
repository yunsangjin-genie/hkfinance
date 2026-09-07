import { useState, useEffect, useCallback } from 'react';
import { SITE_ROUTES, RouteMeta } from './routes';
import { blogPosts } from '../data/blog';

// Normalize path to clean pathname (e.g., '/insurance/silson')
export function normalizePath(rawPath: string): string {
  let p = rawPath.trim();
  // Strip hash prefix if present
  if (p.startsWith('#')) {
    p = p.slice(1);
  }
  // Strip query strings
  p = p.split('?')[0];
  if (!p.startsWith('/')) {
    p = '/' + p;
  }
  // Remove trailing slash except for root
  if (p.length > 1 && p.endsWith('/')) {
    p = p.slice(0, -1);
  }
  return p || '/';
}

export function useRouter() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window === 'undefined') return '/';
    // If hash routing is used
    if (window.location.hash && window.location.hash.length > 1) {
      return normalizePath(window.location.hash);
    }
    return normalizePath(window.location.pathname);
  });

  const navigate = useCallback((targetPath: string, replace = false) => {
    const clean = normalizePath(targetPath);
    setCurrentPath(clean);

    if (typeof window !== 'undefined') {
      if (replace) {
        window.history.replaceState({}, '', clean);
      } else {
        window.history.pushState({}, '', clean);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // Listen to browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      if (window.location.hash && window.location.hash.length > 1) {
        setCurrentPath(normalizePath(window.location.hash));
      } else {
        setCurrentPath(normalizePath(window.location.pathname));
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Resolve Route Meta and update document title & description
  const meta: RouteMeta = SITE_ROUTES[currentPath] || (() => {
    // Dynamic blog article route check: /insurance-info/:slug
    if (currentPath.startsWith('/insurance-info/')) {
      const slug = currentPath.replace('/insurance-info/', '');
      const post = blogPosts.find((p) => p.id === slug);
      if (post) {
        return {
          path: currentPath,
          title: `${post.title} | HK금융파트너스 목동지점`,
          description: post.summary,
          breadcrumb: [
            { name: '홈', path: '/' },
            { name: '보험정보', path: '/insurance-info' },
            { name: post.title },
          ],
        };
      }
    }
    // Fallback
    return {
      path: currentPath,
      title: 'HK금융파트너스 경인사업본부 목동지점',
      description: '보험을 권하기보다, 필요한 보장을 함께 설계합니다.',
      breadcrumb: [{ name: '홈', path: '/' }, { name: '페이지' }],
    };
  })();

  // Synchronize document title, meta description, and canonical
  useEffect(() => {
    if (typeof document === 'undefined') return;

    // Document title
    document.title = meta.title;

    // Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', meta.description);

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    const fullCanonical = `https://mokdong.hkfp.co.kr${meta.path === '/' ? '' : meta.path}`;
    canonical.setAttribute('href', fullCanonical);

    // OpenGraph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', meta.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', meta.description);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', fullCanonical);
  }, [meta]);

  return {
    currentPath,
    navigate,
    meta,
  };
}
