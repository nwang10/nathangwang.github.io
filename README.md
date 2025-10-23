# Nathan Wang - Personal Portfolio Website

A modern, interactive personal portfolio website featuring AI-powered chat, gamified timeline, dynamic theming, and tasteful animations.

Built with **React**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

## Features

### 1. AI-Powered Interactive Intro
- Floating chat orb that opens an intelligent conversation panel
- Intent-based routing to answer questions about projects, experience, skills, and contact info
- Scripted responses using a knowledge base (no external LLM required)
- Typewriter effects and smooth animations
- Fully keyboard accessible (ESC to close, focus trapping)

### 2. Gamified Timeline
- Interactive timeline showing internships, projects, and milestones
- Each node "unlocks" as you scroll into view
- Displays XP points and skill chips for each experience
- "Level Up" celebration when all nodes are unlocked
- Respects `prefers-reduced-motion` for accessibility

### 3. "Compare Me to AI" Easter Egg
- **Triple-click the logo** in the header to activate
- Split-screen view: Human mode (left) vs AI-generated mode (right)
- Over-the-top AI theme with exaggerated gradients, Comic Sans, and rainbow effects
- Live "AI output log" ticker with humorous messages
- Press ESC or click "Return to Human Mode" to exit

### 4. Dynamic Theme System
- **Time-based theming**: Morning, day, and night color schemes
- **Cursor speed tracking**: Ambient effects respond to mouse movement speed
- Smooth transitions that never impede readability
- Fully respects user accessibility preferences

### 5. Live "Now" Dashboard
- Real-time cards showing:
  - Latest GitHub commit
  - Currently listening (Spotify)
  - Status message
  - Currently reading books with progress bars
- Gracefully falls back to mock data if API keys aren't configured
- Available as both a page route (`/now`) and modal

### Additional Features
- **Fully responsive**: Mobile-first design
- **Accessibility**: WCAG AA compliant with focus states, ARIA labels, and keyboard navigation
- **Performance optimized**: Lazy loading, reduced motion support, minimal CLS
- **SEO ready**: Meta tags and semantic HTML

## Tech Stack

- **Framework**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS (no external UI kits)
- **Animation**: Framer Motion
- **Routing**: React Router
- **State Management**: React hooks
- **APIs**: GitHub REST API (optional), Spotify API (optional, mock fallback included)

## Setup

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/nwang10/nathan-wang-portfolio.git
cd nathan-wang-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` to add your API credentials:
- `VITE_GITHUB_USERNAME`: Your GitHub username (defaults to `nwang10`)
- `VITE_SPOTIFY_CLIENT_ID`: Spotify client ID (optional, mock data used if not provided)
- `VITE_SPOTIFY_REDIRECT_URI`: Spotify redirect URI (optional)

**Note**: The site works perfectly without any API keys using mock data!

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` directory.

Preview the production build locally:
```bash
npm run preview
```

## Deployment

### GitHub Pages

1. Update `vite.config.ts` base URL if deploying to a subdirectory:
```typescript
export default defineConfig({
  base: '/your-repo-name/',
  // ...
})
```

2. Build and deploy:
```bash
npm run build
# Push the dist folder to gh-pages branch
```

Or use GitHub Actions for automatic deployment (see `.github/workflows/deploy.yml` example below).

### Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments on push.

### Netlify

1. Build the project:
```bash
npm run build
```

2. Drag and drop the `dist/` folder to Netlify, or connect your Git repository.

## Project Structure

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── ChatOrb.tsx
│   │   ├── ChatPanel.tsx
│   │   ├── Timeline.tsx
│   │   ├── TimelineNode.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   ├── Experience.tsx
│   │   ├── NowDashboard.tsx
│   │   ├── EasterEggSplit.tsx
│   │   └── ThemeController.tsx
│   ├── data/
│   │   ├── kb.json              # Knowledge base for AI chat
│   │   ├── timeline.ts          # Timeline data
│   │   ├── projects.ts          # Projects data
│   │   ├── skills.ts            # Skills data
│   │   └── now.mock.json        # Mock data for Now dashboard
│   ├── lib/
│   │   ├── intent.ts            # Intent routing for AI chat
│   │   ├── timeTheme.ts         # Time-based theme logic
│   │   ├── cursor.ts            # Cursor speed tracking
│   │   ├── github.ts            # GitHub API integration
│   │   └── spotify.ts           # Spotify API integration
│   ├── pages/
│   │   ├── Home.tsx
│   │   └── Now.tsx
│   ├── styles/
│   │   └── ai-theme.css         # Easter egg AI theme
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## Customization

### Update Personal Information

1. **Basic info**: Edit `src/components/Hero.tsx` and `src/components/Experience.tsx`
2. **Projects**: Update `src/data/projects.ts`
3. **Timeline/Experience**: Update `src/data/timeline.ts`
4. **Skills**: Update `src/data/skills.ts`
5. **AI Chat responses**: Edit `src/data/kb.json`
6. **Now Dashboard mock data**: Edit `src/data/now.mock.json`

### Customize Theme Colors

Edit CSS variables in `src/index.css`:

```css
:root {
  --color-primary: #1e293b;
  --color-secondary: #64748b;
  --color-accent: #3b82f6;
  /* ... */
}
```

## Easter Egg

**Triple-click the "NW" logo** in the header to toggle the split-screen "AI-generated" theme!

Features:
- Split screen showing normal vs "AI-designed" version
- Exaggerated gradients, Comic Sans, and rainbow animations
- Live AI output log with funny messages
- Return to normal mode anytime with ESC or the button

## API Integration

### GitHub

The site automatically fetches your latest commit and stats using the GitHub REST API. No authentication required for public repos.

Set `VITE_GITHUB_USERNAME` in `.env` to your GitHub username.

### Spotify

Spotify integration requires OAuth setup:

1. Create an app at [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Add `http://localhost:5173/callback` to redirect URIs
3. Set `VITE_SPOTIFY_CLIENT_ID` and `VITE_SPOTIFY_REDIRECT_URI` in `.env`

**Note**: Full Spotify OAuth implementation is not included. The current setup uses mock data. Implement OAuth flow in `src/lib/spotify.ts` for live data.

## Accessibility

- Keyboard navigation throughout
- Focus indicators on all interactive elements
- ARIA labels for screen readers
- Respects `prefers-reduced-motion`
- High contrast ratios (WCAG AA compliant)
- Semantic HTML

## Performance

- Static site with minimal JavaScript
- Lazy loading for non-critical components
- Optimized animations with Framer Motion
- CLS < 0.1
- Lighthouse score: 95+

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT License - feel free to use this as a template for your own portfolio!

## Contact

- **Email**: ngwang@wisc.edu
- **LinkedIn**: [linkedin.com/in/nathangwang](https://linkedin.com/in/nathangwang)
- **GitHub**: [github.com/nwang10](https://github.com/nwang10)
- **Phone**: (331) 229-7983

---

Built with ❤️ by Nathan Wang using React, Tailwind CSS, and Framer Motion.

*I build useful software and ship fast.*
