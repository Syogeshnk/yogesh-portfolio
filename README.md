# Yogesh Kotkar — Portfolio Website

Personal portfolio for **Yogesh Kotkar**, Project/Product Manager & Certified Scrum Master® with 8+ years in BFSI.

🌐 **Live Site:** [yogesh-kotkar.com](https://yogesh-kotkar.com)

---

## 🚀 Deploy on GitHub Pages

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Set source to `main` branch, `/ (root)`
4. Your site will be live at `https://<your-username>.github.io/<repo-name>/`

---

## 📁 Project Structure

```
yogesh-portfolio/
├── index.html        # Complete self-contained portfolio (all assets inlined)
├── assets/           # Original image files (for reference / future edits)
│   ├── SMBC.jpg
│   ├── IBM.jpg
│   ├── SBI.png
│   ├── Mahindra.png
│   ├── QK.jpg
│   ├── AQM.jpg
│   ├── UnionBank.png
│   ├── YesBank.png
│   ├── Certify.png
│   ├── Giritara.jpg
│   └── Beige_and_green_modern_business_card.png
└── README.md
```

---

## ⚙️ Tech Stack

| Technology | Usage |
|---|---|
| HTML5 / CSS3 | Structure & custom animations |
| Tailwind CSS v3 | Utility classes (compiled, no CDN) |
| Three.js | 3D particle background |
| Lucide Icons | UI icons (fully inlined, no CDN) |
| Gemini AI API | AI chat assistant & cover letter generator |
| Inter (Google Fonts) | Typography |

---

## 🔑 AI Features Setup

The portfolio includes an **AI chat assistant** ("Chat with Yog") and an **AI Cover Letter Generator** powered by Google Gemini.

To enable AI features after deployment, run this **once** in your browser console:

```js
localStorage.setItem('yk_gemini_key', 'YOUR_GEMINI_API_KEY')
```

Get a free key at: [aistudio.google.com](https://aistudio.google.com/app/apikey)

> **Note:** For production use, consider routing API calls through a backend proxy to keep your key secure.

---

## ✅ Production Optimizations Applied

- ✅ Tailwind CSS compiled & minified (no CDN runtime)
- ✅ Lucide icons inlined as SVG (no CDN dependency)  
- ✅ All images embedded as base64 (zero broken image risk)
- ✅ `unsafe-eval` removed from Content Security Policy
- ✅ AI response HTML sanitization (XSS protection)
- ✅ `mailto:` header injection fix

---

## 📬 Contact

- **Email:** syogeshnk@gmail.com  
- **Phone:** +91 9969316079  
- **LinkedIn:** [linkedin.com/in/yogeshnk](https://www.linkedin.com/in/yogeshnk)  
- **YouTube:** [@itverse1](https://www.youtube.com/@itverse1)
