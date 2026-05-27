import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        luxury: {
          canvas: '#f3eee7',
          ink: '#1a1a15',
        },
      },
      backdropBlur: {
        '3xl': '64px',
      },
      boxShadow: {
        luxury: '0 20px 60px rgba(26, 26, 21, 0.12)',
      },
    },
  },
  plugins: [],
};

export default config;
