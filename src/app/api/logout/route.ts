import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const response = NextResponse.redirect(new URL('/login', request.url));
  ['access_token', 'userId', 'next-auth.callback-url', 'next-auth.csrf-token', 'next-auth.session-token'].forEach(name => {
    response.cookies.set(name, '', { path: '/', expires: new Date(0) });
  });
  return response;
}
