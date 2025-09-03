import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const error = url.searchParams.get('error');

    // Handle OAuth errors
    if (error) {
      console.error('OAuth error:', error);
      return NextResponse.redirect(new URL('/registrarse?error=oauth_cancelled', req.url));
    }

    if (!code) {
      return NextResponse.redirect(new URL('/registrarse?error=no_authorization_code', req.url));
    }

    // Get Google client credentials
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = `${new URL(req.url).origin}/api/auth/google/callback`;

    if (!clientId || !clientSecret) {
      console.error('Google OAuth credentials not configured');
      return NextResponse.redirect(new URL('/registrarse?error=oauth_not_configured', req.url));
    }

    // Exchange authorization code for access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    if (!tokenResponse.ok) {
      const tokenError = await tokenResponse.text();
      console.error('Token exchange failed:', tokenError);
      return NextResponse.redirect(new URL('/registrarse?error=token_exchange_failed', req.url));
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Get user profile from Google
    const profileResponse = await fetch(
      `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`
    );

    if (!profileResponse.ok) {
      console.error('Failed to fetch Google profile');
      return NextResponse.redirect(new URL('/registrarse?error=profile_fetch_failed', req.url));
    }

    const profile = await profileResponse.json();

    // Register or login user with your backend
    const base = process.env.AUTH_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!base) {
      return NextResponse.redirect(new URL('/registrarse?error=backend_not_configured', req.url));
    }

    // Try to register/login with Google profile
    const authUrl = `${base.replace(/\/$/, '')}/auth/google`;
    const authResponse = await fetch(authUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        googleId: profile.id,
        email: profile.email,
        name: profile.name,
        picture: profile.picture,
        accessToken: accessToken,
      }),
    });

    const authData = await authResponse.json().catch(() => ({}));

    if (!authResponse.ok) {
      console.error('Backend auth failed:', authData);
      return NextResponse.redirect(new URL('/registrarse?error=backend_auth_failed', req.url));
    }

    // Set auth cookie and redirect to success page
    const token = authData?.access_token || authData?.accessToken || authData?.token;
    const response = NextResponse.redirect(new URL('/', req.url));

    if (token) {
      response.cookies.set('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
    }

    return response;
  } catch (error) {
    console.error('Google OAuth callback error:', error);
    return NextResponse.redirect(new URL('/registrarse?error=unexpected_error', req.url));
  }
}
