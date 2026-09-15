import express from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { processConsultation } from './src/server/consultationService';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Trust proxy for correct client IP detection behind Cloud Run / reverse proxies
app.set('trust proxy', true);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'HK Financial Partners Mokdong Branch API',
  });
});

// Consultation submission API
app.post('/api/consultation', async (req, res) => {
  const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1';
  try {
    const result = await processConsultation(req.body, clientIp);
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    console.error('[API /api/consultation Internal Error]', error);
    return res.status(500).json({
      success: false,
      message: '상담 신청 처리 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    });
  }
});

// Recruitment inquiry API (delegates to processConsultation)
app.post('/api/recruitment', async (req, res) => {
  const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1';
  try {
    const result = await processConsultation({ ...req.body, type: 'planner-recruitment' }, clientIp);
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    console.error('[API /api/recruitment Internal Error]', error);
    return res.status(500).json({
      success: false,
      message: '설계사 상담 신청 처리 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    });
  }
});

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';
  const distPath = path.join(process.cwd(), 'dist');

  if (!isProduction) {
    // Development mode: mount Vite dev middleware
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, host: '0.0.0.0', port: PORT },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production mode: serve pre-rendered static HTML files and client assets
    app.use(express.static(distPath, { index: false }));

    // Exact Multi-Page Static Route Handler
    // For any GET request, check if a matching pre-rendered {path}/index.html exists
    app.get('*', (req, res, next) => {
      // Clean request pathname (strip trailing slash)
      let reqPath = req.path;
      if (reqPath.length > 1 && reqPath.endsWith('/')) {
        reqPath = reqPath.slice(0, -1);
      }

      // Check if dist/{path}/index.html exists
      const cleanSubPath = reqPath === '/' ? '' : reqPath;
      const directHtmlPath = path.join(distPath, cleanSubPath, 'index.html');

      if (fs.existsSync(directHtmlPath) && fs.statSync(directHtmlPath).isFile()) {
        return res.sendFile(directHtmlPath);
      }

      // Check direct .html extension
      const htmlExtPath = path.join(distPath, `${reqPath}.html`);
      if (fs.existsSync(htmlExtPath) && fs.statSync(htmlExtPath).isFile()) {
        return res.sendFile(htmlExtPath);
      }

      // Fallback to main index.html
      const fallbackIndex = path.join(distPath, 'index.html');
      if (fs.existsSync(fallbackIndex)) {
        return res.sendFile(fallbackIndex);
      }

      next();
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[HK Financial Partners Mokdong Server] Running at http://0.0.0.0:${PORT} in ${isProduction ? 'production' : 'development'} mode`);
  });
}

startServer();
