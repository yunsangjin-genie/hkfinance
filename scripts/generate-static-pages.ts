import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../src/App';
import { SITE_ROUTES } from '../src/router/routes';
import { blogPosts } from '../src/data/blog';
import {
  SITE_URL,
  SITE_DOMAIN,
  LEGACY_DOMAINS,
  getCanonicalUrl,
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_WIDTH,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_TYPE,
} from '../src/config/site';
import { generateOgImage } from './generate-og-image';

// Target production dist directory
const distDir = path.resolve(process.cwd(), 'dist');
const templateHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(templateHtmlPath)) {
  console.error(`[SSG Error] template index.html not found in ${templateHtmlPath}. Run 'vite build' first.`);
  process.exit(1);
}

// 1. Generate and synchronize official 1200x630 OG image
console.log(`\n======================================================`);
console.log(`[OG Image Generator] Generating and verifying SNS representative image...`);
await generateOgImage();

const distImagesDir = path.join(distDir, 'images');
if (!fs.existsSync(distImagesDir)) {
  fs.mkdirSync(distImagesDir, { recursive: true });
}

const publicOgJpg = path.resolve(process.cwd(), 'public/images/og-image.jpg');
const publicOgPng = path.resolve(process.cwd(), 'public/images/og-image.png');

if (fs.existsSync(publicOgJpg)) {
  fs.copyFileSync(publicOgJpg, path.join(distImagesDir, 'og-image.jpg'));
  fs.copyFileSync(publicOgJpg, path.join(distDir, 'og-image.jpg'));
  console.log(`  ✓ Synced og-image.jpg to dist/images/ and dist/`);
}
if (fs.existsSync(publicOgPng)) {
  fs.copyFileSync(publicOgPng, path.join(distImagesDir, 'og-image.png'));
  fs.copyFileSync(publicOgPng, path.join(distDir, 'og-image.png'));
  console.log(`  ✓ Synced og-image.png to dist/images/ and dist/`);
}

const templateHtml = fs.readFileSync(templateHtmlPath, 'utf-8');

// Helper to reliably upsert meta tags without duplicates
function upsertMetaTag(html: string, attr: 'name' | 'property', key: string, value: string): string {
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const removeRegex = new RegExp(`\\s*<meta\\s+${attr}="${escapedKey}"\\s+content=".*?"\\s*\\/?>`, 'gi');
  let cleanHtml = html.replace(removeRegex, '');

  const newTag = `    <meta ${attr}="${key}" content="${value}" />`;
  return cleanHtml.replace('</head>', `${newTag}\n  </head>`);
}

// Helper to reliably upsert canonical link without duplicates
function upsertCanonical(html: string, url: string): string {
  const removeRegex = /\s*<link\s+rel="canonical"\s+href=".*?"\s*\/?>/gi;
  let cleanHtml = html.replace(removeRegex, '');
  const newTag = `    <link rel="canonical" href="${url}" />`;
  return cleanHtml.replace('</head>', `${newTag}\n  </head>`);
}

// All predefined routes from SITE_ROUTES + dynamic blog detail pages
const allRoutePaths = Object.keys(SITE_ROUTES);

// Add dynamic blog posts routes
blogPosts.forEach((post) => {
  const postPath = `/insurance-info/${post.id}`;
  if (!allRoutePaths.includes(postPath)) {
    allRoutePaths.push(postPath);
  }
});

console.log(`\n======================================================`);
console.log(`[SSG] Starting Static Site Generation for ${allRoutePaths.length} routes...`);
console.log(`[SSG] Canonical Base Domain: ${SITE_URL}`);
console.log(`[SSG] Default OG Image: ${DEFAULT_OG_IMAGE}`);
console.log(`======================================================\n`);

let generatedCount = 0;

