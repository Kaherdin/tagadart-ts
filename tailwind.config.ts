import { type Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const isProduction = process.env.NODE_ENV === 'production'

export default {
  // content: isProduction ? ['./src/**/*.{js,jsx,mdx,ts,tsx}'] : [], // Only scan files for purge in production
  content: ['./src/**/*.{js,jsx,mdx,ts,tsx}'],

  theme: {
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.5rem' }],
      base: ['1rem', { lineHeight: '1.75rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '2rem' }],
      '2xl': ['1.5rem', { lineHeight: '2.25rem' }],
      '3xl': ['1.75rem', { lineHeight: '2.25rem' }],
      '4xl': ['2rem', { lineHeight: '2.5rem' }],
      '5xl': ['2.5rem', { lineHeight: '3rem' }],
      '6xl': ['3rem', { lineHeight: '3.5rem' }],
      '7xl': ['4rem', { lineHeight: '4.5rem' }],
    },
    extend: {
      borderRadius: {
        '4xl': '2.5rem',
      },

      backgroundImage: {
        'primary-gradient': 'linear-gradient(to left, #acb6e5, #74ebd5)',
      },
      colors: {
        primary: {
          DEFAULT: '#74ebd5',
          '50': '#f0fdfa',
          '100': '#cdfaf0',
          '200': '#9af5e0',
          '300': '#74ebd5',
          '400': '#2fd2b8',
          '500': '#16b6a0',
          '600': '#0f9282',
          '700': '#10756a',
          '800': '#125d56',
          '900': '#144d47',
          '950': '#052e2c',
        },

        secondary: {
          PRIMARY: '#acb6e5',
          '50': '#f2f4fb',
          '100': '#e7ebf8',
          '200': '#d3d9f2',
          '300': '#acb6e5',
          '400': '#9ba1de',
          '500': '#8284d2',
          '600': '#6e69c2',
          '700': '#5e58aa',
          '800': '#4d498a',
          '900': '#42406f',
          '950': '#272640',
        },

        accent: '#657786',
        success: '#28a745',
        warning: '#ffc107',
        danger: '#dc3545',
      },

      fontFamily: {
        // sans: ['Mona Sans', ...defaultTheme.fontFamily.sans],
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        display: [
          ['Inter var', ...defaultTheme.fontFamily.sans],
          { fontVariationSettings: '"wdth" 125' },
        ],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config
