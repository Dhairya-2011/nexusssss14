# CB-AI Platform - Next.js Version

A comprehensive career guidance platform built with Next.js, React, and TypeScript.

## 🚀 What's Been Completed

### Core Setup ✅
- Next.js 14 with App Router
- TypeScript configuration
- Tailwind CSS with custom theme
- Static export configuration for Netlify
- PostCSS and Autoprefixer setup

### Pages Implemented ✅
1. **Landing Page** (`/`) - Hero, features, how it works, personas, CTA
2. **Assessment Page** (`/assessment/`) - 10-question career quiz with scoring
3. **Portfolio Page** (`/portfolio/`) - Project showcase with progress tracking
4. **Job Readiness Page** (`/job-readiness/`) - Resume builder, mock interviews, job tracker

### Components ✅
- Navigation (responsive with mobile menu)
- Footer
- Modal system

### Features ✅
- Career assessment with weighted scoring algorithm
- 8 career profiles with match percentages
- Personalized roadmap generation
- Project portfolio with categories
- Resume builder with templates
- Mock interview system
- Job application tracker

## 📦 Installation

```bash
cd career-ai-platform/next-app
npm install
```

## 🛠️ Development

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

## 📦 Build for Production

```bash
npm run build
```

This creates a `dist` folder with static files ready for deployment.

## 🚀 Deployment to Netlify

### Option 1: Deploy from Local Build

1. Build the project:
   ```bash
   npm run build
   ```

2. Drag and drop the `dist` folder to Netlify deploy page

### Option 2: Deploy via GitHub (Recommended)

1. Push the `next-app` folder to your GitHub repository
2. In Netlify dashboard:
   - Go to **Site settings** → **Build & deploy**
   - Set **Base directory**: `next-app`
   - Set **Build command**: `npm run build`
   - Set **Publish directory**: `dist`
   - Click **Deploy site**

### Netlify Configuration

The `netlify.toml` configuration (optional):
```toml
[build]
  base = "next-app"
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 📁 Project Structure

```
next-app/
├── app/
│   ├── page.tsx              # Landing page
│   ├── assessment/
│   │   └── page.tsx          # Career assessment
│   ├── portfolio/
│   │   └── page.tsx          # Project portfolio
│   ├── job-readiness/
│   │   └── page.tsx          # Job preparation tools
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── Navigation.tsx        # Header navigation
│   ├── Footer.tsx           # Footer component
│   └── Modal.tsx            # Reusable modal
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind configuration
├── postcss.config.js        # PostCSS configuration
├── package.json             # Dependencies
└── README.md               # This file
```

## 🎯 Next Steps

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Test locally**:
   ```bash
   npm run dev
   ```

3. **Build and deploy** to Netlify

4. **Optional**: Set up custom domain in Netlify settings

## 🔧 Customization

### Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: '#2563eb',
  secondary: '#7c3aed',
  accent: '#10b981',
}
```

### Content
Edit the pages in `app/` directory to customize content.

## 📱 Responsive Design

The platform is fully responsive:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🎨 Design System

- **Primary Color**: Blue (#2563eb)
- **Secondary Color**: Purple (#7c3aed)
- **Accent Color**: Green (#10b981)
- **Font**: Inter (system fallback)
- **Cards**: Glass morphism effect with backdrop blur

## 📝 Assessment Logic

The career assessment uses a weighted scoring system:
- 10 questions covering 5 trait dimensions
- Answers mapped to career profiles
- Match percentages calculated based on trait alignment
- Top 3 careers displayed with personalized roadmaps

## 🚦 Current Status

✅ **Completed**:
- All core pages
- Assessment with scoring
- Portfolio system
- Job readiness tools
- Navigation and layout
- Responsive design
- Static export setup

🔄 **In Progress**:
- Admin dashboard page (can be added)
- Backend integration (future)
- User authentication (currently localStorage-based)

## 🐛 Troubleshooting

**Build fails?**
- Ensure Node.js 18+ is installed
- Delete `node_modules` and run `npm install` again

**Styles not applying?**
- Check that Tailwind directives are in `globals.css`
- Verify `tailwind.config.js` content paths

**Images not loading?**
- Next.js Image component requires optimization
- Use standard `img` tags or `unoptimized: true` in config

## 📞 Support

For issues or questions:
1. Check the browser console for errors
2. Verify all files are in correct locations
3. Ensure all dependencies are installed

---

**Built with Next.js, React, TypeScript, and Tailwind CSS**
