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
        golden: {
          dark: '#1a1410',
          brown: '#3d2817',
          primary: '#c9a961',
          light: '#e8d5b7',
          cream: '#f5efe6',
        },
        amber: {
          50: '#f5efe6',
          100: '#e8d5b7',
          200: '#d4b896',
          300: '#c9a961',
          400: '#b8954d',
          500: '#a68139',
          600: '#8b6b2f',
          700: '#705525',
          800: '#3d2817',
          900: '#1a1410',
        },
      },
    },
  },
  plugins: [],
}