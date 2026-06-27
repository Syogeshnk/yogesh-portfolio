# Yogesh Kotkar — Portfolio Website

Personal portfolio for **Yogesh Kotkar**, Project/Product Manager & Certified Scrum Master® with 8+ years in BFSI.

🌐 **Live Site:** [yogesh-kotkar.com](https://yogesh-kotkar.com)

---

## 🚀 Deploy to Netlify (Recommended)

### Step 1 — Push to GitHub
```bash
git init
git add .
git commit -m "Initial portfolio deploy"
git remote add origin https://github.com/YOUR_USERNAME/yogesh-portfolio.git
git push -u origin main
```

### Step 2 — Connect to Netlify
1. Go to [app.netlify.com](https://app.netlify.com) → **Add new site → Import from Git**
2. Select your GitHub repo
3. Build settings are auto-detected from `netlify.toml`
4. Click **Deploy**

### Step 3 — Set the Gemini API Key (Required for AI Chat)
In Netlify Dashboard → **Site Settings → Environment Variables → Add variable:**

| Key | Value |
|-----|-------|
| `GEMINI_API_KEY` | `your_gemini_api_key_here` |

Get a free key at: [aistudio.google.com](https://aistudio.google.com/app/apikey)

> **Security:** The key lives only in Netlify's encrypted environment — it never reaches the browser.

---

## 📁 Project Structure

```
yogesh-portfolio/
├── index.html                        # Complete self-contained portfolio
├── netlify.toml                      # Security headers, redirects, build config
├── robots.txt                        # Search engine guidance
├── sitemap.xml                       # SEO sitemap
├── netlify/
│   └── functions/
│       └── gemini-proxy.js           # Serverless proxy — keeps API key server-side
└── assets/                           # Original image files (for future edits)
```

---

## 🔒 Security Measures Applied

| # | Issue | Fix |
|---|-------|-----|
| 1 | API key in `localStorage` | Moved to Netlify serverless proxy — key never touches browser |
| 2 | `target="_blank"` reverse tabnapping | Added `rel="noopener noreferrer"` to all 7 external links |
| 3 | HTTP link to certifypro.tech | Updated to `https://` |
| 4 | Email/phone in plaintext HTML | Obfuscated — assembled at runtime via JavaScript |
| 5 | Three.js CDN without SRI | Added `integrity` + `crossorigin` attributes |
| 6 | CSP as `<meta>` tag only | Removed meta tag; CSP now served as HTTP header via `netlify.toml` |
| 7 | Missing `X-Frame-Options` | Added `DENY` via `netlify.toml` |
| 8 | Missing `X-Content-Type-Options` | Added `nosniff` via `netlify.toml` |
| 9 | Missing `Referrer-Policy` | Added `strict-origin-when-cross-origin` |
| 10 | Missing `Permissions-Policy` | Camera, mic, geo, payment all denied |
| 11 | Missing `COOP / COEP / CORP` headers | Added all three cross-origin headers |
| 12 | No `robots.txt` | Added `robots.txt` + `sitemap.xml` |
| 13 | `unsafe-eval` in CSP | Removed |

---

## ⚙️ Tech Stack

| Technology | Usage |
|---|---|
| HTML5 / CSS3 | Structure & custom animations |
| Tailwind CSS v3 | Utility classes (compiled — no CDN) |
| Three.js r134 | 3D particle background (SRI-verified) |
| Lucide Icons | UI icons (fully inlined — no CDN) |
| Gemini AI | Chat + cover letter (via serverless proxy) |
| Netlify Functions | Server-side API proxy |
| Inter (Google Fonts) | Typography |

---

## 🛠️ Local Development

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Create .env file for local dev
echo "GEMINI_API_KEY=your_key_here" > .env

# Run locally (spins up functions + live reload)
netlify dev
```

Visit: `http://localhost:8888`

---

## 📬 Contact

- **LinkedIn:** [linkedin.com/in/yogeshnk](https://www.linkedin.com/in/yogeshnk)
- **YouTube:** [@itverse1](https://www.youtube.com/@itverse1)
