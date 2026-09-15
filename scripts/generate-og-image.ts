import fs from 'fs';
import path from 'path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';

async function generateOgImage() {
  console.log('[OG Image] Generating 1200x630 representative SNS image...');

  // Load Pretendard font files
  const boldFontPath = path.resolve(process.cwd(), 'scripts/fonts/Pretendard-Bold.woff');
  const regularFontPath = path.resolve(process.cwd(), 'scripts/fonts/Pretendard-Regular.woff');

  if (!fs.existsSync(boldFontPath) || !fs.existsSync(regularFontPath)) {
    throw new Error('Pretendard font files not found in scripts/fonts/');
  }

  const boldFont = fs.readFileSync(boldFontPath);
  const regularFont = fs.readFileSync(regularFontPath);

  // Define Satori JSX/Object element
  const element = {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '1200px',
        height: '630px',
        backgroundColor: '#070D1E',
        backgroundImage: 'radial-gradient(circle at 90% 10%, #1A2E66 0%, #0A1329 45%, #050A18 100%)',
        padding: '60px 70px',
        justifyContent: 'space-between',
        fontFamily: 'Pretendard',
        position: 'relative',
        boxSizing: 'border-box',
        overflow: 'hidden',
      },
      children: [
        // Decorative background glowing accents
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              top: '-120px',
              right: '-80px',
              width: '450px',
              height: '450px',
              borderRadius: '50%',
              backgroundColor: '#1E3A8A',
              opacity: 0.25,
              filter: 'blur(90px)',
            },
          },
        },
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              bottom: '-100px',
              left: '30%',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              backgroundColor: '#E2007A',
              opacity: 0.12,
              filter: 'blur(100px)',
            },
          },
        },

        // Top Navigation Header: Brand Logo & Branch Pill
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            },
            children: [
              // Logo Group
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                  },
                  children: [
                    // Emblem SVG
                    {
                      type: 'svg',
                      props: {
                        width: '54',
                        height: '54',
                        viewBox: '0 0 64 64',
                        fill: 'none',
                        children: [
                          {
                            type: 'rect',
                            props: {
                              x: '6',
                              y: '8',
                              width: '18',
                              height: '18',
                              rx: '3',
                              fill: '#E2007A',
                            },
                          },
                          {
                            type: 'rect',
                            props: {
                              x: '6',
                              y: '38',
                              width: '18',
                              height: '18',
                              rx: '3',
                              fill: '#E2007A',
                            },
                          },
                          {
                            type: 'rect',
                            props: {
                              x: '34',
                              y: '10',
                              width: '32',
                              height: '32',
                              rx: '4',
                              fill: '#E2007A',
                              transform: 'rotate(45 50 26)',
                            },
                          },
                        ],
                      },
                    },
                    // Text
                    {
                      type: 'div',
                      props: {
                        style: {
                          display: 'flex',
                          flexDirection: 'column',
                        },
                        children: [
                          {
                            type: 'span',
                            props: {
                              style: {
                                fontSize: '13px',
                                letterSpacing: '1px',
                                color: '#94A3B8',
                                fontWeight: 600,
                              },
                              children: 'HEUNGKUK FINANCIAL PARTNERS',
                            },
                          },
                          {
                            type: 'span',
                            props: {
                              style: {
                                fontSize: '28px',
                                fontWeight: 700,
                                color: '#FFFFFF',
                                letterSpacing: '-0.5px',
                              },
                              children: 'HK금융파트너스',
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              // Branch Badge Pill
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'rgba(30, 58, 138, 0.4)',
                    border: '1.5px solid rgba(96, 165, 250, 0.4)',
                    padding: '8px 20px',
                    borderRadius: '9999px',
                    color: '#93C5FD',
                    fontSize: '17px',
                    fontWeight: 600,
                    letterSpacing: '-0.2px',
                  },
                  children: '경인사업본부 목동지점',
                },
              },
            ],
          },
        },

        // Middle Section: Core Philosophy & Motto
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              marginTop: '20px',
            },
            children: [
              // Badge Category
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '16px',
                  },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: {
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: '#E2007A',
                        },
                      },
                    },
                    {
                      type: 'span',
                      props: {
                        style: {
                          fontSize: '18px',
                          fontWeight: 600,
                          color: '#E2007A',
                          letterSpacing: '0.5px',
                        },
                        children: '고객 중심 1:1 맞춤 비교설계 & 정직한 보장분석',
                      },
                    },
                  ],
                },
              },
              // Main Headlines
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    flexDirection: 'column',
                    fontSize: '54px',
                    fontWeight: 700,
                    lineHeight: 1.22,
                    letterSpacing: '-1.5px',
                    color: '#FFFFFF',
                  },
                  children: [
                    {
                      type: 'span',
                      props: {
                        style: { color: '#E2E8F0' },
                        children: '보험을 권하기보다,',
                      },
                    },
                    {
                      type: 'span',
                      props: {
                        style: {
                          color: '#60A5FA',
                          marginTop: '4px',
                        },
                        children: '필요한 보장을 함께 설계합니다.',
                      },
                    },
                  ],
                },
              },
              // Subtitle
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '20px',
                    color: '#94A3B8',
                    marginTop: '22px',
                    letterSpacing: '-0.3px',
                    fontWeight: 500,
                  },
                  children: '30여 개 보험사 객관적 비교분석 · 불필요한 중복과 보험료 누수 점검 · 금융소비자보호 준수',
                },
              },
            ],
          },
        },

        // Bottom Footer Bar: Representative Phone & Domain
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '24px',
              borderTop: '1px solid rgba(148, 163, 184, 0.2)',
              width: '100%',
            },
            children: [
              // Phone Contact Box
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    padding: '12px 24px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                  },
                  children: [
                    {
                      type: 'span',
                      props: {
                        style: {
                          fontSize: '17px',
                          color: '#CBD5E1',
                          fontWeight: 500,
                        },
                        children: '대표전화',
                      },
                    },
                    {
                      type: 'span',
                      props: {
                        style: {
                          fontSize: '26px',
                          fontWeight: 700,
                          color: '#38BDF8',
                          letterSpacing: '0.5px',
                        },
                        children: '070-8252-9712',
                      },
                    },
                  ],
                },
              },

              // Official Domain Box
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#64748B',
                    fontSize: '18px',
                    fontWeight: 600,
                    letterSpacing: '0.2px',
                  },
                  children: [
                    {
                      type: 'span',
                      props: {
                        style: { color: '#94A3B8' },
                        children: '공식 웹사이트',
                      },
                    },
                    {
                      type: 'span',
                      props: {
                        style: { color: '#38BDF8' },
                        children: 'mokdong.hkfinance.co.kr',
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  };

  // 1. Generate SVG using Satori
  const svg = await satori(element as any, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Pretendard',
        data: boldFont,
        weight: 700,
        style: 'normal',
      },
      {
        name: 'Pretendard',
        data: regularFont,
        weight: 500,
        style: 'normal',
      },
    ],
  });

  // 2. Render SVG to PNG using Resvg
  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: 1200,
    },
  });
  const pngBuffer = resvg.render().asPng();

  // 3. Convert PNG to optimized JPEG using Sharp (quality 90, progressive, max compatibility)
  const targetDir = path.resolve(process.cwd(), 'public/images');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const targetJpgPath = path.join(targetDir, 'og-image.jpg');
  await sharp(pngBuffer)
    .jpeg({
      quality: 90,
      progressive: true,
      chromaSubsampling: '4:2:0',
    })
    .toFile(targetJpgPath);

  const stats = fs.statSync(targetJpgPath);
  console.log(`  ✓ Generated OG Image: ${targetJpgPath}`);
  console.log(`  ✓ Dimensions: 1200 x 630`);
  console.log(`  ✓ Size: ${(stats.size / 1024).toFixed(1)} KB (Optimization target: < 1MB)`);

  // Also write og-image.png as a companion for clients requesting PNG
  const targetPngPath = path.resolve(process.cwd(), 'public/images/og-image.png');
  await sharp(pngBuffer)
    .png({ compressionLevel: 8 })
    .toFile(targetPngPath);
  console.log(`  ✓ Companion PNG generated: ${targetPngPath}`);

  // Also maintain root /public/og-image.png / og-image.jpg aliases for backwards compatibility
  fs.copyFileSync(targetJpgPath, path.resolve(process.cwd(), 'public/og-image.jpg'));
  fs.copyFileSync(targetPngPath, path.resolve(process.cwd(), 'public/og-image.png'));
  console.log(`  ✓ Root public fallback aliases synced.`);
}

// Execute if run directly from CLI
if (process.argv[1] && process.argv[1].includes('generate-og-image')) {
  generateOgImage().catch((err) => {
    console.error('Failed to generate OG image:', err);
    process.exit(1);
  });
}

export { generateOgImage };
