import type { Config } from 'tailwindcss';

const config = {
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-syne)', 'sans-serif'],
        body: ['var(--font-jakarta)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      fontSize: {
        sm: ['0.875rem', { lineHeight: '1.6' }],
        base: ['1rem', { lineHeight: '1.7' }],
        lg: ['1.125rem', { lineHeight: '1.7' }],
        xl: ['1.25rem', { lineHeight: '1.6' }],
        '2xl': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        '3xl': ['1.875rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        '4xl': ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        '5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        '6xl': ['3.75rem', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
      },
    },
  },
} satisfies Config;

export default config;
