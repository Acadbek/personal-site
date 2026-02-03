import { NextRequest, NextResponse } from 'next/server';

/**
 * GitHub OAuth Callback Endpoint
 * GitHub bu yerga redirect qiladi code bilan
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (!code) {
      return renderErrorPage('Authorization code not found');
    }

    // Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`,
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to exchange code for token');
    }

    const data = await tokenResponse.json();

    if (data.error) {
      return renderErrorPage(data.error_description || 'GitHub OAuth failed');
    }

    const accessToken = data.access_token;

    // Return success page with token (extension will capture this)

    const redirectUri = searchParams.get('state'); // yoki so'rovdan kelgan redirect_uri
    return NextResponse.redirect(`${redirectUri}?token=${accessToken}`);

  } catch (error) {
    console.error('GitHub OAuth callback error:', error);
    return renderErrorPage('An error occurred during authorization');
  }
}

/**
 * Render error page
 */
function renderErrorPage(message: string): NextResponse {
  return new NextResponse(
    `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Authorization Failed</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .container {
      background: white;
      border-radius: 16px;
      padding: 40px;
      max-width: 500px;
      text-align: center;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }
    .error-icon {
      width: 80px;
      height: 80px;
      background: #ef4444;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 24px;
    }
    .error-icon svg {
      width: 50px;
      height: 50px;
      stroke: white;
      stroke-width: 3;
      stroke-linecap: round;
      stroke-linejoin: round;
      fill: none;
    }
    h1 {
      color: #1f1f1f;
      font-size: 28px;
      margin-bottom: 12px;
    }
    p {
      color: #666;
      font-size: 16px;
      line-height: 1.6;
    }
    button {
      margin-top: 24px;
      padding: 12px 24px;
      background: #ef4444;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      cursor: pointer;
      transition: all 0.2s;
    }
    button:hover {
      background: #dc2626;
      transform: translateY(-1px);
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="error-icon">
      <svg viewBox="0 0 50 50">
        <line x1="15" y1="15" x2="35" y2="35"/>
        <line x1="35" y1="15" x2="15" y2="35"/>
      </svg>
    </div>
    <h1>❌ Authorization Failed</h1>
    <p>${message}</p>
    <button onclick="window.close()">Close Window</button>
  </div>
</body>
</html>`,
    {
      status: 400,
      headers: {
        'Content-Type': 'text/html',
      },
    }
  );
}
