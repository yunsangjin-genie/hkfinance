import { processConsultation } from '../../src/server/consultationService';

export const handler = async (event: any, context: any) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json; charset=utf-8',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, message: 'Method Not Allowed' }),
    };
  }

  const clientIp =
    event.headers?.['x-forwarded-for'] ||
    event.headers?.['client-ip'] ||
    '127.0.0.1';

  try {
    let payload: any = {};
    if (event.body) {
      payload = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    }
    const result = await processConsultation(payload, clientIp);
    return {
      statusCode: result.success ? 200 : 400,
      headers,
      body: JSON.stringify(result),
    };
  } catch (error: any) {
    console.error('[Netlify Function /api/consultation Error]', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: '상담 신청 처리 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
      }),
    };
  }
};
