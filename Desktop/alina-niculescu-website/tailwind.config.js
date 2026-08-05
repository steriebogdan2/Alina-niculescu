/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: { DEFAULT: '#F7F0F3', 2: '#EFE1E8' },
        blush: '#F0CBD9',
        lilac: '#C6B3DC',
        gold: { DEFAULT: '#B08A46', deep: '#8A6A2E' },
        wine: '#6B2F52',
        ink: '#241A20',
        noir: '#171015',
      },
      fontFamily: {
        display: ['Fraunces', 'Lora', 'Georgia', 'serif'],
        sans: ['Archivo', 'Poppins', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: { page: '1440px', narrow: '1080px', measure: '58ch' },
      transitionTimingFunction: { out: 'cubic-bezier(.16,1,.3,1)' },
    },
  },
  plugins: [],
};
