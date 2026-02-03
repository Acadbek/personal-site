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
    return new NextResponse(
      `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GitHub Authorization Successful</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
    .success-icon {
      width: 80px;
      height: 80px;
      background: #10b981;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 24px;
      animation: scaleIn 0.5s ease-out;
    }
    .success-icon svg {
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
      margin-bottom: 24px;
    }
    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #f3f4f6;
      border-top-color: #667eea;
      border-radius: 50%;
      margin: 20px auto;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    @keyframes scaleIn {
      from {
        transform: scale(0);
      }
      to {
        transform: scale(1);
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="success-icon">
      <svg viewBox="0 0 50 50">
        <polyline points="10,25 20,35 40,15"/>
      </svg>
    </div>
    <h1>✅ GitHub Authorization Successful!</h1>
    <p>Your GitHub account has been successfully connected. This window will close automatically.</p>
    <div class="spinner"></div>
  </div>
  
  <script>
    // Send token to extension and close window
    const token = "${accessToken}";
    
    // For extension communication
    if (window.opener) {
      window.opener.postMessage({
        type: 'github-auth-success',
        token: token
      }, '*');
    }
    
    // Auto close after 2 seconds
    setTimeout(() => {
      window.close();
    }, 2000);
  </script>
</body>
</html>`,
      {
        status: 200,
        headers: {
          'Content-Type': 'text/html',
        },
      }
    );
    
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
