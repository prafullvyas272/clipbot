import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.set('access_token', '', {
      httpOnly: false,
      path: '/',
      expires: new Date(0),
    });
    response.cookies.set('userId', '', {
      httpOnly: false,
      path: '/',
      expires: new Date(0),
    });
    return response;
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Logout failed.' }, { status: 500 });
  }
}
