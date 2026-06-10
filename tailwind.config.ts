import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--bg) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        // Fixed dark — never flips. For surfaces meant to stay dark in both themes.
        night: '#0A0F0C',
        brand: {
          DEFAULT: '#16C172',
          mint: '#3EE89C',
          deep: '#0E8A4F',
        },
      },
      fontFamily: {
        display: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'sans-serif']
      },
      backgroundImage: {
        'brand-gradient':
          'linear-gradient(135deg, #3EE89C 0%, #16C172 45%, #0E8A4F 100%)',
        'aurora':
          'radial-gradient(ellipse 80% 60% at 20% 30%, rgba(62,232,156,.5), transparent 60%), radial-gradient(ellipse 70% 60% at 80% 70%, rgba(22,193,114,.45), transparent 60%), radial-gradient(ellipse 60% 50% at 50% 100%, rgba(14,138,79,.55), transparent 70%)',
      },
      letterSpacing: {
        eyebrow: '0.18em',
      },
      keyframes: {
        marqueeLeft: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        marqueeRight: { '0%': { transform: 'translateX(-50%)' }, '100%': { transform: 'translateX(0)' } },
        floaty: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
      },
      animation: {
        'marquee-left': 'marqueeLeft 40s linear infinite',
        'marquee-right': 'marqueeRight 40s linear infinite',
        'floaty': 'floaty 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
