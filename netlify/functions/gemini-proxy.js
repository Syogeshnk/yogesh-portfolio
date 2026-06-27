/**
 * Netlify Serverless Function: gemini-proxy
 * 
 * Proxies requests to Google Gemini API so the API key
 * never leaves the server. Key is stored as a Netlify
 * Environment Variable: GEMINI_API_KEY
 * 
 * Setup:
 *   Netlify Dashboard → Site Settings → Environment Variables
 *   Add: GEMINI_API_KEY = your_key_here
 */

const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

// Simple rate limiting: max 10 requests per IP per minute (in-memory, resets on cold start)
const rateLimitMap = new Map();
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60 * 1000;

function isRateLimited(ip) {
    const now = Date.now();
    const entry = rateLimitMap.get(ip) || { count: 0, resetAt: now + RATE_WINDOW_MS };
    if (now > entry.resetAt) {
        entry.count = 0;
        entry.resetAt = now + RATE_WINDOW_MS;
    }
    entry.count++;
    rateLimitMap.set(ip, entry);
    return entry.count > RATE_LIMIT;
}

exports.handler = async (event) => {
    // Only allow POST
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
    }

    // CORS — only allow requests from your own domain
    const origin = event.headers.origin || '';
    const allowedOrigins = [
        'https://yogesh-kotkar.com',
        'https://www.yogesh-kotkar.com',
        'http://localhost:8888',   // Netlify dev local
        'http://localhost:3000',
    ];
    if (!allowedOrigins.includes(origin)) {
        return { statusCode: 403, body: JSON.stringify({ error: 'Forbidden' }) };
    }

    // Rate limiting
    const clientIp = event.headers['x-forwarded-for']?.split(',')[0] || 'unknown';
    if (isRateLimited(clientIp)) {
        return {
            statusCode: 429,
            body: JSON.stringify({ error: 'Too many requests. Please wait a moment.' })
        };
    }

    // Parse and validate body
    let body;
    try {
        body = JSON.parse(event.body || '{}');
    } catch {
        return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
    }

    const { prompt, systemInstruction } = body;
    if (!prompt || typeof prompt !== 'string' || prompt.length > 4000) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Invalid prompt' }) };
    }

    // API key from environment — never from client
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error('GEMINI_API_KEY environment variable is not set');
        return { statusCode: 503, body: JSON.stringify({ error: 'AI service not configured' }) };
    }

    // Forward to Gemini
    try {
        const geminiRes = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                ...(systemInstruction && {
                    systemInstruction: { parts: [{ text: systemInstruction }] }
                }),
                generationConfig: { maxOutputTokens: 500 }  // cap response size
            })
        });

        if (!geminiRes.ok) {
            const errText = await geminiRes.text();
            console.error('Gemini API error:', geminiRes.status, errText);
            return {
                statusCode: 502,
                body: JSON.stringify({ error: 'AI service error. Please try again.' })
            };
        }

        const data = await geminiRes.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': origin,
                'Cache-Control': 'no-store'
            },
            body: JSON.stringify({ text })
        };
    } catch (err) {
        console.error('Proxy fetch error:', err);
        return { statusCode: 500, body: JSON.stringify({ error: 'Internal server error' }) };
    }
};