for (const routePath of allRoutePaths) {
  try {
    // 1. Render App component to static HTML string with routePath
    const appHtml = renderToString(React.createElement(App, { initialPath: routePath }));

    // 2. Fetch metadata for route
    let meta = SITE_ROUTES[routePath];
    if (!meta && routePath.startsWith('/insurance-info/')) {
      const slug = routePath.replace('/insurance-info/', '');
      const post = blogPosts.find((p) => p.id === slug);
      if (post) {
        meta = {
          path: routePath,
          title: `${post.title} | HK금융파트너스 목동지점`,
          description: post.summary,
          keywords: [post.category, ...post.tags].join(', '),
          category: '보험정보',
          ogImage: DEFAULT_OG_IMAGE,
          breadcrumb: [
            { name: '홈', path: '/' },
            { name: '보험정보', path: '/insurance-info' },
            { name: post.title },
          ],
        };
      }
    }

    const isHome = routePath === '/' || routePath === '';

    // Page Title
    const title = isHome
      ? 'HK금융파트너스 경인사업본부 목동지점 | 맞춤 보험 상담 & 설계사 멘토링'
      : (meta?.title || 'HK금융파트너스 경인사업본부 목동지점');

    // Page Description
    const description = isHome
      ? '보험을 권하기보다, 필요한 보장을 함께 설계합니다. HK금융파트너스 경인사업본부 목동지점'
      : (meta?.description || '보험을 권하기보다, 필요한 보장을 함께 설계합니다. HK금융파트너스 경인사업본부 목동지점');

    const canonicalUrl = getCanonicalUrl(routePath);
    const ogImageUrl = meta?.ogImage || DEFAULT_OG_IMAGE;

    // OpenGraph Title & Description
    const ogTitle = isHome
      ? 'HK금융파트너스 경인사업본부 목동지점'
      : (meta?.title || 'HK금융파트너스 경인사업본부 목동지점');

    const ogDescription = isHome
      ? '보험을 권하기보다, 필요한 보장을 함께 설계합니다. HK금융파트너스 경인사업본부 목동지점'
      : (meta?.description || '보험을 권하기보다, 필요한 보장을 함께 설계합니다.');

    // Twitter Card Title & Description
    const twitterTitle = isHome
      ? 'HK금융파트너스 경인사업본부 목동지점'
      : (meta?.title || 'HK금융파트너스 경인사업본부 목동지점');

    const twitterDescription = isHome
      ? '보험을 권하기보다, 필요한 보장을 함께 설계합니다.'
      : (meta?.description || '보험을 권하기보다, 필요한 보장을 함께 설계합니다.');

    const ogType = routePath.startsWith('/insurance-info/') && routePath !== '/insurance-info'
      ? 'article'
      : 'website';

    // 3. Inject into HTML Template
    let pageHtml = templateHtml;

    // Replace Title
    pageHtml = pageHtml.replace(/<title>.*?<\/title>/i, `<title>${title}</title>`);

    // Replace Canonical Link
    pageHtml = upsertCanonical(pageHtml, canonicalUrl);

    // Replace Meta Description
    pageHtml = upsertMetaTag(pageHtml, 'name', 'description', description);

    // Replace OpenGraph tags (ensuring zero duplicates)
    pageHtml = upsertMetaTag(pageHtml, 'property', 'og:type', ogType);
    pageHtml = upsertMetaTag(pageHtml, 'property', 'og:locale', 'ko_KR');
    pageHtml = upsertMetaTag(pageHtml, 'property', 'og:site_name', 'HK금융파트너스 경인사업본부 목동지점');
    pageHtml = upsertMetaTag(pageHtml, 'property', 'og:title', ogTitle);
    pageHtml = upsertMetaTag(pageHtml, 'property', 'og:description', ogDescription);
    pageHtml = upsertMetaTag(pageHtml, 'property', 'og:url', canonicalUrl);
    pageHtml = upsertMetaTag(pageHtml, 'property', 'og:image', ogImageUrl);
    pageHtml = upsertMetaTag(pageHtml, 'property', 'og:image:width', String(DEFAULT_OG_IMAGE_WIDTH));
    pageHtml = upsertMetaTag(pageHtml, 'property', 'og:image:height', String(DEFAULT_OG_IMAGE_HEIGHT));
    pageHtml = upsertMetaTag(pageHtml, 'property', 'og:image:type', DEFAULT_OG_IMAGE_TYPE);

    // Replace Twitter Card tags
    pageHtml = upsertMetaTag(pageHtml, 'name', 'twitter:card', 'summary_large_image');
    pageHtml = upsertMetaTag(pageHtml, 'name', 'twitter:title', twitterTitle);
    pageHtml = upsertMetaTag(pageHtml, 'name', 'twitter:description', twitterDescription);
    pageHtml = upsertMetaTag(pageHtml, 'name', 'twitter:image', ogImageUrl);

    // Replace Geo Meta Tags for local SEO
    pageHtml = upsertMetaTag(pageHtml, 'name', 'geo.region', 'KR-11');
    pageHtml = upsertMetaTag(pageHtml, 'name', 'geo.placename', 'Yeoksam-dong, Gangnam-gu, Seoul');
    pageHtml = upsertMetaTag(pageHtml, 'name', 'geo.position', '37.5029;127.0425');
    pageHtml = upsertMetaTag(pageHtml, 'name', 'ICBM', '37.5029, 127.0425');

    // Replace Root div with pre-rendered app content
    pageHtml = pageHtml.replace(
      /<div id="root"><\/div>/,
      `<div id="root">${appHtml}</div>`
    );

    // 4. Save to filesystem
    let targetFilePath: string;
    if (routePath === '/' || routePath === '') {
      targetFilePath = path.join(distDir, 'index.html');
    } else {
      const subDir = path.join(distDir, ...routePath.split('/').filter(Boolean));
      if (!fs.existsSync(subDir)) {
        fs.mkdirSync(subDir, { recursive: true });
      }
      targetFilePath = path.join(subDir, 'index.html');
    }

    fs.writeFileSync(targetFilePath, pageHtml, 'utf-8');
    generatedCount++;
    console.log(`  ✓ Generated: ${routePath} -> ${path.relative(distDir, targetFilePath)}`);
  } catch (err) {
    console.error(`  ✗ Error generating SSG for ${routePath}:`, err);
    throw err;
  }
}

