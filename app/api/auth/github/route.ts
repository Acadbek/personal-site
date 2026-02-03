import { NextRequest, NextResponse } from 'next/server';

/**
 * GitHub OAuth Authorization Endpoint
 * Extension bu endpoint'ga redirect qiladi va OAuth flow'ni boshlaydi
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const state = searchParams.get('state') || generateState();
    
    // GitHub OAuth URL
    const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
    
    githubAuthUrl.searchParams.set('client_id', process.env.GITHUB_CLIENT_ID!);
    githubAuthUrl.searchParams.set('redirect_uri', `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`);
    githubAuthUrl.searchParams.set('scope', 'gist public_repo');
    githubAuthUrl.searchParams.set('state', state);
    
    // Redirect to GitHub
    return NextResponse.redirect(githubAuthUrl.toString());
    
  } catch (error) {
    console.error('GitHub OAuth start error:', error);
    return NextResponse.json(
      { error: 'OAuth initialization failed' },
      { status: 500 }
    );
  }
}

/**
 * Generate random state for CSRF protection
 */
function generateState(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}
