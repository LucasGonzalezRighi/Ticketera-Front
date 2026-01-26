import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000/api';

async function handler(req: NextRequest, { params }: { params: { path: string[] } }) {
  const path = params.path.join('/');
  const url = `${BACKEND_URL}/${path}${req.nextUrl.search}`;

  const headers: HeadersInit = {
    'Content-Type': req.headers.get('Content-Type') || 'application/json',
  };

  const authHeader = req.headers.get('Authorization');
  if (authHeader) {
    headers['Authorization'] = authHeader;
  }

  try {
    const body = ['GET', 'HEAD'].includes(req.method) ? undefined : await req.text();

    const response = await fetch(url, {
      method: req.method,
      headers,
      body,
      cache: 'no-store',
    });

    const data = await response.text();

    // Try parsing JSON if possible, otherwise return text
    let responseBody;
    try {
      responseBody = JSON.parse(data);
    } catch {
      responseBody = data;
    }

    return NextResponse.json(responseBody, { status: response.status });
  } catch (error) {
    console.error('Proxy Error:', error);
    return NextResponse.json(
      { success: false, message: 'Error communicating with backend' },
      { status: 502 }
    );
  }
}

export { handler as GET, handler as POST, handler as PUT, handler as PATCH, handler as DELETE };