console.log(`\n[SSG Complete] Successfully generated ${generatedCount}/${allRoutePaths.length} static HTML pages!`);

// ============================================================================
// Automatic Dynamic Sitemap Generation
// ============================================================================
console.log(`\n[Sitemap Generation] Creating dynamic sitemap.xml strictly using ${SITE_URL}...`);

const todayDate = new Date().toISOString().split('T')[0];

function getRoutePriority(p: string): { priority: string; changefreq: string } {
  if (p === '/' || p === '') return { priority: '1.0', changefreq: 'daily' };
  if (p.startsWith('/consulting')) return { priority: '0.95', changefreq: 'daily' };
  if (p.startsWith('/insurance')) return { priority: '0.9', changefreq: 'weekly' };
  if (p.startsWith('/recruit')) return { priority: '0.9', changefreq: 'weekly' };
  if (p.startsWith('/insurance-info')) return { priority: '0.8', changefreq: 'weekly' };
  if (p.startsWith('/about')) return { priority: '0.8', changefreq: 'monthly' };
  if (p === '/faq' || p === '/contact') return { priority: '0.7', changefreq: 'monthly' };
  return { priority: '0.5', changefreq: 'monthly' };
}

const sitemapEntries = allRoutePaths.map((routePath) => {
  const locUrl = getCanonicalUrl(routePath);
  const { priority, changefreq } = getRoutePriority(routePath);
  return `  <url>
    <loc>${locUrl}</loc>
    <lastmod>${todayDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
});

const sitemapXmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.join('\n')}
</urlset>
`;

const distSitemapPath = path.join(distDir, 'sitemap.xml');
fs.writeFileSync(distSitemapPath, sitemapXmlContent, 'utf-8');

// Also sync to public/sitemap.xml so repository source remains up-to-date
const publicSitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
fs.writeFileSync(publicSitemapPath, sitemapXmlContent, 'utf-8');

console.log(`  ✓ Sitemap written to: ${distSitemapPath}`);
console.log(`  ✓ Sitemap synced to: ${publicSitemapPath}`);
console.log(`  ✓ Total URLs in sitemap: ${allRoutePaths.length}`);

// ============================================================================
// Automated Strict Validation (Fails build if any legacy domain or defect found)
// ============================================================================
console.log(`\n======================================================`);
console.log(`[Audit & Validation] Running automated domain, OG, and SEO verification...`);
console.log(`======================================================`);

const validationErrors: string[] = [];

// 1. Audit representative image file existence and size
const distOgJpgPath = path.join(distDir, 'images/og-image.jpg');
if (!fs.existsSync(distOgJpgPath)) {
  validationErrors.push(`[OG Image Error] ${distOgJpgPath} does not exist in build output!`);
} else {
  const stat = fs.statSync(distOgJpgPath);
  const sizeKb = stat.size / 1024;
  console.log(`  ✓ dist/images/og-image.jpg verified (${sizeKb.toFixed(1)} KB)`);
  if (stat.size > 1024 * 1024) {
    validationErrors.push(`[OG Image Error] og-image.jpg is too large (${sizeKb.toFixed(1)} KB > 1024 KB)!`);
  }
}

// 2. Audit sitemap.xml
const sitemapContent = fs.readFileSync(distSitemapPath, 'utf-8');
for (const legacy of LEGACY_DOMAINS) {
  if (sitemapContent.includes(legacy)) {
    validationErrors.push(`[Sitemap Error] Forbidden legacy domain detected in sitemap.xml: '${legacy}'`);
  }
}

const locMatches = [...sitemapContent.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
if (locMatches.length === 0) {
  validationErrors.push(`[Sitemap Error] No <loc> entries found in sitemap.xml`);
}

for (const loc of locMatches) {
  if (!loc.startsWith(`${SITE_URL}/`)) {
    validationErrors.push(`[Sitemap Error] Invalid URL in sitemap: '${loc}'. Must start with '${SITE_URL}/'`);
  }
}

// 3. Audit robots.txt
const distRobotsPath = path.join(distDir, 'robots.txt');
if (fs.existsSync(distRobotsPath)) {
  const robotsContent = fs.readFileSync(distRobotsPath, 'utf-8');
  for (const legacy of LEGACY_DOMAINS) {
    if (robotsContent.includes(legacy)) {
      validationErrors.push(`[robots.txt Error] Forbidden legacy domain detected in robots.txt: '${legacy}'`);
    }
  }
  if (!robotsContent.includes(`Sitemap: ${SITE_URL}/sitemap.xml`)) {
    validationErrors.push(`[robots.txt Error] Missing or incorrect Sitemap directive. Expected: Sitemap: ${SITE_URL}/sitemap.xml`);
  }
} else {
  validationErrors.push(`[robots.txt Error] dist/robots.txt not found`);
}

// 4. Audit llms.txt
const distLlmsPath = path.join(distDir, 'llms.txt');
if (fs.existsSync(distLlmsPath)) {
  const llmsContent = fs.readFileSync(distLlmsPath, 'utf-8');
  for (const legacy of LEGACY_DOMAINS) {
    if (llmsContent.includes(legacy)) {
      validationErrors.push(`[llms.txt Error] Forbidden legacy domain detected in llms.txt: '${legacy}'`);
    }
  }
  if (!llmsContent.includes(SITE_URL)) {
    validationErrors.push(`[llms.txt Error] Missing canonical site URL in llms.txt: '${SITE_URL}'`);
  }
}

// 5. Audit all generated HTML files in dist/
function getAllHtmlFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getAllHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const allHtmlFiles = getAllHtmlFiles(distDir);
console.log(`[Audit] Scanning ${allHtmlFiles.length} generated HTML files in dist/ for legacy domains, OG and SEO completeness...`);

for (const htmlFile of allHtmlFiles) {
  const relPath = path.relative(distDir, htmlFile);
  const content = fs.readFileSync(htmlFile, 'utf-8');

  // Check for forbidden legacy domains anywhere in HTML
  for (const legacy of LEGACY_DOMAINS) {
    if (content.includes(legacy)) {
      validationErrors.push(`[HTML Error in ${relPath}] Forbidden legacy domain '${legacy}' detected in page content!`);
    }
  }

  // Check for forbidden legacy contact info
  if (content.includes('1566-8163')) {
    validationErrors.push(`[HTML Error in ${relPath}] Forbidden legacy telephone '1566-8163' detected!`);
  }

  // Check canonical link
  const canonicalMatch = content.match(/<link\s+rel="canonical"\s+href="(.*?)"/i);
  if (!canonicalMatch) {
    validationErrors.push(`[HTML Error in ${relPath}] Missing <link rel="canonical"> tag!`);
  } else if (!canonicalMatch[1].startsWith(SITE_URL)) {
    validationErrors.push(`[HTML Error in ${relPath}] Canonical href '${canonicalMatch[1]}' does not start with '${SITE_URL}'!`);
  }

  // Check OpenGraph Tags
  const ogTitleMatch = content.match(/<meta\s+property="og:title"\s+content="(.*?)"/i);
  if (!ogTitleMatch || !ogTitleMatch[1].trim()) {
    validationErrors.push(`[OG Error in ${relPath}] Missing or empty <meta property="og:title">`);
  }

  const ogDescMatch = content.match(/<meta\s+property="og:description"\s+content="(.*?)"/i);
  if (!ogDescMatch || !ogDescMatch[1].trim()) {
    validationErrors.push(`[OG Error in ${relPath}] Missing or empty <meta property="og:description">`);
  }

  const ogUrlMatch = content.match(/<meta\s+property="og:url"\s+content="(.*?)"/i);
  if (!ogUrlMatch) {
    validationErrors.push(`[OG Error in ${relPath}] Missing <meta property="og:url"> tag!`);
  } else if (!ogUrlMatch[1].startsWith(SITE_URL)) {
    validationErrors.push(`[OG Error in ${relPath}] og:url content '${ogUrlMatch[1]}' does not start with '${SITE_URL}'!`);
  } else if (canonicalMatch && ogUrlMatch[1] !== canonicalMatch[1]) {
    validationErrors.push(`[OG Error in ${relPath}] og:url ('${ogUrlMatch[1]}') does not match canonical ('${canonicalMatch[1]}')!`);
  }

  const ogSiteNameMatch = content.match(/<meta\s+property="og:site_name"\s+content="(.*?)"/i);
  if (!ogSiteNameMatch) {
    validationErrors.push(`[OG Error in ${relPath}] Missing <meta property="og:site_name">`);
  }

  // Check OpenGraph Image and ensure no duplicates
  const ogImageMatches = [...content.matchAll(/<meta\s+property="og:image"\s+content="(.*?)"/gi)];
  if (ogImageMatches.length === 0) {
    validationErrors.push(`[OG Error in ${relPath}] Missing <meta property="og:image"> tag!`);
  } else if (ogImageMatches.length > 1) {
    validationErrors.push(`[OG Error in ${relPath}] Duplicate <meta property="og:image"> detected (${ogImageMatches.length} tags)!`);
  } else {
    const ogImgUrl = ogImageMatches[0][1];
    if (!ogImgUrl.startsWith(SITE_URL)) {
      validationErrors.push(`[OG Error in ${relPath}] og:image '${ogImgUrl}' does not start with '${SITE_URL}'!`);
    }
  }

  const ogWidthMatch = content.match(/<meta\s+property="og:image:width"\s+content="1200"/i);
  if (!ogWidthMatch) {
    validationErrors.push(`[OG Error in ${relPath}] Missing or invalid <meta property="og:image:width" content="1200">`);
  }

  const ogHeightMatch = content.match(/<meta\s+property="og:image:height"\s+content="630"/i);
  if (!ogHeightMatch) {
    validationErrors.push(`[OG Error in ${relPath}] Missing or invalid <meta property="og:image:height" content="630">`);
  }

  const ogTypeImgMatch = content.match(/<meta\s+property="og:image:type"\s+content="image\/jpeg"/i);
  if (!ogTypeImgMatch) {
    validationErrors.push(`[OG Error in ${relPath}] Missing or invalid <meta property="og:image:type" content="image/jpeg">`);
  }

  // Check Twitter Cards
  const twCardMatch = content.match(/<meta\s+name="twitter:card"\s+content="summary_large_image"/i);
  if (!twCardMatch) {
    validationErrors.push(`[Twitter Error in ${relPath}] Missing <meta name="twitter:card" content="summary_large_image">`);
  }

  const twTitleMatch = content.match(/<meta\s+name="twitter:title"\s+content="(.*?)"/i);
  if (!twTitleMatch || !twTitleMatch[1].trim()) {
    validationErrors.push(`[Twitter Error in ${relPath}] Missing or empty <meta name="twitter:title">`);
  }

  const twDescMatch = content.match(/<meta\s+name="twitter:description"\s+content="(.*?)"/i);
  if (!twDescMatch || !twDescMatch[1].trim()) {
    validationErrors.push(`[Twitter Error in ${relPath}] Missing or empty <meta name="twitter:description">`);
  }

  const twImageMatches = [...content.matchAll(/<meta\s+name="twitter:image"\s+content="(.*?)"/gi)];
  if (twImageMatches.length === 0) {
    validationErrors.push(`[Twitter Error in ${relPath}] Missing <meta name="twitter:image">`);
  } else if (twImageMatches.length > 1) {
    validationErrors.push(`[Twitter Error in ${relPath}] Duplicate <meta name="twitter:image"> detected (${twImageMatches.length} tags)!`);
  } else {
    const twImgUrl = twImageMatches[0][1];
    if (!twImgUrl.startsWith(SITE_URL)) {
      validationErrors.push(`[Twitter Error in ${relPath}] twitter:image '${twImgUrl}' does not start with '${SITE_URL}'!`);
    }
  }
}

// 6. Final validation verdict
if (validationErrors.length > 0) {
  console.error(`\n❌ [BUILD FAILURE] ${validationErrors.length} domain, OG, or SEO integrity error(s) detected:`);
  validationErrors.forEach((err, idx) => {
    console.error(`  ${idx + 1}. ${err}`);
  });
  console.error(`\nAborting build. Please resolve the above issues before deployment.`);
  process.exit(1);
} else {
  console.log(`\n✅ [Audit Passed] All ${allRoutePaths.length} routes, sitemap.xml, robots.txt, llms.txt, and ${allHtmlFiles.length} HTML files passed strict verification!`);
  console.log(`✅ Official Canonical Domain: ${SITE_URL}`);
  console.log(`✅ Official OG Image: ${DEFAULT_OG_IMAGE} (1200x630, image/jpeg)`);
  console.log(`✅ Twitter Card: summary_large_image configured across all static pages`);
  console.log(`✅ Zero duplicate OG tags, zero legacy domains found.`);
  console.log(`======================================================\n`);
}
