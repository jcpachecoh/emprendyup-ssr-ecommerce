import { NextResponse } from 'next/server';

function parseCookies(cookieHeader: string) {
  const cookies: Record<string, string> = {};
  if (!cookieHeader) return cookies;
  cookieHeader.split(';').forEach((cookie) => {
    const index = cookie.indexOf('=');
    if (index === -1) return;
    const name = cookie.slice(0, index).trim();
    const value = cookie.slice(index + 1).trim();
    cookies[name] = decodeURIComponent(value);
  });
  return cookies;
}

function base64UrlDecode(input: string) {
  // Convert from base64url to base64
  let base64 = input.replace(/-/g, '+').replace(/_/g, '/');
  // Pad with '=' to make length a multiple of 4
  while (base64.length % 4) base64 += '=';
  return Buffer.from(base64, 'base64').toString('utf8');
}

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    const cookies = parseCookies(cookieHeader);
    const token = cookies['auth_token'] || cookies['auth-token'] || cookies['token'];

    if (!token) {
      return NextResponse.json({ error: 'No auth token' }, { status: 401 });
    }

    // Decode JWT payload (no verification) to extract user info for frontend display
    const parts = token.split('.');
    if (parts.length !== 3) {
      return NextResponse.json({ error: 'Invalid token format' }, { status: 400 });
    }

    let payload: any = {};
    try {
      const decoded = base64UrlDecode(parts[1]);
      payload = JSON.parse(decoded);
    } catch (err) {
      console.warn('Failed to decode JWT payload', err);
      return NextResponse.json({ error: 'Failed to decode token' }, { status: 400 });
    }

    // Best-effort extraction of user name
    const userName =
      payload.name || payload.username || payload.preferred_username || payload.email || null;

    return NextResponse.json({ user: { name: userName, payload } }, { status: 200 });
  } catch (err) {
    console.error('Error in /api/auth/me', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
