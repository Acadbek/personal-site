import { NextRequest, NextResponse } from 'next/server';

/**
 * Token Exchange & Validation Endpoint
 * Extension bu endpoint'dan user ma'lumotlarini oladi
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;
    
    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      );
    }
    
    // Validate token and get user info from GitHub
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });
    
    if (!userResponse.ok) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }
    
    const userData = await userResponse.json();
    
    // Check token scopes
    const scopesResponse = await fetch('https://api.github.com/applications/' + 
                                      process.env.GITHUB_CLIENT_ID + 
                                      '/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(
          `${process.env.GITHUB_CLIENT_ID}:${process.env.GITHUB_CLIENT_SECRET}`
        ).toString('base64')}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token: token,
      }),
    });
    
    let scopes = ['gist', 'public_repo'];
    if (scopesResponse.ok) {
      const scopesData = await scopesResponse.json();
      scopes = scopesData.scopes || scopes;
    }
    
    // Return user info and validated token
    return NextResponse.json({
      success: true,
      user: {
        id: userData.id,
        login: userData.login,
        name: userData.name,
        avatar_url: userData.avatar_url,
        html_url: userData.html_url,
      },
      token: token,
      scopes: scopes,
    });
    
  } catch (error) {
    console.error('Token exchange error:', error);
    return NextResponse.json(
      { error: 'Token validation failed' },
      { status: 500 }
    );
  }
}

/**
 * Verify existing token (GET method)
 */
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization header required' },
        { status: 401 }
      );
    }
    
    const token = authHeader.substring(7);
    
    // Validate token with GitHub
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });
    
    if (!userResponse.ok) {
      return NextResponse.json(
        { valid: false, error: 'Invalid or expired token' },
        { status: 401 }
      );
    }
    
    const userData = await userResponse.json();
    
    return NextResponse.json({
      valid: true,
      user: {
        id: userData.id,
        login: userData.login,
        name: userData.name,
        avatar_url: userData.avatar_url,
      },
    });
    
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { valid: false, error: 'Verification failed' },
      { status: 500 }
    );
  }
}
