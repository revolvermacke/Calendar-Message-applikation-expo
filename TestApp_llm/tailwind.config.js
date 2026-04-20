/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.tsx',
    './index.ts',
    './src/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        brand: {
          redDeep: '#8f1029',
          red: '#c62828',
          coral: '#f06b4f',
          blue: '#4f7cff',
          blueDeep: '#123c91',
        },
        surface: {
          glass: 'rgba(255,255,255,0.12)',
          glassStrong: 'rgba(255,255,255,0.15)',
          panel: 'rgba(2,6,23,0.2)',
          card: 'rgba(0,0,0,0.15)',
          cardSoft: 'rgba(255,255,255,0.1)',
          nav: 'rgba(2,6,23,0.35)',
          border: 'rgba(255,255,255,0.15)',
        },
        text: {
          primary: '#ffffff',
          secondary: '#e2e8f0',
          tertiary: '#cbd5e1',
          inverse: '#020617',
        },
      },
      borderRadius: {
        shell: '28px',
        chip: '999px',
        tab: '22px',
      },
    },
  },
  plugins: [],
};
