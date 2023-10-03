import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      padding: '2rem',
    },
    extend: {
      colors: {
        font: '#0C009A',
        background: '#F5F5F5',
        primary: '#0424FF',
        secondary: '#FFFFFF',
      },
    },
  },
  plugins: [],
};
export default config;
