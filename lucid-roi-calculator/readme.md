# Lucid ROI Calculator

A React-based ROI calculator for Lucid's visual collaboration platform.

🔗 **Live Site**: https://mikedawsonlucid.github.io/lucid-roi-calculator

## Features

- Interactive ROI calculator with toggleable sections
- Responsive design with Tailwind CSS
- Real-time calculations based on user inputs
- Professional Lucid-branded interface
- Automatic deployment via GitHub Actions

## Project Structure

```
lucid-roi-calculator/
├── package.json
├── .github/
│   └── workflows/
│       └── deploy.yml
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── App.css
│   └── index.js
└── README.md
```

## Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/mikedawsonlucid/lucid-roi-calculator.git
   cd lucid-roi-calculator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Deployment

This project automatically deploys to GitHub Pages using GitHub Actions whenever you push to the main branch.

### Manual Deployment

If you need to deploy manually:

```bash
npm run deploy
```

## Environment

- React 18.2.0
- Lucide React (for icons)
- Tailwind CSS (via CDN)
- GitHub Actions for automatic deployment

## License

Private repository for Lucid Software Inc.