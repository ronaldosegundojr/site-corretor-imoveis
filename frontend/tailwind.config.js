export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#0a1d37',
          light: '#1e3a5f',
          dark: '#050f1d',
        },
        secondary: {
          DEFAULT: '#c9a961',
          light: '#d4af37',
          dark: '#b8860b',
        },
        accent: '#1e3a5f',
        'bg-light': '#f8f9fa',
        'bg-cream': '#ffffff',
      },
    },
  },
  plugins: [],
}