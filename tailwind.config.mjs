/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'surface-overlay': 'var(--surface-overlay)',
        'border-outline': 'var(--border-outline)',
        'sponsor-surface': 'var(--sponsor-surface)',
      }
    },
  },
  plugins: [],
}